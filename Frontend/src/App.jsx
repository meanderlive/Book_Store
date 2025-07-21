import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages & Components
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import BuyNow from "./components/BuyNow";
import ThankYou from "./components/ThankYou";
import CourseList from "./admin/cource/course-list";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth(); // You don’t need setAuthUser here

  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/signup" />}
        />

        {/* Purchase Flow */}
        <Route path="/buy/:id" element={<BuyNow />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Outlet />}>
          <Route path="course" element={<CourseList />} />
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
