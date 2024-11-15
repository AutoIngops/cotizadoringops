import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Quotation {
  advisor: string;
  client: string;
  company: string;
  service: string;
  plan: string;
  extraService?: string;
  extraPlan?: string;
  extras: string;
  time: string;
  cost: number;
  countryCode: string;
  phone: string;
  recommendations?: string;
  isPaid?: boolean;
}

const Advisors = () => {
  const [selectedAdvisor, setSelectedAdvisor] = useState("");
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    const savedQuotations = localStorage.getItem("quotations");
    if (savedQuotations) {
      setQuotations(JSON.parse(savedQuotations));
    }
  }, []);

  const filteredQuotations = selectedAdvisor
    ? quotations.filter((q) => q.advisor === selectedAdvisor)
    : quotations;

  const togglePaymentStatus = (index: number) => {
    const updatedQuotations = quotations.map((q, i) => {
      if (i === index) {
        return { ...q, isPaid: !q.isPaid };
      }
      return q;
    });
    setQuotations(updatedQuotations);
    localStorage.setItem("quotations", JSON.stringify(updatedQuotations));
  };

  const toggleRowExpansion = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
                <TableHead className="w-8"></TableHead>
                <TableHead>Asesor</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Extras</TableHead>
                <TableHead>Tiempo</TableHead>
                <TableHead>Costo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.map((quotation, index) => (
                <>
                  <TableRow key={index} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(index)}
                      >
                        {expandedRows.includes(index) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{quotation.advisor}</TableCell>
                    <TableCell>{quotation.client}</TableCell>
                    <TableCell>{quotation.service}</TableCell>
                    <TableCell>{quotation.plan}</TableCell>
                    <TableCell>{quotation.extras}</TableCell>
                    <TableCell>{quotation.time}</TableCell>
                    <TableCell>${quotation.cost.toLocaleString()} COP</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => togglePaymentStatus(index)}
                        variant="ghost"
                        className={`${
                          quotation.isPaid ? "bg-green-500" : "bg-red-500"
                        } text-white hover:bg-opacity-90`}
                      >
                        {quotation.isPaid ? "Pago realizado" : "Pago no realizado"}
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRows.includes(index) && (
                    <TableRow>
                      <TableCell colSpan={9} className="bg-muted/20">
                        <div className="p-4 space-y-2">
                          <p><strong>Empresa:</strong> {quotation.company}</p>
                          <p><strong>Contacto:</strong> {quotation.countryCode} {quotation.phone}</p>
                          {quotation.extraService && (
                            <>
                              <p><strong>Servicio Extra:</strong> {quotation.extraService}</p>
                              <p><strong>Plan Extra:</strong> {quotation.extraPlan}</p>
                            </>
                          )}
                          {quotation.recommendations && (
                            <p><strong>Recomendaciones:</strong> {quotation.recommendations}</p>
                          )}
                          <p><strong>Fecha y Hora:</strong> {quotation.time}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default Advisors;