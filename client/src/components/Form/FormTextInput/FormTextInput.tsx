import { ErrorMessage, Field, FieldHookConfig } from "formik";
import TextError from "../FormTextError/FormTextError.tsx";

interface FormInputProps {
    name: string;
    label?: string;
    className?: string;
}

const FormTextInput: React.FC<FormInputProps & FieldHookConfig<string>> = (
    { name, label, className, ...rest },
) => {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="block text-xs font-medium text-gray-700"
            >
                {label}
            </label>
            <Field
                name={name}
                id={name}
                {...rest}
                className="input input-bordered w-full rounded-md border bg-neutral-content shadow-sm sm:text-sm py-2"
            />
            <div className="mt-1 ml-1">
                <ErrorMessage
                    name={name}
                    component={TextError as React.ComponentType}
                />
            </div>
        </div>
    );
};

export default FormTextInput;
