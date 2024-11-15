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
      <div className="text-center space-y-4">
        <img 
          src="https://drive.google.com/file/d/1Wzl2xDBXzFooJrxmuZV-w1xOL0DD2f2O/view?usp=sharing" 
          alt="Janus Logo" 
          className="mx-auto h-24 object-contain"
        />
        <p className="text-sm text-muted-foreground italic">
          "The digital solution for your business"
        </p>
        <p className="text-sm">
          {format(new Date(), "dd 'de' MMMM 'del' yyyy")}
        </p>
      </div>

      <div className="space-y-2 mt-6">
        <p><strong>Asesor:</strong> {formData.advisor}</p>
        <p><strong>Cliente:</strong> {formData.client}</p>
        <p><strong>Empresa:</strong> {formData.company}</p>
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
        <p className="text-xl font-bold mt-4">
          <strong>Total:</strong> ${calculateTotal().toLocaleString()} COP
        </p>
      </div>
    </Card>
  );
};