"use client";
import React, { useEffect, useState } from "react";
import { useTransition } from "react";
import fetchData from "../../../../config/httpRequest";
import HandleEvent from "../../../../config/EventHandler";
import sanitizeInput from "../../../../config/SanitizHtmlData";
import { Input } from "../../../components/Input";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import { z } from "../../../../zod/Validation";
import { useRouter } from "next/navigation";
interface Body {
    id: number;
    name: string;
}
interface CategoryIdProps {
    categoryId: number;
}
export default function CategoryEdit({ categoryId }: CategoryIdProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);
    const bodyInnerText = {
        input: "",
        error: ""
    };
    const bodyInnerNumber = {
        input: 0,
        error: ""
    };
    const [body, setBody] = useState<Body>({
        name: bodyInnerText
    });
    const [category, setCategory] = useState<Body | undefined>();
    const id = categoryId;
    useEffect(() => {
        const getApi = async () => {
            const categoryProduct = await fetchData<Body>(
                "category",
                id,
                setIsLoading
            );
            // Populate form after data is fetched
            if (categoryProduct) {
                setCategory(categoryProduct);
                setBody({
                    name: { input: categoryProduct.name, error: "" },
                    id: { input: categoryProduct.id }
                });
            }
        };
        getApi();
    }, [id]);
    if (isLoading) return <div>Loading</div>;

    if (!category) return <div>Category Not Found</div>;
    const handleEvent = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const array = [];
        HandleEvent(e, setBody, body, array);
    };
    async function UpdateApi(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const input = {
            name: body.name.input,
            id: Number(body.id.input)
        };
        const sanitizedInput = sanitizeInput(input) as Record<
            string,
            string | number | null
        >;
        try {
            // Prepare FormData for API
            const formData = new FormData();
            Object.keys(sanitizedInput).forEach(key => {
                if (sanitizedInput[key] != null) {
                    formData.append(key, sanitizedInput[key] as string);
                }
            });

            startTransition(async () => {
                const addProduct = await fetch(`/api/category/${input.id}`, {
                    method: "PUT",
                    body: formData,
                    cache: "no-store"
                });
                if (addProduct.ok) {
                    alert("Category is Update");
                    router.push("/admin/category/");
                } else {
                    alert("Category is not updated");
                }
            });
        } catch (e) {
            if (e instanceof z.ZodError) {
                // Map Zod errors to the body state
                const newBody = { ...body };
                e.issues.forEach(issue => {
                    const field = issue.path[0] as keyof typeof body;
                    if ("error" in newBody[field]) {
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
            <Form
                submit={(e: React.FormEvent<HTMLFormElement>) => UpdateApi(e)}
                FormTitle="Product Form"
            >
                <Input
                    onChange={e => handleEvent(e)}
                    label="Product Name"
                    placeholder="Enter Your Product Name"
                    type="text"
                    name="name"
                    style='col-span-12'
                    error={body.name.error}
                    value={body.name.input}
                />
                <Button
                    disabled={isPending}
                    style="col-span-6"
                    text="Update Category"
                />
            </Form>
        </>
    );
}
