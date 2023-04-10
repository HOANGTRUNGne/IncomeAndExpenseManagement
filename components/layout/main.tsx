import { LayoutProps } from "~/models";
import { Footer } from "../common/footer";
import { Header } from "../common/header";

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
