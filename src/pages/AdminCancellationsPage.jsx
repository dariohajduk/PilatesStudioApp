// ✅ עמוד ניהול ביטולים - כולל תצוגה רספונסיבית, חיפוש, עריכה ומחיקה עם הערות הסבר

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { Popover } from "@headlessui/react";
import { FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";

import {
  getWeek,
  parse,
  format,
  getMonth,
  formatDistanceToNow,
} from "date-fns";
import BackToDashboardButton from "../components/BackToDashboardButton";
import toast from "react-hot-toast";

    
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
/**
 * TODO: תאר את הפונקציה AdminCancellationsPage
 */
const AdminCancellationsPage = () => {
  // סטייטים כלליים
  const [cancellationsByGroup, setCancellationsByGroup] = useState({}); // ביטולים מחולקים לקבוצות תצוגה
  const [filterType, setFilterType] = useState("week"); // סוג תצוגה נבחר
  const [loading, setLoading] = useState(true); // מצב טעינה
  const [usersMap, setUsersMap] = useState({}); // מיפוי מזהה משתמש לשם
  const [selectedUser, setSelectedUser] = useState(""); // משתמש מסונן
  const [usersWithCancellations, setUsersWithCancellations] = useState([]); // משתמשים שיש להם ביטולים
  const [searchTerm, setSearchTerm] = useState(""); // מונח חיפוש
  const [selectedCancellationId, setSelectedCancellationId] = useState(null); // מזהה לביטול פעיל
  const [showDeleteModal, setShowDeleteModal] = useState(false); // הצגת מודל מחיקה

  // שליפת הנתונים מ-Firestore וקיבוץ לפי תאריך שיעור
  useEffect(() => {
    const fetchCancellations = async () => {
      const snapshot = await getDocs(collection(db, "cancellations"));
      const allUsers = await getDocs(collection(db, "Users"));
      const usersMapTemp = {};
      const usersInCancellations = new Set();
      const grouped = {};

      allUsers.forEach((doc) => {
        usersMapTemp[doc.id] = doc.data().name || "לא ידוע";
      });

      snapshot.docs.forEach((docSnap) => {
        const cancellation = docSnap.data();
        const id = docSnap.id;
        if (!cancellation.date) return;
        const lessonDate = parse(cancellation.date, "dd/MM/yyyy", new Date());
        const year = lessonDate.getFullYear();
        let groupKey = "";
        if (filterType === "week") {
          const weekNum = getWeek(lessonDate, { weekStartsOn: 0 });
          groupKey = `${year}-W${weekNum}`;
        } else if (filterType === "month") {
          groupKey = `${year}-${getMonth(lessonDate) + 1}`;
        } else {
          groupKey = format(lessonDate, "dd/MM/yyyy");
        }
        if (!grouped[groupKey]) grouped[groupKey] = [];
        grouped[groupKey].push({
          ...cancellation,
          id,
          userName: usersMapTemp[cancellation.userId] || "לא ידוע",
          cancelledAtFormatted: cancellation.cancelledAt?.toDate?.()
            ? cancellation.cancelledAt.toDate().toISOString()
            : null,
          timeForSort: cancellation.time || "",
          lessonDateObj: lessonDate,
        });
        usersInCancellations.add(cancellation.userId);
      });

      Object.keys(grouped).forEach((key) => {
        grouped[key].sort((a, b) => {
          const d1 = parse(
            `${a.date} ${a.timeForSort}`,
            "dd/MM/yyyy HH:mm",
            new Date()
          );
          const d2 = parse(
            `${b.date} ${b.timeForSort}`,
            "dd/MM/yyyy HH:mm",
            new Date()
          );
          return d2 - d1;
        });
      });

      setUsersMap(usersMapTemp);
      setUsersWithCancellations(Array.from(usersInCancellations));
      setCancellationsByGroup(grouped);
      setLoading(false);
    };

    fetchCancellations();
  }, [filterType, selectedUser]);

  // סינון תוצאות לפי שם או סיבה
  const filteredResults = (cancellations) =>
    cancellations.filter(
      (c) =>
        c.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.reason || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

  // ✅ פונקציית עריכה בסיסית לסיבה
  const handleEditReason = async (id, currentReason) => {
    const newReason = prompt("ערוך את סיבת הביטול:", currentReason || "");
    if (!newReason || newReason === currentReason) return;
    try {
      await updateDoc(doc(db, "cancellations", id), { reason: newReason });
      toast.success("עודכן");
      setCancellationsByGroup((prev) => {
        const updated = { ...prev };
        for (const group in updated) {
          updated[group] = updated[group].map((c) =>
            c.id === id ? { ...c, reason: newReason } : c
          );
        }
        return updated;
      });
    } catch (err) {
      toast.error("שגיאה בעדכון");
    }
  };

  // ✅ מחיקה מלאה של הביטול
  const handleDeleteCancellation = async (id) => {
    if (!confirm("האם למחוק את הביטול?")) return;
    try {
      await deleteDoc(doc(db, "cancellations", id));
      toast.success("נמחק");
      setCancellationsByGroup((prev) => {
        const updated = {};
        for (const group in prev) {
          const filtered = prev[group].filter((c) => c.id !== id);
          if (filtered.length) updated[group] = filtered;
        }
        return updated;
      });
    } catch (err) {
      toast.error("שגיאה במחיקה");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* כותרת וסרגל עליון */}
      <h1 className="text-2xl font-bold text-red-700 mb-4 text-center">
        ביטולים לפי מתאמן
      </h1>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <BackToDashboardButton />
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <select
            className="border p-2 rounded text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="week">שבועי</option>
            <option value="month">חודשי</option>
            <option value="day">יומי</option>
          </select>
          <select
            className="border p-2 rounded text-sm"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">כל המשתמשים</option>
            {usersWithCancellations.map((id) => (
              <option key={id} value={id}>
                {usersMap[id] || "לא ידוע"}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="חיפוש לפי שם או סיבה..."
            className="border p-2 rounded text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* תצוגת התוכן */}
      {loading ? (
        <p className="text-center">טוען נתונים...</p>
      ) : (
        Object.entries(cancellationsByGroup).map(
          ([groupKey, cancellations]) => (
            <div key={groupKey} className="mb-6">
              <h2 className="text-lg font-semibold text-red-800 mb-2">
                {filterType === "week"
                  ? `שבוע מספר ${groupKey.split("-W")[1]}`
                  : filterType === "month"
                  ? `חודש ${groupKey.split("-")[1]}`
                  : `תאריך ${groupKey}`}
              </h2>

              {/* טבלה לדסקטופ */}
              <div className="hidden md:block">
                <table className="w-full text-sm border">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 text-center">
                      <th className="p-2 border">תאריך</th>
                      <th className="p-2 border">שעה</th>
                      <th className="p-2 border">מתאמן</th>
                      <th className="p-2 border">סיבה</th>
                      <th className="p-2 border">לפני כמה זמן</th>
                      <th className="p-2 border">פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults(cancellations).map((c) => (
                      <tr
                        key={c.id}
                        className="text-center hover:bg-gray-50 transition border-t"
                      >
                        <td className="p-2">{c.date}</td>
                        <td className="p-2">{c.time || "—"}</td>
                        <td className="p-2 font-semibold text-blue-700">
                          {c.userName}
                        </td>
                        <td className="p-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${
                              c.reason?.includes("רפואי")
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {c.reason || "—"}
                          </span>
                        </td>
                        <td className="p-2 text-xs text-gray-500">
                          {c.cancelledAtFormatted
                            ? formatDistanceToNow(
                                new Date(c.cancelledAtFormatted),
                                { addSuffix: true }
                              )
                            : "—"}
                        </td>
                        <td className="p-2 flex gap-2 justify-center">
                          <Popover className="relative">
                            <Popover.Button className="text-gray-500 hover:text-gray-800">
                              <FiMoreVertical />
                            </Popover.Button>
                            <Popover.Panel className="absolute z-10 right-0 mt-2 w-28 bg-white border rounded shadow">
                              <div className="flex flex-col text-right text-sm">
                                <button
                                  onClick={() =>
                                    handleEditReason(c.id, c.reason)
                                  }
                                  className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <FiEdit2 /> ערוך
                                </button>
                                <button
                                  onClick={() => handleDeleteCancellation(c.id)}
                                  className="px-3 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                                >
                                  <FiTrash2 /> מחק
                                </button>
                              </div>
                            </Popover.Panel>
                          </Popover>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* כרטיסים למובייל */}
              <div className="md:hidden space-y-4">
                {filteredResults(cancellations).map((c) => (
                  <div
                    key={c.id}
                    className="border rounded-lg shadow p-3 bg-white flex flex-col gap-1"
                  >
                    <div className="text-sm font-semibold text-blue-800">
                      {c.userName}
                      <div className="flex justify-end top-2">
                      <Popover className="relative">
                        <Popover.Button className="text-gray-500 hover:text-gray-800">
                          <FiMoreVertical />
                        </Popover.Button>
                        <Popover.Panel className="absolute z-10 left-0 mt-1 w-28 bg-white border rounded shadow">
                          <div className="flex flex-col text-right text-sm">
                            <button
                              onClick={() => handleEditReason(c.id, c.reason)}
                              className="px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                            >
                              <FiEdit2 /> ערוך
                            </button>
                            <button
                              onClick={() => handleDeleteCancellation(c.id)}
                              className="px-3 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2"
                            >
                              <FiTrash2 /> מחק
                            </button>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    </div>
                      
                    </div>
                    <div className="text-xs">
                      📅 {c.date} | 🕒 {c.time || "—"}
                    </div>
                    <div className="text-xs">📝 {c.reason || "—"}</div>
                    <div className="text-xs text-gray-500">
                      ⏱{" "}
                      {c.cancelledAtFormatted
                        ? formatDistanceToNow(
                            new Date(c.cancelledAtFormatted),
                            { addSuffix: true }
                          )
                        : "—"}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default AdminCancellationsPage;
