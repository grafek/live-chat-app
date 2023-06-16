import ChatBox from "@/components/ChatBox.client";
import getChatById from "@/lib/getChatById";
import getOtherUser from "@/lib/getOtherUser";

interface IProps {
  params: {
    chatId: string;
  };
}

const ChatPage: React.FC<IProps> = async ({ params }) => {
  const chat = await getChatById(params.chatId);
  const otherUser = await getOtherUser(chat);

  return <ChatBox otherUser={otherUser} />;
};

export default ChatPage;
