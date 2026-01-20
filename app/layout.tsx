import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAP Inside Track Kolkata 2026",
  description:
    "Download your SAP Inside Track Kolkata participation certificate",
  icons: {
    icon: "icon.png",
  },
};

const benguiat = localFont({
  src: "../fonts/ITCBenguiatCondensedMedium.otf",
  variable: "--font-benguiat",
});

const dmserif = localFont({
  src: "../fonts/DMSerifDisplay.ttf",
  variable: "--font-dmserif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${benguiat.variable} ${dmserif.variable}`} lang="en">
      <body>{children}</body>
    </html>
  );
}
