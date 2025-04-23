import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import BackToAdminButton from "../components/BackToAdminButton";
import { useNavigate } from "react-router-dom";

/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
/**
 * TODO: תאר את הפונקציה AdminHealthDeclarations
 */
const AdminHealthDeclarations = ({ employee }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // לתצוגה מוגדלת

  useEffect(() => {
    if (!employee?.role || employee.role !== "מנהל") return;

    const fetchEmployees = async () => {
      try {
        const snapshot = await getDocs(collection(db, "employees"));
        const users = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.declarationImage);

        setEmployees(users);
      } catch (error) {
        console.error("שגיאה בטעינת משתמשים:", error);
        toast.error("אירעה שגיאה בטעינת ההצהרות");
      }
    };

    fetchEmployees();
  }, [employee]);

  if (!employee?.role || employee.role !== "מנהל") {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        אין לך הרשאה לצפות בדף זה.
      </div>
    );
  }

  // סינון לפי שם
  const filteredEmployees = employees.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">הצהרות בריאות של לקוחות</h1>
      <BackToAdminButton />

      {/* 🔍 חיפוש לפי שם */}
      <input
        type="text"
        placeholder="חפש לפי שם..."
        className="w-full mb-6 p-3 border rounded-lg shadow-sm text-right"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEmployees.length === 0 ? (
        <p className="text-center text-gray-500">לא נמצאו הצהרות תואמות.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map(user => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <p className="font-bold">שם: {user.name}</p>
              <p>טלפון: {user.phone}</p>
              <p className="text-sm text-gray-600 mb-2">
                נחתם בתאריך: {new Date(user.signedAt).toLocaleString("he-IL")}
              </p>

              <div className="overflow-hidden rounded-md border cursor-pointer">
                <img
                  src={user.declarationImage}
                  alt={`טופס של ${user.name}`}
                  className="w-full object-contain hover:scale-105 transition-transform duration-200"
                  onClick={() => setSelectedImage(user.declarationImage)}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🖼️ מודאל להצגת תמונה מוגדלת */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full relative">
            <button
              className="absolute top-2 left-2 text-red-500 font-bold text-lg"
              onClick={() => setSelectedImage(null)}
            >
              ✖ סגור
            </button>

            <img
              src={selectedImage}
              alt="תמונה מוגדלת"
              className="w-full max-h-[80vh] object-contain mb-4"
            />

            <a
              href={selectedImage}
              download="health-declaration.png"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 block w-fit mx-auto"
            >
              הורד תמונה
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHealthDeclarations;
