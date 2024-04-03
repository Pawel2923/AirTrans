import { Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
	return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
	);
}
