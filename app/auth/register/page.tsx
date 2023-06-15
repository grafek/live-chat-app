import AuthForm from "@/components/AuthForm.client";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { type Metadata } from "next";
import getServerAuthSession from "@/lib/getServerAuthSession";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = async () => {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/chats");
  }

  const providers = await getProviders();
  return <AuthForm formAction="Register" providers={providers ?? []} />;
};

export default RegisterPage;