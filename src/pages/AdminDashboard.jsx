import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCog, ClipboardList, ShieldCheck ,AlarmClock ,UserPlus ,ListChecks} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 pt-[5px] max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        ניהול מערכת
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">ניהול לקוחות</span>
            <span className="text-sm text-blue-100">הוספה / עריכה / מחיקה</span>
          </div>
          <UserPlus size={28} />
        </button>

        <button
          onClick={() => navigate("/admin/instructors")}
          className="flex items-center justify-between bg-gradient-to-r from-purple-500 to-purple-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">ניהול מדריכים</span>
            <span className="text-sm text-purple-100">ניהול צוות מדריכים</span>
          </div>
          <UserCog size={28} />
        </button>

        <button
          onClick={() => navigate("/admin/classes")}
          className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">ניהול שיעורים</span>
            <span className="text-sm text-green-100">לוח שיעורים והזמנות</span>
          </div>
          <AlarmClock size={28} />
        </button>

        <button
          onClick={() => navigate("/admin/bookings")}
          className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">ניהול הרשמות</span>
            <span className="text-sm text-indigo-100">
              מחיקה לפי משתמש / תאריך
            </span>
          </div>
          <ClipboardList   size={28} />
        </button>

        <button
          onClick={() => navigate("/admin/declarations")}
          className="flex items-center justify-between bg-gradient-to-r from-red-500 to-red-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">הצהרות בריאות</span>
            <span className="text-sm text-red-100">צפייה בחתימות משתמשים</span>
          </div>
          <ShieldCheck size={28} />
        </button>
        <button
          onClick={() => navigate("/admin/bookings-overview")}
          className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
        >
          <div className="flex flex-col items-start text-right">
            <span className="text-lg font-bold">סטטוס נרשמים</span>
            <span className="text-sm text-blue-100">
              צפייה במשתתפים לפי שבוע
            </span>
          </div>
          <ListChecks size={28} />
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
