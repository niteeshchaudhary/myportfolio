import './SectionDivider.css';

export default function SectionDivider() {
  return (
    <div className="section-divider">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1200,0 L1200,120 L0,120 Z" fill="url(#gradient)" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(102, 126, 234, 0.1)" />
            <stop offset="50%" stopColor="rgba(240, 147, 251, 0.1)" />
            <stop offset="100%" stopColor="rgba(79, 172, 254, 0.1)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

