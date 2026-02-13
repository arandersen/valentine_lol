import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundMusic } from "@/components/BackgroundMusic";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Will You Be My Valentine? 💖",
    description: "A cute Valentine's Day surprise",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
                <div className="min-h-screen flex flex-col">
                    {children}
                </div>
                <BackgroundMusic />
            </body>
        </html>
    );
}
