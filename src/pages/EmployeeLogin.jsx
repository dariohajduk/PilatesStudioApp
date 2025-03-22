import React, { useState } from "react";
import Logo from "../assets/logo.png";

const EmployeeLogin = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      setError("אנא הזן מספר טלפון תקין");
      return;
    }

    const data = {
      phone,
      role: "מדריך", // או "מנהל" אם תרצה להרחיב בהמשך
    };

    onLogin(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        
        {/* לוגו */}
        <img
          src={Logo}
          alt="Milan Pilates Logo"
          className="h-24 md:h-32 mb-4 mt-4"
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          התחברות למערכת
        </h2>

        {/* טופס התחברות */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              מספר טלפון:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400 text-right"
              placeholder="הזן מספר טלפון"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200 text-lg font-semibold"
          >
            התחבר
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
