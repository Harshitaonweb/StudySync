const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db');
const jwt = require('jsonwebtoken');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const google_id = profile.id;

        // Check if user exists by google_id or email
        let { rows } = await db.query(
          'SELECT * FROM users WHERE google_id = $1 OR email = $2',
          [google_id, email]
        );

        let user = rows[0];

        if (user) {
          // Link google_id if signed up via email before
          if (!user.google_id) {
            await db.query('UPDATE users SET google_id = $1 WHERE id = $2', [google_id, user.id]);
          }
        } else {
          // Create new user
          const result = await db.query(
            `INSERT INTO users (name, email, google_id, password_hash)
             VALUES ($1, $2, $3, '')
             RETURNING *`,
            [name, email, google_id]
          );
          user = result.rows[0];
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        });

        done(null, { user, token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
