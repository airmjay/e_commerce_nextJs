import React from "react";
interface Props {
    label?: string;
    placeholder?: string;
    type?: string;
    children?: React.ReactNode;
    style?: string;
    name?: string;
    error?: string;
    value?: string | number | readonly string[]; // Add common value types

    onChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}
const Input = ({ style, label, placeholder, error, type, ...rest }: Props) => {
    return (
        <div className={`col-span-6 ${style || ""}`}>
            <label className="block mb-2 text-gray-500">{label}</label>
            <input
                type={type}
                className="border p-2 outline-0 border-gray-200 w-[100%]"
                placeholder={placeholder}
                {...rest}
            />
            <span className="text-red-400 text-sm"> {error}</span>
        </div>
    );
};

const SelectInput = ({
    label,
    children,
    error,
    placeholder,
    ...rest
}: Props) => {
    return (
        <div className="col-span-6">
            <label className="block mb-2 text-gray-500">{label}</label>
            <select
                className="border p-2 outline-0 border-gray-200 w-[100%]"
                {...rest}
            >
                <option value="test input">Select {label}</option>
                <option value="1">Select car</option>
                {children}
            </select>
            <span className="text-red-400 text-sm">{error}</span>
        </div>
    );
};

export { Input, SelectInput };
