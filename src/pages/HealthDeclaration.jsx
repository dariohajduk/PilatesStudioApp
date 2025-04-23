import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import html2canvas from "html2canvas";

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
const HealthDeclaration = ({ employee, onDone }) => {
  const sigCanvas = useRef(null);
  const declarationRef = useRef(null); // עוטף את כל הטופס
  const [isSubmitting, setIsSubmitting] = useState(false);

  // בדיקה אם זה לקוח
  const isClient = employee && !employee.isAdmin && !employee.isInstructor;

  useEffect(() => {
    if (!isClient) {
      toast("⚠️ רק לקוח צריך למלא את טופס ההצהרה", { icon: "ℹ️" });
    }
  }, [isClient]);

  // שליחת הטופס ושמירה ל־Firestore
  const handleSubmit = async () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert("אנא חתום לפני שליחה.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. צילום כל הטופס
      const canvas = await html2canvas(declarationRef.current, {
        useCORS: true,
        scale: 2,
      });

      const fullFormDataUrl = canvas.toDataURL("image/png");

      // 2. שמירת החתימה בנפרד (אם תרצה בעתיד להשתמש)
      const signatureDataUrl = sigCanvas.current.toDataURL();

      // 3. שמירה ל-Firestore
      const userRef = doc(db, "employees", employee.phone);
      await setDoc(
        userRef,
        {
          name: employee.name,
          phone: employee.phone,
          signature: signatureDataUrl,
          declarationImage: fullFormDataUrl,
          signedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      toast.success("הטופס נשלח ונשמר בהצלחה!");
      if (onDone) onDone();
    } catch (error) {
      console.error("שגיאה בשליחה:", error);
      toast.error("שגיאה בשמירת ההצהרה");
    }

    setIsSubmitting(false);
  };

  const handleClear = () => {
    sigCanvas.current.clear();
  };

  if (!isClient) return null; // ✅ לא מציג בכלל למנהל או מדריך

  return (
    <div ref={declarationRef}>
      <div className="max-w-xl mx-auto bg-white p-5 rounded-xl shadow-lg ">
        <h1 className="font-alef text-xl mb-3 text-center">טופס הצהרת בריאות</h1>
        <p className="mb-3">אני הח"מ מצהיר/ה בזאת כי:</p>
        <p className="mb-3">
          1. הנני כשיר/ה מבחינה רפואית להשתתף בפעילות גופנית בסטודיו Milan
          Pilates. 
        </p>
        <p className="mb-3">
          2. לא ניתנה לי כל הוראה רפואית להימנע מפעילות גופנית, לרבות פעילות
          מסוג פילאטיס.
        </p>
        <p className="mb-3"> 3. הנני מודע/ת לכך שההשתתפות בפעילות נעשית מרצוני החופשי
          ועל אחריותי בלבד.  </p>
        <p className="mb-3"> 5. אני מתחייב/ת להודיע לצוות הסטודיו על כל מגבלה
          רפואית, כאב, פציעה או הרגשה חריגה במהלך האימון.
        </p>
        <p className="mb-3"> 6. אני משחרר/ת את
          הסטודיו, בעליו, עובדיו ונציגיו מכל אחריות במקרה של נזק גופני או נזק
          אחר, אשר ייגרם במהלך האימונים או בעקבותיהם.
        </p>

        <div className="border border-gray-300 rounded-md overflow-hidden mb-4">
          <SignatureCanvas
            penColor="black"
            canvasProps={{
              width: 300,
              height: 150,
              className: "bg-gray-100 w-full",
            }}
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
    </div>
  );
};

export default HealthDeclaration;
