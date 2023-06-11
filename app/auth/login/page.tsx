import AuthForm from "@/components/AuthForm.client";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { type Metadata } from "next";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = async () => {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/chats");
  }

  const providers = await getProviders();

  return <AuthForm formAction="Login" providers={providers ?? []} />;
};

export default LoginPage;
