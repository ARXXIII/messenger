import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AR23 | Messenger",
  description: "Messenger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
