import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";

function RideHistory() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await API.get("/rides/myrides");
      setRides(response.data.rides);
    } catch (error) {
      toast.error("Unable to load ride history");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (rideId) => {
    try {
      await API.post("/payment/pay", { rideId, paymentMethod: "UPI" });
      toast.success("Payment completed");
      fetchRides();
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "requested": return "warning";
      case "accepted": return "primary";
      case "started": return "info";
      case "completed": return "success";
      case "cancelled": return "danger";
      default: return "secondary";
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">My ride history</h2>
          <p className="text-muted mb-0">Track your bookings and payments in one place.</p>
        </div>
      </div>

      <div className="card border-0 shadow rounded-4">
        <div className="card-body p-4">
          {loading ? (
            <div className="text-center py-4">Loading rides...</div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Pickup</th>
                    <th>Destination</th>
                    <th>Distance</th>
                    <th>Fare</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rides.length === 0 ? (
                    <tr><td colSpan="7" className="text-center text-muted py-4">No rides found yet</td></tr>
                  ) : rides.map((ride) => (
                    <tr key={ride._id}>
                      <td>{ride.pickup}</td>
                      <td>{ride.destination}</td>
                      <td>{ride.distance} km</td>
                      <td>₹{ride.fare}</td>
                      <td><span className={`badge bg-${getStatusColor(ride.status)}`}>{ride.status}</span></td>
                      <td><span className={`badge ${ride.paymentStatus === "paid" ? "bg-success" : "bg-danger"}`}>{ride.paymentStatus}</span></td>
                      <td>
                        {ride.paymentStatus !== "paid" ? <button className="btn btn-sm btn-outline-primary" onClick={() => handlePay(ride._id)}>Pay</button> : <span className="text-muted">Completed</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RideHistory;