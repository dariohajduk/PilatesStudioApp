import React from "react";
import Logo from "../assets/logo.png";

/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
/**
 * TODO: תאר את הפונקציה MainLayout
 */
const MainLayout = ({ children, employee }) => {
  const userName = employee?.name || "משתמש";
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
        {/* התוכן המרכזי */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;