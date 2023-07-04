"use client";

import type { User } from "@prisma/client";
import Image from "next/image";

interface IProps {
  isMyMessage?: boolean;
  message: string;
  otherUser?: User | undefined;
}
const Message: React.FC<IProps> = ({ isMyMessage, message, otherUser }) => {
  return (
    <div className={`${isMyMessage ? "ml-auto" : ""} flex items-center gap-1`}>
      {otherUser && !isMyMessage ? (
        <Image
          alt={`${otherUser.name}'s image`}
          src={otherUser.image ?? "/user.png"}
          width={28}
          className="rounded-full border"
          height={28}
        />
      ) : null}
      <span
        className={`${
          isMyMessage ? "bg-violet-600 text-white" : "bg-gray-200"
        } inline-block max-w-[360px] break-words rounded-3xl px-3 py-2 md:max-w-sm lg:max-w-xl`}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
