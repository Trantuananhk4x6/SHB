import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHB - Chiến dịch Trồng Cây Xanh",
  description: "Cùng SHB góp điểm trồng cây, bảo vệ môi trường. Mỗi cây xanh là một hành trình xanh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
