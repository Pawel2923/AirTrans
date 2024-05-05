import { Routes, Route, createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Ogloszenia from "./pages/Ogloszenia";
import NotFound from "./pages/NotFound";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import ZarzadzanieP from "./pages/Manager/zarzadzaniePojazd";
import EditCarPage from "./pages/Manager/editCarPage";
import Schedule from "./pages/Manager/Schedule";
import ScheduleDetails from "./pages/Manager/ScheduleDetails";
import ScheduleEdit from "./pages/Manager/ScheduleEdit";
import Airplanes from "./pages/Manager/Airplanes";
import AirplaneEdit from "./pages/Manager/AirplaneEdit";
import Manager from "./pages/Manager";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
	return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="home/ogloszenia" element={<Ogloszenia />} />
      <Route path="logowanie" element={<Logowanie />} />
      <Route path="rejestracja" element={<Rejestracja />} />
      <Route path="/zarzadzanie" element={<Manager />}>
        <Route index element={<Navigate to="/zarzadzanie/harmonogram" />} />
        <Route path="harmonogram">
          <Route index element={<Schedule />} />
          <Route path=":id" element={<ScheduleDetails />} />
          <Route path=":id/edytuj" element={<ScheduleEdit />} />
        </Route>
        <Route path="samoloty">
          <Route index element={<Airplanes />} />
          <Route path=":id/edytuj" element={<AirplaneEdit />} />
        </Route>
        <Route path="zarzadzaniePojazd" element={<ZarzadzanieP />} />
        <Route path="edit-car/:id" element={<EditCarPage />} />
        <Route path="*" element={<Navigate to="/zarzadzanie/harmonogram" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
	);
}
