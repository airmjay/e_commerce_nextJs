"use client";
import Button from "@/app/admin/components/Button";
import { Input } from "@/app/admin/components/Input";
import sanitizeInput from "@/app/config/SanitizHtmlData";
import { AuthSchema, z } from "@/app/zod/Validation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
const Register = () => {
  interface BodyPropsInner {
    input: string;
    error: string;
  }
  interface BodyProps {
    email: BodyPropsInner;
    password: BodyPropsInner;
  }
  const bodyInner = {
    input: "",
    error: "",
  };

  const [body, setBody] = useState<BodyProps>({
    email: bodyInner,
    password: bodyInner,
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

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    const input = {
      email: body.email.input,
      password: body.password.input,
    };
    const sanitizedInput = sanitizeInput(input);
    try {
      AuthSchema.parse(sanitizedInput);
      const req = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(sanitizedInput),
      });
      if (req.status === 201) {
        setBody({
          ...body,
          email: { input: "", error: "" },
          password: { input: "", error: "" },
        });
        alert("user is added");
      } else if (req.status === 409) {
        alert("user not added email already exist");
      } else {
        console.log(req);
      }
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
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => addUser(e)}
      className="relative"
    >
      <Link
        href="/"
        className="inline-block mt-2 text-blue-500 mx-8 button-color hover:text-blue-300 text-white p-2"
      >
        Home
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-12 mb-2 mt-2 md:mx-[100px] justify-center">
        <div className="shadow md:col-span-5 h-[100vh] hidden md:block">
          <Image
            src="/images/Login.png"
            alt="alt"
            width={600}
            height={600}
            objectFit="cover"
            className="h-full"
          />
        </div>
        <div className="shadow md:col-span-7 flex flex-col gap-2 mt-[50px]">
          <h2 className="text-center font-extrabold text-2xl text-gray-500">
            Register Page
          </h2>
          <div className="form-group px-8">
            <Input
              onChange={(e) => handleEvent(e)}
              label=" Enter your email"
              placeholder="Enter Your email e.g x@gmail.com"
              type="text"
              name="email"
              style="bg-transparent outline-0 w-full p-2"
              error={body.email.error}
              value={body.email.input}
            />
          </div>
          <div className="form-group px-8">
            <Input
              onChange={(e) => handleEvent(e)}
              label=" Enter your Password"
              placeholder="Enter Your password"
              type="Password"
              name="password"
              style="bg-transparent outline-0 w-full p-2"
              error={body.password.error}
              value={body.password.input}
            />
          </div>
          <div className="flex gap-1 px-8">
            <input type="checkbox" className="border p-1 bg-orange-400" />
            <span> Remember Me </span>
          </div>
          <div className="px-8">
            <Button
              style="w-full button-color hover:bg-blue-500 hover:text-gray-700 p-2 text-white outline-0 border-0"
              text="Signup"
            />
          </div>
          <hr className="bg-gray-400 my-1" />
          <div className="px-8 text-center text-gray-500">
            Already have an account:
            <Link className="underline text-blue-500" href="/register">
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
