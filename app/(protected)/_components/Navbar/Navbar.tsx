import { userInterface } from "@/types/types";
import Logo from "./logo";
import Navigation from "./navigation";

const Navbar = ({ user }: { user: userInterface }) => {
  return (
    <header className="w-full bg-white h-[78px] border-b fixed top-0 ">
      <div className="w-full h-full  flex justify-between items-center px-8">
        <Logo />
        <Navigation user={user} />
      </div>
    </header>
  );
};

export default Navbar;
