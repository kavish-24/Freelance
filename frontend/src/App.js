import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import PostJob from "./components/PostJob";
import WorkerList from "./components/WorkerList";
import JobDetails from "./components/JobDetails";
import BookingList from "./components/BookingList";
import BookingDetails from "./components/BookingDetails";
import WorkerProfile from "./components/WorkerProfile";
import ClientProfile from "./components/ClientProfile";
import AdminPanel from "./components/AdminPanel";
import ContrastToggle from "./components/ContrastToggle";

function App() {
  // For now, no authentication logic
  // const user = null;

  return (
    <Router>
      <ContrastToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/workers" element={<WorkerList />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
        <Route path="/profile/worker/:id" element={<WorkerProfile />} />
        <Route path="/profile/client/:id" element={<ClientProfile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
