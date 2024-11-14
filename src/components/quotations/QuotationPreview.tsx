import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import type { FormData } from "./QuotationForm";
import { prices, extras } from "./quotationData";

interface QuotationPreviewProps {
  formData: FormData;
}

export const QuotationPreview = ({ formData }: QuotationPreviewProps) => {
  const calculateTotal = () => {
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
    
    // Add extra plan price
    if (formData.extraPlan) {
      total += prices[formData.extraPlan] || 0;
    }

    return total;
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Previsualización</h2>
      <div className="space-y-2">
        <p><strong>Asesor:</strong> {formData.advisor}</p>
        <p><strong>Cliente:</strong> {formData.client}</p>
        <p><strong>Servicio:</strong> {formData.service}</p>
        <p><strong>Plan:</strong> {formData.plan}</p>
        {formData.extraService && (
          <>
            <p><strong>Servicio Extra:</strong> {formData.extraService}</p>
            <p><strong>Plan Extra:</strong> {formData.extraPlan}</p>
          </>
        )}
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
  );
};