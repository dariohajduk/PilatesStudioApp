import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { getWeek, parse, format, getMonth } from "date-fns";
import BackToDashboardButton from "../components/BackToDashboardButton";

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
const AdminCancellationsPage = () => {
  const [cancellationsByGroup, setCancellationsByGroup] = useState({});
  const [filterType, setFilterType] = useState("week");
  const [loading, setLoading] = useState(true);
  const [usersMap, setUsersMap] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [usersWithCancellations, setUsersWithCancellations] = useState([]);

  useEffect(() => {
    const fetchCancellations = async () => {
      const snapshot = await getDocs(collection(db, "cancellations"));
      const allUsers = await getDocs(collection(db, "Users"));
      const usersMapTemp = {};
      const usersInCancellations = new Set();

      allUsers.forEach((doc) => {
        usersMapTemp[doc.id] = doc.data().name || "לא ידוע";
      });

      const grouped = {};

      snapshot.docs.forEach((docSnap) => {
        const cancellation = docSnap.data();
        if (!cancellation.date) return;

        usersInCancellations.add(cancellation.userId);
        if (selectedUser && cancellation.userId !== selectedUser) return;

        const dateObj = parse(cancellation.date, "dd/MM/yyyy", new Date());
        const year = dateObj.getFullYear();
        let groupKey = "";

        if (filterType === "week") {
          const weekNum = getWeek(dateObj, { weekStartsOn: 0 });
          groupKey = `${year}-W${weekNum}`;
        } else if (filterType === "month") {
          groupKey = `${year}-${getMonth(dateObj) + 1}`;
        } else {
          groupKey = format(dateObj, "dd/MM/yyyy");
        }

        if (!grouped[groupKey]) grouped[groupKey] = [];

        grouped[groupKey].push({
          ...cancellation,
          userName: usersMapTemp[cancellation.userId] || "לא ידוע",
          cancelledAtFormatted:
            cancellation.cancelledAt && typeof cancellation.cancelledAt.toDate === "function"
              ? cancellation.cancelledAt.toDate().toLocaleString("he-IL")
              : typeof cancellation.cancelledAt === "string"
              ? new Date(cancellation.cancelledAt).toLocaleString("he-IL")
              : "לא ידוע",
        });
      });

      setUsersMap(usersMapTemp);
      setUsersWithCancellations(Array.from(usersInCancellations));
      setCancellationsByGroup(grouped);
      setLoading(false);
    };

    fetchCancellations();
  }, [filterType, selectedUser]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-red-700 mb-4 text-center">
        ביטולים לפי מתאמן
      </h1>

      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <BackToDashboardButton />
        <div className="flex gap-2 items-center">
          <select
            className="border p-2 rounded text-sm"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setLoading(true);
            }}
          >
            <option value="week">שבועי</option>
            <option value="month">חודשי</option>
            <option value="day">יומי</option>
          </select>

          <select
            className="border p-2 rounded text-sm"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setLoading(true);
            }}
          >
            <option value="">כל המשתמשים</option>
            {usersWithCancellations
              .map((id) => ({ id, name: usersMap[id] || "לא ידוע" }))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center">טוען נתונים...</p>
      ) : (
        Object.entries(cancellationsByGroup)
          .sort(([a], [b]) => {
            const parseKey = (key) => {
              if (filterType === "week") {
                const [year, week] = key.split("-W").map(Number);
                return new Date(year, 0, 1 + (week - 1) * 7);
              }
              if (filterType === "month") {
                const [year, month] = key.split("-").map(Number);
                return new Date(year, month - 1, 1);
              }
              return parse(key, "dd/MM/yyyy", new Date());
            };

            return parseKey(a) - parseKey(b);
          })
          .map(([groupKey, cancellations]) => (
            <div
              key={groupKey}
              className="mb-6 bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                {filterType === "week"
                  ? `שבוע מספר ${groupKey.split("-W")[1]}`
                  : filterType === "month"
                  ? `חודש ${groupKey.split("-")[1]}`
                  : `תאריך ${groupKey}`}
              </h2>
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-center">
                    <th className="p-2 border">תאריך</th>
                    <th className="p-2 border">שעה</th>
                    <th className="p-2 border">מתאמן</th>
                    <th className="p-2 border">סיבת ביטול</th>
                    <th className="p-2 border">זמן ביטול</th>
                  </tr>
                </thead>
                <tbody>
                  {cancellations.map((c, i) => (
                    <tr key={i} className="text-center">
                      <td className="border p-1">{c.date}</td>
                      <td className="border p-1">{c.time || "לא ידוע"}</td>
                      <td className="border p-1">{c.userName}</td>
                      <td className="border p-1">{c.reason || "—"}</td>
                      <td className="border p-1">{c.cancelledAtFormatted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
      )}
    </div>
  );
};

export default AdminCancellationsPage;