import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import "./App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Notes />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
        </Route>
      </Routes>
    </>
  );
}