import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export const CardWrapper = ({
  children,
  description,
  title,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className="w-[500px] ">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>

      <CardFooter className="flex items-center justify-center pt-0">
        {!!(backButtonHref && backButtonLabel) && (
          <Link
            href={backButtonHref}
            className="transition-all duration-200  hover:underline font-medium "
          >
            {backButtonLabel}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
