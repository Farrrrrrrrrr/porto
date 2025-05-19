import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Farrell Ivander | Full Stack Developer",
  description: "Portfolio of Farrell Ivander, a Full Stack Developer specializing in modern web development with expertise in JavaScript, React, and backend technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
