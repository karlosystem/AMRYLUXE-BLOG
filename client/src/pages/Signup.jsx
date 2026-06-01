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
import { RouteSignIn } from "@/helpers/RouteName";

//useNavigate se usa para redireccionar por código (por ejemplo, después de que el registro fue exitoso).
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getEnv } from "../helpers/getEnv";
import { showToast } from "../helpers/showToast";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "../components/GoogleLogin";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/user.slice";
const SignUp = () => {
  const dispath = useDispatch()
  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(2, { message: "El nombre es obligatorio" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "Mínimo 8 caracteres" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST", // En mayúsculas por convención
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
      }
      showToast("success", data.message);
      navigate(RouteSignIn);
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Crear una Cuenta de Usuario
        </h1>
        <div className="">
          <GoogleLogin />
          <div className="border my-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm">o</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su Correo Electronico"
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
                        placeholder="Ingrese su password"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ingrese su Password Otra Vez"
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
                Registrarse
              </Button>
              <div className="mt-5 text-sm flex justify-center items-center gap-2">
                <p>¿Ya tienes una cuenta de acceso?</p>
                <Link
                  className="text-blue-500 hover:underline"
                  to={RouteSignIn}
                >
                  Ingresar
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
