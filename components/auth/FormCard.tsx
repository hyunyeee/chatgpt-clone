import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  title: string;
  footer: { label: string; href: string };
  children: React.ReactNode;
};

export default function FormCard({ title, footer, children }: Props) {
  return (
    <Card className="w-[500px] flex items-center border">
      <CardHeader>
        <CardTitle className="w-full text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="w-[90%]">{children}</CardContent>
      <CardFooter>
        <Link className="text-sm text-sky-700" href={footer.href}>
          {footer.label}
        </Link>
      </CardFooter>
    </Card>
  );
}
