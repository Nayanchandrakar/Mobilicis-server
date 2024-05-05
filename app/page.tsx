import { CardWrapper } from "@/components/shared/card-wrapper";
import Container from "@/components/shared/global-container";
import { Button } from "@/components/ui/button";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import Link from "next/link";

interface HomepageProps {}

const Homepage = ({}: HomepageProps) => {
  return (
    <section className="w-full h-screen bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center">
      <CardWrapper
        title="User Managment System"
        description="It is a platform for managing user session."
      >
        <div className="flex items-center justify-center h-[100px] ">
          <Button size="lg" className="px-12 py-6" asChild>
            <Link href={DEFAULT_REDIRECT_URL}>Explore</Link>
          </Button>
        </div>
      </CardWrapper>
    </section>
  );
};

export default Homepage;
