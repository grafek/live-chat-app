"use client";

import type { Message as MessageType, User } from "@prisma/client";
import Image from "next/image";
import Message from "./Message.client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";

interface IProps {
  otherUser: User | undefined;
  chatId: string;
  initialMessages: MessageType[] | undefined;
}

const ChatBox: React.FC<IProps> = ({
  otherUser,
  chatId,
  initialMessages = [],
}) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const { data: session } = useSession();

  const submitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (messageContent && messageContent.trim().length > 0) {
        // optimistic adding message

        setMessages((prev) => [
          ...prev,
          {
            chatId,
            content: messageContent,
            createdAt: new Date(),
            id: Number(Math.random() * 20).toString(),
            senderId: session?.user.id!,
          },
        ]);

        fetch("/api/messages", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            chatId,
            messageContent,
          }),
        });
        setMessageContent("");
      }
    },
    [chatId, messageContent, session?.user.id]
  );

  useEffect(() => {
    inputRef.current?.focus();

    chatBoxRef.current?.scroll({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });

    pusherClient.subscribe(chatId);

    pusherClient.bind("messages-new", (message: MessageType) => {
      if (message.senderId != session?.user.id) {
        setMessages((prev) => {
          return [...prev, message];
        });
      }
    });

    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("messages-new");
    };
  }, [chatId, messages, session?.user.id]);

  return (
    <div className="relative flex min-w-[360px] flex-1 shrink-0 flex-col overflow-x-clip">
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

      <div
        ref={chatBoxRef}
        className="flex flex-1 flex-col gap-2 overflow-y-auto p-2 text-sm"
      >
        {messages?.map((message) => (
          <Message
            key={message.id}
            otherUser={otherUser}
            message={message.content}
            isMyMessage={message.senderId != otherUser?.id}
          />
        ))}
      </div>

      <form
        onSubmit={submitHandler}
        className="relative bottom-0 m-3 flex shrink-0 items-center gap-2  text-black"
      >
        <input
          className="w-full rounded-full bg-gray-200 px-3 py-1 placeholder:text-[#777] focus:outline-none"
          ref={inputRef}
          placeholder="Aa"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button
          disabled={messageContent.trim().length < 1}
          className="rounded-full p-2 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed [&>svg]:fill-violet-600 [&>svg]:disabled:fill-violet-400"
        >
          <svg height="20px" width="20px" viewBox="0 0 24 24">
            <title>Press Enter to send the message</title>
            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
