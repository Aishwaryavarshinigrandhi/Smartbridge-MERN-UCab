import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [data, setData] = useState({});
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const dashboardResponse = await API.get("/admin/dashboard");
    const ridesResponse = await API.get("/admin/rides");
    setData(dashboardResponse.data.data);
    setRides(ridesResponse.data.rides || []);
  };

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Admin dashboard</h2>
        <p className="text-muted mb-0">Monitor the complete Ucab ecosystem from one place.</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3"><div className="card border-0 shadow rounded-4 p-4 text-center"><h2 className="fw-bold">{data.users || 0}</h2><p className="mb-0 text-muted">Total users</p></div></div>
        <div className="col-md-6 col-xl-3"><div className="card border-0 shadow rounded-4 p-4 text-center"><h2 className="fw-bold">{data.drivers || 0}</h2><p className="mb-0 text-muted">Total drivers</p></div></div>
        <div className="col-md-6 col-xl-3"><div className="card border-0 shadow rounded-4 p-4 text-center"><h2 className="fw-bold">{data.rides || 0}</h2><p className="mb-0 text-muted">Completed rides</p></div></div>
        <div className="col-md-6 col-xl-3"><div className="card border-0 shadow rounded-4 p-4 text-center"><h2 className="fw-bold">{data.payments || 0}</h2><p className="mb-0 text-muted">Payments</p></div></div>
      </div>

      <div className="card border-0 shadow rounded-4">
        <div className="card-body p-4">
          <h5 className="fw-semibold mb-3">Recent bookings</h5>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Rider</th>
                  <th>Pickup</th>
                  <th>Destination</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rides.slice(0, 6).map((ride) => (
                  <tr key={ride._id}>
                    <td>{ride.user?.name || "Guest"}</td>
                    <td>{ride.pickup}</td>
                    <td>{ride.destination}</td>
                    <td><span className="badge bg-primary">{ride.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;