import React, { useState, useEffect, useMemo } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import MainLayout from "../components/MainLayout";
import ClassCard from "../components/ClassCard";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { FiX, FiTrash2 } from "react-icons/fi";

// טבלת שיעורים עבור מנהל ומדריך
const AdminClassesTable = ({ classes = [], onRowClick }) => {

/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
/**
 * TODO: תאר את הפונקציה return
 */
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2 text-right">תאריך</th>
          <th className="border border-gray-300 p-2 text-right">שעה</th>
          <th className="border border-gray-300 p-2 text-right">מדריך</th>
          <th className="border border-gray-300 p-2 text-right">נרשמו</th>
        </tr>
      </thead>
      <tbody>
        {classes.map((cls) => (
          <tr
            key={cls.id}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onRowClick(cls)}
          >
            <td className="border border-gray-300 p-2 text-right">{cls.date}</td>
            <td className="border border-gray-300 p-2 text-right">{cls.time}</td>
            <td className="border border-gray-300 p-2 text-right">{cls.instructor}</td>
            <td className="border border-gray-300 p-2 text-right">{cls.participantsCount || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// מודל ניהול שיעור למנהל/מדריך: מחיקה ו-הסרת משתתף
const AdminClassModal = ({ cls, onClose, refresh, handleRemoveParticipant }) => {
  if (!cls) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{cls.name}</h2>
        <p><strong>תאריך:</strong> {cls.date}</p>
        <p><strong>שעה:</strong> {cls.time}</p>
        <p><strong>מדריך:</strong> {cls.instructor}</p>
        <p className="mb-4"><strong>מספר נרשמים:</strong> {cls.participantsCount || 0}</p>

        <h3 className="text-lg font-semibold mb-2">נרשמים לשיעור:</h3>
        <ul className="max-h-60 overflow-y-auto mb-4 border border-gray-300 rounded p-2">
          {(cls.participants || []).length === 0 && <p>אין משתתפים כרגע</p>}
          {(cls.participants || []).map((participant) => (
            <li key={participant.id} className="flex justify-between items-center py-1 border-b border-gray-200">
              <span>{participant.userName || participant.userId}</span>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleRemoveParticipant(participant.id)}
                title="הסר משתתף מהשיעור"
              >
                <FiTrash2 size={18} />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          סגור <FiX className="inline-block ml-1" />
        </button>
      </div>
    </div>
  );
};

const HomePage = ({ employee }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [participantsMap, setParticipantsMap] = useState({});
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userData } = useUser();

  const isAdmin =
    userData?.isAdmin || userData?.role === "admin" || userData?.role === "מנהל";
  const isInstructor =
    userData?.isInstructor ||
    userData?.role === "instructor" ||
    userData?.role === "מדריך";
  const isRegularUser = !isAdmin && !isInstructor;

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await fetchClasses();
      await fetchUserBookings();
      await fetchAllParticipants();
      setLoading(false);
    };
    loadAllData();
  }, [employee, refreshFlag]);

  // טעינת כל השיעורים
  const fetchClasses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "classes"));
      const classesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllClasses(classesData);
    } catch (error) {
      console.error("Error loading classes", error);
    }
  };

  // טעינת כל ההרשמות (למשתמש או לכולם בהתאם לתפקיד)
  const fetchUserBookings = async () => {
    try {
      const bookingsRef = collection(db, "bookings");
      let q;
      if (isRegularUser) {
        q = query(bookingsRef, where("userId", "==", employee.phone));
      } else {
        q = query(bookingsRef);
      }
      const snapshot = await getDocs(q);
      const bookingsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error loading bookings", error);
    }
  };

  // מיפוי שיעורים לנרשמים
  const fetchAllParticipants = async () => {
    try {
      const bookingsRef = collection(db, "bookings");
      const snapshot = await getDocs(bookingsRef);
      const bookingsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const map = {};
      for (const booking of bookingsData) {
        if (!map[booking.classId]) map[booking.classId] = [];
        map[booking.classId].push(booking);
      }

      setParticipantsMap(map);
    } catch (error) {
      console.error("Error loading participants", error);
    }
  };

  // ביטול הרשמה (למתאמנים)
  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      toast.success("ההרשמה בוטלה בהצלחה");
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      toast.error("שגיאה בביטול ההרשמה");
    }
  };

  // הסרת משתתף מהשיעור (למנהל ומדריך)
  const handleRemoveParticipant = async (bookingId) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      toast.success("המשתמש הוסר מהשיעור");
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      toast.error("שגיאה בהסרת המשתמש");
    }
  };
  const isClassInCurrentOrNextWeek = (classDateStr) => {
    const [day, month, year] = classDateStr.split("/").map(Number);
    const classDate = new Date(year, month - 1, day);
  
    const today = new Date();
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(today.getDate() - today.getDay()); // ראשון
  
    const endOfNextWeek = new Date(startOfThisWeek);
    endOfNextWeek.setDate(startOfThisWeek.getDate() + 13); // שבת בשבוע הבא
  
    return classDate >= startOfThisWeek && classDate <= endOfNextWeek;
  };
  

  // סינון שיעורים לפי תפקיד
  let visibleClasses = allClasses.filter((cls) =>
    isClassInCurrentOrNextWeek(cls.date)
  );
  if (isInstructor) {
    visibleClasses = visibleClasses.filter((cls) => cls.instructorId === employee.phone);
  }
  



  // הוספת מספר נרשמים לכל שיעור
  const classesWithParticipantsCount = visibleClasses
  .map((cls) => ({
    ...cls,
    participantsCount: participantsMap[cls.id]?.length || 0,
    participants: participantsMap[cls.id] || [],
  }))
  .sort((a, b) => {
    const dateA = new Date(`${a.date.split("/").reverse().join("-")}T${a.time}`);
    const dateB = new Date(`${b.date.split("/").reverse().join("-")}T${b.time}`);
    return dateA - dateB;
  });


  // למתאמנים: לסנן רק שיעורים שהם רשומים אליהם
  const userBookingClassIds = bookings.map((b) => b.classId);
  const userBookings = bookings.filter((b) => userBookingClassIds.includes(b.classId));

  return (
    <MainLayout employee={employee}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">
          {isAdmin
            ? "כל השיעורים במערכת"
            : isInstructor
            ? "השיעורים שלי"
            : "השיעורים שלי"}
        </h1>

        {(isAdmin || isInstructor) && (
          <>
            <AdminClassesTable classes={classesWithParticipantsCount} onRowClick={setSelectedClass} />

            {selectedClass && (
              <AdminClassModal
                cls={selectedClass}
                onClose={() => setSelectedClass(null)}
                refresh={() => setRefreshFlag(!refreshFlag)}
                handleRemoveParticipant={handleRemoveParticipant}
              />
            )}
          </>
        )}

        {isRegularUser && (
          <>
            {userBookings.length === 0 && <p>לא נמצאו שיעורים רשומים.</p>}
            {userBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <ClassCard
                  classInfo={allClasses.find((cls) => cls.id === booking.classId)}
                  employee={employee}
                  userData={userData}
                  isAlreadyBooked={true}
                  refreshBookings={() => setRefreshFlag(!refreshFlag)}
                  isPastClass={(bookingDate, bookingTime) => {
                    const classDateTime = new Date(
                      `${bookingDate.split("/").reverse().join("-")}T${bookingTime}`
                    );
                    return classDateTime < new Date();
                  }}
                  handleCancelBooking={() => handleCancelBooking(booking.id)}
                />
              </motion.div>
            ))}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default HomePage;
