"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/store/user";
import { verifySession } from "@/actions/sessions";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const updateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    const setUser = async () => {
      const user = await verifySession();

      if (user) {
        updateUser(user);
      }
    };

    setUser();
  }, [updateUser]);

  return <>{children}</>;
}
