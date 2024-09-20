import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PageNotFound } from "./shared/components/PageNotFound";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AllReservation from "./pages/reservation/AllReservation";
import AllTablePage from "./pages/table/AllTablePage";
import ReservationStatus from "./pages/reservation/reservationStatus/ReservationStatus";
import PrivateWrapper from "./routers/route.config";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateWrapper />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservations" element={<AllReservation />} />
            <Route path="/reservations/status" element={<ReservationStatus />} />
            <Route path="/tables" element={<AllTablePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
