import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { services, prices, extras } from "./quotationData";

export interface FormData {
  advisor: string;
  client: string;
  service: string;
  plan: string;
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
  const handleServiceChange = (value: string) => {
    onFormChange({
      ...formData,
      service: value,
      plan: "",
      selectedExtras: [],
    });
  };

  const handleExtraChange = (value: string) => {
    const newExtras = formData.selectedExtras.includes(value)
      ? formData.selectedExtras.filter(e => e !== value)
      : [...formData.selectedExtras, value];
    
    onFormChange({
      ...formData,
      selectedExtras: newExtras,
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
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
            <SelectContent>
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
          <label className="text-sm font-medium">Servicio</label>
          <Select value={formData.service} onValueChange={handleServiceChange}>
            <SelectTrigger className="w-full bg-white">
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
          <div>
            <label className="text-sm font-medium">Plan</label>
            <Select
              value={formData.plan}
              onValueChange={(value) => onFormChange({ ...formData, plan: value })}
            >
              <SelectTrigger className="w-full bg-white">
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
          <div>
            <label className="text-sm font-medium">Extras</label>
            <Select
              value={formData.selectedExtras.join(",")}
              onValueChange={handleExtraChange}
            >
              <SelectTrigger className="w-full bg-white">
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
      </div>

      <Button type="submit" className="w-full">
        Crear Cotización
      </Button>
    </form>
  );
};