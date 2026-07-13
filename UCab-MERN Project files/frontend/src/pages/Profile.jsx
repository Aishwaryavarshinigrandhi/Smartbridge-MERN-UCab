import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow rounded-4 p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h3 className="fw-bold mb-1">Profile</h3>
                <p className="text-muted mb-0">Manage your account details and preferences.</p>
              </div>
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input className="form-control" value={user?.name || ""} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input className="form-control" value={user?.email || ""} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input className="form-control" value={user?.phone || ""} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <input className="form-control" value={user?.role || "user"} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
