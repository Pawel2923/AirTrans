import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Ogloszenia from "./pages/Ogloszenia";
import NotFound from "./pages/NotFound";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import ZarzadzanieP from "./pages/zarzadzaniePojazd";
import EditCarPage from "./pages/editCarPage";


const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
	return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/ogloszenia" element={<Ogloszenia />} />
      <Route path="/logowanie" element={<Logowanie />} />
      <Route path="/rejestracja" element={<Rejestracja />} />
      <Route path="/zarzadzaniePojazd" element={<ZarzadzanieP />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/edit-car/:id" element={<EditCarPage />} />

      
    </Routes>
	);
}
