import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface SuppleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  defaultValue?: string | number;
}

const SuppleInput = ({
  name,
  label,
  error,
  fullWidth = false,
  className,
  containerClassName,
  labelClassName,
  helperText,
  type = "text",
  required,
  startIcon,
  endIcon,
  defaultValue,
  ...props
}: SuppleInputProps) => {
  const { control } = useFormContext();

  return (
    <div className={cn("space-y-2", fullWidth && "w-full", containerClassName)}>
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            "text-sm font-medium",
            error && "text-destructive",
            labelClassName
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error: fieldError } }) => (
          <div className="space-y-1">
            <div className="relative">
              {startIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {startIcon}
                </div>
              )}
              <Input
                {...field}
                {...props}
                id={name}
                type={type}
                className={cn(
                  fullWidth && "w-full",
                  startIcon && "pl-10",
                  endIcon && "pr-10",
                  (error || fieldError) &&
                    "border-destructive focus-visible:ring-destructive/50",
                  className
                )}
                aria-invalid={!!error || !!fieldError}
                defaultValue={defaultValue}
              />
              {endIcon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {endIcon}
                </div>
              )}
            </div>
            {(error || fieldError) && (
              <p className="text-sm text-destructive">
                {error || fieldError?.message}
              </p>
            )}
            {helperText && !error && !fieldError && (
              <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SuppleInput;
