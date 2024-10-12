import type { Metadata } from "next";
import { Poppins, Noto_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });
const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Do App",
  description: "skkra0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen w-full flex flex-col ${noto.className}`}>
      <div
        className={`h-24 pt-4 pb-3 pl-3 pr-3 bg-peat text-stone-900 font-bold ${poppins.className}`}
      >
        <button className="rounded-md mt-2 ml-3 mr-5 float-left hover:bg-peat-dark">
          <svg 
          xmlns="http://www.w3.org/2000/svg"
          fill="none" 
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-12 text-stone-900 hover:cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="mt-2 inline-block text-5xl float-left">Peat</h1>
      </div>
      <div className="bg-gradient-to-r from-emerald-600 to-amber-500 h-2"></div>
      <div
        className="main h-full w-full bg-orange-300 text-black border-t border-stone-900 flex flex-row">
          {children}
      </div>
      </body>
    </html>
  );
}
