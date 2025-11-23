"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

export default function AuthCheck() {
  const router = useRouter;
  // Destructure session data and status
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    if (session.user.id != "1") {
      //   redirect("/");
      console.log("not ready");
    }
  } else if (status === "unauthenticated") {
    // redirect("/");
  }

  return <p>Please sign in to continue.</p>;
}
