// ✅ גרסה מתוקנת של ClassCard.jsx עם Tooltip פנימי עובד וטעינת משתתפים תקינה
import React, { useState, useEffect, useRef, useMemo } from "react";
import { db } from "../services/firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { FiX, FiSearch, FiCheck, FiUsers } from "react-icons/fi";
import { Tooltip } from "react-tooltip";

const ClassCard = ({
  classInfo,
  employee,
  userData,
  isAlreadyBooked,
  refreshBookings,
  isPastClass,
  customers = [],
  isAdmin = false,
}) => {
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const [showUserSelector, setShowUserSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const searchInputRef = useRef(null);

/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
  const isAdminOrInstructor = useMemo(() => {
    return (
      userData?.role === "admin" ||
      userData?.role === "instructor" ||
      userData?.role === "מנהל" ||
      userData?.role === "מדריך" ||
      userData?.isAdmin === true ||
      userData?.isInstructor === true
    );
  }, [userData]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const q = query(
          collection(db, "bookings"),
          where("classId", "==", classInfo.id)
        );
        const snapshot = await getDocs(q);
        const userIds = snapshot.docs.map((doc) => doc.data().userId);

        const fullParticipants = await Promise.all(
          userIds.map(async (uid) => {
            const userSnap = await getDoc(doc(db, "Users", uid));
            const user = userSnap.data();
            return {
              id: uid,
              name: user?.name || "לא ידוע",
              phone: uid,
            };
          })
        );

        setParticipants(fullParticipants);
      } catch (error) {
        console.error("שגיאה בטעינת משתתפים:", error);
      }
    };

    fetchParticipants();
  }, [classInfo.id]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    if (!term.trim()) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        (c) => c.name?.toLowerCase().includes(term) || c.phone?.includes(term)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm, customers]);

  const renderParticipantsTooltip = () => {
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
        <span>רשומים: {participants.length}</span>
        <div
          data-tooltip-id={`tooltip-${classInfo.id}`}
          data-tooltip-html={
            participants.length > 0
              ? `
        <div dir="rtl">
          <strong>נרשמו ${participants.length} מתאמנים:</strong><br/>
          <ul style="padding-right: 1rem; margin-top: 4px">
            ${participants
              .map((p) => {
                const isMe = p.phone === employee?.phone;
                return `<li>${p.name} ${isMe ? "🎯" : "✅"}</li>`;
              })
              .join("")}
          </ul>
        </div>
        `
              : "עדיין לא נרשמו מתאמנים"
          }
          className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
        >
          <FiUsers size={18} />
        </div>
        <Tooltip id={`tooltip-${classInfo.id}`} clickable openOnClick />
      </div>
    );
  };

  const handleBooking = async () => {
    if (!employee) {
      toast.error("❗ עליך להתחבר כדי להזמין מקום");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: employee.phone,
        classId: classInfo.id,
        name: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });
      toast.success("✔️ נרשמת בהצלחה!");
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error);
      toast.error("❌ שגיאה בהרשמה. נסה שוב");
    }
    setLoading(false);
  };

  const bookClassForUser = async (user) => {
    if (!user) {
      toast.error("❗ עליך לבחור משתמש להזמנה");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.phone,
        classId: classInfo.id,
        name: classInfo.name,
        instructor: classInfo.instructor,
        date: classInfo.date,
        time: classInfo.time,
        createdAt: new Date(),
      });
      toast.success("✔️ נרשם בהצלחה!");
      setShowUserSelector(false);
      if (refreshBookings) await refreshBookings();
    } catch (error) {
      console.error("❌ שגיאה בהרשמה:", error);
      toast.error("❌ שגיאה בהרשמה. נסה שוב");
    }
    setLoading(false);
  };

  const handleCancelBooking = async () => {
    setLoading(true);
    try {
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("userId", "==", employee.phone),
        where("classId", "==", classInfo.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        await deleteDoc(doc(db, "bookings", querySnapshot.docs[0].id));
        toast.success("✔️ ההזמנה בוטלה");
        if (refreshBookings) await refreshBookings();
      }
    } catch (error) {
      console.error("❌ שגיאה בביטול ההזמנה:", error);
      toast.error("❌ שגיאה בביטול ההזמנה");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow relative mb-4">
      <h2 className="text-lg font-bold mb-2">{classInfo.name}</h2>
      <p>מדריך: {classInfo.instructor}</p>
      <p>תאריך: {classInfo.date}</p>
      <p>שעה: {classInfo.time}</p>
      {renderParticipantsTooltip()}

      {!employee && <p className="text-red-400 mt-2">🔒 התחברות נדרשת להזמנה</p>}

      {employee && !isAlreadyBooked && !isPastClass && (
        <>
          <button
            onClick={() => {
              if (isAdminOrInstructor) {
                setShowAdminOptions(true);
              } else {
                handleBooking();
              }
            }}
            disabled={loading}
            className="mt-3 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            {loading ? "שולח בקשה..." : "הזמן מקום"}
          </button>

          {showAdminOptions && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-5 w-full max-w-sm text-center">
                <h3 className="text-lg font-bold mb-4">
                  האם ברצונך להזמין לעצמך או למתאמן אחר?
                </h3>
                <div className="flex flex-col gap-3">
                  <button
                    className="bg-blue-600 text-white py-2 rounded"
                    onClick={() => {
                      setShowAdminOptions(false);
                      handleBooking();
                    }}
                  >
                    הזמן לעצמי
                  </button>
                  <button
                    className="bg-gray-200 text-black py-2 rounded"
                    onClick={() => {
                      setShowAdminOptions(false);
                      setShowUserSelector(true);
                    }}
                  >
                    הזמן עבור מתאמן אחר
                  </button>
                  <button
                    onClick={() => setShowAdminOptions(false)}
                    className="text-sm text-gray-500 mt-2"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {employee && isAlreadyBooked && (
        <button
          onClick={handleCancelBooking}
          disabled={loading}
          className="mt-3 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white w-full"
        >
          {loading ? "מבטל..." : "בטל הזמנה"}
        </button>
      )}

      {isPastClass && <p className="text-gray-500 text-sm mt-2">🕒 השיעור הסתיים</p>}

      {showUserSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-5 w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">בחר מתאמן להזמנה</h3>
              <button
                onClick={() => setShowUserSelector(false)}
                className="text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiSearch size={18} className="text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="חפש לפי שם או טלפון..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-100 w-full pr-10 py-2 rounded border border-gray-300"
              />
            </div>

            <div className="overflow-y-auto flex-1 border rounded">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedUser(customer)}
                  className={`p-3 cursor-pointer hover:bg-gray-100 transition ${
                    selectedUser?.id === customer.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                    </div>
                    {selectedUser?.id === customer.id && (
                      <div className="text-blue-500">
                        <FiCheck size={18} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowUserSelector(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                ביטול
              </button>
              <button
                onClick={() => bookClassForUser(selectedUser)}
                disabled={!selectedUser}
                className={`px-4 py-2 rounded text-white ${
                  selectedUser ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                הזמן שיעור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassCard;
