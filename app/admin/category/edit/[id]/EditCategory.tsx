"use client";
import React, { useEffect, useState } from "react";
import { useTransition } from "react";
import fetchData from "../../../../config/httpRequest";
import HandleEvent from "../../../../config/EventHandler";
import sanitizeInput from "../../../../config/SanitizHtmlData";
import { Input } from "../../../components/Input";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import { z, CategorySchema } from "../../../../zod/Validation";
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
  const [isEditing, setIsEditing] = useState(false);

  const bodyInnerText = {
    input: "",
    error: "",
  };
  const [body, setBody] = useState({
    name: bodyInnerText,
    id: { input: 0, error: "" },
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
          id: { input: categoryProduct.id, error: "" },
        });
      }
    };
    getApi();
  }, [id]);
  useEffect(() => {
    // Only run this logic if we have the original category data loaded
    if (category) {
      const isCurrentlyDifferent = body.name.input !== category.name;
      setIsEditing(isCurrentlyDifferent);
    }
  }, [body.name.input, category]);
  if (isLoading) return <div>Loading</div>;

  if (!category) return <div>Category Not Found</div>;
  const handleEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const array = [""];
    HandleEvent(e, setBody, body, array);
  };
  async function UpdateApi(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const input = {
      name: body.name.input,
      id: Number(body.id.input),
    };
    const sanitizedInput = sanitizeInput(input) as Record<
      string,
      string | number | null
    >;
    try {
      // Prepare FormData for API
      CategorySchema.parse(sanitizedInput);

      startTransition(async () => {
        const addProduct = await fetch(`/api/category/${input.id}`, {
          method: "PUT",
          body: JSON.stringify(sanitizedInput),
          cache: "no-store",
        });
        if (addProduct.ok) {
          alert("Category is Update");
          router.push("/admin/category/");
        } else {
          //   console.log(addProduct);
          alert("Category Already exist");
        }
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Map Zod errors to the body state
        const newBody = { ...body };
        e.issues.forEach((issue) => {
          const field = issue.path[0] as keyof typeof body;
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
      <Form
        submit={(e: React.FormEvent<HTMLFormElement>) => UpdateApi(e)}
        FormTitle="Product Form"
      >
        <Input
          onChange={(e) => handleEvent(e)}
          label="Product Name"
          placeholder="Enter Your Product Name"
          type="text"
          name="name"
          style="col-span-12"
          error={body.name.error}
          value={body.name.input}
        />
        {isEditing && (
          <Button
            disabled={isPending}
            style="col-span-6"
            text="Update Category"
          />
        )}
      </Form>
    </>
  );
}
