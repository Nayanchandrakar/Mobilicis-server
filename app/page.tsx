import Container from "@/components/shared/global-container";
import { Button } from "@/components/ui/button";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import Link from "next/link";

interface HomepageProps {}

const Homepage = ({}: HomepageProps) => {
  return (
    <section className="w-full h-screen bg-gradient-to-r from-rose-700 to-pink-600">
      <Container asChild>
        <div className="flex items-center justify-center flex-col gap-3 ">
          <h1 className="text-white font-semibold text-6xl upper">
            Welcome to your workspace.
          </h1>
          <p className="text-center text-xl text-zinc-100 font-medium max-w-[40%]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Recusandae, numquam odio
          </p>

          <Button size="lg" className="px-12 py-6" asChild>
            <Link href={DEFAULT_REDIRECT_URL}>Explore</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Homepage;
