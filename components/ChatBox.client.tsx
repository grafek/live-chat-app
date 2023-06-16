"use client";

import type { User } from "@prisma/client";
import Image from "next/image";
import Message from "./Message.client";
import { useEffect, useRef } from "react";

interface IProps {
  otherUser: User | undefined;
}

const ChatBox: React.FC<IProps> = ({ otherUser }) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBoxRef.current?.scroll({
      top: chatBoxRef.current.scrollHeight,
      behavior: "auto",
    });
  }, []);

  return (
    <div className="relative flex flex-1 shrink-0 flex-col">
      <div className="flex h-16 w-full items-center gap-2 border-b px-3">
        <Image
          src={otherUser?.image || "/user.png"}
          alt={`${otherUser?.name}'s picture`}
          width={36}
          height={36}
          className="rounded-full"
        />
        <span className="font-semibold">{otherUser?.name}</span>
      </div>

      {/* messages */}
      <div
        ref={chatBoxRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-2 text-sm"
      >
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Message
              key={i}
              otherUser={otherUser}
              message="message"
              isMyMessage={i % 2 === 1}
            />
          ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="relative bottom-0 m-3 flex shrink-0 items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-black"
      >
        <input
          className="w-full bg-inherit placeholder:text-[#777] focus:outline-none"
          placeholder="Aa"
        />
      </form>
    </div>
  );
};

export default ChatBox;
