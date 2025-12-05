import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";  
import "./globals.css";



const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  title: "Nightclub",
  description: "Nightclub website built with Next.js and Tailwind CSS",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Readonly<{ children: React.ReactNode }> bruges i TypeScript for at sikre, at children-prop er skrivebeskyttet og kun accepterer gyldige React-elementer.
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${ubuntu.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


