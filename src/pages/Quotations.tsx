import { useState } from "react";
import { QuotationForm } from "@/components/quotations/QuotationForm";
import { QuotationPreview } from "@/components/quotations/QuotationPreview";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { services, prices, extras } from "@/components/quotations/quotationData";

const Quotations = () => {
  const [formData, setFormData] = useState({
    advisor: "",
    client: "",
    service: "",
    plan: "",
    extraService: "",
    extraPlan: "",
    selectedExtras: [] as string[],
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate total cost including extras
    let total = 0;
    
    // Add main plan price
    if (formData.plan) {
      total += prices[formData.plan] || 0;
    }
    
    // Add main extras
    formData.selectedExtras.forEach(extraName => {
      const extraPrice = extras[formData.plan]?.find(e => e.name === extraName)?.price || 0;
      total += extraPrice;
    });
    
    // Add extra plan price if exists
    if (formData.extraPlan) {
      total += prices[formData.extraPlan] || 0;
    }

    // Get existing quotations from localStorage
    const existingQuotations = JSON.parse(localStorage.getItem("quotations") || "[]");
    
    // Create new quotation object
    const newQuotation = {
      advisor: formData.advisor,
      client: formData.client,
      service: formData.service,
      plan: formData.plan,
      extras: formData.selectedExtras.join(", "),
      time: formData.startDate && formData.endDate 
        ? `${formData.startDate.toLocaleDateString()} - ${formData.endDate.toLocaleDateString()}`
        : "No especificado",
      cost: total,
    };
    
    // Add new quotation to array
    const updatedQuotations = [...existingQuotations, newQuotation];
    
    // Save to localStorage
    localStorage.setItem("quotations", JSON.stringify(updatedQuotations));
    
    // Show success message
    toast({
      title: "Cotización creada",
      description: "La cotización ha sido guardada exitosamente",
    });
    
    // Navigate to advisors page
    navigate("/advisors");
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
          <QuotationPreview formData={formData} />
        </div>
      </main>
    </div>
  );
};

export default Quotations;