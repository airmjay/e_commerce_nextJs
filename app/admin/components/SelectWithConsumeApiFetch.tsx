"use client";
import { SelectInput } from "./Input";
import React, { useEffect, useState } from "react";
import Category from "../../customer/products/components/Category";

interface Category {
    name?: string;
    id?: number;
}
interface Props {
    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => void;
    name: string;
    error: string | undefined;
    value: string | number;
    label: string;
    readonly?: boolean | undefined;
    placeholder: string;
    id?: number;
}
const SelectWithConsumeApiFetch = ({
    id,
    placeholder,
    label,
    readonly,
    ...rest
}: Props) => {
    const [isLoading, setIsloading] = useState(true);
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/category`);
            const categories = await res.json();
            if (categories) {
                setCategory(categories);
                setIsloading(false);
            }
        };
        fetchData();
    }, []);
    if (isLoading) return "loading";
    return (
        <SelectInput
            readOnly={readonly}
            label={label}
            placeholder={placeholder}
            {...rest}
            defaultValue={id}
        >
            {category.map(item =>(
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                )
            )}
        </SelectInput>
    );
};
const SelectWithConsumeApiFetchAll = ({
    readonly,
    onChange,
    name,
    placeholder,
    label,
    ...rest
}: Props) => {
    const [isLoading, setIsloading] = useState(true);
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/category`);
            const categories = await res.json();
            if (categories) {
                setCategory(categories);
                setIsloading(false);
            }
        };
        fetchData();
    }, []);
    if (isLoading) return "loading";
    return (
        <SelectInput
            onChange={onChange}
            readOnly={readonly}
            name={name}
            label={label}
            placeholder={placeholder}
            {...rest}
        >
            {category.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </SelectInput>
    );
};
export { SelectWithConsumeApiFetchAll, SelectWithConsumeApiFetch };
