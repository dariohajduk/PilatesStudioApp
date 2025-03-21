import React, { useState } from 'react';
import AdminUsersPanel from './AdminUsersPanel';
import AdminInstructorsPanel from './AdminInstructorsPanel';
import AdminClassesPanel from './AdminClassesPanel';

const AdminDashboard = ({ employee }) => {
  const [selectedPanel, setSelectedPanel] = useState('');

  if (employee?.role !== 'מנהל') {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלי מערכת.</p>
      </div>
    );
  }

  const renderPanel = () => {
    switch (selectedPanel) {
      case 'users':
        return <AdminUsersPanel employee={employee} />;
      case 'instructors':
        return <AdminInstructorsPanel employee={employee} />;
      case 'classes':
        return <AdminClassesPanel employee={employee} />;
      default:
        return (
          <div className="grid gap-4">
            <h1 className="text-2xl font-bold mb-4">ניהול מערכת</h1>

            <button
              onClick={() => setSelectedPanel('users')}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              ניהול משתמשים (לקוחות)
            </button>

            <button
              onClick={() => setSelectedPanel('instructors')}
              className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
            >
              ניהול מדריכים
            </button>

            <button
              onClick={() => setSelectedPanel('classes')}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              ניהול שיעורים
            </button>
          </div>
        );
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {selectedPanel ? (
        <div>
          <button
            onClick={() => setSelectedPanel('')}
            className="mb-4 text-blue-600 underline"
          >
            ← חזור למסך הניהול הראשי
          </button>
          {renderPanel()}
        </div>
      ) : (
        renderPanel()
      )}
    </div>
  );
};

export default AdminDashboard;
