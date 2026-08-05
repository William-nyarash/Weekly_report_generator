import api from "./axios";

export const createReport = async (report) => {
  const { data } = await api.post("/reports", report);

  return data.data
};

export const createAttendance = async (report_id, attendance )  => {

  const {data } = await api.post(`/reports/${report_id}/attendance`,{
    attendance
  })
  return data;
}
export const downloadPDF = async (reportId, teacherName, level) => {
  const response = await api.get(`/reports/${reportId}/pdf`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(
    new Blob([response.data], {
      type: "application/pdf",
    })
  );

  const link = document.createElement("a");

  link.href = url;

  const safeTeacherName = (teacherName ?? "Teacher").replace(
    /[<>:"/\\|?*]/g,
    ""
  );

  const safeLevel = (level ?? "Class").replace(
    /[<>:"/\\|?*]/g,
    ""
  );

  link.download = `${safeTeacherName} ${safeLevel}.pdf`;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};