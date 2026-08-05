import { Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";
import HomePage from "../pages/HomePage";
import ReportPage from "../pages/ReportPage";
import AttendancePage from "../pages/AttendancePage";

export default function AppRouter() {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/teacher/:teacherId/report"
            element={<ReportPage />}
          />
          <Route
            path="/report/:reportId/attendance"
            element={<AttendancePage />}
          />
        </Route>
      </Routes>
 );
}