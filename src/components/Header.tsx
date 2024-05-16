import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import image from "../images/ScholaGateIcon.png";
import { useLocation } from "react-router-dom";

function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const showNavbar = () => {
    navRef.current!.classList.toggle("responsive_nav");
  };

  const isAdmin = localStorage.getItem("usuario") === "Admin";

  const handleButtonClick = () => {
    if (location.pathname === "/admin") {
      navigate("/home");
    } else {
      navigate("/admin");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h3>
          <a href="http://localhost:5173/">
            <img src={image} alt="" />
          </a>
        </h3>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </div>
      {isAdmin && (
        <button className="admin-btn" onClick={handleButtonClick}>
          {location.pathname === "/admin"
            ? "Modo Estandar"
            : "Modo Administrador"}
        </button>
      )}
      {localStorage.getItem("jwt") && (
        <button onClick={handleLogout}>Cerrar sesión</button>
      )}{" "}
    </header>
  );
}
export default Navbar;
