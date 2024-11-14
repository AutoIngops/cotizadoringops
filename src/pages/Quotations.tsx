import { useState } from "react";
import { QuotationForm } from "@/components/quotations/QuotationForm";
import { QuotationPreview } from "@/components/quotations/QuotationPreview";
import { prices, extras } from "@/components/quotations/quotationData";

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
      (acc, extra) => acc + (extras[formData.plan]?.find((e) => e.name === extra)?.price || 0), 0
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
          <QuotationForm
            formData={formData}
            onFormChange={setFormData}
            onSubmit={handleSubmit}
          />
          <QuotationPreview formData={formData} total={calculateTotal()} />
        </div>
      </main>
    </div>
  );
};

export default Quotations;
