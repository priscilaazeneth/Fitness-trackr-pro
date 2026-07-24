import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetailsPage from "./activities/ActivityDetailsPage";
import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetailsPage from "./routines/RoutineDetailsPage";
import Error404 from "./Error404.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="activities/:activityId" element={<ActivityDetailsPage />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="routines/:routineId" element={<RoutineDetailsPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}