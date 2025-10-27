import React from "react";
interface Props {
    FormTitle: string;
    children: React.ReactNode;
    action: string;
    method: string;
    submit: (e) => void;
}
const Form = ({ submit, method, action, FormTitle, children }: Props) => {
    return (
        <form
            onSubmit={submit}
            method={method}
            action={action}
            className="col-span-9 p-4"
        >
            <h2 className="bg-blue-600 text-white p-2">{FormTitle}</h2>
            <div className="grid space-y-2 gap-2 grid-cols-12 bg-white shadow p-2 mt-0">
                {children}
            </div>
        </form>
    );
};

export default Form;
