import getServerAuthSession from "./getServerAuthSession";
import { prisma } from "./prisma";

const getUserById = async (userId: string) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized!");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export default getUserById;
