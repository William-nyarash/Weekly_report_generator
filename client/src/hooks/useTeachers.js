import { useEffect, useState } from "react";
import { getTeachers } from "../api/teacherService";

const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTeachers();

      setTeachers(response);

    } catch (err) {
      setError(
        err.response?.data?.message || err.message
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    let mounted = true;

    const loadTeachers = async () => {
      try {
        const response = await getTeachers();

        if (mounted) {
          setTeachers(response);
        }

      } catch (err) {

        if (mounted) {
          setError(
            err.response?.data?.message || err.message
          );
        }

      } finally {

        if (mounted) {
          setLoading(false);
        }

      }
    };


    loadTeachers();


    return () => {
      mounted = false;
    };

  }, []);


  return {
    teachers,
    loading,
    error,
    refresh: fetchTeachers,
  };
};

export default useTeachers;