"use client";

import useActiveRoute from "@/hooks/useActiveRoute";
import Image from "next/image";
import Link from "next/link";

const MyAIChatItem: React.FC = () => {
  const isChatOpen = useActiveRoute("ai");

  return (
    <Link
      href={`/chats/ai`}
      className={`flex w-full items-center justify-center gap-2 rounded-md px-1 py-2 transition-colors hover:bg-gray-200 md:justify-start ${
        isChatOpen ? "bg-gray-100" : ""
      }`}
    >
      <Image
        height={48}
        width={48}
        src={"/bot.jpg"}
        alt={`Assistant's picture`}
        className="rounded-full object-cover"
      />
      <div className="hidden md:flex md:flex-col md:items-start">
        <span className="font-semibold">{"My AI"}</span>
      </div>
    </Link>
  );
};

export default MyAIChatItem;
