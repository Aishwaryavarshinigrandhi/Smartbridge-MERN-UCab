import { Link } from "react-router-dom";
import { FaCarSide, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" style={{ background: "linear-gradient(135deg, #0f2c64 0%, #1b5cff 100%)" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to={user ? "/dashboard" : "/home"}>
          <FaCarSide /> UCab
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/book">Book Ride</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
                {user.role === "driver" && <li className="nav-item"><Link className="nav-link" to="/driver">Driver</Link></li>}
                {user.role === "admin" && <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>}
                <li className="nav-item"><Link className="nav-link" to="/profile"><FaUserCircle className="me-1" />{user.name}</Link></li>
                <li className="nav-item"><button className="btn btn-outline-light btn-sm ms-lg-2" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="btn btn-warning text-dark ms-lg-2" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;