import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, isAfter, isBefore, addHours } from "date-fns";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const projects = [
  { name: "Landing Page maestro espiritual", date: new Date() },
  { name: "Página Web abogados", date: new Date(Date.now() + 86400000) },
  { name: "Página Web agencia de viajes", date: new Date("2024-11-18") },
  { name: "Página Web Ingops", date: new Date("2024-11-23") },
  { name: "Nuevo E-commerce", date: new Date("2024-11-30") },
];

const getStatusColor = (date: Date) => {
  const now = new Date();
  const in24Hours = addHours(now, 24);
  const in72Hours = addHours(now, 72);

  if (isBefore(date, in24Hours)) return "text-destructive";
  if (isBefore(date, in72Hours)) return "text-primary";
  return "text-green-500";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const completedProjects = parseInt(localStorage.getItem("completedProjects") || "0");

  const handleLogout = () => {
    navigate("/auth");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar flex flex-col justify-between">
        <div className="space-y-6">
          <div className="text-center py-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Janus
            </h1>
          </div>
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-2 rounded-md bg-primary/10 text-primary">
              Inicio
            </a>
            <a href="/quotations" className="block p-2 rounded-md hover:bg-muted">
              Cotizaciones
            </a>
            <a href="/advisors" className="block p-2 rounded-md hover:bg-muted">
              Asesores
            </a>
          </nav>
        </div>
        <Button 
          variant="ghost" 
          className="w-full mb-4 flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </Button>
      </aside>

      <main className="main-content">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold">¡Hola, Juan!</h1>
          <p className="text-muted-foreground">Bienvenido de vuelta</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card className="stat-card text-center p-8">
            <h3 className="text-lg font-medium mb-4">Proyectos Completados</h3>
            <p className="text-5xl font-bold text-primary mb-4">{completedProjects}</p>
            <Button variant="outline" className="w-full">
              Ver más
            </Button>
          </Card>

          <Card className="stat-card p-8">
            <h3 className="text-lg font-medium mb-4">Proyectos Pendientes</h3>
            <div className="divide-y">
              {projects.map((project, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="font-medium">{project.name}</span>
                  <span className={getStatusColor(project.date)}>
                    {format(project.date, "dd/MM/yyyy")}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card className="stat-card p-8">
            <h3 className="text-lg font-medium">Campo para nuevo Ítem 1</h3>
            <p className="text-muted-foreground">Lorem Ipsum</p>
          </Card>

          <Card className="stat-card p-8">
            <h3 className="text-lg font-medium">Campo para nuevo Ítem 2</h3>
            <p className="text-muted-foreground">Lorem Ipsum</p>
          </Card>

          <Card className="stat-card p-8">
            <h3 className="text-lg font-medium">Campo para nuevo Ítem 3</h3>
            <p className="text-muted-foreground">Lorem Ipsum</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;