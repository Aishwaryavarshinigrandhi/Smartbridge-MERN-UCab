function UcabHeroIllustration() {
  return (
    <div
      className="position-relative rounded-4 p-4 p-lg-5"
      style={{
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.22)",
        minHeight: 360,
      }}
    >
      <svg viewBox="0 0 640 360" className="w-100" style={{ height: "320px" }}>
        <text
          x="50%"
          y="190"
          textAnchor="middle"
          fontSize="128"
          fontWeight="700"
          fill="#ffffff"
          opacity="0.95"
          fontFamily="Poppins, sans-serif"
        >
          UCab
        </text>
      </svg>
    </div>
  );
}

export default UcabHeroIllustration;
