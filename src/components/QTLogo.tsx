export default function QTLogo() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="qt-logo-svg"
    >
      {/* Nền vuông bo góc */}
      <rect
        x="12" y="12" width="76" height="76" rx="14"
        fill="rgba(0, 255, 170, 0.08)"
        stroke="rgba(0, 255, 170, 0.25)" strokeWidth="1.5"
      />

      {/* Chữ Q */}
      <circle cx="42" cy="46" r="14" stroke="white" strokeWidth="5" />
      <path d="M 48 56 L 62 70" stroke="#00ffaa" strokeWidth="6" strokeLinecap="square" />

      {/* Chữ T */}
      <path d="M 54 32 L 80 32" stroke="white" strokeWidth="5" strokeLinecap="square" />
      <path d="M 67 32 L 67 66" stroke="white" strokeWidth="5" strokeLinecap="square" />
    </svg>
  );
}
