import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Quotation {
  advisor: string;
  client: string;
  service: string;
  plan: string;
  extras: string;
  time: string;
  cost: number;
}

const Advisors = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  useEffect(() => {
    // Load quotations from localStorage
    const savedQuotations = localStorage.getItem("quotations");
    if (savedQuotations) {
      setQuotations(JSON.parse(savedQuotations));
    }
  }, []);

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
          <div className="w-48">
            <Select value={selectedAdvisor} onValueChange={setSelectedAdvisor}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Filtrar por asesor" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {["Juan", "Daniel", "Nicolás"].map((advisor) => (
                  <SelectItem key={advisor} value={advisor}>
                    {advisor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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