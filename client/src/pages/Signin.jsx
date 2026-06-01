import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { Link, useNavigate } from "react-router-dom";

import logo from "@/assets/images/logo.png";

import { showToast } from "../helpers/showToast";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import GoogleLogin from "../components/GoogleLogin";
import { setUser } from "../redux/user/user.slice";

const SignIn = () => {
  const dispath = useDispatch()
  // 1. Definir el esquema de validación
  const navigate = useNavigate()
  
  const formSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "Mínimo 8 caracteres" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Función de envío
  async function onSubmit(values) {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST", // En mayúsculas por convención
        headers: { "Content-type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        // 3. Cambiado el mensaje genérico de "registro" a "inicio de sesión"
        return showToast("error", data.message);
      }
      dispath(setUser(data.user))
      showToast("success", data.message);
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-50">
      <Card className="w-[400px] p-5">
        <div className="flex justify-center items-center mb-2">
          <Link to={RouteIndex}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-center mb-5">
          Control de Acceso
        </h1>

        <div className=''>
          <GoogleLogin />
          <div className='border my-5 flex justify-center items-center'>
              <span className='absolute bg-white text-sm'>O</span>
          </div>
        </div>

        {/* El componente Form ahora sí recibe la variable 'form' definida arriba */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su Correo Electrónico"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ingrese su Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <Button type="submit" className="w-full">
                Acceder
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>¿ No tienes una cuenta ?</p>
                <Link
                  className="text-blue-500 hover:underline"
                  to={RouteSignUp}
                >
                  {" "}
                  Registrese{" "}
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};;

export default SignIn;
