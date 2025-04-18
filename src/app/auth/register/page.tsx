"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

const EMAIL_REDIRECT_URL = 'http://localhost:3000/auth/login';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      // Verifica si el email ya está registrado
      const checkResponse = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!checkResponse.ok) {
        const { error: checkError } = await checkResponse.json();
        console.error('Error verificando email:', checkError);
        setError("Error verificando email. Intenta más tarde.");
        setLoading(false);
        return;
      }

      const { exists } = await checkResponse.json();
      if (exists) {
        setError("El email ya está registrado");
        setLoading(false);
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: EMAIL_REDIRECT_URL },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        alert("¡Registro exitoso! Revisa tu correo y confirma tu cuenta.");
        router.push('/auth/login');
      }
    } catch (err) {
      console.error('Register error:', err);
      setError("Error al registrarse, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-[#121212] to-[#0f0f0f]">
      <Card className="w-full max-w-md border-0 bg-gray-900 text-white">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Logo de Cappsy" width={120} height={120} />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Ingresa tus datos para registrarte en Cappsy
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-600 bg-red-600/20 text-red-100">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nombre completo</Label>
              <Input
                id="name"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-700 bg-gray-800 text-white placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-700 bg-gray-800 text-white placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-700 bg-gray-800 text-white placeholder-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-white">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-700 bg-gray-800 text-white placeholder-gray-500"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Registrando...</>
              ) : (
                'Registrarse'
              )}
            </Button>
          </form>
        </CardContent>

        <div className="text-center p-4 text-sm text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/auth/login" className="font-medium text-white hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </Card>
    </div>
  );
}