import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const getServerAuthSession = () => {
  return getServerSession(authOptions);
};

export default getServerAuthSession;
