import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: isSignIn ? "Inicio de sesión exitoso" : "Registro exitoso",
      description: "Bienvenido al sistema",
    });
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{isSignIn ? "Iniciar Sesión" : "Crear Cuenta"}</h2>
          <p className="text-muted-foreground">
            {isSignIn ? "Bienvenido de vuelta" : "Registra tus datos para comenzar"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input type="email" placeholder="Correo electrónico" required />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Contraseña" required />
          </div>
          <Button type="submit" className="w-full">
            {isSignIn ? "Iniciar Sesión" : "Registrarse"}
          </Button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isSignIn ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>

      <div className="auth-hero">
        <h1 className="text-4xl font-bold text-center">¡Hola!</h1>
        <p className="text-center max-w-md">
          {isSignIn
            ? "Nos alegra verte de nuevo. Accede a tu cuenta para gestionar tus cotizaciones."
            : "Únete a nosotros y comienza a gestionar tus cotizaciones de manera eficiente."}
        </p>
        <Button
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-primary"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {isSignIn ? "Crear cuenta" : "Iniciar sesión"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;