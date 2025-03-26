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
import AdminUsersPanel from "./pages/AdminUsersPanel";
import AdminInstructorsPanel from "./pages/AdminInstructorsPanel";
import AdminHealthDeclarations from "./pages/AdminHealthDeclarations"; // ✅ הוספה

// הצהרת בריאות
import HealthDeclaration from "./pages/HealthDeclaration";

import './fonts.css';
import Header from "./components/Header";
import { Home, Calendar, BookOpen, LogOut, Settings } from "lucide-react";

import { Toaster } from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./services/firebase";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [employee, setEmployee] = useState(null);

  // מסך פתיחה
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // טעינת משתמש מה-LocalStorage
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

  // התחברות למערכת + בדיקת הצהרת בריאות
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
  
      // ✅ רק לקוח יידרש להצהרה
      if (data.role === "לקוח" && !hasDeclaration) {
        setActiveTab("healthDeclaration");
      } else {
        setActiveTab("home");
      }
    } catch (error) {
      console.error("שגיאה בבדיקת הצהרת בריאות:", error);
      setActiveTab("healthDeclaration");
    }
  };
  

  // התנתקות
  const handleLogout = () => {
    localStorage.removeItem("employeePhone");
    localStorage.removeItem("employeeRole");
    localStorage.removeItem("employeeName");
    setEmployee(null);
    setActiveTab("home");
  };

  const renderPage = () => {
    if (!employee) return <EmployeeLogin onLogin={handleLogin} />;

    switch (activeTab) {
      case "home":
        return <HomePage employee={employee} />;
      case "schedule":
        return <SchedulePage employee={employee} />;
      case "bookings":
        return <BookingsPage employee={employee} />;
      case "admin":
        return <AdminDashboard employee={employee} setActiveTab={setActiveTab} />;
      case "manageUsers":
        return <AdminUsersPanel employee={employee} setActiveTab={setActiveTab} />;
      case "manageInstructors":
        return <AdminInstructorsPanel employee={employee} setActiveTab={setActiveTab} />;
      case "manageClasses":
        return <AdminClassesPanel employee={employee} setActiveTab={setActiveTab} />;
      case "adminHealthDeclarations":
        return <AdminHealthDeclarations employee={employee} />;
      case "healthDeclaration":
        return (
          <HealthDeclaration
            employee={employee}
            setEmployee={setEmployee}
            onDone={() => setActiveTab("home")}
          />
        );
      default:
        return <HomePage employee={employee} />;
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-background text-text relative" dir="rtl">
        {employee && <Header employee={employee} />}

        <main className="pb-20 pt-[130px] p-4">{renderPage()}</main>

        {employee && (
          <nav className="fixed bottom-0 right-0 left-0 bg-white shadow-md z-50">
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
    </>
  );
};

export default App;
