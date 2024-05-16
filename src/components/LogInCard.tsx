import { Card } from "flowbite-react";
import TextField from "./TextField";
import App from "./LogInButton";
import image from "../images/ScholaGateIcon.png";
import { HiMail, HiLockClosed } from "react-icons/hi";
import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { getUsuarioActual } from "../services/authService"; // Asegúrate de importar getUsuarioActual

const LogInCard = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Iniciar Sesión");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nombre || !password) {
      alert("El nombre y la contraseña son obligatorios.");
      // Aquí utilizamos setTimeout para esperar 2 segundos antes de cambiar el estado de isProcessing y el texto del botón
      setTimeout(() => {
        setButtonText("Iniciar Sesión");
        setIsProcessing(false);
      }, 2000);
      return;
    }
    if (nombre.length < 3) {
      alert("El nombre debe tener más de 3 caracteres.");
      // Aquí también utilizamos setTimeout para esperar 2 segundos antes de cambiar el estado de isProcessing y el texto del botón
      setTimeout(() => {
        setButtonText("Iniciar Sesión");
        setIsProcessing(false);
      }, 2000);
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener más de 6 caracteres.");
      // Aquí también utilizamos setTimeout para esperar 2 segundos antes de cambiar el estado de isProcessing y el texto del botón
      setTimeout(() => {
        setButtonText("Iniciar Sesión");
        setIsProcessing(false);
      }, 2000);
      return;
    }

    // Antes de comenzar el proceso de inicio de sesión, establece isProcessing en true
    setIsProcessing(true);
    setButtonText("Iniciando Sesión...");

    // Aquí puedes añadir más comprobaciones para la contraseña y otros campos si lo necesitas

    try {
      const message = await login(nombre, password);
      console.log(message);
      localStorage.setItem("jwt", message);
      const usuario = await getUsuarioActual(message);
      console.log(usuario);
      localStorage.setItem("usuario", usuario.rol);
      // Cambia el texto del botón a un mensaje estático
      setButtonText("Inicio de sesión exitoso");

      setTimeout(() => {
        setIsProcessing(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Usuario o contraseña incorrectos.");
      setTimeout(() => {
        setButtonText("Iniciar Sesión");
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="z-1 m-2 flex justify-center">
      <Card
        className="max-w-xs sm:max-w-6xl"
        imgSrc={image}
        imgClassName="w-full h-full object-cover card-img" // Añade la clase aquí
        horizontal
      >
        <div className="mx-auto mt-0 flex h-full flex-col items-center justify-center space-y-4 sm:items-start md:items-center">
          <TextField
            className="z-1 m-2"
            placeholderText="mail"
            title="Introduce tu correo electrónico"
            icon={HiMail}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            className="z-1 m-2"
            placeholderText="password"
            title="Contraseña"
            icon={HiLockClosed}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <App
            className="z-1 m-2"
            onClick={handleLogin}
            buttonText={buttonText}
            isProcessing={isProcessing}
          />
        </div>
      </Card>
    </div>
  );
};

export default LogInCard;
