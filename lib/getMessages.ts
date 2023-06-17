import getServerAuthSession from "./getServerAuthSession";
import { prisma } from "./prisma";

const getMessages = async (chatId:string) => {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      throw new Error("Unauthorized!");
    }

    const messages = await prisma.message.findMany({
      where: {
        chatId,
      },
    });

    return messages;
  } catch (e) {}
};

export default getMessages;
