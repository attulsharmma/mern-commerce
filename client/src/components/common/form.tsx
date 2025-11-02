import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Spinner } from "../ui/shadcn-io/spinner";

// 🧱 Types for options in <Select>
interface SelectOption {
  id: string;
  label: string;
}

// 🧱 Type for a form control
export interface FormControl {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  componentType: "input" | "select" | "textarea";
  options?: SelectOption[];
}

// 🧱 Props for CommonForm
interface CommonFormProps<T extends Record<string, any>> {
  formControls: FormControl[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  buttonText?: string;
  isBtnDisabled?: boolean;
  isLoadingButton?: boolean;
}

function CommonForm<T extends Record<string, any>>({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText = "Submit",
  isBtnDisabled = false,
  isLoadingButton = false,
}: CommonFormProps<T>) {
  function renderInputsByComponentType(control: FormControl) {
    const value = formData[control.name] ?? "";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type || "text"}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [control.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );

      default:
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type || "text"}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((control) => (
          <div className="grid w-full gap-1.5" key={control.name}>
            <Label className="mb-1">{control.label}</Label>
            {renderInputsByComponentType(control)}
          </div>
        ))}
      </div>

      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="mt-2 w-full cursor-pointer"
      >
        {isLoadingButton ? <Spinner /> : null}
        {buttonText}
      </Button>
    </form>
  );
}

export default CommonForm;
