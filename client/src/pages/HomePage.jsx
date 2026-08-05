import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TeacherForm from "../components/TeacherForm";
import { createTeacher } from "../api/teacherService";

export default function HomePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [teacher, setTeacher] = useState({
    full_name: "",
    course: "",
    level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !teacher.full_name ||
      !teacher.course ||
      !teacher.level
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await createTeacher(teacher);

      const teacherId =
        response?.data?.data?.id ??
        response?.id;

      navigate(`/teacher/${teacherId}/report`, 
    {
      state: {
        teacherName:teacher.full_name,
        level: teacher.level
      }
    }
      );
    } catch (err) {
      console.error(err);
      alert("Unable to create teacher.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <TeacherForm
        teacher={teacher}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}