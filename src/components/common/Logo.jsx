
  export const Logo = ({ size = 50 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g transform="translate(50, 50)">
        <circle cx="0" cy="0" r="23" fill="url(#primaryGrad)" />
        <circle cx="0" cy="0" r="18" fill="#1a1a2e" />
        <circle cx="0" cy="0" r="5" fill="url(#accentGrad)" />
        <circle cx="0" cy="0" r="2" fill="#1a1a2e" />
        <path d="M 26 -8 Q 32 -8 32 0 Q 32 8 26 8" stroke="url(#primaryGrad)" strokeWidth="1.5" 
  fill="none" strokeLinecap="round" />
        <path d="M 28 -6 Q 33 -6 33 0 Q 33 6 28 6" stroke="url(#accentGrad)" strokeWidth="1.3" fill="none"
   strokeLinecap="round" />
        <path d="M -26 -8 Q -32 -8 -32 0 Q -32 8 -26 8" stroke="url(#primaryGrad)" strokeWidth="1.5" 
  fill="none" strokeLinecap="round" />
        <path d="M -28 -6 Q -33 -6 -33 0 Q -33 6 -28 6" stroke="url(#accentGrad)" strokeWidth="1.3" 
  fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
