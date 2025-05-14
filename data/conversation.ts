import db from "@/db";
import { conversation } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Message } from "@ai-sdk/react";

export const getMessagesByConversation = async (id: string) => {
  const response = await db.query.conversation.findFirst({
    where: eq(conversation.id, id),
    with: {
      messages: {
        orderBy: (message, { asc }) => [asc(message.createdAt)],
      },
    },
  });
  return (response?.messages || []) as Message[];
};
