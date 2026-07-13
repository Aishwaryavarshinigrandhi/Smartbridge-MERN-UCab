import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="py-5">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h3 className="fw-bold mb-3">Page not found</h3>
        <p className="text-muted mb-4">The page you are looking for has moved or no longer exists.</p>
        <Link to="/home" className="btn btn-primary">Go Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
