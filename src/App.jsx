import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// עמודים
import SplashScreen from "./pages/SplashScreen";
import EmployeeLogin from "./pages/EmployeeLogin";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import BookingsPage from "./pages/BookingsPage";
import HealthDeclaration from "./pages/HealthDeclaration";
import AdminBookingOverview from "./pages/AdminBookingOverview";

// ניהול
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersPanel from "./pages/AdminUsersPanel";
import AdminInstructorsPanel from "./pages/AdminInstructorsPanel";
import AdminClassesPanel from "./pages/AdminClassesPanel";
import AdminHealthDeclarations from "./pages/AdminHealthDeclarations";
import AdminBookingControl from "./pages/AdminBookingControl"; // חדש

import { doc, getDoc } from "firebase/firestore";
import { db } from "./services/firebase";

import Header from "./components/Header";
import { Home, Calendar, BookOpen, LogOut, Settings } from "lucide-react";
import { Toaster } from "react-hot-toast";
import "./fonts.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedPhone = localStorage.getItem("employeePhone");
    const storedRole = localStorage.getItem("employeeRole");
    const storedName = localStorage.getItem("employeeName");

    if (storedPhone && storedRole) {
      setEmployee({
        phone: storedPhone,
        role: storedRole,
        name: storedName || "",
      });
    }
  }, []);

  const handleLogin = async (data) => {
    localStorage.setItem("employeePhone", data.phone);
    localStorage.setItem("employeeRole", data.role);
    localStorage.setItem("employeeName", data.name || "");
    setEmployee(data);

    try {
      const docRef = doc(db, "employees", data.phone);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();
      const hasDeclaration = docSnap.exists() && userData?.declarationImage;

      if (data.role === "לקוח" && !hasDeclaration) {
        window.location.href = "/health-declaration";
      } else {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("שגיאה בבדיקת הצהרת בריאות:", error);
      window.location.href = "/health-declaration";
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setEmployee(null);
    window.location.href = "/";
  };

  if (loading) return <SplashScreen />;
  if (!employee) return <EmployeeLogin onLogin={handleLogin} />;

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen bg-background text-text relative" dir="rtl">
        {/* Header */}
        {employee && window.location.pathname !== "/health-declaration" && (
          <Header employee={employee} />
        )}

        {/* תוכן עמוד */}
        <main className="pb-20 pt-[130px] p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage employee={employee} />} />
            <Route
              path="/schedule"
              element={<SchedulePage employee={employee} />}
            />
            <Route
              path="/bookings"
              element={<BookingsPage employee={employee} />}
            />
            <Route
              path="/health-declaration"
              element={
                <HealthDeclaration
                  employee={employee}
                  setEmployee={setEmployee}
                  onDone={() => (window.location.href = "/home")}
                />
              }
            />

            {/* ניהול – רק למנהלים */}
            {employee?.role === "מנהל" && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path="/admin/users"
                  element={<AdminUsersPanel employee={employee} />}
                />
                <Route
                  path="/admin/instructors"
                  element={<AdminInstructorsPanel />}
                />
                <Route
                  path="/admin/classes"
                  element={<AdminClassesPanel employee={employee} />}
                />
                <Route
                  path="/admin/declarations"
                  element={<AdminHealthDeclarations employee={employee} />}
                />
                <Route
                  path="/admin/bookings"
                  element={<AdminBookingControl employee={employee} />}
                />
                <Route
                  path="/admin/bookings-overview"
                  element={<AdminBookingOverview />}
                />
                <Route
                   path="/admin/bookings-overview/:week"
                  element={<AdminBookingOverview />}
                />
                <Route
                    path="/admin/bookings-overview/:week/:day"
                  element={<AdminBookingOverview />}
                />
                <Route
                     path="/admin/bookings-overview/:week/:day/:userId"
                  element={<AdminBookingOverview />}
                />
              </>
            )}
          </Routes>
        </main>

        {/* תפריט תחתון – רק אחרי התחברות מלאה */}
        {employee && window.location.pathname !== "/health-declaration" && (
          <nav className="fixed bottom-0 right-0 left-0 bg-white shadow-md z-50">
            <div className="flex justify-around">
              <NavButton to="/home" icon={<Home size={20} />} label="בית" />
              <NavButton
                to="/schedule"
                icon={<Calendar size={20} />}
                label="לוח שיעורים"
              />
              <NavButton
                to="/bookings"
                icon={<BookOpen size={20} />}
                label="השיעורים שלי"
              />
              {employee.role === "מנהל" && (
                <NavButton
                  to="/admin"
                  icon={<Settings size={20} />}
                  label="ניהול"
                />
              )}
              <button
                onClick={handleLogout}
                className="p-3 flex flex-col items-center text-red-500"
              >
                <LogOut size={20} />
                <span className="text-xs mt-1">התנתק</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </Router>
  );
};

// כפתור ניווט תחתון
const NavButton = ({ to, icon, label }) => {
  const navigate = useNavigate();
  const isActive = window.location.pathname === to;

  return (
    <button
      onClick={() => navigate(to)}
      className={`p-3 flex flex-col items-center ${
        isActive ? "text-primary" : "text-muted"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default App;
