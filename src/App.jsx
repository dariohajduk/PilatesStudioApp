import React, { useState, useEffect } from "react";

// עמודים עיקריים
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import BookingsPage from "./pages/BookingsPage";
import EmployeeLogin from "./pages/EmployeeLogin";

// עמודי ניהול
import AdminDashboard from "./pages/AdminDashboard";
import AdminClassesPanel from "./pages/AdminClassesPanel";

import Logo from "./assets/logo.png";

// אייקונים
import { Home, Calendar, BookOpen, LogOut, Settings } from "lucide-react";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedPhone = localStorage.getItem("employeePhone");
    const storedRole = localStorage.getItem("employeeRole");

    if (storedPhone && storedRole) {
      setEmployee({ phone: storedPhone, role: storedRole });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employeePhone");
    localStorage.removeItem("employeeRole");
    setEmployee(null);
    setActiveTab("home");
  };

  const renderPage = () => {
    if (!employee) {
      return (
        <EmployeeLogin
          onLogin={(data) => {
            localStorage.setItem("employeePhone", data.phone);
            localStorage.setItem("employeeRole", data.role);
            setEmployee(data);
          }}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return <HomePage employee={employee} />;
      case "schedule":
        return <SchedulePage employee={employee} />;
      case "bookings":
        return <BookingsPage employee={employee} />;
      case "admin":
        return <AdminDashboard employee={employee} />;
      case "adminClasses":
        return <AdminClassesPanel employee={employee} />;
      default:
        return <HomePage employee={employee} />;
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-background text-text" dir="rtl">
      <header className="flex justify-center items-center bg-white shadow-md py-4">
        <img src={Logo} alt="Milan Pilates Logo" className="h-16 mr-4" />
        <h1 className="text-xl font-bold text-primary">Milan Pilates</h1>
      </header>

      <main className="pb-20 p-4">{renderPage()}</main>

      {employee && (
        <nav className="fixed bottom-0 right-0 left-0 bg-white shadow-md z-10">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab("home")}
              className={`p-3 flex flex-col items-center ${
                activeTab === "home" ? "text-primary" : "text-muted"
              }`}
            >
              <Home size={20} />
              <span className="text-xs mt-1">בית</span>
            </button>

            <button
              onClick={() => setActiveTab("schedule")}
              className={`p-3 flex flex-col items-center ${
                activeTab === "schedule" ? "text-primary" : "text-muted"
              }`}
            >
              <Calendar size={20} />
              <span className="text-xs mt-1">לוח שיעורים</span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`p-3 flex flex-col items-center ${
                activeTab === "bookings" ? "text-primary" : "text-muted"
              }`}
            >
              <BookOpen size={20} />
              <span className="text-xs mt-1">השיעורים שלי</span>
            </button>

            {employee?.role === "מנהל" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`p-3 flex flex-col items-center ${
                  activeTab === "admin" ? "text-secondary" : "text-muted"
                }`}
              >
                <Settings size={20} />
                <span className="text-xs mt-1">ניהול</span>
              </button>
            )}

            {employee?.role === "מדריך" && (
              <button
                onClick={() => setActiveTab("adminClasses")}
                className={`p-3 flex flex-col items-center ${
                  activeTab === "adminClasses" ? "text-secondary" : "text-muted"
                }`}
              >
                <BookOpen size={20} />
                <span className="text-xs mt-1">ניהול שיעורים</span>
              </button>
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
  );
};

export default App;
