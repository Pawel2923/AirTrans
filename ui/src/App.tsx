import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Ogloszenia from "./pages/Ogloszenia";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
	return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/ogloszenia" element={<Ogloszenia />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
	);
}
