const authService = require('../services/authService');
const userRepo = require('../repositories/userRepository');

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signup = async (req, res, next) => {
  try {
    const { user, token } = await authService.signup(req.body);
    res.cookie('token', token, COOKIE_OPTS).status(201).json({ user, token });
  } catch (e) { next(e); }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.cookie('token', token, COOKIE_OPTS).json({ user, token });
  } catch (e) { next(e); }
};

const me = async (req, res, next) => {
  try {
    const user = await userRepo.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (e) { next(e); }
};

const logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};

module.exports = { signup, login, me, logout };
