import React, { useState, useEffect } from "react";
import SplashScreen from "./pages/SplashScreen"; // הספלש שלך
import HomePage from "./pages/HomePage";
import SchedulePage from "./pages/SchedulePage";
import BookingsPage from "./pages/BookingsPage";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminClassesPanel from "./pages/AdminClassesPanel";
import Logo from "./assets/logo.png"; // נתיב ללוגו

import { Home, Calendar, BookOpen, LogOut, Settings } from "lucide-react";

const App = () => {
  // סטייט טעינה - True ברירת מחדל (מציג ספלש)
  const [loading, setLoading] = useState(true);

  // סטייטים רגילים
  const [activeTab, setActiveTab] = useState("home");
  const [employee, setEmployee] = useState(null);

  // ✅ מפעיל את הספלש סקרין עם טיימר של 2 שניות
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("✅ טעינה הסתיימה - הצגת אפליקציה");
      setLoading(false);
    }, 2000); // שניות להצגת הספלש

    return () => clearTimeout(timer);
  }, []);

  // ✅ טעינת נתוני משתמש מה-localStorage
  useEffect(() => {
    const storedPhone = localStorage.getItem("employeePhone");
    const storedRole = localStorage.getItem("employeeRole");

    if (storedPhone && storedRole) {
      console.log("📲 התחברות אוטומטית:", storedPhone);
      setEmployee({ phone: storedPhone, role: storedRole });
    }
  }, []);

  // ✅ אם עדיין בטעינה - מציגים SplashScreen בלבד
  if (loading) {
    return <SplashScreen />;
  }

  // ✅ לוגיקה אחרי טעינה - אפליקציה רגילה
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
        return <AdminPanel employee={employee} />;
      case "adminClasses":
        return <AdminClassesPanel employee={employee} />;
      default:
        return <HomePage employee={employee} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text" dir="rtl">
      {/* ✅ כותרת עליונה עם הלוגו */}
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
              <>
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`p-3 flex flex-col items-center ${
                    activeTab === "admin" ? "text-secondary" : "text-muted"
                  }`}
                >
                  <Settings size={20} />
                  <span className="text-xs mt-1">ניהול</span>
                </button>

                <button
                  onClick={() => setActiveTab("adminClasses")}
                  className={`p-3 flex flex-col items-center ${
                    activeTab === "adminClasses"
                      ? "text-secondary"
                      : "text-muted"
                  }`}
                >
                  <BookOpen size={20} />
                  <span className="text-xs mt-1">שיעורים</span>
                </button>
              </>
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
