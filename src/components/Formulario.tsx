import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { cambioContraseña } from "../services/authService";

export function Formulario({ setIsPasswordSet }) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const urlPath = window.location.pathname;
    const lastSegment = urlPath.substring(urlPath.lastIndexOf("/") + 1);

    if (password === repeatPassword) {
      await cambioContraseña(password, lastSegment);
      setIsPasswordSet(true);
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block text-center">
          <Label htmlFor="password2" value="Nueva contraseña" />
        </div>
        <TextInput
          id="password2"
          type="password"
          required
          shadow
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block text-center">
          <Label htmlFor="repeat-password" value="Repita la nueva contraseña" />
        </div>
        <TextInput
          id="repeat-password"
          type="password"
          required
          shadow
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Registrar</Button>
    </form>
  );
}
