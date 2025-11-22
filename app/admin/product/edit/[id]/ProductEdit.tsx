"use client";
import React, { useEffect, useState } from "react";
import { useTransition } from "react";
import fetchData from "../../../../config/httpRequest";
import {
  Body,
  ProductIdPros,
  ProductType,
} from "../../../../config/ProductProps";
import HandleEvent from "../../../../config/EventHandler";
import sanitizeInput from "../../../../config/SanitizHtmlData";
import { Input } from "../../../components/Input";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import TextArea from "../../../components/TextArea";
import { SelectWithConsumeApiFetchAll } from "../../../components/SelectWithConsumeApiFetch";
import { z } from "../../../../zod/Validation";
import { useRouter } from "next/navigation";

export default function ProductEdit({ productId }: ProductIdPros) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const bodyInnerText = {
    input: "",
    error: "",
  };
  const bodyInnerNumber = {
    input: 0,
    error: "",
  };
  const [body, setBody] = useState<Body>({
    name: bodyInnerText,
    description: bodyInnerText,
    specification: bodyInnerText,
    unit: bodyInnerNumber,
    category: bodyInnerNumber,
    price: bodyInnerNumber,
    image: {
      input: "",
      error: "",
    },
    id: bodyInnerNumber,
    filename: bodyInnerText,
  });
  const [product, setProduct] = useState<ProductType | undefined>();
  const id = productId;
  useEffect(() => {
    const getApi = async () => {
      const fetchedProduct = await fetchData<ProductType>(
        "product",
        id,
        setIsLoading
      );
      // Populate form after data is fetched
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setBody({
          name: { input: fetchedProduct.name, error: "" },
          description: {
            input: fetchedProduct.description,
            error: "",
          },
          specification: {
            input: fetchedProduct.specification,
            error: "",
          },
          unit: { input: fetchedProduct.unit, error: "" },
          category: {
            input: fetchedProduct.category_id,
            error: "",
          },
          price: { input: fetchedProduct.price, error: "" },
          image: { input: "", error: "" },
          id: { input: fetchedProduct.id },
          filename: { input: fetchedProduct.image },
        });
      }
    };
    getApi();
  }, [id]);
  if (isLoading) return <div>Loading</div>;

  if (!product) return <div>Product Not Found</div>;
  const handleEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const array = ["price", "unit", "categoory"];
    HandleEvent(e, setBody, body, array);
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
