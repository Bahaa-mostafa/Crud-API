import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../page/homePage";
import NotFound from "../page/NotFound";

import LoginForm from "../features/auth/ui/LoginForm";
import RegisterForm from "../features/auth/ui/RegisterForm";
import ProtectedRoute from "../features/auth/routes/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;