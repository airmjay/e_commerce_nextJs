"use client";
import React, { HTMLInputElement, useEffect, useState } from "react";
import { useTransition } from "react";
import GetData from "./GetData";
import sanitizeHtml from "sanitize-html";
import { Input, SelectInput } from "../../../components/Input";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import TextArea from "../../../components/TextArea";
import { SelectWithConsumeApiFetchAll } from "../../../components/SelectWithConsumeApiFetch";
import { productSchema, z } from "../../../../zod/Validation";
import { useRouter } from "next/navigation";
interface ProductType {
    name: string;
    description: string;
    specification: string;
    unit: number;
    category: string;
    price: number;
    image: null;
}
export default function ProductEdit({ productId }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);
    const [checkExist, setCheckExist] = useState(0);
    const [body, setBody] = useState({
        name: {
            input: "",
            error: ""
        },
        description: {
            input: "",
            error: ""
        },
        specification: {
            input: "",
            error: ""
        },
        unit: {
            input: "",
            error: ""
        },
        category: {
            input: "",
            error: ""
        },
        price: {
            input: "",
            error: ""
        },
        image: {
            input: null,
            error: ""
        }
    });
    const [product, setProduct] = useState<ProductType | undefined>({});
    const id = parseInt(productId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/product/${id}`,
                    {
                        cache: "no-store",
                        method: "GET"
                    }
                );

                const products = await res.json();
                const fetchedProduct = products[0];
                if (fetchedProduct) {
                    setProduct(fetchedProduct);

                    // Populate form after data is fetched
                    setBody({
                        name: { input: fetchedProduct.name || "", error: "" },
                        description: {
                            input: fetchedProduct.description || "",
                            error: ""
                        },
                        specification: {
                            input: fetchedProduct.specification || "",
                            error: ""
                        },
                        unit: { input: fetchedProduct.unit || "", error: "" },
                        category: {
                            input: fetchedProduct.category_id || "",
                            error: ""
                        },
                        price: { input: fetchedProduct.price || "", error: "" },
                        image: { input: null, error: "" },
                        id: { input: fetchedProduct.id },
                        filename: { input: fetchedProduct.image }
                    });
                    setCheckExist(1);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);
    if (isLoading) return <div>Loading</div>;

    if(Object.keys(product).length == 0)  return <div>Product Not Found</div>;
    const handleEvent = e => {
        const { name, value, files } = e.target;
        const updatedValue = ["unit", "price", "category"].includes(name)
            ? Number(value) || ""
            : name === "image"
            ? files[0] || null
            : value;

        setBody({
            ...body,
            [name]: { input: updatedValue, error: "" }
        });
    };
    const sanitizeInput = input => {
        const sanitized = {};
        for (const field in input) {
            if (typeof input[field] === "string") {
                sanitized[field] = sanitizeHtml(input[field], {
                    allowedTags: [], // Remove all HTML tags
                    allowedAttributes: {} // Remove all attributes
                }).trim();
            } else {
                // Keep non-string fields as-is
                sanitized[field] = input[field];
            }
        }
        return sanitized;
    };
    async function UpdateApi(e) {
        e.preventDefault();

        const input = {
            name: body.name.input,
            description: body.description.input,
            image: body.image.input,
            price: Number(body.price.input),
            category: Number(body.category.input),
            unit: Number(body.unit.input),
            specification: body.specification.input,
            id: Number(body.id.input),
            filename: body.filename.input
        };
        const sanitizedInput = sanitizeInput(input);
        try {
            const validate = productSchema.parse(sanitizedInput);
            // Prepare FormData for API
            const formData = new FormData();
            Object.keys(sanitizedInput).forEach(key => {
                if (sanitizedInput[key] !== null) {
                    formData.append(key, sanitizedInput[key]);
                }
            });

            startTransition(async () => {
                const addProduct = await fetch(
                    `/api/product/${input.id}`,
                    {
                        method: "PUT",
                        body: formData,
                        Content_Type: "multipart/form-data"
                    },
                    { cache: "no-store" }
                );
                if (addProduct.ok) {
                    alert("Product is Update");
                    router.push("/admin/product/");
                } else {
                    alert("Product is not updated");
                }
            });
        } catch (e) {
            if (e instanceof z.ZodError) {
                // Map Zod errors to the body state
                const newBody = { ...body };
                e.issues.forEach(issue => {
                    const field = issue.path[0];
                    if (newBody[field]) {
                        newBody[field].error = issue.message;
                    }
                });
                setBody(newBody);
            } else {
                console.error("Unexpected error:", e);
            }
        }
    }

    // return <div>{JSON.stringify(product)}</div>;
    return (
        <>
            <Form submit={e => UpdateApi(e)} FormTitle="Product Form">
                <Input
                    onChange={e => handleEvent(e)}
                    label="Product Name"
                    placeholder="Enter Your Product Name"
                    type="text"
                    name="name"
                    error={body.name.error}
                    value={body.name.input}
                />
                <Input
                    onChange={e => handleEvent(e)}
                    label="Product Specification"
                    placeholder="Enter Your Product Specification"
                    type="text"
                    name="specification"
                    error={body.specification.error}
                    value={body.specification.input}
                />
                <Input
                    onChange={e => handleEvent(e)}
                    label="Product Units"
                    placeholder="Enter number of available product"
                    type="number"
                    name="unit"
                    error={body.unit.error}
                    value={body.unit.input}
                />
                <SelectWithConsumeApiFetchAll
                    onChange={e => handleEvent(e)}
                    name="category"
                    error={body.category.error}
                    value={body.category.input}
                    label="Product Category"
                    placeholder="Enter Your Product Category"
                />
                <Input
                    onChange={e => handleEvent(e)}
                    label="Product Image"
                    error={body.image.error}
                    placeholder="Select Product Image"
                    type="file"
                    name="image"
                />
                <Input
                    onChange={e => handleEvent(e)}
                    value={body.price.input}
                    label="Product Price"
                    placeholder="Enter Product price"
                    type="number"
                    error={body.price.error}
                    name="price"
                />
                <TextArea
                    onChange={e => handleEvent(e)}
                    value={body.description.input}
                    col_span="col-span-12"
                    label="Product description"
                    error={body.description.error}
                    placeholder="Enter Your Product Description"
                    name="description"
                />
                <Button
                    disabled={isPending}
                    style="col-span-6"
                    text="Update Product"
                />
            </Form>
        </>
    );
}
