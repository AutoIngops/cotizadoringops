import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { services, prices, extras } from "./quotationData";
import { QuotationFormFields } from "./QuotationFormFields";

export interface FormData {
  advisor: string;
  client: string;
  company: string;
  countryCode: string;
  phone: string;
  recommendations: string;
  service: string;
  plan: string;
  extraService: string;
  extraPlan: string;
  selectedExtras: string[];
  startDate: Date | null;
  endDate: Date | null;
}

interface QuotationFormProps {
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const QuotationForm = ({ formData, onFormChange, onSubmit }: QuotationFormProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([formData.service].filter(Boolean));
  const [showExtraPlans, setShowExtraPlans] = useState(false);

  const handleServiceChange = (value: string) => {
    const newServices = [...selectedServices, value];
    setSelectedServices(newServices);
    onFormChange({
      ...formData,
      service: value,
      plan: "",
      selectedExtras: [],
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <QuotationFormFields formData={formData} onFormChange={onFormChange} />

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Servicio</label>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Seleccionar servicio" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {Object.keys(services).map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.service && (
          <div>
            <label className="text-sm font-medium">Plan</label>
            <Select
              value={formData.plan}
              onValueChange={(value) => onFormChange({ ...formData, plan: value })}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Seleccionar plan" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {services[formData.service]?.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {formData.plan && extras[formData.plan] && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <label className="text-sm font-medium">Extras</label>
                <Select
                  value={formData.selectedExtras.join(",")}
                  onValueChange={(value) => {
                    const newExtras = formData.selectedExtras.includes(value)
                      ? formData.selectedExtras.filter(e => e !== value)
                      : [...formData.selectedExtras, value];
                    
                    onFormChange({
                      ...formData,
                      selectedExtras: newExtras,
                    });
                  }}
                >
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Seleccionar extras" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {extras[formData.plan].map((extra) => (
                      <SelectItem key={extra.name} value={extra.name}>
                        {extra.name} - ${extra.price.toLocaleString()} COP
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extraPlans"
                  checked={showExtraPlans}
                  onCheckedChange={(checked) => setShowExtraPlans(checked as boolean)}
                />
                <label htmlFor="extraPlans" className="text-sm font-medium">
                  Extra Plans
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                label="Fecha de inicio"
                value={formData.startDate}
                onChange={(date) => onFormChange({ ...formData, startDate: date })}
              />
              <DatePicker
                label="Fecha de entrega"
                value={formData.endDate}
                onChange={(date) => onFormChange({ ...formData, endDate: date })}
              />
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">
        Crear Cotización
      </Button>
    </form>
  );
};