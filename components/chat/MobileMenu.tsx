"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Sidebar } from "./Sidebar";
import { useSheetStore } from "@/store/sheet";

export function MobileMenu() {
  const open = useSheetStore((state) => state.open);
  const setOpen = useSheetStore((state) => state.setOpen);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetTitle className="sr-only">모바일 메뉴</SheetTitle>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
