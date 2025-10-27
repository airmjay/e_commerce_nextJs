import React from "react";
interface Props {
    lable: string;
    placeholder: string;
    type?: string;
    style?: string;
    col_span?: string;
    error?: string;
}

const TextArea = ({
    col_span,
    style,
    label,
    placeholder,
    type,
    error,
    ...rest
}: Props) => {
    return (
        <div className={`col-span-6 ${col_span}`}>
            <label className="block mb-2 text-gray-500">{label}</label>
            <textarea
                rows="4"
                type={type}
                placeholder={placeholder}
                className={`border p-2 outline-0 border-gray-200 w-[100%] ${style}`}
                {...rest}
            ></textarea>
            <span className="text-red-400 text-sm">{error}</span>
        </div>
    );
};

export default TextArea;
