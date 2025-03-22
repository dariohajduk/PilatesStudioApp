import React from "react";

const AdminDashboard = ({ employee }) => {
  if (!employee) {
    return (
      <div className="p-4 text-center text-red-500">
        אין גישה! התחבר מחדש.
      </div>
    );
  }

  const isManager = employee.role === "מנהל";

  return (
    <div className="p-4 pt-24 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        ניהול מערכת
      </h1>

      {/* למנהל בלבד - 3 כפתורים */}
      {isManager && (
        <div className="flex flex-col gap-6 items-center">
          <button
            onClick={() => console.log("ניהול משתמשים")}
            className="w-64 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg shadow"
          >
            ניהול משתמשים (לקוחות)
          </button>

          <button
            onClick={() => console.log("ניהול מדריכים")}
            className="w-64 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 rounded-lg shadow"
          >
            ניהול מדריכים
          </button>

          <button
            onClick={() => console.log("ניהול שיעורים")}
            className="w-64 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg shadow"
          >
            ניהול שיעורים
          </button>
        </div>
      )}

      {/* במדריך - רק ניהול שיעורים */}
      {!isManager && (
        <div className="flex flex-col items-center">
          <button
            onClick={() => console.log("ניהול שיעורים")}
            className="w-64 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg shadow"
          >
            ניהול שיעורים
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
