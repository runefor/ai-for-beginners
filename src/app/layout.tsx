import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI for Beginners",
  description: "AI를 처음 배우는 사람들을 위한 발표형 웹 프레젠테이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
