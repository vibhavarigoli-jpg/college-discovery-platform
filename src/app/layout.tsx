import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Discovery Platform",
  description: "Find and benchmark your absolute ideal career option paths engineering metrics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        
        {/* Global Navigation Branding Bar Area */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/colleges" className="flex items-center gap-2 group">
              <span className="bg-indigo-600 text-white font-black text-sm p-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-all">🎓</span>
              <span className="font-extrabold text-base tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
                EduDiscovery <span className="text-indigo-600 font-medium">Hub</span>
              </span>
            </Link>
            
            <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
              <Link href="/colleges" className="hover:text-indigo-600 transition-colors">
                Directory Index
              </Link>
              <Link href="/compare" className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 px-3 py-1.5 rounded-md transition-all">
                ⇄ Compare Basket Matrix
              </Link>
            </div>
          </div>
        </nav>

        {/* Core Pages Injection Target Framework Content Elements Router View Slot */}
        <main>{children}</main>

      </body>
    </html>
  );
}