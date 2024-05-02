import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { userInterface } from "@/types/types";
import UserAvatar from "./user-avatar";

const Navigation = ({ user }: { user: userInterface }) => {
  const isAuth = !!user?.emailVerified;

  return (
    <nav className="flex flex-row gap-2 items-center justify-center">
      {isAuth ? (
        <UserAvatar user={user} />
      ) : (
        <Button variant="ghost" asChild>
          <Link href="/auth/login"> Log in</Link>
        </Button>
      )}
    </nav>
  );
};

export default Navigation;
