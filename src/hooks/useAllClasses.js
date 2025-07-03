import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";

const useAllClasses = () => {
  const [allClasses, setAllClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "classes"));
        const classesWithId = snapshot.docs.map((doc) => ({
          id: doc.id,              // ✅ מוסיף את מזהה המסמך
          ...doc.data(),
        }));
        setAllClasses(classesWithId);
      } catch (error) {
        console.error("שגיאה בטעינת שיעורים:", error);
        setAllClasses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { allClasses, loading };
};

export default useAllClasses;
