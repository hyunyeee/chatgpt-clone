import { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Submit({ children, ...others }: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="hover:cursor-pointer"
      type="submit"
      disabled={pending}
      {...others}
    >
      {children}
    </Button>
  );
}
