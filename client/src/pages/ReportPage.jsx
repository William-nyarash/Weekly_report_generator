import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReportForm from "../components/ReportForm";
import useReport from "../hooks/useReport";

export default function ReportPage() {
  const navigate = useNavigate();
  const { teacherId } = useParams();

  const { submitReport, loading } = useReport();

  const [report, setReport] = useState({
    teacher_id: teacherId,
    week_start: "",
    week_end: "",
    tutors_class_attendance: "",
    new_admissions_and_dropouts: 0,
    weeks_activity_completion: "",
    weeks_activity_not_completed: "",
    aobs: "",
    assessment: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReport((prev) => ({
      ...prev,
      [name]:
        name === "new_admissions_and_dropouts"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...report,
      week_start: new Date(report.week_start).toISOString(),
      week_end: new Date(report.week_end).toISOString(),
    };

    const result = await submitReport(payload);

    if (!result.success) {
      alert(result.error);
      return;
    }

    navigate(`/report/${result.data.id}/attendance`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ReportForm
        report={report}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}