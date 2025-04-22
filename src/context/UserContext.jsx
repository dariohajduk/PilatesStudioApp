// context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const UserContext = createContext();

export const UserProvider = ({ employee, children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!employee?.phone) return;
      try {
        const userRef = doc(db, 'Users', employee.phone);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      } catch (error) {
        console.error('❌ שגיאה בטעינת userData מה־Context:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [employee?.phone]);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
