import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AllReservation from "../pages/reservation/AllReservation";
import AllTablePage from "../pages/table/AllTablePage";

export const routesConfig = [
    {
        path: "/login",
        component: <LoginPage />,
        requiresAuth: false
    },
    {
        path: "/",
        component: <HomePage />,
        requiresAuth: false
    },
    {
        path: "reservations",
        component: <AllReservation />,
        requiresAuth: true
    },
    {
        path: "/tables",
        component: <AllTablePage />,
        requiresAuth: false
    },
];
