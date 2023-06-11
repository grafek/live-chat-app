import { redirect } from "next/navigation";
import { getServerAuthSession } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/login");
  } else {
    redirect("/chats");
  }
}
