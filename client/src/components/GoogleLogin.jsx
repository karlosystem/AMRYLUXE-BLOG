import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";

// === AQUÍ ESTABAN LOS ERRORES: FALTABAN ESTOS IMPORTS ===
import { showToast } from "../helpers/showToast";
import { RouteIndex } from "@/helpers/RouteName";
import { setUser } from "../redux/user/user.slice";
import { useDispatch } from "react-redux";


const GoogleLogin = () => {
  const dispath = useDispatch()
  const navigate = useNavigate()
  
  const handleLogin = async () => {
    const googleResponse = await signInWithPopup(auth, provider);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const user = googleResponse.user
      const bodyData = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL
      }
      const response = await fetch(`${baseUrl}/auth/google-login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message || "Error al iniciar sesión");
      }
      dispath(setUser(data.user))
      showToast("success", data.message || "¡Bienvenido!");
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", "Error de conexión con el servidor");
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle />
      Continuar con Google
    </Button>
  );
};

export default GoogleLogin;