import type { Metadata } from "next";
import "./globals.css";
import Top from "@/components/Top";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "ZenZone – Shop the Best Products Online",
  description:
    "FlowNet is your one-stop online shop for the latest products at the best prices. Discover a wide range of categories, from electronics to fashion, all in one place. With fast shipping, secure payments, and excellent customer service, shopping with FlowNet is seamless and convenient. Start shopping now and experience the future of e-commerce!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <Providers>
            <Top />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
