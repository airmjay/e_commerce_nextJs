"use client";
import React, { ReactHTMLElement, useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import Form from "../../components/Form";
import TextArea from "../../components/TextArea";
import { SelectWithConsumeApiFetchAll } from "../../components/SelectWithConsumeApiFetch";
import { productSchema, z } from "../../../zod/Validation";
interface BodyPropsInner {
  input: string;
  error: string;
}
interface BodyProps {
  name: BodyPropsInner;
  description: BodyPropsInner;
  specification: BodyPropsInner;
  unit: BodyPropsInner;
  category: BodyPropsInner;
  price: BodyPropsInner;
  image: {
    input: null;
    error: "";
  };
}
const AddProduct = () => {
  const bodyInner = {
    input: "",
    error: "",
  };

  const [body, setBody] = useState<BodyProps>({
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
  });

  const handleEvent = (e) => {
    const { name, value, files } = e.target;
    const updatedValue = ["unit", "price", "category"].includes(name)
      ? Number(value) || ""
      : name === "image"
      ? files[0] || null
      : value;

    setBody({
      ...body,
      [name]: {
        ...body[name],
        input: updatedValue,
        error: "",
      },
    });
  };
  const sanitizeInput = (input) => {
    const sanitized = {};
    for (const field in input) {
      if (typeof input[field] === "string") {
        sanitized[field] = sanitizeHtml(input[field], {
          allowedTags: [], // Remove all HTML tags
          allowedAttributes: {}, // Remove all attributes
        }).trim();
      } else {
        // Keep non-string fields as-is
        sanitized[field] = input[field];
      }
    }
    return sanitized;
  };
  async function addApi(e) {
    e.preventDefault();

    const input = {
      name: body.name.input,
      description: body.description.input,
      image: body.image.input,
      price: body.price.input,
      category: body.category.input,
      unit: body.unit.input,
      specification: body.specification.input,
    };
    const sanitizedInput = sanitizeInput(input);
    try {
      const validate = productSchema.parse(sanitizedInput);
      // Prepare FormData for API
      const formData = new FormData();
      Object.keys(sanitizedInput).forEach((key) => {
        if (sanitizedInput[key] !== null) {
          formData.append(key, sanitizedInput[key]);
        }
      });
      await fetch("/api/product", {
        method: "POST",
        body: formData,
      });
      alert("Product is added");
    } catch (e) {
      if (e instanceof z.ZodError) {
        // Map Zod errors to the body state
        const newBody: BodyProps = { ...body };
        e.issues.forEach((issue) => {
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

  return (
    <>
      <Form
        submit={(e: React.FormEvent<HTMLFormElement>) => addApi(e)}
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
        <Button style="col-span-6" text="Add Product" />
      </Form>
    </>
  );
};

export default AddProduct;
