import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { FaMotorcycle, FaTaxi, FaCarSide, FaRoute, FaStar, FaWallet } from "react-icons/fa";
import API from "../services/api";

const vehicleOptions = [
  { type: "Bike", icon: <FaMotorcycle />, pricePerKm: 12, eta: "3 min", description: "Fast and budget-friendly" },
  { type: "Auto", icon: <FaTaxi />, pricePerKm: 15, eta: "4 min", description: "Great for short city trips" },
  { type: "Car", icon: <FaCarSide />, pricePerKm: 20, eta: "5 min", description: "Comfort for families and business rides" },
];

const driverProfiles = {
  Bike: { name: "Ravi", rating: 4.9, vehicle: "TVS Apache", phone: "+91 98765 12345" },
  Bike: { name: "Raju", rating: 4.5, vehicle: "Honda Activa", phone: "+91 84592 59488" },
  Bike: { name: "Kiran", rating: 4.7, vehicle: "Bajaj Pulsar", phone: "+91 98765 67890" },
  Auto: { name: "Suresh", rating: 4.8, vehicle: "Auto 4S", phone: "+91 98765 99999" },
  Auto: { name: "Manoj", rating: 4.6, vehicle: "Auto 3S", phone: "+91 98765 88888" },
  Auto: { name: "Ramesh", rating: 4.7, vehicle: "Auto 5S", phone: "+91 98765 77777" },
  Car: { name: "Arjun", rating: 4.95, vehicle: "Swift Dzire", phone: "+91 98765 33333" },
  Car: { name: "Vikram", rating: 4.7, vehicle: "Honda City", phone: "+91 98765 44444" },
  Car: { name: "Rahul", rating: 4.8, vehicle: "Toyota Innova", phone: "+91 98765 55555" },
};

const estimateDistance = (pickup, destination) => {
  if (!pickup || !destination) return 0;
  const picker = pickup.trim().length + destination.trim().length;
  const common = pickup
    .split("")
    .filter((ch) => destination.includes(ch)).length;
  const distance = Math.max(3, Math.min(28, Math.floor((picker - common) / 2) + 3));
  return distance;
};

function BookRide() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState("Car");
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const selectedVehicle = vehicleOptions.find((item) => item.type === vehicleType) || vehicleOptions[2];
  const estimatedDistance = useMemo(() => estimateDistance(pickup, destination), [pickup, destination]);
  const estimatedFare = useMemo(() => {
    if (!estimatedDistance) return 0;
    return selectedVehicle.pricePerKm * estimatedDistance + 35;
  }, [selectedVehicle, estimatedDistance]);
  const displayDistance = ride?.distance ?? estimatedDistance;
  const displayFare = ride?.fare ?? estimatedFare;

  const bookRide = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/rides/book", { pickup, destination, vehicleType });
      setRide(response.data.ride);
      toast.success("Ride booked successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const payRide = async () => {
    if (!ride?._id) return;
    setPaymentLoading(true);

    try {
      await API.post("/payment/pay", { rideId: ride._id, paymentMethod: "UPI" });
      toast.success("Payment completed");
      setRide({ ...ride, paymentStatus: "paid" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="card border-0 shadow rounded-4 p-4 p-lg-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaRoute className="text-primary" />
              <h2 className="fw-bold mb-0">Book your ride</h2>
            </div>
            <p className="text-muted">Choose your ride type, enter your route, and get a live estimate before you confirm.</p>

            <form onSubmit={bookRide}>
              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Pickup location</label>
                  <input type="text" className="form-control" placeholder="Enter pickup" value={pickup} onChange={(event) => setPickup(event.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Drop location</label>
                  <input type="text" className="form-control" placeholder="Enter destination" value={destination} onChange={(event) => setDestination(event.target.value)} required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Choose vehicle</label>
                <div className="row g-3">
                  {vehicleOptions.map((option) => (
                    <div className="col-md-4" key={option.type}>
                      <button type="button" className={`btn w-100 text-start border ${vehicleType === option.type ? "btn-primary" : "btn-light"}`} onClick={() => setVehicleType(option.type)}>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          {option.icon}
                          <strong>{option.type}</strong>
                        </div>
                        <div className="small">{option.description}</div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card border rounded-4 p-3 bg-light mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Estimated fare</span>
                  <span className="fw-bold text-primary">₹{displayFare}</span>
                </div>
                <div className="small text-muted mt-2">Distance: {displayDistance} km • ETA: {selectedVehicle.eta}</div>
              </div>

              <button className="btn btn-primary w-100" disabled={loading || !estimatedDistance}>{loading ? "Booking..." : "Confirm ride"}</button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow rounded-4 p-4 h-100">
            <h4 className="fw-bold mb-3">Ride summary</h4>
            {ride ? (
              <>
                <div className="p-3 rounded-4 bg-light mb-3">
                  <div className="small text-muted">Route</div>
                  <div className="fw-semibold">{ride.pickup} → {ride.destination}</div>
                  <div className="small text-muted mt-2">Vehicle: {ride.vehicleType || vehicleType}</div>
                </div>

                <div className="card border rounded-4 p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Assigned driver</strong>
                    <span className="badge bg-success">Available</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 46, height: 46 }}>
                      {driverProfiles[ride.vehicleType || vehicleType].name.charAt(0)}
                    </div>
                    <div>
                      <div className="fw-semibold">{driverProfiles[ride.vehicleType || vehicleType].name}</div>
                      <div className="small text-muted">{driverProfiles[ride.vehicleType || vehicleType].vehicle}</div>
                      <div className="small text-warning"><FaStar /> {driverProfiles[ride.vehicleType || vehicleType].rating}</div>
                    </div>
                  </div>
                  <div className="small text-muted mt-2">Phone: {driverProfiles[ride.vehicleType || vehicleType].phone}</div>
                </div>

                <div className="card border rounded-4 p-3 mb-3">
                  <div className="d-flex justify-content-between"><span>Fare</span><strong>₹{ride.fare}</strong></div>
                  <div className="d-flex justify-content-between"><span>Distance</span><strong>{ride.distance} km</strong></div>
                  <div className="d-flex justify-content-between"><span>Vehicle</span><strong>{ride.vehicleType || vehicleType}</strong></div>
                  <div className="d-flex justify-content-between"><span>Status</span><strong>{ride.status}</strong></div>
                </div>

                <button className="btn btn-warning w-100" onClick={payRide} disabled={paymentLoading}>
                  <FaWallet className="me-2" />{paymentLoading ? "Processing..." : ride.paymentStatus === "paid" ? "Paid" : "Pay now"}
                </button>
              </>
            ) : (
              <div className="text-center text-muted py-5">
                <FaRoute className="fs-1 mb-3" />
                <p>Your ride details, assigned driver, and payment options will appear here after booking.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookRide;