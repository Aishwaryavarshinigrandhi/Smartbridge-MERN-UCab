import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="fw-bold">Ucab</h5>
            <p className="text-muted">Premium, reliable rides for busy city journeys and trusted travel around the clock.</p>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link className="text-muted text-decoration-none" to="/about">About</Link></li>
              <li><Link className="text-muted text-decoration-none" to="/contact">Contact</Link></li>
              <li><Link className="text-muted text-decoration-none" to="/book">Book Ride</Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-semibold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-white" target="_blank" rel="noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" className="text-white" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" className="text-white" target="_blank" rel="noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" className="text-white" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-top border-secondary py-3 text-center text-muted small">© 2026 UCab. All rights reserved.</div>
    </footer>
  );
}

export default Footer;