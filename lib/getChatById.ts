import getServerAuthSession from "./getServerAuthSession";
import { prisma } from "./prisma";

const getChatById = async (chatId: string) => {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      throw new Error("Unauthorized!");
    }

    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        users: true,
      },
    });

    if (!chat) {
      throw new Error("Invalid chat ID");
    }

    return chat;
  } catch (e) {
    return null;
  }
};
export default getChatById;
