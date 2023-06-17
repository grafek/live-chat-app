import getServerAuthSession from "./getServerAuthSession";
import { prisma } from "./prisma";

const getChats = async () => {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      throw new Error("Unauthorized!");
    }
    const chats = await prisma.chat.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: session.user.id,
        },
      },
      include: {
        messages: true,
        users: true,
      },
    });

    return chats;
  } catch (e) {
    return [];
  }
};

export default getChats;
