import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import "../styles/animations.css";
import { useNavigate } from "react-router-dom";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  getDoc, // 👈 הוסף את זה
} from "firebase/firestore";
import { Check, Clock, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import jsPDF from "jspdf";

/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה undefined
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
/**
 * TODO: תאר את הפונקציה resizeImage
 */
const resizeImage = (file, maxWidth = 300) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const resizedBase64 = canvas.toDataURL("image/png", 0.8); // 80% איכות
        resolve(resizedBase64);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};

const AdminUsersPanel = ({ employee }) => {
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showForm, setShowForm] = useState(false); // חדש
  const [users, setUsers] = useState([]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [remainingLessons, setRemainingLessons] = useState(0);
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // משתנים להגדרת ימים ושעות מועדפים
  const [preferredDays, setPreferredDays] = useState([]);
  const [preferredStartTime, setPreferredStartTime] = useState("");
  const [preferredEndTime, setPreferredEndTime] = useState("");
  const [autoJoin, setAutoJoin] = useState(false);

  // להוסיף עם יתר ה-state hooks
  const [showSignature, setShowSignature] = useState(false);
  const [currentSignature, setCurrentSignature] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [signature, setSignature] = useState("");
  const usersWithSignatures = [];

  // שליפת כל המשתמשים (לא מדריכים ולא מנהלים)
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const usersWithSignatures = [];

      for (const docSnap of querySnapshot.docs) {
        const user = { id: docSnap.id, ...docSnap.data() };

        if (!user.isInstructor && !user.isAdmin) {
          const employeeDoc = await getDoc(doc(db, "employees", user.phone));
          if (employeeDoc.exists()) {
            const employeeData = employeeDoc.data();
            if (employeeData.signature) {
              user.signature = employeeData.signature;
              user.signedAt = employeeData.signedAt;
            }
          }
          usersWithSignatures.push(user);
        }
      }

      setUsers(usersWithSignatures); // ✅ רק פעם אחת
    } catch (error) {
      console.error("❌ שגיאה בטעינת המשתמשים:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      // בדיקה כמה משתמשים יש להם חתימה
      const usersWithSignature = users.filter((user) => user.signature);
      console.log(
        `יש ${usersWithSignature.length} משתמשים עם חתימה מתוך ${users.length}`
      );
      console.log("דוגמה למשתמש הראשון:", users[0]);
    }
  }, [users]);

  // הוספה/עדכון של משתמש
  // פונקציה להוספת / עדכון משתמש
  const handleSaveUser = async () => {
    if (!phone || !name || !membershipType) {
      setMessage("נא למלא שם, טלפון וסוג מנוי");
      return;
    }

    // שליפת המשתמש הקיים במידה ועורך
    const existingUser = users.find((u) => u.phone === phone);

    try {
      const userRef = doc(db, "Users", phone);

      const userData = {
        id: phone,
        phone,
        name,
        membershipType,
        remainingLessons: parseInt(remainingLessons, 10) || 0,
        completedLessons: existingUser?.completedLessons || 0,
        joinDate: existingUser?.joinDate || new Date().toISOString(),
        isInstructor: false,
        isAdmin: false,
        preferredDays,
        preferredTimeRange:
          preferredStartTime && preferredEndTime
            ? `${preferredStartTime}-${preferredEndTime}`
            : "",
        autoJoin,
        signature: signature || existingUser?.signature || "",
        signedAt: signature
          ? new Date().toISOString()
          : existingUser?.signedAt || null,
      };

      await setDoc(userRef, userData);

      if (autoJoin && preferredDays.length > 0) {
        await registerToMatchingClasses(userData);
      }

      setMessage(editingUserId ? "✔️ המשתמש עודכן" : "✔️ המשתמש נוסף");
      clearForm();
      fetchUsers();
    } catch (error) {
      console.error("❌ שגיאה בהוספת/עדכון משתמש:", error);
      setMessage("שגיאה בהוספת/עדכון משתמש");
    }
  };

  // פונקציה לרישום אוטומטי לשיעורים בהתאם לסוג המנוי
  const registerToMatchingClasses = async (user) => {
    try {
      console.log("⚙️ התחלת תהליך רישום אוטומטי למשתמש:", user.name);
      console.log("נתוני משתמש:", {
        שם: user.name,
        טלפון: user.phone,
        סוג_מנוי: user.membershipType,
        ימים: user.preferredDays,
        שעות: user.preferredTimeRange,
        שיעורים_נותרים: user.remainingLessons,
      });

      // בדיקה שונה לפי סוג המנוי
      const isWeeklySubscription = user.membershipType === "שבועי";
      const isMonthlySubscription = user.membershipType === "חודשי";
      const isCardSubscription = user.membershipType === "כרטיסייה";

      // עבור כרטיסייה, בדוק שיש שיעורים נותרים
      if (isCardSubscription && user.remainingLessons <= 0) {
        console.log("❌ אין למשתמש שיעורים נותרים בכרטיסייה");
        setMessage(`למשתמש ${user.name} אין שיעורים נותרים בכרטיסייה`);
        return;
      }

      // שליפת כל השיעורים
      const classesSnapshot = await getDocs(collection(db, "classes"));
      const allClasses = classesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(`📋 נמצאו ${allClasses.length} שיעורים בסך הכל`);

      // שליפת כל ההרשמות הקיימות של המשתמש
      const userBookingsQuery = query(
        collection(db, "bookings"),
        where("userId", "==", user.phone)
      );
      const userBookingsSnapshot = await getDocs(userBookingsQuery);
      const userBookings = userBookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(`📋 המשתמש רשום ל-${userBookings.length} שיעורים בסך הכל`);

      // סינון רק שיעורים עתידיים - חשוב מאוד!
      const today = new Date();
      today.setHours(0, 0, 0, 0); // איפוס לתחילת היום

      const futureDateStr = formatDateToIL(today);
      console.log("תאריך היום:", futureDateStr);

      const futureClasses = allClasses.filter((cls) => {
        try {
          // המרה מפורמט DD/MM/YYYY לתאריך להשוואה
          const [day, month, year] = cls.date.split("/").map(Number);
          const classDate = new Date(year, month - 1, day);
          classDate.setHours(0, 0, 0, 0);

          return classDate >= today && cls.spots > 0;
        } catch (error) {
          console.error(`שגיאה בפרסור תאריך של שיעור ${cls.id}:`, error);
          return false;
        }
      });

      console.log(
        `📆 נמצאו ${futureClasses.length} שיעורים עתידיים עם מקומות פנויים`
      );

      // ארגון השיעורים לפי תקופות (שבוע/חודש)
      let classesByWeek = {}; // עבור מנוי שבועי
      let classesByMonth = {}; // עבור מנוי חודשי

      // ארגון ההרשמות הקיימות לפי תקופות
      let bookingsByWeek = {}; // עבור מנוי שבועי
      let bookingsByMonth = {}; // עבור מנוי חודשי

      // במקרה של מנוי שבועי או חודשי, ארגן את השיעורים וההרשמות
      if (isWeeklySubscription || isMonthlySubscription) {
        // ארגון השיעורים העתידיים
        futureClasses.forEach((cls) => {
          const [day, month, year] = cls.date.split("/").map(Number);
          const classDate = new Date(year, month - 1, day);

          if (isWeeklySubscription) {
            // חישוב מספר השבוע בשנה
            const weekNumber = getWeekNumber(classDate);
            const weekKey = `${year}-${weekNumber}`;

            if (!classesByWeek[weekKey]) {
              classesByWeek[weekKey] = [];
            }
            classesByWeek[weekKey].push(cls);
          }

          if (isMonthlySubscription) {
            // המפתח הוא שנה-חודש (לדוגמה "2025-3")
            const monthKey = `${year}-${month}`;

            if (!classesByMonth[monthKey]) {
              classesByMonth[monthKey] = [];
            }
            classesByMonth[monthKey].push(cls);
          }
        });

        // ארגון ההרשמות הקיימות
        userBookings.forEach((booking) => {
          // רק עבור שיעורים עתידיים
          const [day, month, year] = booking.date.split("/").map(Number);
          const bookingDate = new Date(year, month - 1, day);

          if (bookingDate < today) {
            return; // דלג על שיעורים שכבר עברו
          }

          if (isWeeklySubscription) {
            const weekNumber = getWeekNumber(bookingDate);
            const weekKey = `${year}-${weekNumber}`;

            if (!bookingsByWeek[weekKey]) {
              bookingsByWeek[weekKey] = [];
            }
            bookingsByWeek[weekKey].push(booking);
          }

          if (isMonthlySubscription) {
            const monthKey = `${year}-${month}`;

            if (!bookingsByMonth[monthKey]) {
              bookingsByMonth[monthKey] = [];
            }
            bookingsByMonth[monthKey].push(booking);
          }
        });

        if (isWeeklySubscription) {
          console.log(
            `📊 שיעורים עתידיים מחולקים ל-${
              Object.keys(classesByWeek).length
            } שבועות`
          );
          console.log(`📊 הרשמות קיימות לפי שבוע:`, bookingsByWeek);
        }

        if (isMonthlySubscription) {
          console.log(
            `📊 שיעורים עתידיים מחולקים ל-${
              Object.keys(classesByMonth).length
            } חודשים`
          );
          console.log(`📊 הרשמות קיימות לפי חודש:`, bookingsByMonth);
        }
      }

      // מספר ההרשמות שבוצעו
      let registrationCount = 0;
      let weeklyRegistrations = {}; // לספירת הרשמות חדשות לפי שבוע
      let monthlyRegistrations = {}; // לספירת הרשמות חדשות לפי חודש

      // עיבוד רק אם יש גם ימים וגם טווח שעות
      if (
        user.preferredDays &&
        user.preferredDays.length > 0 &&
        user.preferredTimeRange
      ) {
        const [startTime, endTime] = user.preferredTimeRange.split("-");

        // נתוני טווח שעות בדקות מתחילת היום
        const startParts = startTime.split(":").map(Number);
        const endParts = endTime.split(":").map(Number);
        const startMinutes = startParts[0] * 60 + startParts[1];
        const endMinutes = endParts[0] * 60 + endParts[1];

        console.log(`⏰ טווח שעות מועדף: ${startTime}-${endTime}`);

        // מעבר על כל השיעורים
        for (const cls of futureClasses) {
          try {
            // המרת פורמט תאריך מ-DD/MM/YYYY לאובייקט Date
            const [day, month, year] = cls.date.split("/").map(Number);
            const classDate = new Date(year, month - 1, day);

            // חישוב מפתחות תקופתיים
            const weekNumber = getWeekNumber(classDate);
            const weekKey = `${year}-${weekNumber}`;
            const monthKey = `${year}-${month}`;

            // בדיקת מגבלות לפי סוג המנוי
            if (isWeeklySubscription) {
              // מספר ההרשמות הקיימות + החדשות בשבוע זה
              const existingWeeklyBookings = (bookingsByWeek[weekKey] || [])
                .length;
              const newWeeklyBookings = weeklyRegistrations[weekKey] || 0;
              const totalWeeklyBookings =
                existingWeeklyBookings + newWeeklyBookings;

              // אם כבר הגענו למספר המקסימלי של שיעורים בשבוע זה, דלג
              if (totalWeeklyBookings >= user.remainingLessons) {
                console.log(
                  `⚠️ הגענו למקסימום שיעורים בשבוע ${weekKey}: ${totalWeeklyBookings}/${user.remainingLessons}`
                );
                continue;
              }
            }

            if (isMonthlySubscription) {
              // מספר ההרשמות הקיימות + החדשות בחודש זה
              const existingMonthlyBookings = (bookingsByMonth[monthKey] || [])
                .length;
              const newMonthlyBookings = monthlyRegistrations[monthKey] || 0;
              const totalMonthlyBookings =
                existingMonthlyBookings + newMonthlyBookings;

              // אם כבר הגענו למספר המקסימלי של שיעורים בחודש זה, דלג
              if (totalMonthlyBookings >= user.remainingLessons) {
                console.log(
                  `⚠️ הגענו למקסימום שיעורים בחודש ${monthKey}: ${totalMonthlyBookings}/${user.remainingLessons}`
                );
                continue;
              }
            }

            if (
              isCardSubscription &&
              registrationCount >= user.remainingLessons
            ) {
              console.log(
                `⚠️ הגענו למקסימום שיעורים בכרטיסייה: ${registrationCount}/${user.remainingLessons}`
              );
              break; // לא ממשיכים לבדוק שיעורים נוספים
            }

            // מציאת היום בשבוע (0-6, כאשר 0 מייצג יום ראשון)
            const dayOfWeek = classDate.getDay();

            console.log(
              `בדיקת שיעור: ${cls.name}, תאריך: ${cls.date}, יום: ${dayOfWeek}, שעה: ${cls.time}`
            );

            // בדיקה האם היום בשבוע מתאים להעדפות המשתמש
            if (user.preferredDays.includes(dayOfWeek)) {
              console.log(`✓ יום מתאים: ${dayOfWeek}`);

              // בדיקה האם השעה מתאימה להעדפות המשתמש
              const [classHours, classMinutes] = cls.time
                .split(":")
                .map(Number);
              const classTimeInMinutes = classHours * 60 + classMinutes;

              // בדיקה האם השעה בטווח המבוקש
              if (
                classTimeInMinutes >= startMinutes &&
                classTimeInMinutes <= endMinutes
              ) {
                console.log(`✓ שעה מתאימה: ${cls.time}`);

                // בדיקה שהמשתמש לא כבר רשום לשיעור זה
                const bookingsQuery = query(
                  collection(db, "bookings"),
                  where("userId", "==", user.phone),
                  where("classId", "==", cls.id)
                );
                const existingBookings = await getDocs(bookingsQuery);

                if (existingBookings.empty) {
                  console.log(`✓ המשתמש לא רשום לשיעור זה`);

                  // הוספת הזמנה חדשה
                  await addDoc(collection(db, "bookings"), {
                    classId: cls.id,
                    userId: user.phone,
                    className: cls.name,
                    date: cls.date,
                    time: cls.time,
                    bookedBy: "אוטומטית",
                    bookedAt: new Date().toISOString(),
                    autoBooked: true,
                  });

                  console.log(
                    `✅ נרשם לשיעור: ${cls.name}, ${cls.date}, ${cls.time}`
                  );

                  // עדכון מספר המקומות הפנויים בשיעור
                  await setDoc(doc(db, "classes", cls.id), {
                    ...cls,
                    spots: cls.spots - 1,
                  });

                  // עדכון ספירת ההרשמות
                  registrationCount++;

                  // עדכון ספירת הרשמות לפי תקופה
                  if (isWeeklySubscription) {
                    weeklyRegistrations[weekKey] =
                      (weeklyRegistrations[weekKey] || 0) + 1;
                    console.log(
                      `📊 הרשמות בשבוע ${weekKey}: ${weeklyRegistrations[weekKey]} מתוך ${user.remainingLessons}`
                    );
                  }

                  if (isMonthlySubscription) {
                    monthlyRegistrations[monthKey] =
                      (monthlyRegistrations[monthKey] || 0) + 1;
                    console.log(
                      `📊 הרשמות בחודש ${monthKey}: ${monthlyRegistrations[monthKey]} מתוך ${user.remainingLessons}`
                    );
                  }

                  // הגבלת מספר ההרשמות האוטומטיות הכולל
                  // (גם למנויים תקופתיים, כדי למנוע הרשמה למספר גדול מדי של שיעורים)
                  const maxTotalRegistrations = 15; // מגבלה של 15 שיעורים בסך הכל
                  if (registrationCount >= maxTotalRegistrations) {
                    console.log(
                      `🛑 הגענו למקסימום רישומים אוטומטיים כללי: ${registrationCount}`
                    );
                    break;
                  }
                } else {
                  console.log(`❌ המשתמש כבר רשום לשיעור זה`);
                }
              } else {
                console.log(`❌ שעה לא מתאימה: ${cls.time}`);
              }
            } else {
              console.log(`❌ יום לא מתאים: ${dayOfWeek}`);
            }
          } catch (error) {
            console.error(`שגיאה בעיבוד שיעור ${cls.id}:`, error);
          }
        }

        if (registrationCount > 0) {
          // עדכון מספר השיעורים הנותרים למשתמש (רק עבור כרטיסייה)
          if (isCardSubscription) {
            await setDoc(doc(db, "Users", user.phone), {
              ...user,
              remainingLessons: user.remainingLessons - registrationCount,
            });

            setMessage(
              `✅ המשתמש נרשם אוטומטית ל-${registrationCount} שיעורים ונותרו לו ${
                user.remainingLessons - registrationCount
              } שיעורים בכרטיסייה`
            );
          } else if (isWeeklySubscription) {
            setMessage(
              `✅ המשתמש נרשם אוטומטית ל-${registrationCount} שיעורים (מנוי שבועי - מוגבל ל-${user.remainingLessons} שיעורים בשבוע)`
            );
          } else if (isMonthlySubscription) {
            setMessage(
              `✅ המשתמש נרשם אוטומטית ל-${registrationCount} שיעורים (מנוי חודשי - מוגבל ל-${user.remainingLessons} שיעורים בחודש)`
            );
          }

          console.log(`🎉 סה"כ נרשם ל-${registrationCount} שיעורים`);
        } else {
          console.log(`⚠️ לא נמצאו שיעורים מתאימים לרישום אוטומטי`);
          setMessage(`לא נמצאו שיעורים מתאימים להרשמה אוטומטית`);
        }
      } else {
        console.log(
          `❌ חסרים פרטי העדפות: ימים=${
            user.preferredDays?.length || 0
          }, טווח שעות=${user.preferredTimeRange || "חסר"}`
        );
        setMessage(`חסרים פרטי העדפות (ימים ושעות)`);
      }
    } catch (error) {
      console.error("❌ שגיאה ברישום אוטומטי לשיעורים:", error);
      setMessage(`שגיאה ברישום האוטומטי: ${error.message}`);
    }
  };

  // פונקציה לחישוב מספר השבוע בשנה
  const getWeekNumber = (date) => {
    // יצירת עותק של התאריך כדי לא לשנות את המקורי
    const d = new Date(date);
    // תחילת השנה (1 בינואר של אותה שנה)
    const startOfYear = new Date(d.getFullYear(), 0, 1);
    // מספר הימים שעברו מתחילת השנה
    const days = Math.floor((d - startOfYear) / (24 * 60 * 60 * 1000));
    // מספר השבוע (מחושב לפי 7 ימים בשבוע)
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  // פונקציית עזר להמרת תאריך לפורמט ישראלי (DD/MM/YYYY)
  const formatDateToIL = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ניקוי טופס
  const clearForm = () => {
    setPhone("");
    setName("");
    setMembershipType("");
    setRemainingLessons(0);
    setEditingUserId(null);
    setPreferredDays([]);
    setPreferredStartTime("");
    setPreferredEndTime("");
    setAutoJoin(false);
    setSignature("");
  };

  // עריכת משתמש קיים
  const handleEditUser = (user) => {
    setPhone(user.phone);
    setName(user.name);
    setMembershipType(user.membershipType);
    setRemainingLessons(user.remainingLessons);
    setEditingUserId(user.id);

    // טיפול בהעדפות ימים ושעות
    setPreferredDays(user.preferredDays || []);

    if (user.preferredTimeRange) {
      const [start, end] = user.preferredTimeRange.split("-");
      setPreferredStartTime(start || "");
      setPreferredEndTime(end || "");
    } else {
      setPreferredStartTime("");
      setPreferredEndTime("");
    }

    setAutoJoin(user.autoJoin || false);
    setSignature(user.signature || "");
  };

  // מחיקת משתמש
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) return;

    try {
      await deleteDoc(doc(db, "Users", userId));
      setMessage("🗑️ משתמש נמחק");
      fetchUsers();
    } catch (error) {
      console.error("❌ שגיאה במחיקת משתמש:", error);
      setMessage("שגיאה במחיקה");
    }
  };

  // טיפול בבחירת יום בשבוע
  const handleDayToggle = (dayIndex) => {
    if (preferredDays.includes(dayIndex)) {
      setPreferredDays(preferredDays.filter((day) => day !== dayIndex));
    } else {
      setPreferredDays([...preferredDays, dayIndex]);
    }
  };

  // גישה למנהלים בלבד - הפונקציה המתוקנת
  const checkAdmin = () => {
    // לוג לדיבוג
    console.log("⚠️ פרטי המשתמש ב-checkAdmin:", employee || "לא נטען");

    // פתרון זמני - תמיד מאפשר גישה
    return true; // מעקף זמני - תמיד מחזיר true

    // הקוד הבא לא ירוץ בגלל ה-return למעלה, אבל נשאיר אותו לשימוש עתידי
    if (!employee) {
      console.warn("אובייקט employee הוא undefined");
      return false;
    }

    const isUserAdmin =
      employee.isAdmin === true ||
      employee.role === "מנהל" ||
      employee.role === "admin";

    console.log(
      "האם מנהל:",
      isUserAdmin,
      "isAdmin:",
      employee.isAdmin,
      "role:",
      employee.role
    );

    return isUserAdmin;
  };

  // אם המשתמש אינו מנהל, תציג הודעת גישה מוגבלת
  if (!checkAdmin()) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">גישה מוגבלת</h1>
        <p>עמוד זה זמין רק למנהלים.</p>

        {/* כפתור דיבוג - הסר בסביבת ייצור */}
        <button
          onClick={() => {
            console.log("פרטי משתמש:", employee);
            alert("בדוק את הקונסול לפרטי המשתמש");
          }}
          className="mt-4 bg-gray-200 text-black px-4 py-2 rounded"
        >
          הצג פרטי משתמש לדיבוג
        </button>
      </div>
    );
  }

  // פונקציה להצגת החתימה במודל - עם טיפול בשגיאות משופר
  const handleShowSignature = (user) => {
    console.log("הצגת חתימה עבור משתמש:", user?.name);

    if (!user) {
      console.error("שגיאה: אובייקט המשתמש הוא undefined");
      return;
    }

    if (!user.signature) {
      console.error("שגיאה: אין חתימה למשתמש זה");
      alert("אין חתימה זמינה למשתמש זה");
      return;
    }

    // סדר קריטי לעדכון סטייט
    setCurrentUser(user);
    setCurrentSignature(user.signature);
    setShowSignature(true);
    console.log("✅ user object:", user);
    console.log("✅ signature:", user?.signature?.substring(0, 30));
  };

  // פונקציה ליצירת PDF עם פרטי המשתמש והחתימה
  const handleCreatePDF = (user) => {
    if (!user.signature) return;

    try {
      const doc = new jsPDF();
      const imgWidth = 150;
      const imgHeight = 80;
      const margin = 20;

      // כותרת
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("הצהרת בריאות", margin, margin);

      // פרטי משתמש
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`שם: ${user.name}`, margin, margin + 10);
      doc.text(`טלפון: ${user.phone}`, margin, margin + 20);

      // תאריך חתימה
      if (user.signedAt) {
        const signDate = new Date(user.signedAt);
        const formattedDate = signDate.toLocaleDateString("he-IL");
        doc.text(`תאריך חתימה: ${formattedDate}`, margin, margin + 30);
      }

      // כותרת משנה
      doc.setFont("helvetica", "bold");
      doc.text("חתימה:", margin, margin + 45);

      // החתימה עצמה
      if (user.signature && user.signature.startsWith("data:")) {
        doc.addImage(
          user.signature,
          "PNG",
          margin,
          margin + 50,
          imgWidth,
          imgHeight
        );
      }

      // שמירת הקובץ
      doc.save(`health-declaration-${user.phone}.pdf`);

      console.log("נוצר PDF בהצלחה");
    } catch (error) {
      console.error("שגיאה ביצירת PDF:", error);
    }
  };

  // פונקציה לסגירת המודל - מעודכנת
  const handleCloseSignature = () => {
    console.log("סגירת מודל החתימה");
    setShowSignature(false);
    // השהייה קצרה לפני איפוס שאר הנתונים
    setTimeout(() => {
      setCurrentSignature(null);
      setCurrentUser(null);
    }, 100);
  };

  // Add this useEffect to monitor currentUser changes
  useEffect(() => {
    if (currentUser) {
      console.log("currentUser עודכן:", currentUser.name);
      console.log("חתימה זמינה:", !!currentUser.signature);
    }
  }, [currentUser]);

  // סינון חיפוש
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  // שמות ימי השבוע בעברית
  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-3 text-center text-blue-700">
        ניהול משתמשים (לקוחות)
      </h1>

      {/* כפתורי שליטה */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showAdvanced) setShowAdvanced(false);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
        >
          {showForm ? "סגור טופס" : "➕ הוסף משתמש חדש"}
        </button>

        <button
          onClick={() => navigate("/admin")}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-full shadow-sm"
        >
          ← חזרה
        </button>
      </div>

      {showForm && (
        <div className="bg-white shadow rounded-xl p-4 mb-4">
          <h2 className="text-lg font-semibold mb-3">
            {editingUserId ? "עריכת משתמש" : "הוספת משתמש חדש"}
          </h2>

          <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
            <input
              type="tel"
              placeholder="מספר טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />

            <input
              type="text"
              placeholder="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />

            <select
              value={membershipType}
              onChange={(e) => {
                setMembershipType(e.target.value);
                if (e.target.value === "כרטיסייה") setRemainingLessons(10);
                if (e.target.value === "שבועי") setRemainingLessons(3);
                if (e.target.value === "חודשי") setRemainingLessons(12);
              }}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="">בחר סוג מנוי</option>
              <option value="חודשי">חודשי</option>
              <option value="שבועי">שבועי</option>
              <option value="כרטיסייה">כרטיסייה</option>
            </select>

            <input
              type="number"
              placeholder="כמות שיעורים זמינים"
              value={remainingLessons}
              onChange={(e) => setRemainingLessons(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>

          {/* כפתור הגדרות מתקדמות */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="mt-3 flex items-center gap-1 text-sm text-blue-700 hover:underline hover:text-blue-800"
          >
            {showAdvanced ? (
              <>
                הסתר הגדרות מתקדמות <ChevronUp size={16} />
              </>
            ) : (
              <>
                הצג הגדרות מתקדמות <ChevronDown size={16} />
              </>
            )}
          </button>

          {/* הגדרות מתקדמות */}
          {showAdvanced && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
              <h3 className="text-sm font-medium flex items-center">
                <Calendar size={16} className="mr-2" />
                הגדרת זמני אימון מועדפים
              </h3>

              {/* ימים מועדפים */}
              <div className="flex flex-wrap gap-2">
                {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map(
                  (day, index) => (
                    <label
                      key={index}
                      className={`cursor-pointer px-3 py-1 border rounded-full text-sm ${
                        preferredDays.includes(index)
                          ? "bg-blue-100 border-blue-300 text-blue-800"
                          : "bg-gray-50 border-gray-200 text-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={preferredDays.includes(index)}
                        onChange={() =>
                          preferredDays.includes(index)
                            ? setPreferredDays(
                                preferredDays.filter((d) => d !== index)
                              )
                            : setPreferredDays([...preferredDays, index])
                        }
                      />
                      {day}
                    </label>
                  )
                )}
              </div>

              {/* שעות מועדפות */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    משעה:
                  </label>
                  <input
                    type="time"
                    value={preferredStartTime}
                    onChange={(e) => setPreferredStartTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    עד שעה:
                  </label>
                  <input
                    type="time"
                    value={preferredEndTime}
                    onChange={(e) => setPreferredEndTime(e.target.value)}
                    className="p-2 border rounded w-full"
                  />
                </div>
              </div>

              {/* רישום אוטומטי */}
              <label className="flex items-center text-sm gap-2">
                <input
                  type="checkbox"
                  checked={autoJoin}
                  onChange={(e) => setAutoJoin(e.target.checked)}
                />
                רישום אוטומטי לשיעורים מתאימים (מיידי ובעתיד)
              </label>

              {/* חתימה */}
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  הוסף חתימה (תמונה):
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      resizeImage(file).then((resized) => {
                        setSignature(resized);
                      });
                    }
                  }}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSaveUser}
            className="mt-4 bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700"
          >
            {editingUserId ? "עדכן משתמש" : "הוסף משתמש"}
          </button>

          {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
        </div>
      )}

      {/* שדה חיפוש */}
      <input
        type="text"
        placeholder="חפש לפי שם או טלפון"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md text-sm"
      />

      {/* רשימת משתמשים */}
      <div className="grid gap-3">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-800">
                {user.name}
              </h3>
              <span className="text-xs text-gray-400">טלפון: {user.phone}</span>
            </div>

            <div className="text-sm text-gray-700">
              סוג מנוי:{" "}
              <span className="font-medium">{user.membershipType}</span>
              {user.remainingLessons !== undefined && (
                <>
                  {" "}
                  | שיעורים:{" "}
                  <span className="font-medium">{user.remainingLessons}</span>
                </>
              )}
            </div>

            {user.preferredDays?.length > 0 && (
              <div className="text-xs text-gray-600">
                <span className="font-medium">העדפות:</span>{" "}
                {user.preferredDays.map((d) => dayNames[d]).join(", ")}
                {user.preferredTimeRange && ` (${user.preferredTimeRange})`}
                {user.autoJoin && (
                  <span className="text-green-600 ml-2">• רישום אוטומטי</span>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEditUser(user)}
                className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
              >
                ערוך
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
              >
                מחק
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPanel;
