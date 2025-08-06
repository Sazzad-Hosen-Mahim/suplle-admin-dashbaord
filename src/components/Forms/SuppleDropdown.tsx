import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface SuppleSelectProps {
    name: string;
    label?: string;
    error?: string;
    fullWidth?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    helperText?: string;
    placeholder?: string;
    children: React.ReactNode;
    required?: boolean;
    triggerClassName?: string;
}

const SuppleSelect = ({ 
    name, 
    label,
    error,
    fullWidth = true,
    containerClassName,
    labelClassName,
    helperText,
    placeholder,
    children,
    required,
    triggerClassName
}: SuppleSelectProps) => {
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
                        <Select
                            {...field}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger 
                                className={cn(
                                    fullWidth && "w-full",
                                    (error || fieldError) && "border-destructive focus-visible:ring-destructive/50",
                                    triggerClassName
                                )}
                                aria-invalid={!!error || !!fieldError}
                            >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {children}
                            </SelectContent>
                        </Select>
                        {(error || fieldError) && (
                            <p className="text-sm text-destructive">
                                {error || fieldError?.message}
                            </p>
                        )}
                        {helperText && !error && !fieldError && (
                            <p className="text-sm text-muted-foreground">
                                {helperText}
                            </p>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default SuppleSelect;
