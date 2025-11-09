"use client";
import React, { useEffect, useState } from "react";
import { useTransition } from "react";
import sanitizeHtml from "sanitize-html";
import { Input } from "../../../components/Input";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import TextArea from "../../../components/TextArea";
import { SelectWithConsumeApiFetchAll } from "../../../components/SelectWithConsumeApiFetch";
import { productSchema, z } from "../../../../zod/Validation";
import { useRouter } from "next/navigation";
import { keyof } from "zod";
interface ProductType {
  name: string;
  description: string;
  specification: string;
  unit: number;
  category: string;
  price: number;
  image: null;
}
interface ProductIdPros {
  productId: number;
}
interface PropsFiles {
  files: object;
  name: string;
  value: string;
}
interface InputProps {
  name: string;
  description: string;
  image: string;
  price: number;
  category: number;
  unit: number;
  specification: string;
  id: number;
  filename: string;
}
export default function ProductEdit({ productId }: ProductIdPros) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const bodyInner = {
    input: "",
    error: "",
  };
  const [body, setBody] = useState({
    name: bodyInner,
    description: bodyInner,
    specification: bodyInner,
    unit: bodyInner,
    category: bodyInner,
    price: bodyInner,
    image: {
      input: null,
      error: "",
    },
    id: {
      input: "",
    },
    filename: {
      input: "",
    },
  });
  const [product, setProduct] = useState<ProductType[] | undefined>();
  const id = productId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/product/${id}`, {
          cache: "no-store",
          method: "GET",
        });

        const products = await res.json();
        const fetchedProduct = products[0];
        if (fetchedProduct) {
          setProduct(fetchedProduct);

          // Populate form after data is fetched
          setBody({
            name: { input: fetchedProduct.name || "", error: "" },
            description: {
              input: fetchedProduct.description || "",
              error: "",
            },
            specification: {
              input: fetchedProduct.specification || "",
              error: "",
            },
            unit: { input: fetchedProduct.unit || "", error: "" },
            category: {
              input: fetchedProduct.category_id || "",
              error: "",
            },
            price: { input: fetchedProduct.price || "", error: "" },
            image: { input: null, error: "" },
            id: { input: fetchedProduct.id },
            filename: { input: fetchedProduct.image },
          });
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

  if (!product) return <div>Product Not Found</div>;
  const handleEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const files = "files" in e.target ? e.target.files : null;
    const updatedValue = ["unit", "price", "category"].includes(name)
      ? Number(value) || ""
      : name === "image"
      ? files
        ? files[0]
        : null
      : value;

    setBody({
      ...body,
      [name]: { input: updatedValue, error: "" },
    });
  };
  const sanitizeInput = (
    input: Record<string, string | number | File | null>
  ) => {
    const sanitized: Record<string, string | number | File | null> = {};

    for (const field in input) {
      const value = input[field];

      if (typeof value === "string") {
        sanitized[field] = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        }).trim();
      } else {
        sanitized[field] = value;
      }
    }

    return sanitized;
  };
  async function UpdateApi(e: React.FormEvent<HTMLFormElement>) {
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
      filename: body.filename.input,
    };
    const sanitizedInput = sanitizeInput(input) as Record<
      string,
      string | number | File | null
    >;
    try {
      // Prepare FormData for API
      const formData = new FormData();
      Object.keys(sanitizedInput).forEach((key) => {
        if (sanitizedInput[key] != null) {
          formData.append(key, sanitizedInput[key] as string);
        }
      });

      startTransition(async () => {
        const addProduct = await fetch(`/api/product/${input.id}`, {
          method: "PUT",
          body: formData,
          cache: "no-store",
        });
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
        e.issues.forEach((issue) => {
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
          onChange={(e) => handleEvent(e)}
          label="Product Name"
          placeholder="Enter Your Product Name"
          type="text"
          name="name"
          error={body.name.error}
          value={body.name.input}
        />
        <Input
          onChange={(e) => handleEvent(e)}
          label="Product Specification"
          placeholder="Enter Your Product Specification"
          type="text"
          name="specification"
          error={body.specification.error}
          value={body.specification.input}
        />
        <Input
          onChange={(e) => handleEvent(e)}
          label="Product Units"
          placeholder="Enter number of available product"
          type="number"
          name="unit"
          error={body.unit.error}
          value={body.unit.input}
        />
        <SelectWithConsumeApiFetchAll
          onChange={(e) => handleEvent(e)}
          name="category"
          error={body.category.error}
          value={body.category.input}
          label="Product Category"
          placeholder="Enter Your Product Category"
        />
        <Input
          onChange={(e) => handleEvent(e)}
          label="Product Image"
          error={body.image.error}
          placeholder="Select Product Image"
          type="file"
          name="image"
        />
        <Input
          onChange={(e) => handleEvent(e)}
          value={body.price.input}
          label="Product Price"
          placeholder="Enter Product price"
          type="number"
          error={body.price.error}
          name="price"
        />
        <TextArea
          onChange={(e) => handleEvent(e)}
          value={body.description.input}
          col_span="col-span-12"
          label="Product description"
          error={body.description.error}
          placeholder="Enter Your Product Description"
          name="description"
        />
        <Button disabled={isPending} style="col-span-6" text="Update Product" />
      </Form>
    </>
  );
}
