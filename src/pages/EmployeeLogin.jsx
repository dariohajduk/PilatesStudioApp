import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const EmployeeLogin = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!phone || phone.length < 10) {
      setError("אנא הזן מספר טלפון תקין");
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "Users", phone);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("משתמש לא נמצא במערכת");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();
      console.log("🚀 userData:", userData);

      let role = "לקוח";
      if (userData.isAdmin) {
        role = "מנהל";
      } else if (userData.isInstructor) {
        role = "מדריך";
      }

      console.log(`🎯 תפקיד מזוהה: ${role}`);
      const requiresHealthDeclaration = !userData.isAdmin && !userData.isInstructor;
      console.log(`🎯 דרישת הצהרת בריאות: ${requiresHealthDeclaration}`);
      onLogin({
        phone: phone,
        role: role,
        name: userData.name || "",
        requiresHealthDeclaration,
      });

    } catch (err) {
      console.error("❌ שגיאה בהתחברות:", err);
      setError("שגיאה בשרת, נסה שוב מאוחר יותר");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 overflow-hidden">
      <img
        src={Logo}
        alt="Milan Pilates Logo Background"
        className="absolute top-0 left-0 right-0 mx-auto opacity-10 max-w-xs md:max-w-md lg:max-w-lg pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative z-10">
        <img
          src={Logo}
          alt="Milan Pilates Logo"
          className="h-24 md:h-32 mb-4 mt-4"
        />

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          התחברות למערכת
        </h2>

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
            disabled={loading}
            className={`w-full py-2 rounded text-lg font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "מתחבר..." : "התחבר"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
