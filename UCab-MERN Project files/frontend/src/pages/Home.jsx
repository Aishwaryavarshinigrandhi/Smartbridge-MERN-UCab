import { Link } from "react-router-dom";
import { FaCarSide, FaMapMarkedAlt, FaShieldAlt, FaWallet, FaClock, FaUsers, FaStar } from "react-icons/fa";
import UcabHeroIllustration from "../components/UcabHeroIllustration";

const features = [
  { icon: <FaCarSide />, title: "Easy Booking", text: "Reserve a ride in seconds with transparent fare estimates." },
  { icon: <FaMapMarkedAlt />, title: "Live Tracking", text: "Stay updated with real-time driver location and ETA." },
  { icon: <FaWallet />, title: "Secure Payments", text: "Enjoy fast payments, invoices, and a safe checkout flow." },
  { icon: <FaShieldAlt />, title: "Verified Drivers", text: "Every driver is screened and monitored for a reliable journey." },
];

const steps = ["Login", "Choose locations", "Select cab", "Confirm booking", "Enjoy the ride"];

const testimonials = [
  { name: "Nisha", text: "Booking through Ucab feels premium and effortless. The ride tracking is excellent." },
  { name: "Arjun", text: "The interface is clean and the driver experience is dependable every time." },
];

function Home() {
  return (
    <>
      <section className="hero-section py-5 py-lg-0 text-white" style={{ background: "linear-gradient(135deg, #0f2c64 0%, #1b5cff 100%)" }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-warning text-dark mb-3">Smart mobility for modern cities</span>
              <h1 className="display-4 fw-bold">Ride smarter with Ucab</h1>
              <p className="lead mt-3">Book affordable rides instantly with real-time tracking, trusted drivers, and a seamless experience from pickup to drop-off.</p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/register" className="btn btn-warning btn-lg fw-semibold">Book Ride</Link>
                <Link to="/about" className="btn btn-outline-light btn-lg">Learn More</Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <UcabHeroIllustration />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold">Features</span>
          <h2 className="fw-bold">Everything you need in one ride platform</h2>
        </div>
        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-md-6 col-xl-3" key={feature.title}>
              <div className="card border-0 shadow-sm h-100 rounded-4 p-4 text-center">
                <div className="fs-2 text-primary mb-3">{feature.icon}</div>
                <h5 className="fw-bold">{feature.title}</h5>
                <p className="text-muted mb-0">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="text-primary fw-semibold">How it works</span>
          <h2 className="fw-bold">From booking to arrival in five simple steps</h2>
        </div>
        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-md-6 col-lg-2" key={step}>
              <div className="card border-0 shadow-sm rounded-4 p-3 text-center h-100">
                <div className="rounded-circle bg-primary text-white mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: 42, height: 42 }}>{index + 1}</div>
                <h6 className="fw-semibold">{step}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow rounded-4 p-4 h-100">
              <h3 className="fw-bold mb-4">Trusted by riders and drivers alike</h3>
              <div className="row g-3">
                <div className="col-md-4"><div className="bg-light rounded-3 p-3 text-center"><FaUsers className="text-primary fs-3" /><h4 className="mt-2 mb-0">10k+</h4><small className="text-muted">Users</small></div></div>
                <div className="col-md-4"><div className="bg-light rounded-3 p-3 text-center"><FaCarSide className="text-primary fs-3" /><h4 className="mt-2 mb-0">500+</h4><small className="text-muted">Drivers</small></div></div>
                <div className="col-md-4"><div className="bg-light rounded-3 p-3 text-center"><FaClock className="text-primary fs-3" /><h4 className="mt-2 mb-0">24/7</h4><small className="text-muted">Support</small></div></div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow rounded-4 p-4 h-100">
              <h3 className="fw-bold mb-4">What riders say</h3>
              {testimonials.map((t) => (
                <div className="border rounded-3 p-3 mb-3" key={t.name}>
                  <div className="text-warning mb-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <p className="mb-2">“{t.text}”</p>
                  <strong>{t.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;