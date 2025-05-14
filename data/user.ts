import { User } from "@/types/db";
import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifySession } from "@/actions/sessions";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });
    if (!existingUser) {
      return null;
    }
    return existingUser;
  } catch (e) {
    console.error(e);
    throw new Error("문제가 발생했습니다.");
  }
};

export const getConversationsByUser = async () => {
  const session = await verifySession();

  const response = await db.query.user.findFirst({
    where: eq(user.id, session.id),
    with: {
      conversations: {
        orderBy: (conversation, { desc }) => [desc(conversation.updatedAt)],
      },
    },
  });
  return response?.conversations || [];
};
