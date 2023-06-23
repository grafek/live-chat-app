import ChatBox from "@/components/ChatBox.client";
import getChatById from "@/lib/getChatById";
import getMessages from "@/lib/getMessages";
import getOtherUser from "@/lib/getOtherUser";

interface IProps {
  params: {
    chatId: string;
  };
}

const ChatPage: React.FC<IProps> = async ({ params }) => {
  const chat = await getChatById(params.chatId);
  const otherUser = await getOtherUser(chat);
  const messages = await getMessages(params.chatId);

  return (
    <ChatBox
      otherUser={otherUser}
      chatId={params.chatId}
      initialMessages={messages}
    />
  );
};

export default ChatPage;
