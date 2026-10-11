import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CASCADE — Drought Intelligence Engine",
    template: "%s | CASCADE",
  },
  description:
    "Predict downstream drought stress, understand watershed vulnerability, and support proactive agricultural resource management with CASCADE.",
  applicationName: "CASCADE",
  keywords: [
    "CASCADE",
    "drought intelligence",
    "watershed monitoring",
    "GraphSAGE",
    "agricultural resource management",
    "digital twin",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#06110D] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
