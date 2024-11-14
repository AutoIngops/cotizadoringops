import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

const services = {
  "Desarrollo Web": ["Landing Page", "Página web", "E-commerce"],
  "Marketing Digital": ["Plan Básico", "Plan Intermedio", "Plan Premium"],
  "Desarrollos Personalizados": [
    "Aplicaciones de escritorio",
    "API y Microservicios",
    "Automatizaciones",
  ],
};

const prices = {
  "Landing Page": 800000,
  "Página web": 950000,
  "E-commerce": 1200000,
  "Plan Básico": 450000,
  "Plan Intermedio": 700000,
  "Plan Premium": 1000000,
  "Aplicaciones de escritorio": 2500000,
  "API y Microservicios": 2000000,
  Automatizaciones: 800000,
};

const extras = {
  "Landing Page": [
    { name: "Extra 1", price: 20000 },
    { name: "Extra 2", price: 40000 },
    { name: "Extra 3", price: 80000 },
  ],
  "Página web": [
    { name: "Extra 1", price: 50000 },
    { name: "Extra 2", price: 100000 },
    { name: "Extra 3", price: 100000 },
  ],
  "E-commerce": [
    { name: "Extra 1", price: 100000 },
    { name: "Extra 2", price: 150000 },
    { name: "Extra 3", price: 200000 },
  ],
  "Plan Básico": [
    { name: "Extra 1", price: 17000 },
    { name: "Extra 2", price: 34000 },
    { name: "Extra 3", price: 51000 },
  ],
  "Plan Intermedio": [
    { name: "Extra 1", price: 30000 },
    { name: "Extra 2", price: 60000 },
    { name: "Extra 3", price: 90000 },
  ],
  "Plan Premium": [
    { name: "Extra 1", price: 100000 },
    { name: "Extra 2", price: 200000 },
    { name: "Extra 3", price: 300000 },
  ],
  "Aplicaciones de escritorio": [
    { name: "Extra 1", price: 30000 },
    { name: "Extra 2", price: 60000 },
    { name: "Extra 3", price: 90000 },
  ],
  "API y Microservicios": [
    { name: "Extra 1", price: 70000 },
    { name: "Extra 2", price: 140000 },
    { name: "Extra 3", price: 210000 },
  ],
  Automatizaciones: [
    { name: "Extra 1", price: 100000 },
    { name: "Extra 2", price: 200000 },
    { name: "Extra 3", price: 300000 },
  ],
};

const Quotations = () => {
  const [formData, setFormData] = useState({
    advisor: "",
    client: "",
    service: "",
    plan: "",
    selectedExtras: [],
    startDate: null,
    endDate: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const calculateTotal = () => {
    const planPrice = prices[formData.plan] || 0;
    const extrasTotal = formData.selectedExtras.reduce(
      (acc, extra) => acc + (extras[formData.plan]?.find((e) => e.name === extra)?.price || 0),
      0
    );
    return planPrice + extrasTotal;
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav className="space-y-2">
          <a href="/dashboard" className="block p-2 rounded-md hover:bg-muted">
            Inicio
          </a>
          <a href="/quotations" className="block p-2 rounded-md bg-primary/10 text-primary">
            Cotizaciones
          </a>
          <a href="/advisors" className="block p-2 rounded-md hover:bg-muted">
            Asesores
          </a>
        </nav>
      </aside>

      <main className="main-content">
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Asesor"
              options={["Juan", "Daniel", "Nicolás"]}
              value={formData.advisor}
              onChange={(value) => setFormData({ ...formData, advisor: value })}
            />

            <Input
              label="Nombre del cliente"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
            />

            <Select
              label="Servicio"
              options={Object.keys(services)}
              value={formData.service}
              onChange={(value) => setFormData({ ...formData, service: value, plan: "" })}
            />

            {formData.service && (
              <Select
                label="Plan"
                options={services[formData.service]}
                value={formData.plan}
                onChange={(value) => setFormData({ ...formData, plan: value })}
              />
            )}

            {formData.plan && (
              <Select
                label="Extras"
                options={extras[formData.plan].map((extra) => extra.name)}
                value={formData.selectedExtras}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    selectedExtras: [...formData.selectedExtras, value],
                  })
                }
                multiple
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Fecha de inicio"
                value={formData.startDate}
                onChange={(date) => setFormData({ ...formData, startDate: date })}
              />
              <DatePicker
                label="Fecha de fin"
                value={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
              />
            </div>

            <Button type="submit" className="w-full">
              Crear Cotización
            </Button>
          </form>

          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Previsualización</h2>
            <div className="space-y-2">
              <p>
                <strong>Asesor:</strong> {formData.advisor}
              </p>
              <p>
                <strong>Cliente:</strong> {formData.client}
              </p>
              <p>
                <strong>Servicio:</strong> {formData.service}
              </p>
              <p>
                <strong>Plan:</strong> {formData.plan}
              </p>
              <p>
                <strong>Extras:</strong>{" "}
                {formData.selectedExtras.length > 0
                  ? formData.selectedExtras.join(", ")
                  : "Ninguno"}
              </p>
              <p>
                <strong>Tiempo:</strong>{" "}
                {formData.startDate && formData.endDate
                  ? `${format(formData.startDate, "dd/MM/yyyy")} - ${format(
                      formData.endDate,
                      "dd/MM/yyyy"
                    )}`
                  : "No especificado"}
              </p>
              <p className="text-xl font-bold">
                <strong>Total:</strong> ${calculateTotal().toLocaleString()} COP
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Quotations;