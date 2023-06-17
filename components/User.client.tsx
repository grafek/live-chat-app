"use client";

import type { User as UserType } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  id: UserType["id"];
  name: UserType["name"];
  image: UserType["image"];
}

const User: React.FC<IProps> = ({ name, image, id }) => {
  const router = useRouter();

  const createConversation = async () => {
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, image, name }),
    });

    const chat = await res.json();

    router.push(`/chats/${chat.id}`);
  };

  return (
    <button
      onClick={createConversation}
      title={`Start conversation with ${name}`}
      className="flex w-full items-center justify-center gap-2 rounded-md px-1 py-2 transition-colors hover:bg-gray-100 md:justify-start"
    >
      <Image
        priority
        height={48}
        width={48}
        src={image || "/user.png"}
        alt={`${name}'s picture`}
        className="rounded-full object-cover"
      />
      <div className="hidden md:flex md:flex-col md:items-start">
        <span>{name}</span>
      </div>
    </button>
  );
};
export default User;
