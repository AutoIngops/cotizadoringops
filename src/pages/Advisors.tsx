import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialQuotations = [
  {
    advisor: "Juan",
    client: "Rosa Melano",
    service: "Desarrollo Web",
    plan: "E-Commerce",
    extras: "Extra 1",
    time: "15 Días",
    cost: 1300000, // E-commerce (1,200,000) + Extra 1 (100,000)
  },
];

const Advisors = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [quotations, setQuotations] = useState(initialQuotations);

  const filteredQuotations = selectedAdvisor
    ? quotations.filter((q) => q.advisor === selectedAdvisor)
    : quotations;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav className="space-y-2">
          <a href="/dashboard" className="block p-2 rounded-md hover:bg-muted">
            Inicio
          </a>
          <a href="/quotations" className="block p-2 rounded-md hover:bg-muted">
            Cotizaciones
          </a>
          <a href="/advisors" className="block p-2 rounded-md bg-primary/10 text-primary">
            Asesores
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cotizaciones por Asesor</h1>
          <Select
            options={["Juan", "Daniel", "Nicolás"]}
            value={selectedAdvisor}
            onChange={setSelectedAdvisor}
            placeholder="Filtrar por asesor"
            className="w-48"
          />
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asesor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Extras</TableHead>
                <TableHead>Tiempo</TableHead>
                <TableHead>Costo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.map((quotation, index) => (
                <TableRow key={index}>
                  <TableCell>{quotation.advisor}</TableCell>
                  <TableCell>{quotation.client}</TableCell>
                  <TableCell>{quotation.service}</TableCell>
                  <TableCell>{quotation.plan}</TableCell>
                  <TableCell>{quotation.extras}</TableCell>
                  <TableCell>{quotation.time}</TableCell>
                  <TableCell>${quotation.cost.toLocaleString()} COP</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Advisors;