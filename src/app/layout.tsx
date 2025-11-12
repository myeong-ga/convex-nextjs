import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { Analytics } from "@vercel/analytics/next";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "GitHub Search Agent",
  description: "AI-powered GitHub search assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
        <head>
        {/* add The Context Company widget */}
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/@contextcompany/widget/dist/auto.global.js"
        /> */}
        {/* other scripts */}
      </head>
      <body className="h-full antialiased">
        <Script
        src="//unpkg.com/@contextcompany/widget/dist/auto.global.js"
          strategy="beforeInteractive"
        />
        <ConvexClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

