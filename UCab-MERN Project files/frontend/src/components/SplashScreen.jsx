import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2c64 0%, #1b5cff 100%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", width: "360px", height: "280px" }}>
        <svg viewBox="0 0 360 280" width="360" height="280">
          <text
            x="180"
            y="160"
            textAnchor="middle"
            fontSize="72"
            fontWeight="800"
            fill="white"
            fontFamily="Poppins, sans-serif"
            letterSpacing="3"
          >
            UCab
          </text>

          <text
            x="180"
            y="225"
            textAnchor="middle"
            fill="#fff"
            fontSize="16"
            fontFamily="Poppins, sans-serif"
            opacity="0.85"
          >
            Your ride starts with UCab
          </text>
        </svg>
      </div>
    </div>
  );
}

export default SplashScreen;