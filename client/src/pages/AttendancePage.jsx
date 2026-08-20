import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AttendanceForm from "../components/AttendanceForm";
import useReport from "../hooks/useReport";
import { downloadPDF } from "../api/reportService";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export default function AttendancePage() {
  const navigate = useNavigate();
  const location = useLocation()
  const { reportId } = useParams();

console.log(location.state);
console.log({ teacherName, level });

  const { submitAttendance, loading } = useReport();
  const { teacherName, level } = location.state || {};
  const [attendance, setAttendance] = useState(
    DAYS.map((day) => ({
      day_name: day,
      present_students: "",
      absent_students: "",
      teacher_comment: "",
    }))
  );

  const handleChange = (index, field, value) => {
    setAttendance((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = attendance.map((day) => ({
      ...day,
      present_students: Number(day.present_students || 0),
      absent_students: Number(day.absent_students || 0),
    }));

    const result = await submitAttendance(reportId, payload);

    if (!result.success) {
      alert(result.message);
      return;
    }
    alert("Weekly report submitted successfully. Download starting soon");
    await downloadPDF(reportId, teacherName ,level)

    navigate("/");
  };

  return (
    <div className="w-[90%] max-w-260 mx-auto">
      <AttendanceForm
        attendance={attendance}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}