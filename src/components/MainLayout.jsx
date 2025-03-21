import React from 'react';
import Logo from '../assets/logo.png';

const MainLayout = ({ children, employee }) => {
  const userName = employee?.name || 'משתמש';
  const firstLetter = userName.charAt(0);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* רקע עם הלוגו בשקיפות */}
      <div className="absolute inset-0 opacity-10 flex justify-center items-center pointer-events-none z-0">
        <img
          src={Logo}
          alt="Background Logo"
          className="w-3/4 h-auto object-contain"
        />
      </div>

      {/* תוכן הדף */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* כותרת עליונה */}
        <header className="flex justify-end items-center bg-white bg-opacity-90 shadow p-4">
          <div className="flex items-center gap-3">
            {/* שם המשתמש */}
            <span className="font-semibold text-gray-800">{userName}</span>

            {/* עיגול עם האות הראשונה */}
            <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {firstLetter}
            </div>
          </div>
        </header>

        {/* התוכן המרכזי */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
