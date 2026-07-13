import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function DriverDashboard() {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    loadRides();
  }, []);

  const loadRides = async () => {
    try {
      const response = await API.get("/rides/all");
      setRides(response.data.rides);
    } catch (error) {
      toast.error("Unable to load rides");
    }
  };

  const acceptRide = async (id) => {
    try {
      await API.put(`/rides/accept/${id}`);
      toast.success("Ride accepted");
      loadRides();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to accept ride");
    }
  };

  const startRide = async (id) => {
    try {
      await API.put(`/rides/start/${id}`);
      toast.success("Ride started");
      loadRides();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to start ride");
    }
  };

  const completeRide = async (id) => {
    try {
      await API.put(`/rides/complete/${id}`);
      toast.success("Ride completed");
      loadRides();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to complete ride");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Driver workspace</h2>
          <p className="text-muted mb-0">Manage rides and stay on top of your daily earnings.</p>
        </div>
        <div className="badge bg-success">Available</div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="card border-0 shadow-sm rounded-4 p-3"><h6 className="text-muted">Daily earnings</h6><h4 className="fw-bold">₹1,240</h4></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm rounded-4 p-3"><h6 className="text-muted">Weekly earnings</h6><h4 className="fw-bold">₹7,980</h4></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm rounded-4 p-3"><h6 className="text-muted">Monthly earnings</h6><h4 className="fw-bold">₹32,500</h4></div></div>
      </div>

      <div className="card border-0 shadow rounded-4">
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Pickup</th>
                  <th>Destination</th>
                  <th>Fare</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rides.map((ride) => (
                  <tr key={ride._id}>
                    <td>{ride.pickup}</td>
                    <td>{ride.destination}</td>
                    <td>₹{ride.fare}</td>
                    <td><span className="badge bg-info text-dark">{ride.status}</span></td>
                    <td>
                      {ride.status === "requested" && <button className="btn btn-success btn-sm" onClick={() => acceptRide(ride._id)}>Accept</button>}
                      {ride.status === "accepted" && <button className="btn btn-primary btn-sm" onClick={() => startRide(ride._id)}>Start</button>}
                      {ride.status === "started" && <button className="btn btn-danger btn-sm" onClick={() => completeRide(ride._id)}>Complete</button>}
                    </td>
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

export default DriverDashboard;