"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user";
import db from "@/db";
import { user } from "@/db/schema";
import { SignUpSchema } from "@/schemas/auth";

export const signUp = async (_: unknown, formData: FormData) => {
  // TODO 1. validate Fields
  const validateFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  // TODO 2. 이미 존재하는 사용자인지 체크
  const { email, name, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        errorMessage: "이미 존재하는 사용자 입니다.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // TODO 3. insert DB
    await db.insert(user).values({ email, name, password: hashedPassword });
  } catch (error) {
    console.error("error", error);
    return { errorMessage: "문제가 발생했습니다." };
  }
  redirect("/login");
};
