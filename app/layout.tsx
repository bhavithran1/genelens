import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "GeneLens AI — Google Maps for Cancer Genomics",
  description: "Navigate the cancer genome like never before. Interactive lessons, pathway maps, CRISPR lab — built for the next generation of oncologists.",
  keywords: ["cancer genomics", "CRISPR", "oncogenes", "pathway map", "interactive learning", "medical education"],
  openGraph: {
    title: "GeneLens AI — Google Maps for Cancer Genomics",
    description: "Navigate the cancer genome interactively. Explore 40+ cancer genes, simulate CRISPR, and learn through games.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
