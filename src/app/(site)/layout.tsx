import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CursorSpotlight } from "@/components/effects/cursor-spotlight";
import { AmbientPlayer } from "@/components/site/ambient-player";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <CursorSpotlight />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <AmbientPlayer />
    </SmoothScrollProvider>
  );
}
