import { Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookRide from "./pages/BookRide";
import RideHistory from "./pages/RideHistory";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/DashboardHome";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />

      <Route path="/dashboard" element={<ProtectedRoute><Layout><DashboardHome /></Layout></ProtectedRoute>} />
      <Route path="/book" element={<ProtectedRoute><Layout><BookRide /></Layout></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><Layout><RideHistory /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/driver" element={<ProtectedRoute allowedRoles={["driver"]}><Layout><DriverDashboard /></Layout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Layout><AdminDashboard /></Layout></ProtectedRoute>} />

      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

export default App;