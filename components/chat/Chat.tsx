"use client";

import { useEffect, useRef } from "react";
import { useChat, Message as TMessage } from "@ai-sdk/react";
import { useParams, useRouter } from "next/navigation";
import { useModelStore } from "@/store/model";
import { ArrowUp } from "lucide-react";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { addMessages, createConversations } from "@/actions/conversations";
import { AutoResizingTextarea } from "@/components/chat/AutoResizingTextarea";
import { Button } from "@/components/ui/button";
import { CHAT_ROUTES } from "@/constants/route";
import { useUserStore } from "@/store/user";

type Props = {
  initialMessages?: TMessage[];
};

export function Chat({ initialMessages }: Props) {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();
  const user = useUserStore((state) => state.user);

  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat({
      onFinish: async (message) => {
        // param => conversation 없으면 새로운 대화 페이지
        if (!params.conversationId) {
          // 1. Create Conversation
          const conversation = await createConversations(input);

          // 2. Add Messages
          await addMessages(conversation.id, input, message.content);

          router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
        } else {
          // param => conversation 있으면 기존 대화 페이지
          // 1. Add Messages
          await addMessages(params.conversationId, input, message.content);
        }
      },
    });
  const model = useModelStore((state) => state.model);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages, setMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅영역 */}
      <div className="flex-1">
        {!params.conversationId && messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                name={user.name}
                content={message.content}
                role={message.role}
              />
            ))}
          </>
        )}
      </div>

      {/* input영역 */}
      <div className="pb-5 sticky bottom-0 bg-white">
        <form
          className="flex items-center justify-center gap-4"
          onSubmit={(e) => handleSubmit(e, { data: { model } })}
        >
          <AutoResizingTextarea value={input} onChange={handleInputChange} />
          <Button type="submit" size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
