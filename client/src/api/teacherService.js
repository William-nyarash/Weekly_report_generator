import api from "./axios";

export const getTeachers = async () => {
  const { data } = await api.get("/teacher");

  return data.data;
};
export const createTeacher = async (teacherInfo) => {
  console.log( "the teachers info is ", teacherInfo)
  const data = await api.post("/teacher", teacherInfo)

  return data
}