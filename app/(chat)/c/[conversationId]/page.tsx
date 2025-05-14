import { Chat } from "@/components/chat/Chat";
import { getMessagesByConversation } from "@/data/conversation";

type Props = {
  params: Promise<{ conversationId: string }>;
};

export default async function ConversationPage({ params }: Props) {
  const { conversationId } = await params;

  const messages = await getMessagesByConversation(conversationId);
  return <Chat initialMessages={messages} />;
}
