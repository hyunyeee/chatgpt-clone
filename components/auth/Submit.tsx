import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Submit({ children, ...others }: SubmitProps) {
  return (
    <Button type="submit" {...others}>
      {children}
    </Button>
  );
}
