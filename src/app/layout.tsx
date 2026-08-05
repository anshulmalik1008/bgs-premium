import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import Providers from "./providers";
import SmoothScroll from "./providers/SmoothScroll";

import ScrollProgress from "./components/effects/ScrollProgress";
import MouseSpotlight from "./components/effects/MouseSpotlight";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jakarta.variable}>
        <Providers>
          <SmoothScroll>
            <ScrollProgress />
            <MouseSpotlight />
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
