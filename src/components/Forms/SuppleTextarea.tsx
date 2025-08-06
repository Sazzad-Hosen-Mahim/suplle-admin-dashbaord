import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface SuppleTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label?: string;
    error?: string;
    fullWidth?: boolean;
    containerClassName?: string;
    labelClassName?: string;
    helperText?: string;
}

const SuppleTextarea = ({
    name,
    label,
    error,
    fullWidth = false,
    className,
    containerClassName,
    labelClassName,
    helperText,
    required,
    ...props
}: SuppleTextareaProps) => {
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
                        <Textarea
                            {...field}
                            {...props}
                            id={name}
                            className={cn(
                                fullWidth && "w-full",
                                (error || fieldError) && "border-destructive focus-visible:ring-destructive/50",
                                className
                            )}
                            aria-invalid={!!error || !!fieldError}
                        />
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

export default SuppleTextarea;