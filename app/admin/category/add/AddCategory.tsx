"use client";
import React, { useState } from "react";
import { Input } from "../../components/Input";
import Button from "../../components/Button";
import Form from "../../components/Form";
import sanitizeInput from "../../../config/SanitizHtmlData";
import { CategorySchema, z } from "../../../zod/Validation";
interface BodyPropsInner {
  input: string;
  error: string;
}
interface BodyProps {
  name: BodyPropsInner;
}
const AddCategory = () => {
  const bodyInner = {
    input: "",
    error: "",
  };

  const [body, setBody] = useState<BodyProps>({
    name: bodyInner,
  });

  const handleEvent = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    const updatedValue = value;
    setBody({
      ...body,
      [name]: {
        input: updatedValue,
        error: "",
      },
    });
  };

  async function addApi(e: React.FormEvent) {
    e.preventDefault();
    const input = {
      name: body.name.input,
    };
    const sanitizedInput = sanitizeInput(input);
    try {
      CategorySchema.parse(sanitizedInput);
      // Prepare FormData for API
      await fetch("/api/category", {
        method: "POST",
        body: JSON.stringify(sanitizedInput),
      });
      alert("Category is added");
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

  return (
    <>
      <Form
        submit={(e: React.FormEvent<HTMLFormElement>) => addApi(e)}
        FormTitle="Category Form"
      >
        <Input
          onChange={(e) => handleEvent(e)}
          label="Category Name"
          placeholder="Enter Your Category Name"
          type="text"
          name="name"
          style="col-span-12"
          error={body.name.error}
          value={body.name.input}
        />
        <Button style="col-span-6" text="Add Category" />
      </Form>
    </>
  );
};

export default AddCategory;
