import type { Metadata } from "next";
import { Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
});

export const metadata: Metadata = {
  title: "Lifeinvader Ads Generator",
  description:
    "Generate professional Lifeinvader ads with policy compliance for Real Estate, Auto, Dating, Work, Business, and more",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7678744618832590"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${roboto.variable} ${robotoSlab.variable} font-sans`}>
        <GoogleAnalytics gaId="G-ZLES5RKPB4" />
        {children}
      </body>
    </html>
  );
}
