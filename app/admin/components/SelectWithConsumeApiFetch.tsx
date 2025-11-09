"use client"
import { SelectInput } from "./Input";
import React, { useEffect, useState } from "react";
import Category from '../../customer/products/components/Category';
interface Props{
   id : number;
   readonly? : boolean | undefined
}
interface Category { 
    name?: string;
    id?: number;
}
const SelectWithConsumeApiFetch = ({readonly, id, ...rest} : Props ) => {
    const [isLoading, setIsloading] = useState(true);
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res  = await fetch(`http://localhost:3000/api/category`);
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
            label="Product Category"
            placeholder="Enter Your Product Category"
            {...rest}
        >
            {category.map(item =>
                item.id == Number(id) ? (
                    <option key={item.id} value={item.id} defaultValue={item.id}>
                        {item.name}
                    </option>
                ) : (
                    <option key={item.id} value={item.id}>
                        {item.name} 
                    </option>
                )
            )}
        </SelectInput>
    );
};
const SelectWithConsumeApiFetchAll = ({ readonly, ...rest }: Props) => {
    const [isLoading, setIsloading] = useState(true);
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/api/category`);
            const categories  = await res.json();
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
            name="category"
            label="Product Category"
            placeholder="Enter Your Product Category"
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
