import { useHouse } from '../context/HouseContext';

export default function HogwartsCastle() {
  const { theme, house } = useHouse();

  // Default neutral palette when no house selected (sorting screen)
  const defaultPalette = {
    sky1: '#0a0510', sky2: '#050208',
    moon: '#e8d5a0', moonGlow: 'rgba(232,213,160,0.25)',
    castleBase: '#0a0510', castleMid: '#150a20', castleTop: '#201530',
    windowGlow: '#c9a84c', windowGlow2: '#e8c96a',
    fog: 'rgba(100,60,200,0.08)',
    stars: '#e8d5a0',
  };

  const palettes = {
    gryffindor: {
      sky1: '#3a0000', sky2: '#1a0000',
      moon: '#ffd700', moonGlow: 'rgba(255,215,0,0.3)',
      castleBase: '#2a0800', castleMid: '#3d1200', castleTop: '#5c1a00',
      windowGlow: '#ff8c00', windowGlow2: '#ffd700',
      fog: 'rgba(174,0,1,0.08)',
      stars: '#ffd700',
    },
    slytherin: {
      sky1: '#001a0e', sky2: '#000f08',
      moon: '#c0c0c0', moonGlow: 'rgba(192,192,192,0.25)',
      castleBase: '#001a0e', castleMid: '#002818', castleTop: '#003820',
      windowGlow: '#00ff88', windowGlow2: '#80ffc0',
      fog: 'rgba(26,122,64,0.1)',
      stars: '#c0ffd0',
    },
    ravenclaw: {
      sky1: '#00020f', sky2: '#00051a',
      moon: '#daa520', moonGlow: 'rgba(218,165,32,0.3)',
      castleBase: '#00020f', castleMid: '#000a2a', castleTop: '#001040',
      windowGlow: '#4488ff', windowGlow2: '#daa520',
      fog: 'rgba(26,58,154,0.12)',
      stars: '#c0d8ff',
    },
    hufflepuff: {
      sky1: '#1a1000', sky2: '#0f0a00',
      moon: '#ffcc00', moonGlow: 'rgba(255,204,0,0.35)',
      castleBase: '#1a1000', castleMid: '#261800', castleTop: '#342200',
      windowGlow: '#ffcc00', windowGlow2: '#fff0a0',
      fog: 'rgba(212,160,0,0.1)',
      stars: '#fff0a0',
    },
  };

  const p = palettes[house] || defaultPalette;
  const themeColor = theme || { primary: '#3a1a6b', accent2: '#c9a84c' };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      zIndex: 0,
      pointerEvents: 'none',
      height: '30vh',
      minHeight: 180,
      overflow: 'hidden',
      opacity: 0.35,
      maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, black 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, black 100%)',
    }}>
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.sky1} stopOpacity="0" />
            <stop offset="100%" stopColor={p.sky2} stopOpacity="0.9" />
          </linearGradient>

          {/* Castle wall gradient */}
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.castleTop} />
            <stop offset="100%" stopColor={p.castleBase} />
          </linearGradient>

          {/* Moon glow filter */}
          <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Window glow filter */}
          <filter id="winGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Castle shadow/depth */}
          <filter id="castleShadow">
            <feDropShadow dx="0" dy="-4" stdDeviation="6" floodColor={themeColor.primary} floodOpacity="0.3" />
          </filter>

          {/* Fog gradient */}
          <linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.fog} stopOpacity="0" />
            <stop offset="100%" stopColor={p.fog} stopOpacity="1" />
          </linearGradient>

          {/* Clip for castle */}
          <clipPath id="castleClip">
            <rect x="0" y="0" width="1440" height="400" />
          </clipPath>
        </defs>

        {/* Sky base */}
        <rect x="0" y="0" width="1440" height="400" fill="url(#skyGrad)" />

        {/* Moon */}
        <circle cx="1200" cy="60" r="22" fill={p.moon} opacity="0.7" filter="url(#moonGlow)" />
        <circle cx="1200" cy="60" r="35" fill={p.moonGlow} opacity="0.25" />

        {/* Stars */}
        {[
          [80,30],[200,20],[350,45],[500,15],[650,35],[800,25],[950,50],[1050,20],[1300,40],[1380,15],
          [130,55],[420,30],[700,18],[1100,45],[1350,60],[260,10],[900,38],[1250,28],
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r={i%4===0?1.5:1} fill={p.stars} opacity={0.4+Math.sin(i)*0.3} />
        ))}

        {/* ── CASTLE ── */}
        <g clipPath="url(#castleClip)" filter="url(#castleShadow)">

          {/* Far background hills */}
          <ellipse cx="720" cy="420" rx="900" ry="120" fill={p.castleBase} opacity="0.6" />

          {/* ── LEFT WING ── */}
          {/* Left outer tower base */}
          <rect x="60" y="260" width="70" height="140" fill="url(#wallGrad)" />
          {/* Left outer tower top */}
          <rect x="55" y="240" width="80" height="30" fill={p.castleTop} />
          {/* Left outer turret */}
          <polygon points="55,240 95,200 135,240" fill={p.castleTop} />
          {/* Left outer turret battlements */}
          <rect x="58" y="232" width="12" height="12" fill={p.castleMid} />
          <rect x="78" y="232" width="12" height="12" fill={p.castleMid} />
          <rect x="98" y="232" width="12" height="12" fill={p.castleMid} />
          <rect x="118" y="232" width="12" height="12" fill={p.castleMid} />

          {/* Left connecting wall */}
          <rect x="130" y="290" width="120" height="110" fill="url(#wallGrad)" />
          <rect x="130" y="280" width="120" height="18" fill={p.castleTop} />
          {/* Battlements on connecting wall */}
          {[130,148,166,184,202,220,238].map((x,i) => (
            <rect key={i} x={x} y="272" width="12" height="14" fill={p.castleMid} />
          ))}

          {/* Left mid tower */}
          <rect x="250" y="230" width="90" height="170" fill="url(#wallGrad)" />
          <rect x="245" y="215" width="100" height="25" fill={p.castleTop} />
          <polygon points="245,215 295,165 345,215" fill={p.castleTop} />
          {/* Battlements */}
          {[248,266,284,302,320,338].map((x,i) => (
            <rect key={i} x={x} y="207" width="12" height="14" fill={p.castleMid} />
          ))}

          {/* ── CENTRAL GREAT HALL ── */}
          {/* Main hall body */}
          <rect x="380" y="180" width="280" height="220" fill="url(#wallGrad)" />
          {/* Hall battlements */}
          {[383,401,419,437,455,473,491,509,527,545,563,581,599,617,635,653].map((x,i) => (
            <rect key={i} x={x} y="170" width="13" height="16" fill={p.castleMid} />
          ))}
          {/* Hall roof line */}
          <rect x="375" y="168" width="290" height="18" fill={p.castleTop} />

          {/* Central tall tower (Astronomy Tower) */}
          <rect x="480" y="80" width="80" height="300" fill="url(#wallGrad)" />
          <rect x="474" y="65" width="92" height="22" fill={p.castleTop} />
          <polygon points="474,65 520,10 566,65" fill={p.castleTop} />
          {/* Astronomy tower battlements */}
          {[477,495,513,531,549].map((x,i) => (
            <rect key={i} x={x} y="57" width="12" height="14" fill={p.castleMid} />
          ))}
          {/* Tower flag */}
          <line x1="520" y1="10" x2="520" y2="40" stroke={themeColor.accent2} strokeWidth="1.5" />
          <polygon points="520,10 545,20 520,30" fill={themeColor.accent2} opacity="0.8" />

          {/* Left hall tower */}
          <rect x="370" y="140" width="65" height="260" fill="url(#wallGrad)" />
          <rect x="364" y="125" width="77" height="22" fill={p.castleTop} />
          <polygon points="364,125 402,80 441,125" fill={p.castleTop} />
          {[367,385,403,421].map((x,i) => (
            <rect key={i} x={x} y="117" width="12" height="14" fill={p.castleMid} />
          ))}

          {/* Right hall tower */}
          <rect x="605" y="140" width="65" height="260" fill="url(#wallGrad)" />
          <rect x="599" y="125" width="77" height="22" fill={p.castleTop} />
          <polygon points="599,125 637,80 676,125" fill={p.castleTop} />
          {[602,620,638,656].map((x,i) => (
            <rect key={i} x={x} y="117" width="12" height="14" fill={p.castleMid} />
          ))}

          {/* ── RIGHT WING ── */}
          {/* Right connecting wall */}
          <rect x="690" y="290" width="130" height="110" fill="url(#wallGrad)" />
          <rect x="690" y="278" width="130" height="18" fill={p.castleTop} />
          {[693,711,729,747,765,783,801].map((x,i) => (
            <rect key={i} x={x} y="270" width="12" height="14" fill={p.castleMid} />
          ))}

          {/* Right mid tower */}
          <rect x="820" y="230" width="90" height="170" fill="url(#wallGrad)" />
          <rect x="814" y="215" width="102" height="25" fill={p.castleTop} />
          <polygon points="814,215 865,165 916,215" fill={p.castleTop} />
          {[817,835,853,871,889,907].map((x,i) => (
            <rect key={i} x={x} y="207" width="12" height="14" fill={p.castleMid} />
          ))}

          {/* Right outer wall */}
          <rect x="910" y="290" width="110" height="110" fill="url(#wallGrad)" />
          <rect x="910" y="278" width="110" height="18" fill={p.castleTop} />
          {[913,931,949,967,985,1003].map((x,i) => (
            <rect key={i} x={x} y="270" width="12" height="14" fill={p.castleMid} />
          ))}

          {/* Right outer tower */}
          <rect x="1020" y="260" width="70" height="140" fill="url(#wallGrad)" />
          <rect x="1014" y="240" width="82" height="28" fill={p.castleTop} />
          <polygon points="1014,240 1055,195 1096,240" fill={p.castleTop} />
          {[1017,1035,1053,1071,1089].map((x,i) => (
            <rect key={i} x={x} y="232" width="12" height="12" fill={p.castleMid} />
          ))}

          {/* ── EXTRA TOWERS (depth) ── */}
          {/* Far left small tower */}
          <rect x="10" y="300" width="50" height="100" fill={p.castleBase} opacity="0.7" />
          <polygon points="10,300 35,265 60,300" fill={p.castleBase} opacity="0.7" />

          {/* Far right small tower */}
          <rect x="1100" y="300" width="55" height="100" fill={p.castleBase} opacity="0.7" />
          <polygon points="1100,300 1127,262 1155,300" fill={p.castleBase} opacity="0.7" />

          {/* Background spires */}
          <rect x="440" y="120" width="30" height="200" fill={p.castleBase} opacity="0.5" />
          <polygon points="440,120 455,85 470,120" fill={p.castleBase} opacity="0.5" />
          <rect x="570" y="130" width="28" height="190" fill={p.castleBase} opacity="0.5" />
          <polygon points="570,130 584,95 598,130" fill={p.castleBase} opacity="0.5" />

          {/* ── WINDOWS (glowing) ── */}
          {/* Great hall windows */}
          {[400,440,480,520,560,600].map((x,i) => (
            <g key={i} filter="url(#winGlow)">
              <rect x={x} y="210" width="18" height="28" rx="9" fill={i%2===0?p.windowGlow:p.windowGlow2} opacity="0.7" />
            </g>
          ))}
          {/* Great hall lower windows */}
          {[410,450,490,530,570,610].map((x,i) => (
            <g key={i} filter="url(#winGlow)">
              <rect x={x} y="260" width="14" height="22" rx="7" fill={p.windowGlow} opacity="0.5" />
            </g>
          ))}
          {/* Astronomy tower windows */}
          {[492,492,492,492].map((x,i) => (
            <g key={i} filter="url(#winGlow)">
              <rect x={x} y={100+i*40} width="16" height="24" rx="8" fill={p.windowGlow2} opacity="0.6" />
            </g>
          ))}
          {/* Left tower windows */}
          {[380,380].map((x,i) => (
            <g key={i} filter="url(#winGlow)">
              <rect x={x} y={160+i*50} width="14" height="20" rx="7" fill={p.windowGlow} opacity="0.5" />
            </g>
          ))}
          {/* Right tower windows */}
          {[615,615].map((x,i) => (
            <g key={i} filter="url(#winGlow)">
              <rect x={x} y={160+i*50} width="14" height="20" rx="7" fill={p.windowGlow} opacity="0.5" />
            </g>
          ))}
          {/* Mid towers windows */}
          {[265,835].map((tx) => [0,1].map((i) => (
            <g key={`${tx}-${i}`} filter="url(#winGlow)">
              <rect x={tx+10} y={250+i*40} width="12" height="18" rx="6" fill={p.windowGlow} opacity="0.5" />
            </g>
          )))}

          {/* ── GREAT HALL ENTRANCE ARCH ── */}
          <path d="M490 400 L490 340 Q520 310 550 340 L550 400 Z" fill={p.castleBase} />
          <path d="M490 340 Q520 305 550 340" stroke={p.castleTop} strokeWidth="3" fill="none" />

          {/* ── GROUND / CLIFF ── */}
          <path d="M0 380 Q200 360 400 370 Q600 380 720 365 Q900 350 1100 370 Q1300 385 1440 375 L1440 400 L0 400 Z" fill={p.castleBase} />
          <path d="M0 390 Q360 375 720 380 Q1080 385 1440 388 L1440 400 L0 400 Z" fill={p.castleBase} opacity="0.8" />

          {/* ── LAKE REFLECTION ── */}
          <ellipse cx="720" cy="400" rx="500" ry="30" fill={themeColor.primary} opacity="0.08" />

        </g>

        {/* Fog layer at bottom */}
        <rect x="0" y="300" width="1440" height="100" fill="url(#fogGrad)" />

        {/* Vignette overlay */}
        <rect x="0" y="0" width="1440" height="400" fill="url(#skyGrad)" opacity="0.3" />
      </svg>
    </div>
  );
}
