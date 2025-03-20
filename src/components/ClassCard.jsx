
import React from 'react';
import { Calendar, Clock, User, Users } from 'lucide-react';

const ClassCard = ({ classInfo, isBooking }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-md text-black dark:text-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{classInfo.name}</h3>
        {!isBooking && (
          <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600">הזמן מקום</button>
        )}
      </div>
      <div className="flex items-center mb-1">
        <User size={16} className="ml-2" />
        <span>{classInfo.instructor}</span>
      </div>
      <div className="flex items-center mb-1">
        <Clock size={16} className="ml-2" />
        <span>{classInfo.time}</span>
      </div>
      <div className="flex items-center">
        <Calendar size={16} className="ml-2" />
        <span>{classInfo.date}</span>
      </div>
      {!isBooking && (
        <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
          <Users size={16} className="ml-2" />
          <span>{classInfo.spots} מקומות פנויים</span>
        </div>
      )}
      {isBooking && (
        <button className="mt-2 text-red-500 text-sm hover:text-red-700">בטל הזמנה</button>
      )}
    </div>
  );
};

export default ClassCard;
