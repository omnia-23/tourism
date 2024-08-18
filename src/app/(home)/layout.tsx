import { Footer, Nav } from "@/components/layout";
import { Toaster } from "@/components/ui";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Nav />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
