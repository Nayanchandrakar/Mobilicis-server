import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "authentication made simple",
  description: "next js app router",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-r from-sky-400 to-blue-500">
      {children}
    </div>
  );
}
