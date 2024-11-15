import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from "./QuotationForm";

interface QuotationFormFieldsProps {
  formData: FormData;
  onFormChange: (data: FormData) => void;
}

export const QuotationFormFields = ({ formData, onFormChange }: QuotationFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Asesor</label>
        <Select
          value={formData.advisor}
          onValueChange={(value) => onFormChange({ ...formData, advisor: value })}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Seleccionar asesor" />
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

      <div>
        <label className="text-sm font-medium">Nombre del cliente</label>
        <Input
          value={formData.client}
          onChange={(e) => onFormChange({ ...formData, client: e.target.value })}
          className="bg-white"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Nombre de la empresa</label>
        <Input
          value={formData.company}
          onChange={(e) => onFormChange({ ...formData, company: e.target.value })}
          className="bg-white"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Número de contacto</label>
        <div className="flex gap-2">
          <Select
            value={formData.countryCode}
            onValueChange={(value) => onFormChange({ ...formData, countryCode: value })}
          >
            <SelectTrigger className="w-24 bg-white">
              <SelectValue placeholder="+57" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="+57">+57</SelectItem>
              <SelectItem value="+1">+1</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={formData.phone}
            onChange={(e) => onFormChange({ ...formData, phone: e.target.value })}
            className="bg-white flex-1"
            type="tel"
            placeholder="Número celular"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Recomendaciones</label>
        <Textarea
          value={formData.recommendations}
          onChange={(e) => onFormChange({ ...formData, recommendations: e.target.value })}
          className="bg-white min-h-[100px]"
          placeholder="Agregue aquí los ajustes, recomendaciones o comentarios del cliente..."
        />
      </div>
    </div>
  );
};