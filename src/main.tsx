import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "./index.css";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/PasswordPage";
import LogInPage from "./pages/LogInPage";
import PasswordPage from "./pages/PasswordPage";

const rootContainer = document.getElementById("root");

const PassWordPageWrapper = () => {
  const { subroute } = useParams();
  console.log(subroute); // Aquí puedes ver la ruta capturada
  return <PasswordPage />;
};

createRoot(rootContainer).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/passwd/*" element={<PassWordPageWrapper />} />
        <Route path="/admin/*" element={<AdminPage />} />

        {/* Añade más rutas aquí si es necesario */}
      </Routes>
    </Router>
  </React.StrictMode>,
);
