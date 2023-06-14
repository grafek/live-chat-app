import getServerAuthSession from "@/lib/getServerAuthSession";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  } else {
    redirect("/chats");
  }
}
