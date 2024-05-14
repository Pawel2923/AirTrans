import {
	Routes,
	Route,
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Ogloszenia from "./pages/Ogloszenia";
import NotFound from "./pages/NotFound";
import Logowanie from "./pages/Logowanie";
import Rejestracja from "./pages/Rejestracja";
import ZarzadzanieP from "./pages/Manager/zarzadzaniePojazd";
import EditRentPage from "./pages/Manager/editRentPage";
import ParkingPage from "./pages/Manager/ParkingPage";
import EditParkingPage from "./pages/Manager/editParkingPage";
import EditCarPage from "./pages/Manager/editCarPage";
import Schedule from "./pages/Manager/Schedule";
import ScheduleDetails from "./pages/Manager/ScheduleDetails";
import ScheduleEdit from "./pages/Manager/ScheduleEdit";
import AirplanesPage from "./pages/Manager/AirplanesPage";
import AirplaneEdit from "./pages/Manager/AirplaneEdit";
import OgloszeniaZ from "./pages/Manager/ogloszeniaPage";
import OgloszeniaEdit from "./pages/Manager/editOgloszeniaPage";
import Manager from "./pages/Manager";
import Airfield from "./pages/Manager/Airfield";
import AuthProvider from "./store/AuthProvider";
import Forbidden from "./pages/Forbidden";
import InternalServerError from "./pages/InternalServerError";
import ErrorBoundary from "./pages/ErrorBoundary";
import AirfieldEdit from "./pages/Manager/AirfieldEdit";
import UsersPage from "./pages/Manager/UsersPage";

const router = createBrowserRouter([{ path: "*", Component: Root, errorElement: <ErrorBoundary /> }]);

export default function App() {
	return <RouterProvider router={router} />;
}

function Root() {
	return (

		<AuthProvider>
			<Routes>
				<Route index element={<Home />} />
				<Route path="ogloszenia" element={<Ogloszenia />} />
				<Route path="logowanie" element={<Logowanie />} />
				<Route path="rejestracja" element={<Rejestracja />} />
				<Route path="zarzadzanie" element={<Manager />}>
					<Route
						index
						element={<Navigate to="/zarzadzanie/harmonogram" />}
					/>
					<Route path="harmonogram">
						<Route index element={<Schedule />} />
						<Route path=":id" element={<ScheduleDetails />} />
						<Route path=":id/edytuj" element={<ScheduleEdit />} />
					</Route>
					<Route path="samoloty">
						<Route index element={<AirplanesPage />} />
						<Route path=":id/edytuj" element={<AirplaneEdit />} />
					</Route>
					<Route path="pojazd">
						<Route index element={<ZarzadzanieP />} />
						<Route path="edit-car/:id" element={<EditCarPage />} />
						<Route
							path="edit-rent/:id"
							element={<EditRentPage />}
						/>
					</Route>
					<Route path="parking">
						<Route index element={<ParkingPage />} />
						<Route
							path="edit-parking/:id"
							element={<EditParkingPage />}
						/>
					</Route>
          <Route path="ogloszenia">
          <Route index element={<OgloszeniaZ />} />
          <Route 
            path="edit-ogloszenia/:id" 
            element={<OgloszeniaEdit />} 
            />
           </Route>
					<Route path="lotnisko">
						<Route index element={<Airfield />} />
						<Route path=":table/:id/edytuj" element={<AirfieldEdit />} />
					</Route>
					<Route path="uzytkownicy">
						<Route index element={<UsersPage />} />
					</Route>
					<Route
						path="*"
						element={<Navigate to="/zarzadzanie/harmonogram" />}
					/>
				</Route>
				<Route path="zabronione" element={<Forbidden />} />
				<Route path="blad" element={<InternalServerError />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthProvider>
	);
}
