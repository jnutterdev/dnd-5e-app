import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emberfall Keep",
  description: "An app to manage the custom homebrew d&d 5e game.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=cinzel:400,600,700|cinzel-decorative:700|almendra-sc:400|im-fell-english:400,400i|texturina:400,400i&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
