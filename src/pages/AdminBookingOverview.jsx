import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { getWeek, parse, format, getMonth, isAfter } from "date-fns";
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
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
/**
 * TODO: תאר את הפונקציה AdminBookingOverview
 */
const AdminBookingOverview = () => {
  const [bookingsByGroup, setBookingsByGroup] = useState({});
  const [filterType, setFilterType] = useState("week");
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const allUsers = await getDocs(collection(db, "Users"));
      const usersMap = {};

      allUsers.forEach((doc) => {
        usersMap[doc.id] = doc.data().name || "לא ידוע";
      });

      const grouped = {};
      const today = new Date();

      snapshot.docs.forEach((docSnap) => {
        const booking = docSnap.data();

        if (!booking.date) return;

        const dateObj = parse(booking.date, "dd/MM/yyyy", new Date());

        // סינון לפי האם נציג היסטוריה
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0); // אפס את השעה לצורך השוואה מדויקת
        if (!showHistory && dateObj < todayDate) return;
        
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
          ...booking,
          userName: usersMap[booking.userId] || "לא ידוע",
          className:
            typeof booking.name === "string" && booking.name.trim() !== ""
              ? booking.name
              : "לא ידוע",
          registeredAtFormatted:
            booking.createdAt && typeof booking.createdAt.toDate === "function"
              ? booking.createdAt.toDate().toLocaleString("he-IL")
              : typeof booking.createdAt === "string"
              ? new Date(booking.createdAt).toLocaleString("he-IL")
              : "לא ידוע",
        });
      });

      setBookingsByGroup(grouped);
      setLoading(false);
    };

    fetchBookings();
  }, [filterType, showHistory]);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        סטטוס נרשמים לשיעורים (
        {filterType === "week"
          ? "שבועי"
          : filterType === "month"
          ? "חודשי"
          : "יומי"}
        )
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

          <button
            onClick={() => {
              setShowHistory((prev) => !prev);
              setLoading(true);
            }}
            className="text-sm px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
          >
            {showHistory ? "הצג עתידי בלבד" : "הצג גם היסטוריה"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center">טוען נתונים...</p>
      ) : (
        Object.entries(bookingsByGroup)
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
          .map(([groupKey, bookings]) => (
            <div
              key={groupKey}
              className="mb-6 bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
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
                    <th className="p-2 border">שיעור</th>
                    <th className="p-2 border">מתאמן</th>
                    <th className="p-2 border">זמן הרשמה</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i} className="text-center">
                      <td className="border p-1">{b.date}</td>
                      <td className="border p-1">{b.time || "לא ידוע"}</td>
                      <td className="border p-1">{b.className}</td>
                      <td className="border p-1">{b.userName}</td>
                      <td className="border p-1">{b.registeredAtFormatted}</td>
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

export default AdminBookingOverview;
