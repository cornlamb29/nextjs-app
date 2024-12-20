
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from 'next/image';
import ThemeProvider from "../providers/theme";
import RecoilTheme from "../providers/recoil";

import "./globals.scss";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "600"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <RecoilTheme>
          <ThemeProvider>
            <header className="pt-2.5 pb-5">
              <Image
                src="/friendkit-bold.svg" // Path to your image, can be local or remote
                alt="App logo"
                width={ 20 }
                height={ 20 }
              />
            </header>

            <main className="flex">
              { children }
            </main>

          </ThemeProvider>
        </RecoilTheme>
      </body>
    </html>
  );
}
