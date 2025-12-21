import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cohort - Shift Coverage Management",
  description:
    "Cohort exists to reverse the timeline of coverage breaks. Instead of ops being the first to feel a gap, Cohort pushes accountability upstream so coverage reliability becomes visible before the shift is already breaking.",
  openGraph: {
    title: "Cohort - Shift Coverage Management",
    description:
      "Move from reactive firefighting to controlled coverage. See what's actually covered, what's at risk, and what's being actively handled.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

