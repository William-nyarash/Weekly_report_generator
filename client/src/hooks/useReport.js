import { useState } from "react";
import { createAttendance, createReport } from "../api/reportService";

const useReport = () => {
  const [loading, setLoading] = useState(false);

  const submitReport = async (report) => {
    try {
      setLoading(true);

      const result =   await createReport(report);

      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    } finally {
      setLoading(false);
    }
  };

const submitAttendance = async ( reportId , attendance) => {
  try{
    setLoading(true)
    const result = await createAttendance(reportId, attendance)

    return {
      success: true, 
      data: result
    }
  } catch (error ) {
    
    return {
      success: false,
      message: error.response?.data?.message || error.message
    }
  } finally {
    setLoading(false)
  }
}

  return {
    submitReport,
    submitAttendance,
    loading,
  };
};

export default useReport;