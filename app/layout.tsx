import "./globals.css";
import localFont from "next/font/local";

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
