// src/components/BackToAdminButton.jsx
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BackToAdminButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/admin")}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-full shadow-sm text-sm transition"
    >
      <ArrowRight size={16} />
      חזרה ללוח הניהול
    </button>
  );
};

export default BackToAdminButton;
