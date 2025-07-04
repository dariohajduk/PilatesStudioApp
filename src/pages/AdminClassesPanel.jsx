import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { format, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2, Edit, Check, X } from "lucide-react"; // אייקונים
import BackToAdminButton from "../components/BackToAdminButton";
import { useNavigate } from "react-router-dom";

// ==================== קומפוננטת פאנל ניהול שיעורים ====================
const AdminClassesPanel = ({ employee }) => {
  // ========== מצב (State) ==========
  // משתני State לניהול השיעורים
  const [classes, setClasses] = useState([]); // רשימת כל השיעורים


/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
/**
 * TODO: תאר את הפונקציה useState
 */
  const [loading, setLoading] = useState(true); // אינדיקטור לטעינה
  const [message, setMessage] = useState(""); // הודעת מערכת למשתמש
  const [isModalOpen, setIsModalOpen] = useState(false); // האם חלון המודל פתוח

  // משתני State למחיקה מרובה
  const [selectedClasses, setSelectedClasses] = useState([]); // רשימת שיעורים מסומנים למחיקה
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false); // האם להציג חלון אישור מחיקה מרובה

  // משתני State לטופס הוספת/עריכת שיעור
  const [name, setName] = useState(""); // שם השיעור
  const [date, setDate] = useState(null); // תאריך השיעור
  const [time, setTime] = useState(""); // שעת השיעור
  const [spots, setSpots] = useState(6); // מספר מקומות פנויים
  const [instructorId, setInstructorId] = useState(""); // מזהה המדריך
  const [instructors, setInstructors] = useState([]); // רשימת המדריכים
  const [editingClassId, setEditingClassId] = useState(null); // מזהה השיעור שנערך כעת
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // האם להציג חלון אישור מחיקה
  const [deleteClassId, setDeleteClassId] = useState(null); // מזהה השיעור למחיקה

  // משתני State לשיעורים מחזוריים
  const [isRecurring, setIsRecurring] = useState(false); // האם השיעור מחזורי
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(null); // תאריך סיום המחזוריות
  const [selectedDays, setSelectedDays] = useState([]); // הימים הנבחרים בשבוע

  // ========== אפקטים ==========
  // טעינת נתונים בעת טעינת הקומפוננטה
  useEffect(() => {
    fetchClasses(); // טעינת רשימת השיעורים
    fetchInstructors(); // טעינת רשימת המדריכים
  }, []);

  // ========== פונקציות עזר ==========
  // פונקציה להמרת תאריך לפורמט DD/MM/YYYY
  const formatDateToDDMMYYYY = (date) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  };

  // פונקציה לאיפוס הטופס
  const clearForm = () => {
    setName("פילאטיס"); // איפוס שם השיעור
    setDate(null); // איפוס תאריך
    setTime(""); // איפוס שעה
    setSpots(6); // איפוס מספר מקומות לברירת מחדל
    setInstructorId(""); // איפוס מזהה מדריך
    setEditingClassId(null); // איפוס מזהה שיעור לעריכה
    setMessage(""); // איפוס הודעת מערכת

    // איפוס משתני שיעורים מחזוריים
    setIsRecurring(false);
    setRecurrenceEndDate(null);
    setSelectedDays([]);
  };

  // ========== פונקציות שליפת נתונים ==========
  // פונקציה לשליפת כל השיעורים
  const fetchClasses = async () => {
    setLoading(true); // הפעלת אינדיקטור טעינה
    try {
      // שליפת כל השיעורים ממסד הנתונים
      const querySnapshot = await getDocs(collection(db, "classes"));
      // המרת התוצאות למערך אובייקטים
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // הוספת מזהה המסמך
        ...doc.data(), // הוספת כל הנתונים מהמסמך
      }));
      setClasses(classesData); // עדכון מצב רשימת השיעורים
      setSelectedClasses([]); // איפוס רשימת השיעורים המסומנים
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה בטעינת השיעורים:", error);
    }
    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // פונקציה לשליפת כל המדריכים
  const fetchInstructors = async () => {
    try {
      // שליפת משתמשים שהם מדריכים
      const q = query(
        collection(db, "Users"),
        where("isInstructor", "==", true)
      );
      const querySnapshot = await getDocs(q);
      // המרת התוצאות למערך אובייקטים
      const instructorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // מזהה המדריך (מספר טלפון)
        ...doc.data(), // נתוני המדריך
      }));
      console.log("📋 מדריכים שהתקבלו:", instructorsData);

      setInstructors(instructorsData); // עדכון מצב רשימת המדריכים
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה בטעינת המדריכים:", error);
    }
  };

  // ========== פונקציות טיפול במודל ==========
  // פתיחת מודל לעריכת שיעור קיים
  const openModalForEdit = (cls) => {
    setName(cls.name); // הגדרת שם השיעור

    // טיפול בתאריך השיעור
    if (cls.date) {
      // פירוק תאריך בפורמט DD/MM/YYYY
      const [day, month, year] = cls.date.split("/");
      // יצירת אובייקט תאריך
      const parsedDate = new Date(`${year}-${month}-${day}`);

      // בדיקה שהתאריך חוקי
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate); // הגדרת תאריך השיעור
      } else {
        console.error("תאריך לא חוקי:", cls.date);
        setDate(null); // איפוס תאריך במקרה של תאריך לא חוקי
      }
    } else {
      // התראה אם אין תאריך בשיעור
      console.warn("אין תאריך בשיעור:", cls);
      setDate(null); // איפוס תאריך
    }

    setTime(cls.time); // הגדרת שעת השיעור
    setSpots(cls.spots); // הגדרת מספר המקומות הפנויים
    setInstructorId(cls.instructorId); // הגדרת מזהה המדריך
    setEditingClassId(cls.id); // הגדרת מזהה השיעור הנערך
    setIsModalOpen(true); // פתיחת המודל
  };

  // ========== פונקציות טיפול בשיעורים מחזוריים ==========
  // עדכון פונקציית createRecurringClasses
  const createRecurringClasses = async (baseClassData) => {
    // וידוא שנבחרו כל הנתונים הדרושים
    if (!date || !recurrenceEndDate || selectedDays.length === 0) {
      setMessage("אנא בחר תאריך התחלה, תאריך סיום וימים בשבוע"); // הודעת שגיאה
      return false;
    }

    // מעבר על כל התאריכים בטווח ויצירת שיעורים לימים הנבחרים
    let currentDate = new Date(date);
    const endDate = new Date(recurrenceEndDate);
    let successCount = 0; // ספירת שיעורים שנוצרו בהצלחה
    let totalAutoRegistrations = 0; // ספירת רישומים אוטומטיים

    try {
      // המשך כל עוד התאריך הנוכחי לפני או שווה לתאריך הסיום
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay(); // מספר היום בשבוע (0=ראשון, 1=שני, וכו')

        // אם היום הנוכחי נמצא ברשימת הימים הנבחרים
        if (selectedDays.includes(dayOfWeek)) {
          // יצירת אובייקט שיעור חדש
          const newClassData = {
            ...baseClassData,
            date: formatDateToDDMMYYYY(new Date(currentDate)), // הגדרת התאריך הנוכחי
          };

          // הוספת השיעור למסד הנתונים
          const docRef = await addDoc(collection(db, "classes"), newClassData);

          // רישום אוטומטי למשתמשים
          const classWithId = { ...newClassData, id: docRef.id };
          const autoRegistrations = await autoRegisterUsersForClass(
            classWithId
          );
          totalAutoRegistrations += autoRegistrations;

          successCount++;
        }

        // מעבר ליום הבא
        currentDate = addDays(currentDate, 1);
      }

      console.log(
        `נוצרו ${successCount} שיעורים מחזוריים עם ${totalAutoRegistrations} רישומים אוטומטיים`
      );

      if (totalAutoRegistrations > 0) {
        setMessage(
          `✔️ נוצרו ${successCount} שיעורים מחזוריים בהצלחה עם ${totalAutoRegistrations} רישומים אוטומטיים!`
        );
      }

      return successCount; // החזרת מספר השיעורים שנוצרו
    } catch (error) {
      console.error("❌ שגיאה ביצירת שיעורים מחזוריים:", error);
      return false;
    }
  };

  // ========== פונקציות טיפול בשיעורים ==========
  // שמירת שיעור חדש או עדכון שיעור קיים
  const handleSaveClass = async (closeAfterSave = false) => {
    // בדיקת תקינות הנתונים
    if (!name || !date || !time || !instructorId || spots < 1) {
      setMessage("אנא מלא את כל השדות הנדרשים"); // הצגת הודעת שגיאה
      return; // עצירת הפונקציה אם יש שדות חסרים
    }

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // מציאת אובייקט המדריך לפי מזהה
      const instructor = instructors.find((i) => i.id === instructorId);
      // בניית אובייקט נתוני השיעור
      const classData = {
        name, // שם השיעור
        date: formatDateToDDMMYYYY(date), // תאריך בפורמט DD/MM/YYYY
        time, // שעת השיעור
        instructor: instructor?.name || "", // שם המדריך
        instructorId, // מזהה המדריך
        spots: parseInt(spots), // מספר מקומות (המרה למספר)
        createdAt: new Date().toISOString(), // זמן יצירה
      };

      // בדיקה האם מדובר בשיעור מחזורי או שיעור רגיל
      if (isRecurring && !editingClassId) {
        // יצירת שיעורים מחזוריים
        const successCount = await createRecurringClasses(classData);

        if (successCount) {
          setMessage(`✔️ נוצרו ${successCount} שיעורים מחזוריים בהצלחה!`); // הודעת הצלחה

          // רישום אוטומטי למשתמשים יבוצע בתוך createRecurringClasses
        } else {
          setMessage("❌ שגיאה ביצירת שיעורים מחזוריים"); // הודעת שגיאה
        }
      } else {
        let newClassId;

        // בדיקה האם מדובר בעריכה או ביצירה
        if (editingClassId) {
          // עדכון שיעור קיים
          await updateDoc(doc(db, "classes", editingClassId), classData);
          newClassId = editingClassId;
          setMessage("✔️ שיעור עודכן בהצלחה!"); // הודעת הצלחה
        } else {
          // יצירת שיעור חדש
          const docRef = await addDoc(collection(db, "classes"), classData);
          newClassId = docRef.id;
          setMessage("✔️ שיעור נוסף בהצלחה!"); // הודעת הצלחה

          // רישום אוטומטי למשתמשים לשיעור החדש
          const classWithId = { ...classData, id: newClassId };
          const autoRegistrations = await autoRegisterUsersForClass(
            classWithId
          );

          if (autoRegistrations > 0) {
            setMessage(
              `✔️ שיעור נוסף בהצלחה! ${autoRegistrations} משתמשים נרשמו אוטומטית.`
            );
          }
        }
      }

      clearForm(); // איפוס הטופס
      fetchClasses(); // רענון רשימת השיעורים

      // סגירת המודל אם צוין שיש לסגור אחרי שמירה
      if (closeAfterSave) {
        setIsModalOpen(false);
      }
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה בשמירת השיעור:", error);
      setMessage("❌ שגיאה בשמירת השיעור, נסה שוב"); // הודעת שגיאה
    }

    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // ========== פונקציות טיפול בבחירת שיעורים ומחיקה ==========
  // טיפול בשינוי בחירת שיעור לפעולות מרובות
  const handleClassSelection = (classId) => {
    if (selectedClasses.includes(classId)) {
      // אם השיעור כבר נבחר - מסיר אותו
      setSelectedClasses(selectedClasses.filter((id) => id !== classId));
    } else {
      // אם השיעור לא נבחר - מוסיף אותו
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  // פונקציה לבחירת כל השיעורים
  const selectAllClasses = () => {
    if (selectedClasses.length === classes.length) {
      // אם כל השיעורים כבר נבחרו - מסיר את כולם
      setSelectedClasses([]);
    } else {
      // בוחר את כל השיעורים
      setSelectedClasses(classes.map((cls) => cls.id));
    }
  };

  // פונקציה להצגת חלון אישור מחיקת שיעור בודד
  const confirmDeleteClass = (classId) => {
    setDeleteClassId(classId); // הגדרת מזהה השיעור למחיקה
    setShowDeleteConfirm(true); // הצגת חלון אישור המחיקה
  };

  // פונקציה למחיקת שיעור בודד
  const handleDeleteClass = async () => {
    if (!deleteClassId) return; // בדיקה שיש מזהה שיעור למחיקה

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // מחיקת השיעור ממסד הנתונים
      await deleteDoc(doc(db, "classes", deleteClassId));
      setMessage("✔️ שיעור נמחק בהצלחה!"); // הודעת הצלחה
      fetchClasses(); // רענון רשימת השיעורים
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה במחיקת השיעור:", error);
      setMessage("❌ שגיאה במחיקת השיעור, נסה שוב"); // הודעת שגיאה
    }

    setShowDeleteConfirm(false); // סגירת חלון אישור המחיקה
    setDeleteClassId(null); // איפוס מזהה השיעור למחיקה
    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // פונקציה למחיקת מספר שיעורים יחד
  const handleBulkDelete = async () => {
    if (selectedClasses.length === 0) return; // בדיקה שיש שיעורים מסומנים

    setLoading(true); // הפעלת אינדיקטור טעינה

    try {
      // מעבר על כל השיעורים המסומנים ומחיקתם
      for (const classId of selectedClasses) {
        await deleteDoc(doc(db, "classes", classId));
      }

      setMessage(`✔️ ${selectedClasses.length} שיעורים נמחקו בהצלחה!`); // הודעת הצלחה
      fetchClasses(); // רענון רשימת השיעורים
    } catch (error) {
      // טיפול בשגיאות
      console.error("❌ שגיאה במחיקת שיעורים:", error);
      setMessage("❌ שגיאה במחיקת השיעורים, נסה שוב"); // הודעת שגיאה
    }

    setShowBulkDeleteConfirm(false); // סגירת חלון אישור המחיקה המרובה
    setSelectedClasses([]); // איפוס רשימת השיעורים המסומנים
    setLoading(false); // כיבוי אינדיקטור טעינה
  };

  // ========== פונקציה לטיפול בבחירת ימים בשבוע ==========
  // פונקציה לטיפול בשינוי בחירת יום בשבוע
  const handleDayToggle = (dayIndex) => {
    if (selectedDays.includes(dayIndex)) {
      // אם היום כבר נבחר - מסיר אותו
      setSelectedDays(selectedDays.filter((day) => day !== dayIndex));
    } else {
      // אם היום לא נבחר - מוסיף אותו
      setSelectedDays([...selectedDays, dayIndex]);
    }
  };

  // ========== פונקציות מיון ==========
  // פונקציה להמרת תאריך בפורמט DD/MM/YYYY למבנה השוואה
  const parseDateStringForSorting = (dateStr) => {
    if (!dateStr) return new Date(0); // ערך ברירת מחדל לתאריכים ריקים
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // פונקציה למיון שיעורים לפי תאריך ושעה
  const sortClasses = (classesArray) => {
    return [...classesArray].sort((a, b) => {
      // השוואת תאריכים קודם
      const dateA = parseDateStringForSorting(a.date);
      const dateB = parseDateStringForSorting(b.date);

      if (dateA.getTime() !== dateB.getTime()) {
        return dateA - dateB; // מיון לפי תאריך אם התאריכים שונים
      }

      // אם התאריכים זהים, השוואה לפי שעה
      return a.time.localeCompare(b.time);
    });
  };

  // פונקציה חדשה לרישום אוטומטי של משתמשים לשיעור חדש
  const autoRegisterUsersForClass = async (classData) => {
    try {
      console.log(
        "⚙️ התחלת תהליך רישום אוטומטי למשתמשים עבור שיעור חדש:",
        classData.name
      );

      // שליפת כל המשתמשים שסימנו רישום אוטומטי והגדירו העדפות
      const usersQuery = query(
        collection(db, "Users"),
        where("autoJoin", "==", true)
      );
      const usersSnapshot = await getDocs(usersQuery);

      if (usersSnapshot.empty) {
        console.log("לא נמצאו משתמשים עם רישום אוטומטי מופעל");
        return 0;
      }

      // המרת תאריך השיעור לאובייקט Date
      const [day, month, year] = classData.date.split("/").map(Number);
      const classDate = new Date(year, month - 1, day);

      // חישוב היום בשבוע (0-6)
      const dayOfWeek = classDate.getDay();

      // חישוב השעה בדקות מתחילת היום
      const [classHours, classMinutes] = classData.time.split(":").map(Number);
      const classTimeInMinutes = classHours * 60 + classMinutes;

      console.log(
        `פרטי השיעור: יום ${dayOfWeek}, שעה ${classData.time} (${classTimeInMinutes} דקות)`
      );

      let registrationCount = 0;

      // עיבוד כל משתמש
      for (const userDoc of usersSnapshot.docs) {
        const user = { id: userDoc.id, ...userDoc.data() };

        console.log(
          `בדיקת התאמה למשתמש: ${user.name}, טלפון: ${user.phone || user.id}`
        );

        // וידוא שיש למשתמש העדפות ימים ושעות
        if (
          !user.preferredDays ||
          !user.preferredDays.length ||
          !user.preferredTimeRange
        ) {
          console.log(`❌ למשתמש ${user.name} אין העדפות מוגדרות מלאות`);
          continue;
        }

        // בדיקה האם היום מתאים להעדפות המשתמש
        if (!user.preferredDays.includes(dayOfWeek)) {
          console.log(`❌ היום ${dayOfWeek} לא מתאים להעדפות המשתמש`);
          continue;
        }

        // בדיקת התאמת שעה
        const [startTime, endTime] = user.preferredTimeRange.split("-");
        const startParts = startTime.split(":").map(Number);
        const endParts = endTime.split(":").map(Number);
        const startMinutes = startParts[0] * 60 + startParts[1];
        const endMinutes = endParts[0] * 60 + endParts[1];

        if (
          classTimeInMinutes < startMinutes ||
          classTimeInMinutes > endMinutes
        ) {
          console.log(
            `❌ השעה ${classData.time} לא בטווח המועדף ${startTime}-${endTime}`
          );
          continue;
        }

        const userId = user.phone || user.id;

        // בדיקה שהמשתמש לא כבר רשום לשיעור זה
        const bookingsQuery = query(
          collection(db, "bookings"),
          where("userId", "==", userId),
          where("classId", "==", classData.id)
        );
        const existingBookings = await getDocs(bookingsQuery);

        if (!existingBookings.empty) {
          console.log(`❌ המשתמש כבר רשום לשיעור זה`);
          continue;
        }

        // בדיקת מגבלות לפי סוג המנוי
        const isWeeklySubscription = user.membershipType === "שבועי";
        const isMonthlySubscription = user.membershipType === "חודשי";
        const isCardSubscription = user.membershipType === "כרטיסייה";

        if (isCardSubscription && user.remainingLessons <= 0) {
          console.log(`❌ אין למשתמש שיעורים נותרים בכרטיסייה`);
          continue;
        }

        // עבור מנוי שבועי, בדוק מספר הרשמות לשבוע זה
        if (isWeeklySubscription) {
          const weekNumber = getWeekNumber(classDate);
          const weekKey = `${year}-${weekNumber}`;

          // בדיקת כמה שיעורים המשתמש כבר רשום אליהם באותו שבוע
          const userWeeklyBookingsQuery = query(
            collection(db, "bookings"),
            where("userId", "==", userId)
          );
          const userBookingsSnapshot = await getDocs(userWeeklyBookingsQuery);

          // סינון רק הרשמות לאותו שבוע
          const weeklyBookings = userBookingsSnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((booking) => {
              try {
                const [bDay, bMonth, bYear] = booking.date
                  .split("/")
                  .map(Number);
                const bookingDate = new Date(bYear, bMonth - 1, bDay);
                const bookingWeekNumber = getWeekNumber(bookingDate);
                const bookingWeekKey = `${bYear}-${bookingWeekNumber}`;
                return bookingWeekKey === weekKey;
              } catch (error) {
                return false;
              }
            });

          if (weeklyBookings.length >= user.remainingLessons) {
            console.log(
              `❌ המשתמש כבר רשום למקסימום שיעורים (${user.remainingLessons}) בשבוע ${weekKey}`
            );
            continue;
          }
        }

        // עבור מנוי חודשי, בדוק מספר הרשמות לחודש זה
        if (isMonthlySubscription) {
          const monthKey = `${year}-${month}`;

          // בדיקת כמה שיעורים המשתמש כבר רשום אליהם באותו חודש
          const userMonthlyBookingsQuery = query(
            collection(db, "bookings"),
            where("userId", "==", userId)
          );
          const userBookingsSnapshot = await getDocs(userMonthlyBookingsQuery);

          // סינון רק הרשמות לאותו חודש
          const monthlyBookings = userBookingsSnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((booking) => {
              try {
                const [bDay, bMonth, bYear] = booking.date
                  .split("/")
                  .map(Number);
                const bookingMonthKey = `${bYear}-${bMonth}`;
                return bookingMonthKey === monthKey;
              } catch (error) {
                return false;
              }
            });

          if (monthlyBookings.length >= user.remainingLessons) {
            console.log(
              `❌ המשתמש כבר רשום למקסימום שיעורים (${user.remainingLessons}) בחודש ${monthKey}`
            );
            continue;
          }
        }

        // תנאים להרשמה מתקיימים - הוספת הרשמה חדשה
        console.log(
          `✅ רושם את ${user.name} לשיעור ${classData.name} בתאריך ${classData.date}`
        );

        try {
          await addDoc(collection(db, "bookings"), {
            classId: classData.id,
            userId: userId,
            className: classData.name,
            date: classData.date,
            time: classData.time,
            bookedBy: "אוטומטית",
            bookedAt: new Date().toISOString(),
            autoBooked: true,
          });

          // עדכון מספר המקומות הפנויים בשיעור
          await updateDoc(doc(db, "classes", classData.id), {
            spots: classData.spots - 1,
          });

          // עדכון מספר השיעורים הנותרים למשתמש (רק עבור כרטיסייה)
          if (isCardSubscription) {
            await updateDoc(doc(db, "Users", user.id), {
              remainingLessons: user.remainingLessons - 1,
            });
          }

          registrationCount++;
        } catch (error) {
          console.error(`❌ שגיאה ברישום המשתמש ${user.name} לשיעור:`, error);
        }
      }

      console.log(`🎉 סה"כ נרשמו ${registrationCount} משתמשים לשיעור`);
      return registrationCount;
    } catch (error) {
      console.error("❌ שגיאה ברישום אוטומטי למשתמשים:", error);
      return 0;
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

  // ========== רינדור ממשק המשתמש ==========
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ניהול שיעורים</h1>
      <BackToAdminButton />
      <div className="flex flex-wrap gap-2 mb-4">
        {/* כפתור להוספת שיעור חדש */}
        <button
          onClick={() => {
            clearForm(); // איפוס הטופס לפני פתיחתו
            setIsModalOpen(true); // פתיחת המודל
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + הוסף שיעור חדש
        </button>

        {/* כפתור לבחירת כל השיעורים */}
        {classes.length > 0 && (
          <button
            onClick={selectAllClasses}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
          >
            {selectedClasses.length === classes.length
              ? "בטל בחירת הכל"
              : "בחר הכל"}
          </button>
        )}

        {/* כפתור למחיקת שיעורים מסומנים */}
        {selectedClasses.length > 0 && (
          <button
            onClick={() => setShowBulkDeleteConfirm(true)}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
          >
            <Trash2 size={18} className="mr-1" />
            מחק {selectedClasses.length} שיעורים מסומנים
          </button>
        )}
      </div>

      {/* הודעת מערכת */}
      {message && <div className="my-2 text-blue-500">{message}</div>}

      {/* אינדיקטור טעינה */}
      {loading && <p className="text-gray-500">טוען...</p>}

      {/* רשימת השיעורים */}
      <div className="space-y-3">
        {sortClasses(classes).map((cls) => {
          const isCancelled = cls.cancelled === true;

          return (
            <div
              key={cls.id}
              className={`shadow rounded p-4 border-r-4 flex flex-col md:flex-row md:items-center justify-between
        ${
          selectedClasses.includes(cls.id)
            ? "border-green-500 bg-green-50"
            : isCancelled
            ? "border-red-500 bg-red-50"
            : "border-blue-500"
        }
      `}
            >
              <div className="flex items-start">
                {/* תיבת סימון */}
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(cls.id)}
                  onChange={() => handleClassSelection(cls.id)}
                  className="mt-1 mr-3 h-5 w-5 cursor-pointer accent-blue-500"
                  disabled={isCancelled} // אפשר גם למנוע סימון של שיעור מבוטל
                />
                <div className="flex-1">
                  <h2
                    className={`text-lg font-bold ${
                      isCancelled ? "line-through text-red-600" : ""
                    }`}
                  >
                    {cls.name}
                  </h2>
                  <div className="flex flex-wrap gap-x-6 mt-1 text-gray-600">
                    <p>
                      <span className="font-medium">תאריך:</span> {cls.date}
                    </p>
                    <p>
                      <span className="font-medium">שעה:</span> {cls.time}
                    </p>
                    <p>
                      <span className="font-medium">מדריך:</span>{" "}
                      {cls.instructor}
                    </p>
                    <p>
                      <span className="font-medium">מקומות:</span> {cls.spots}
                    </p>
                    {isCancelled && (
                      <p className="text-red-600 font-semibold">
                        ביטול: {cls.cancelReason || "חוסר מתאמנות"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* כפתורי עריכה ומחיקה */}
              <div className="mt-3 md:mt-0 flex space-x-2">
                {/* אם השיעור מבוטל אפשר למנוע עריכה/מחיקה לפי צורך */}
                <button
                  onClick={() => openModalForEdit(cls)}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 flex items-center"
                  disabled={isCancelled}
                >
                  <Edit size={16} className="mr-1" />
                  ערוך
                </button>
                <button
                  onClick={() => confirmDeleteClass(cls.id)}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 flex items-center"
                >
                  <Trash2 size={16} className="mr-1" />
                  מחק
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* מודל להוספה/עריכת שיעור */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-ה-[90vh] flex flex-col">
            <h2 className="text-xl font-bold mb-4">
              {editingClassId ? "עריכת שיעור" : "הוספת שיעור חדש"}
            </h2>

            {/* טופס להוספה/עריכת שיעור עם גלילה */}
            <div className="overflow-y-auto flex-1">
              {/* שם השיעור */}
              <div>
                <label className="block mb-1">שם השיעור:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded"
                />
              </div>

              {/*שעת השיעור+ תאריך השיעור */}
              <div>
                <label className="block mb-1">תאריך ושעת האימון:</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="border p-2 rounded w-full mb-2"
                  placeholderText="בחר תאריך"
                />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border p-2 rounded"
                  step="60"
                  min="00:00"
                  max="23:59"
                />
              </div>

              {/* מספר מקומות */}
              <div className="mt-4">
                <label className="block mb-1">מקומות:</label>
                <input
                  type="number"
                  min="1"
                  value={spots}
                  onChange={(e) => setSpots(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* בחירת מדריך */}
              <div className="mt-4">
                <label className="block mb-1">מדריך:</label>
                <select
                  value={instructorId}
                  onChange={(e) => setInstructorId(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">בחר מדריך</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* אפשרות לשיעור מחזורי - רק ביצירת שיעור חדש */}
              {!editingClassId && (
                <div className="border-t pt-3 mt-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="isRecurring"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="isRecurring" className="font-bold">
                      שיעור מחזורי
                    </label>
                  </div>

                  {/* אפשרויות שיעור מחזורי */}
                  {isRecurring && (
                    <div className="bg-gray-50 p-3 rounded space-y-3">
                      {/* בחירת ימים בשבוע */}
                      <div>
                        <label className="block mb-2 font-medium">
                          בחר ימים בשבוע:
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { index: 0, name: "ראשון" },
                            { index: 1, name: "שני" },
                            { index: 2, name: "שלישי" },
                            { index: 3, name: "רביעי" },
                            { index: 4, name: "חמישי" },
                            { index: 5, name: "שישי" },
                            { index: 6, name: "שבת" },
                          ].map((day) => (
                            <label
                              key={day.index}
                              className="flex items-center bg-white px-2 py-1 rounded border"
                            >
                              <input
                                type="checkbox"
                                checked={selectedDays.includes(day.index)}
                                onChange={() => handleDayToggle(day.index)}
                                className="mr-1"
                              />
                              <span>{day.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* תאריך סיום המחזוריות */}
                      <div>
                        <label className="block mb-1">תאריך סיום:</label>
                        <DatePicker
                          selected={recurrenceEndDate}
                          onChange={(date) => setRecurrenceEndDate(date)}
                          dateFormat="dd/MM/yyyy"
                          className="w-full border p-2 rounded"
                          placeholderText="בחר תאריך סיום"
                          minDate={date} // לא ניתן לבחור תאריך לפני תאריך ההתחלה
                        />
                      </div>

                      {/* הסבר למשתמש */}
                      <p className="text-sm text-gray-500">
                        יצירת שיעור מחזורי תוסיף שיעורים נפרדים בימים הנבחרים
                        בין תאריך ההתחלה לסיום.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* הודעת מערכת */}
              {message && <div className="text-blue-500 my-2">{message}</div>}
            </div>

            {/* כפתורי פעולה - קבועים בתחתית המודל */}
            <div className="flex justify-between mt-6 pt-4 border-t sticky bottom-0 bg-white">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                ביטול
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleSaveClass(true)}
                  className="bg-blue-600 text-white px-2 py-2 rounded"
                  disabled={loading}
                >
                  {loading
                    ? "שומר..."
                    : isRecurring && !editingClassId
                    ? "צור וסגור"
                    : "שמור וסגור"}
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSaveClass(false)}
                  className="bg-blue-500 text-white px-5 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "שומר..." : "שמור"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* חלון אישור מחיקה */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">אישור מחיקה</h2>
            <p>האם אתה בטוח שברצונך למחוק את השיעור?</p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded flex items-center"
              >
                <X size={18} className="mr-1" />
                ביטול
              </button>
              <button
                onClick={handleDeleteClass}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center"
                disabled={loading}
              >
                {loading ? (
                  "מוחק..."
                ) : (
                  <>
                    <Trash2 size={18} className="mr-1" />
                    מחק
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* חלון אישור מחיקה מרובה */}
      {showBulkDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">אישור מחיקה מרובה</h2>
            <p>
              האם אתה בטוח שברצונך למחוק {selectedClasses.length} שיעורים
              מסומנים?
            </p>
            <p className="text-red-500 text-sm mt-2">
              שים לב: פעולה זו אינה ניתנת לביטול!
            </p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowBulkDeleteConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded flex items-center"
              >
                <X size={18} className="mr-1" />
                ביטול
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center"
                disabled={loading}
              >
                {loading ? (
                  "מוחק..."
                ) : (
                  <>
                    <Check size={18} className="mr-1" />
                    מחק {selectedClasses.length} שיעורים
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClassesPanel;
