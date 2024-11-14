import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    selectedExtras: [] as string[],
    startDate: null as Date | null,
    endDate: null as Date | null,
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Asesor</label>
              <Select value={formData.advisor} onValueChange={(value) => setFormData({ ...formData, advisor: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar asesor" />
                </SelectTrigger>
                <SelectContent>
                  {["Juan", "Daniel", "Nicolás"].map((advisor) => (
                    <SelectItem key={advisor} value={advisor}>
                      {advisor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre del cliente</label>
              <Input
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Servicio</label>
              <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value, plan: "" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar servicio" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(services).map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.service && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan</label>
                <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {services[formData.service].map((plan) => (
                      <SelectItem key={plan} value={plan}>
                        {plan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.plan && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Extras</label>
                <Select
                  value={formData.selectedExtras.join(",")}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      selectedExtras: value.split(",").filter(Boolean),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar extras" />
                  </SelectTrigger>
                  <SelectContent>
                    {extras[formData.plan].map((extra) => (
                      <SelectItem key={extra.name} value={extra.name}>
                        {extra.name} - ${extra.price.toLocaleString()} COP
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Fecha de inicio"
                value={formData.startDate}
                onChange={(date) => setFormData({ ...formData, startDate: date || null })}
              />
              <DatePicker
                label="Fecha de fin"
                value={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date || null })}
              />
            </div>

            <Button type="submit" className="w-full">
              Crear Cotización
            </Button>
          </form>

          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Previsualización</h2>
            <div className="space-y-2">
              <p><strong>Asesor:</strong> {formData.advisor}</p>
              <p><strong>Cliente:</strong> {formData.client}</p>
              <p><strong>Servicio:</strong> {formData.service}</p>
              <p><strong>Plan:</strong> {formData.plan}</p>
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