import { create } from "zustand";
import { User } from "@/types/db";

type State = {
  user: Partial<User>;
};

type Action = {
  updateUser: (user: State["user"]) => void;
};

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<State & Action>((set) => ({
  user: { id: "", name: "" },
  updateUser: (user) => set(() => ({ user })),
}));

export { useUserStore };
