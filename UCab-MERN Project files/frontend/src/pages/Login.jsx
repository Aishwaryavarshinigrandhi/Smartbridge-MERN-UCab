import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);
      login(response.data.token, response.data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow rounded-4 p-4 p-lg-5">
            <div className="text-center mb-4">
              <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center" style={{ width: 70, height: 70 }}>
                <i className="bi bi-car-front-fill fs-3" />
              </div>
              <h2 className="fw-bold mt-3">Welcome back</h2>
              <p className="text-muted">Sign in to continue to Ucab</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
            </form>

            <div className="text-center mt-3">
              <small className="text-muted">Forgot password?</small>
              <button className="btn btn-link p-0 ms-2">Reset here</button>
            </div>

            <p className="text-center mt-4 mb-0">
              New to Ucab?
              <Link to="/register" className="ms-2">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;