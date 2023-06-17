"use client";

import useActiveRoute from "@/hooks/useActiveRoute";
import getTimeAgo from "@/lib/getTimeAgo";
import type { Chat, Message, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  chat: Chat & {
    messages: Message[];
  };
  otherUser: User | undefined;
  isLastMessageMine: boolean;
};

const ChatItem: React.FC<Props> = ({ chat, otherUser, isLastMessageMine }) => {
  const isChatOpen = useActiveRoute(chat.id);

  return (
    <Link
      href={`/chats/${chat.id}`}
      className={`flex w-full items-center justify-center gap-2 rounded-md px-1 py-2 transition-colors hover:bg-gray-200 md:justify-start ${
        isChatOpen ? "bg-gray-100" : ""
      }`}
    >
      <Image
        height={48}
        width={48}
        src={otherUser?.image || "/user.png"}
        alt={`${otherUser?.name}'s picture`}
        className="rounded-full object-cover"
      />
      <div className="hidden md:flex md:flex-col md:items-start">
        <span>{otherUser?.name}</span>

        <div className="flex w-full items-center gap-1 text-[0.9rem] text-[#777]">
          {chat.messages.length > 0 ? (
            <>
              <span className="block max-w-[45%] truncate">
                {isLastMessageMine ? "You: " : ""}{" "}
                {chat.messages.at(-1)?.content}
              </span>
              <span> · </span>
              <span>
                {getTimeAgo(Date.parse(chat.lastMessageAt.toISOString()))}
              </span>
            </>
          ) : (
            "Started a conversation"
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
