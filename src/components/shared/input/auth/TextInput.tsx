import type {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  Path,
} from "react-hook-form";

interface InputComponentProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  className?: string;
  register?: UseFormRegister<T>; // Made optional
  rules?: RegisterOptions<T, Path<T>>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  type?: string;
  labelClassName?: string;
  inputClassName?: string;
  value?: string; // Made optional
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // Made optional
}

const InputComponent = <T extends FieldValues>({
  name,
  label,
  className = "",
  labelClassName = "",
  inputClassName = "",
  register,
  rules = {},
  errors,
  placeholder,
  type = "text",
  value,
  onChange,
  ...props
}: InputComponentProps<T>) => {
  const error = errors ? errors[name] : undefined;

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className={`text-[#484B52] dark:text-white text-sm font-medium ${labelClassName}`}
      >
        {label}
      </label>
      <div className="relative w-full flex flex-row gap-2">
        {register ? (
          <input
            {...register(name, rules)}
            id={name}
            className={`border border-[#EDF1F3] rounded-lg py-[13px] px-3 pr-4 w-full focus:outline-none ${inputClassName} ${
              error ? "border-red-500" : ""
            }`}
            placeholder={placeholder || "Type here"}
            type={type}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`border border-[#EDF1F3] rounded-lg py-[13px] px-3 pr-4 w-full focus:outline-none ${inputClassName} ${
              error ? "border-red-500" : ""
            }`}
            placeholder={placeholder || "Type here"}
            type={type}
            {...props}
          />
        )}
      </div>
      {error?.message && (
        <p className="text-red-500 text-sm">{String(error.message)}</p>
      )}
    </div>
  );
};

export default InputComponent;
