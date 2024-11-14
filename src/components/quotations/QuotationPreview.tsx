import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import type { FormData } from "./QuotationForm";

interface QuotationPreviewProps {
  formData: FormData;
  total: number;
}

export const QuotationPreview = ({ formData, total }: QuotationPreviewProps) => {
  return (
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
          <strong>Total:</strong> ${total.toLocaleString()} COP
        </p>
      </div>
    </Card>
  );
};