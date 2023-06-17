import ChatItem from "@/components/ChatItem.client";
import Sidebar from "@/components/Sidebar.client";
import getChats from "@/lib/getChats";
import getOtherUser from "@/lib/getOtherUser";
import getServerAuthSession from "@/lib/getServerAuthSession";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const ChatsLayout: React.FC<IProps> = async ({ children }) => {
  const session = await getServerAuthSession();
  const chats = await getChats();

  return (
    <main className="flex h-screen w-full">
      <Sidebar session={session}>
        {chats && chats.length > 0 ? (
          <ul className="mt-4 h-[calc(100%-118px)] overflow-y-auto overflow-x-clip md:h-[calc(100%-150px)]">
            {chats.map(async (chatItem) => {
              const otherUser = await getOtherUser(chatItem);

              return (
                <li key={chatItem.id} className="py-1">
                  <ChatItem
                    chat={chatItem}
                    otherUser={otherUser}
                    isLastMessageMine={
                      chatItem?.messages.at(-1)?.senderId === session?.user.id
                    }
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="pt-4 text-center">
            No chats found! <br />
            You can start a conversation by selecting a user from the list{" "}
            <Link href={"/users"} className="text-violet-700 hover:underline">
              here
            </Link>
          </div>
        )}
      </Sidebar>
      {children}
    </main>
  );
};

export default ChatsLayout;
