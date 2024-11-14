import { Card } from "@/components/ui/card";
import { format, isAfter, isBefore, addHours } from "date-fns";

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
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
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
      </aside>

      <main className="main-content">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">¡Hola, Juan!</h1>
          <p className="text-muted-foreground">Bienvenido de vuelta</p>
        </div>

        <div className="stats-grid">
          <Card className="stat-card">
            <h3 className="text-lg font-medium">Proyectos Completados</h3>
            <p className="text-3xl font-bold text-primary">69</p>
          </Card>

          <Card className="stat-card">
            <h3 className="text-lg font-medium">Proyectos Pendientes</h3>
            <div className="space-y-2 mt-4">
              {projects.map((project, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{project.name}</span>
                  <span className={getStatusColor(project.date)}>
                    {format(project.date, "dd/MM/yyyy")}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="stat-card">
            <h3 className="text-lg font-medium">Campo para nuevo Ítem 1</h3>
            <p className="text-muted-foreground">Lorem Ipsum</p>
          </Card>

          <Card className="stat-card">
            <h3 className="text-lg font-medium">Campo para nuevo Ítem 2</h3>
            <p className="text-muted-foreground">Lorem Ipsum</p>
          </Card>

          <Card className="stat-card">
            <h3 className="text-lg font-medium">Campo para nuevo Ítem 3</h3>
            <p className="text-muted-foreground">Lorem Ipsum</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;