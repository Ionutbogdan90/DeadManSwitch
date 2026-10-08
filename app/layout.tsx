import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Check-in App",
  description: "48-hour check-in timer with encryption",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}