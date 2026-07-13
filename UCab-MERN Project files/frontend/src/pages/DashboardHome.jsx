import { Link } from "react-router-dom";
import { FaCarSide, FaMapMarkedAlt, FaWallet, FaShieldAlt, FaMotorcycle, FaTaxi, FaRoute } from "react-icons/fa";

function DashboardHome() {
  const features = [
    { title: "Instant booking", icon: <FaCarSide />, text: "Reserve your ride in under a minute." },
    { title: "Live tracking", icon: <FaMapMarkedAlt />, text: "Follow your journey with real-time updates." },
    { title: "Safe payments", icon: <FaWallet />, text: "Pay securely after ride completion." },
    { title: "Verified drivers", icon: <FaShieldAlt />, text: "Trusted professionals for every trip." },
  ];

  const serviceCards = [
    { type: "Bike", icon: <FaMotorcycle />, price: "₹20/km", note: "Fast and affordable" },
    { type: "Auto", icon: <FaTaxi />, price: "₹18/km", note: "Great for short city rides" },
    { type: "Car", icon: <FaCarSide />, price: "₹24/km", note: "Comfortable for families" },
  ];

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-stretch">
        <div className="col-lg-7">
          <div className="card border-0 shadow-lg rounded-4 p-4 p-lg-5 text-white" style={{ background: "linear-gradient(135deg, #0f2c64 0%, #1b5cff 100%)" }}>
            <span className="badge bg-warning text-dark mb-3">Premium ride experience</span>
            <h1 className="display-6 fw-bold">Welcome back to Ucab</h1>
            <p className="lead mt-3">Book a bike, auto, or car in seconds and reach your destination with comfort and clarity.</p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link to="/book" className="btn btn-warning fw-semibold">Book a ride</Link>
              <Link to="/history" className="btn btn-outline-light">View history</Link>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow rounded-4 p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaRoute className="text-primary" />
              <h5 className="fw-bold mb-0">Popular routes</h5>
            </div>
            <div className="d-grid gap-3">
              <div className="p-3 rounded-3 bg-light">
                <div className="text-muted small">Airport to City</div>
                <div className="fw-semibold fs-5">₹420 • 24 min</div>
              </div>
              <div className="p-3 rounded-3 bg-light">
                <div className="text-muted small">Tech Park to Downtown</div>
                <div className="fw-semibold fs-5">₹180 • 12 min</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        {serviceCards.map((card) => (
          <div className="col-md-4" key={card.type}>
            <div className="card border-0 shadow-sm h-100 rounded-4 p-4">
              <div className="text-primary fs-3 mb-3">{card.icon}</div>
              <h6 className="fw-bold">{card.type}</h6>
              <p className="text-muted small mb-1">{card.note}</p>
              <span className="fw-semibold text-dark">{card.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mt-2">
        {features.map((feature) => (
          <div className="col-md-6 col-xl-3" key={feature.title}>
            <div className="card border-0 shadow-sm h-100 rounded-4 p-4">
              <div className="text-primary fs-3 mb-3">{feature.icon}</div>
              <h6 className="fw-bold">{feature.title}</h6>
              <p className="text-muted small mb-0">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;
