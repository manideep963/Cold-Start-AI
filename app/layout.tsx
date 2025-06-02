// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "./Providers/sessionproviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cold Start AI – Cold Email & Outreach Toolkit for Freelancers",
  description:
    "Cold Start AI helps freelancers and students create powerful outreach emails, DMs, and pitch messages using AI. Includes real-time chat, Gemini API integration, and a modern Next.js experience.",
  keywords: [
    "Cold Start AI",
    "AI outreach tool for freelancers",
    "cold email generator",
    "AI DM generator",
    "real-time chat for outreach",
    "Gemini AI messaging",
    "freelancer cold pitch generator",
    "Next.js chat app",
    "open source outreach tool",
    "AI for freelancers",
    "manideep"
  ],
  authors: [
    {
      name: "Rachamadugu Venkata Saimanideep",
      url: "https://www.linkedin.com/in/rachamadugusaimanideep/",
    },
  ],
  creator: "Rachamadugu Venkata Saimanideep",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Cold Start AI – AI Outreach Generator & Real-Time Chat for Freelancers",
    description:
      "Generate cold emails and pitch messages with AI. Real-time WebSocket chat included. Built with Gemini API, Next.js, and MongoDB.",
    url: "https://your-app-domain.com",
    siteName: "Cold Start AI",
    images: [
      {
        url: "https://your-app-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cold Start AI – Freelance Outreach App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
