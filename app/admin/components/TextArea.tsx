import React from "react";
interface Props {
    label?: string;
    placeholder?: string;
    style?: string;
    col_span?: string;
    error?: string;
    rows? : number;
    value? : string;
    name? : string
}

const TextArea = ({
    col_span,
    style,
    placeholder,
    label,
    error,
    rows,
    ...rest
}: Props) => {
    return (
        <div className={`col-span-6 ${col_span}`}>
            <label className="block mb-2 text-gray-500">{label}</label>
            <textarea
                rows={rows}
                placeholder={placeholder}
                className={`border p-2 outline-0 border-gray-200 w-[100%] ${style}`}
                {...rest}
            ></textarea>
            <span className="text-red-400 text-sm">{error}</span>
        </div>
    );
};

export default TextArea;
