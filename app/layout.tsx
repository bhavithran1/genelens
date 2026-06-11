import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "GeneLens AI — Google Maps for Cancer Genomics",
  description: "Explore cancer genomes interactively. Learn oncogenes, pathways, CRISPR — through engaging games and step-by-step lessons.",
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
