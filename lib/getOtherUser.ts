import type { Chat, User } from "@prisma/client";
import getServerAuthSession from "./getServerAuthSession";
import getUserById from "./getUserById";

const getOtherUser = async (
  chat:
    | (Chat & {
        users: User[];
      })
    | null
) => {
  const session = await getServerAuthSession();

  if (!chat) return;

  const otherUserIds = chat.userIds.filter(
    (userId) => userId != session?.user.id
  );

  const otherUserId = otherUserIds[0];

  const otherUser = await getUserById(otherUserId);

  if (!otherUser) return;

  return otherUser;
};

export default getOtherUser;
