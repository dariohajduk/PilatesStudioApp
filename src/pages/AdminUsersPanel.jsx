import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';

const AdminUsersPanel = ({ employee }) => {
  const [users, setUsers] = useState([]);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [membershipType, setMembershipType] = useState('');
  const [weeklyLimit, setWeeklyLimit] = useState(0);
  const [monthlyLimit, setMonthlyLimit] = useState(0);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Users'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('❌ שגיאה בטעינת המשתמשים:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!phone || !name || !membershipType) {
      setMessage('נא למלא שם, טלפון וסוג מנוי');
      return;
    }

    try {
      const userRef = doc(db, 'Users', phone);
      await setDoc(userRef, {
        id: phone,
        name,
        phone,
        membershipType,
        weeklyLimit: parseInt(weeklyLimit),
        monthlyLimit: parseInt(monthlyLimit),
        remainingLessons: parseInt(weeklyLimit),
        completedLessons: 0,
        joinDate: new Date().toISOString(),
        isAdmin: false
      });

      setMessage('✔️ משתמש נוסף בהצלחה!');
      setPhone('');
      setName('');
      setMembershipType('');
      setWeeklyLimit(0);
      setMonthlyLimit(0);
      fetchUsers();
    } catch (error) {
      console.error('❌ שגיאה בהוספת משתמש:', error);
      setMessage('שגיאה בהוספת משתמש');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'Users', userId));
      setMessage('🗑️ משתמש נמחק');
      fetchUsers();
    } catch (error) {
      console.error('❌ שגיאה במחיקת משתמש:', error);
      setMessage('שגיאה במחיקה');
    }
  };

  const filteredUsers = users.filter(
    user => user.name.includes(search) || user.phone.includes(search)
  );

  if (employee?.role !== 'מנהל') {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ניהול משתמשים (לקוחות)</h1>

      <div className="mb-6 grid gap-3">
        <input
          type="tel"
          placeholder="מספר טלפון"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <input
          type="text"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <select
          value={membershipType}
          onChange={(e) => setMembershipType(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        >
          <option value="">בחר סוג מנוי</option>
          <option value="חודשי">חודשי</option>
          <option value="שבועי">שבועי</option>
          <option value="כרטיסייה">כרטיסייה</option>
        </select>

        <input
          type="number"
          placeholder="מגבלת שיעורים שבועית"
          value={weeklyLimit}
          onChange={(e) => setWeeklyLimit(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <input
          type="number"
          placeholder="מגבלת שיעורים חודשית"
          value={monthlyLimit}
          onChange={(e) => setMonthlyLimit(e.target.value)}
          className="block w-full p-2 border rounded text-black"
        />

        <button
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          הוסף משתמש
        </button>

        {message && <p className="mt-3 text-green-600">{message}</p>}
      </div>

      <input
        type="text"
        placeholder="חפש לפי שם או טלפון"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full p-2 mb-4 border rounded text-black"
      />

      <div>
        <h2 className="text-lg font-bold mb-2">רשימת משתמשים</h2>
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id} className="flex justify-between items-center p-2 border-b">
              <div>
                <p><strong>{user.name}</strong> ({user.phone})</p>
                <p>מנוי: {user.membershipType} | שבועי: {user.weeklyLimit} | חודשי: {user.monthlyLimit}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
              >
                מחק
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminUsersPanel;
