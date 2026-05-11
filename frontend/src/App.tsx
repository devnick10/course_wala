import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import "./App.css";

import { AuthLayout } from "@/layouts/auth-layout";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { MainLayout } from "@/layouts/main-layout";

import { Home } from "@/pages/home/home-page";

import { LoginPage } from "@/pages/auth/login-page";
import { RegisterPage } from "@/pages/auth/register-page";

import { ProtectedRoute } from "@/routes/protected-routes";
import { PublicRoute } from "@/routes/public-routes";
import { DashboardPage } from "./pages/dashboard/dashboard-page";
import { PurchasesPage } from "./pages/dashboard/purchases-page";
import { SettingsPage } from "./pages/dashboard/settings-page";
import { NotFoundPage } from "./pages/not-found";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={<Home />}
          />
        </Route>

        {/* AUTH ROUTES */}
        <Route
          element={<PublicRoute />}
        >
          <Route
            path="/auth"
            element={<AuthLayout />}
          >
            <Route
              path="login"
              element={
                <LoginPage />
              }
            />

            <Route
              path="register"
              element={
                <RegisterPage />
              }
            />
          </Route>
        </Route>

        {/* PROTECTED ROUTES */}
        <Route
          element={
            <ProtectedRoute />
          }
        >
          <Route
            path="/dashboard"
            element={
              <DashboardLayout />
            }
          >
            <Route
              index
              element={
                <DashboardPage />
              }
            />
            <Route
              path="purchases"
              element={
                <PurchasesPage />
              }
            />
            {/* <Route
              path="settings"
              element={
                <SettingsPage />
              }
            /> */}
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;