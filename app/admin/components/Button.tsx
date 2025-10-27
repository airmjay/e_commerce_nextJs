import React from "react";
interface Props {
    style: string;
    text: string;
}
const Button = ({ style, text }: Props) => {
    return (
        <button
            className={`w-full button-color cursor-pointer hover:bg-blue-500 hover:text-gray-200 p-2 text-white outline-0 border-0 ${style}`}
        >
            {text}
        </button>
    );
};

export default Button;
