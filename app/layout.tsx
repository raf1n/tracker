import "./styles.css";
import SwRegister from "./sw-register";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Milk Tracker",
  description: "A simple SQLite-compatible milk log backed by Turso.",
  appleWebApp: { capable: true, title: "Milk", statusBarStyle: "default" },
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { themeColor: "#f3f4f2" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <SwRegister />
      </body>
    </html>
  );
}
