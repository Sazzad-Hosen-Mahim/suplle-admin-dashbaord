import type { DefaultValues, FieldValues, SubmitHandler, UseFormProps } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

type TFormConfig<T extends FieldValues = FieldValues> = Omit<UseFormProps<T>, 'onSubmit'> & {
    className?: string;
}

type TFormProps<T extends FieldValues = FieldValues> = {
    children: React.ReactNode;
    onSubmit: SubmitHandler<T>;
    onError?: (errors: unknown) => void;
    resetOnSubmit?: boolean;
    defaultValues?: DefaultValues<T>;
} & Omit<TFormConfig<T>, 'defaultValues'>

const SuppleForm = <T extends FieldValues>({ 
    children, 
    onSubmit, 
    onError,
    resetOnSubmit = true,
    className,
    defaultValues,
    ...formConfig 
}: TFormProps<T>) => {
    const methods = useForm<T>({
        ...formConfig,
        defaultValues
    });

    const { handleSubmit, reset } = methods;

    const submit: SubmitHandler<T> = async (data) => {
        try {
            await onSubmit(data);
            if (resetOnSubmit) {
                reset(defaultValues);
            }
        } catch (error) {
            onError?.(error);
        }
    }

    return (
        <FormProvider {...methods}>
            <form className={className} onSubmit={handleSubmit(submit)} noValidate>
                {children}
            </form>
        </FormProvider>
    );
};

export default SuppleForm;