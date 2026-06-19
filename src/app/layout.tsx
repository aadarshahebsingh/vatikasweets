import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Poppins } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/ClientLayoutWrapper";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Vatika Sweets & Bakery | Luxury Sweets & Cakes in Ranchi",
    template: "%s | Vatika Sweets & Bakery"
  },
  description: "Experience the royal taste of handcrafted Kaju Katli, designer wedding cakes, and premium bakery items from Vatika Sweets & Bakery in Hinoo, Ranchi.",
  metadataBase: new URL("https://vatikasweets.com"),
  keywords: [
    "Best sweets shop in Ranchi",
    "Luxury bakery in Ranchi",
    "Best cake shop in Hinoo",
    "Designer cakes Ranchi",
    "Premium sweets Ranchi",
    "Wedding cake Ranchi",
    "Festival sweets Ranchi"
  ],
  openGraph: {
    title: "Vatika Sweets & Bakery | Luxury Celebration Brand",
    description: "Experience the royal taste of handcrafted Kaju Katli, designer wedding cakes, and premium bakery items in Ranchi.",
    url: "https://vatikasweets.com",
    siteName: "Vatika Sweets & Bakery",
    locale: "en_IN",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-luxury text-text-luxury selection:bg-gold-luxury selection:text-white font-sans-luxury">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
