import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import SmoothScroll from "./providers/SmoothScroll";
import ScrollProgress from "./components/effects/ScrollProgress";
import MouseSpotlight from "./components/effects/MouseSpotlight";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jakarta.variable}>
        <SmoothScroll>
            <ScrollProgress />
          <MouseSpotlight />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
                                       
