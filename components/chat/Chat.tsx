"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { useParams, useRouter } from "next/navigation";
import { useModelStore } from "@/store/model";
import { ArrowUp } from "lucide-react";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { addMessages, createConversations } from "@/actions/conversations";
import { AutoResizingTextarea } from "@/components/chat/AutoResizingTextarea";
import { Button } from "@/components/ui/button";
import { CHAT_ROUTES } from "@/constants/route";

export function Chat() {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async (message) => {
      // param => conversation 없으면 새로운 대화 페이지
      if (!params.conversationId) {
        // 1. create conversation
        const conversation = await createConversations(input);

        // 2. add Messages
        await addMessages(conversation.id, input, message.content);

        router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
      } else {
      }
    },
  });
  const model = useModelStore((state) => state.model);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅영역 */}
      <div className="flex-1">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                name={"user"}
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
