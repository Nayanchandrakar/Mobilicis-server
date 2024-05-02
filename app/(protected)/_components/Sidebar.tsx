import NavigationPanel from "@/app/(protected)/_components/navigation-panel";

const Sidebar = () => {
  return (
    <aside className="w-full h-full flex flex-col justify-between">
      <NavigationPanel />
    </aside>
  );
};

export default Sidebar;
