import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Ogloszenia from "./pages/Ogloszenia";
import NotFound from "./pages/NotFound";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import Schedule from "./pages/Schedule";

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
      <Route path="/harmonogram" element={<Schedule />} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
	);
}
