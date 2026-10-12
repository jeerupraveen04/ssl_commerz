import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SSLCOMMERZ Hosted Checkout",
  description:
    "Next.js frontend that drives the SSLCOMMERZ hosted checkout flow via a TypeScript backend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
