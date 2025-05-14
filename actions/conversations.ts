"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/actions/sessions";
import db from "@/db";
import { conversation, message } from "@/db/schema";
import { BASE_URL, CHAT_ROUTES } from "@/constants/route";

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

  revalidatePath(`${CHAT_ROUTES.CONVERSATIONS}/${conversationId}`);
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

  revalidatePath(BASE_URL);

  return result[0];
};
