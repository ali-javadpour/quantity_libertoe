import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const vazir = localFont({
  src: [
    {
      path: "./fonts/Vazir.woff2",
      weight: '400',
      style: 'normal',
    },
    {
      path: "./fonts/Vazir-Bold.woff2",
      weight: '800',
      style: 'bold',
    },
  ],
  variable: "--font-vazir",
})

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
        className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
