import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const HealthDeclaration = ({ employee, setEmployee, onDone }) => {
  const sigCanvas = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // שמירת החתימה ל-Firestore
  const saveSignatureToFirestore = async (signatureDataUrl) => {
    try {
      const userRef = doc(db, "employees", employee.phone);
      await setDoc(
        userRef,
        {
          name: employee.name,
          phone: employee.phone,
          signature: signatureDataUrl,
          signedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      toast.success("החתימה נשמרה בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשמירת החתימה:", error);
      toast.error("אירעה שגיאה בשמירת החתימה");
    }
  };

  const handleSubmit = async () => {
    if (sigCanvas.current.isEmpty()) {
      toast.error("נא לחתום לפני השליחה");
      return;
    }

    setIsSubmitting(true);

    try {
      // יצירת Data URL מהחתימה ושמירה ב-Firestore
      const signatureData = sigCanvas.current.getCanvas().toDataURL("image/png");
      await saveSignatureToFirestore(signatureData);

      onDone(); // חזרה לדף הבית
    } catch (err) {
      console.error("שגיאה בשליחה:", err);
      toast.error("אירעה שגיאה בשליחת הטופס");
    }

    setIsSubmitting(false);
  };

  const handleClear = () => {
    sigCanvas.current.clear();
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">טופס הצהרת בריאות</h1>
      <p className="mb-4">אנא חתום/מי למטה ושלח את הטופס</p>

      <div className="border border-gray-300 rounded-md overflow-hidden mb-4">
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 300, height: 150, className: "bg-gray-100 w-full" }}
          ref={sigCanvas}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        >
          נקה חתימה
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "שולח..." : "שלח טופס"}
        </button>
      </div>
    </div>
  );
};

export default HealthDeclaration;
