"use client";
import { useRouter } from "next/router";

const AuthClient = () => {
  const route = useRouter();
  return route.push("/");
};

export { AuthClient };
