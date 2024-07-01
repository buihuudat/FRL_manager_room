import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import Dashboard from "./page/Dashboard";
import LocationPage from "./page/LocationPage";
import UserPage from "./page/UserPage";
import BookingPage from "./page/BookingPage";
import RoomPage from "./page/RoomPage";

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/rooms" element={<RoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
