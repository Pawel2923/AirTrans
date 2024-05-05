import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Ogloszenia from "./pages/Ogloszenia";
import NotFound from "./pages/NotFound";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import ZarzadzanieP from "./pages/zarzadzaniePojazd";
import EditCarPage from "./pages/editCarPage";
import Schedule from "./pages/Schedule";
import ScheduleDetails from "./pages/ScheduleDetails";
import ScheduleEdit from "./pages/ScheduleEdit";
import Airplanes from "./pages/Airplanes";
import AirplaneEdit from "./pages/AirplaneEdit";
import EditRentPage from "./pages/editRentPage";
import ParkingPage from "./pages/ParkingPage";



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
      <Route path="harmonogram">
        <Route index element={<Schedule />} />
        <Route path=":id" element={<ScheduleDetails />} />
        <Route path=":id/edytuj" element={<ScheduleEdit />} />
      </Route>
      <Route path="samoloty">
        <Route index element={<Airplanes />} />
        <Route path=":id/edytuj" element={<AirplaneEdit />} />
      </Route>
      <Route path="/zarzadzaniePojazd" element={<ZarzadzanieP />} />
      <Route path="/edit-car/:id" element={<EditCarPage />} />
      <Route path="/edit-rent/:id" element={<EditRentPage />} />

      <Route path="/parking" element={<ParkingPage />} />

      

      <Route path="*" element={<NotFound />} />
    </Routes>
	);
}
