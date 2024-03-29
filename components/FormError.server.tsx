import { type FieldError } from "react-hook-form";
type IProps = {
  fieldErrors?: FieldError;
  errors?: string;
};

const FormError: React.FC<IProps> = ({ fieldErrors, errors }) => {
  return fieldErrors || errors ? (
    <span
      role={"alert"}
      className="text-sm text-red-500"
    >
      {fieldErrors ? fieldErrors.message : errors}
    </span>
  ) : null;
};

export default FormError;
