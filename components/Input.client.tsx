import { useState } from "react";
import {
  type UseFormRegister,
  type RegisterOptions,
  type Path,
  type FieldValues,
  type FieldError,
} from "react-hook-form";
import FormError from "./FormError.server";

export interface InputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  labelname?: string;
  register: UseFormRegister<T>;
  className?: string;
  errors?: FieldError;
  validation?: RegisterOptions<T>;
  required?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  className = "",
  labelname,
  required,
  register,
  errors,
  validation,
  ...props
}: InputProps<T>) => {
  const requiredAsterisk = required ? (
    <span className="font-semibold text-red-600">*</span>
  ) : null;

  const errorClassses = errors ? "outline-red-500" : "outline-gray-300";

  const WITHIN = "top-4 cursor-text px-4 -z-10";

  const FLOAT = "px-2 -top-1 bg-white z-20 scale-[0.8]";

  const [labelClasses, setLabelClasses] = useState(WITHIN);

  return (
    <>
      <label
        htmlFor={name}
        className={`${labelClasses} absolute select-none text-xs font-bold uppercase tracking-wide text-gray-500 transition-all duration-300`}
      >
        {labelname} {requiredAsterisk}
      </label>
      <input
        id={name}
        aria-invalid={errors ? "true" : "false"}
        {...register(name, validation)}
        onFocus={() => {
          setLabelClasses(FLOAT);
        }}
        onBlur={(e) => {
          if (e.target.value.trim().length === 0) {
            setLabelClasses(WITHIN);
          }
        }}
        className={`mt-1 w-full rounded-md bg-transparent px-3 py-2 outline outline-1 outline-gray-300 focus:outline-gray-400 ${className} ${errorClassses}`}
        {...props}
      />
      <FormError fieldErrors={errors} />
    </>
  );
};

export default Input;
