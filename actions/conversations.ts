"use server";

import { verifySession } from "@/actions/sessions";
import db from "@/db";
import { conversation, message } from "@/db/schema";

export const addMessages = async (
  conversationId: string,
  userContent: string,
  assistantContent: string,
) => {
  await db.insert(message).values({
    conversationId,
    content: userContent,
    role: "user",
  });

  await db.insert(message).values({
    conversationId,
    content: assistantContent,
    role: "assistant",
  });
};

export const createConversations = async (name: string) => {
  const session = await verifySession();

  const result = await db
    .insert(conversation)
    .values({
      name,
      userId: session.id,
    })
    .returning();

  return result[0];
};
