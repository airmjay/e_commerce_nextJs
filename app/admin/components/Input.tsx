import React, { CSSProperties } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  type?: string;
  children?: React.ReactNode;
  style?: CSSProperties | undefined;
  name?: string;
  error?: string;
  readOnly?: boolean;
  value?: string | number | undefined; // Add common value types
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}
const Input = ({
  style,
  label,
  placeholder,
  error,
  type,
  readOnly,
  ...rest
}: Props) => {
  return (
    <div className={`col-span-6 ${style || ""}`}>
      <label className="block mb-2 text-gray-500">{label}</label>
      <input
        type={type}
        className="border p-2 outline-0 border-gray-200 w-[100%]"
        placeholder={placeholder}
        readOnly={readOnly}
        {...rest}
      />
      <span className="text-red-400 text-sm"> {error}</span>
    </div>
  );
};

const SelectInput = ({
  label,
  children,
  onChange,
  error,
  readOnly,
  name,
  ...rest
}: Props) => {
  return (
    <div className="col-span-6">
      <label className="block mb-2 text-gray-500">{label}</label>
      <select
        onChange={onChange}
        className="border p-2 outline-0 border-gray-200 w-[100%]"
        disabled={readOnly}
        name={name}
        {...rest}
      >
        {children}
      </select>
      <span className="text-red-400 text-sm">{error}</span>
    </div>
  );
};

export { Input, SelectInput };
