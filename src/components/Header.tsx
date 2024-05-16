import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import image from "../images/ScholaGateIcon.png";

function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current!.classList.toggle("responsive_nav");
  };

  const isAdmin = localStorage.getItem("usuario") === "Admin";

  const handleAdminClick = () => {
    navigate("/home");
  };

  return (
    <header>
      <h3>
        <a href="http://localhost:5173/">
          <img src={image} alt="" />
        </a>
      </h3>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      {isAdmin && (
        <button className="admin-btn" onClick={handleAdminClick}>
          Modo Administrador
        </button>
      )}{" "}
      {/* El botón solo se renderiza si isAdmin es true */}
    </header>
  );
}

export default Navbar;
