import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edgar Pérez-Figueroa · Full Stack Developer",
  description:
    "Senior Full Stack Developer specializing in Next.js, React & React Native. Building high-performance web and mobile applications with modern architecture.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "React Native",
    "TypeScript",
    "Edgar Pérez-Figueroa",
  ],
  authors: [{ name: "Edgar Pérez-Figueroa" }],
  openGraph: {
    title: "Edgar Pérez-Figueroa · Full Stack Developer",
    description:
      "Senior Full Stack Developer specializing in Next.js, React & React Native.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className={`
          ${sora.className}
          transition-colors duration-300
          overflow-x-hidden
          antialiased
        `}
      >
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
