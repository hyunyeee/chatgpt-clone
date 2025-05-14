"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  name: string;
};
export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

export const verify = async (session: string | undefined = "") => {
  if (!session) {
    console.warn("verify 함수: 세션이 비어 있습니다.");
    return null;
  }

  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error(error, "토큰 검증에 실패하였습니다.");
  }
};

export const createSession = async (payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    redirect("/login");
  }
  return session;
};
