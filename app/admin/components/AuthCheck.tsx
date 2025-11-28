import { getServerSession } from "next-auth";
import { AuthClient } from "./AuthClient";

export default async function AuthCheck() {
  const getUsersession = await getServerSession();
  console.log(getUsersession?.user.email);

  if (getUsersession?.user.email == "abdul@gmail.com") {
    return "";
  } else {
    <AuthClient />;
  }
}
