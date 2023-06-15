import getServerAuthSession from "./getServerAuthSession";
import { prisma } from "./prisma";

const getUsers = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized!");
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default getUsers;
