import "./globals.css";
import "@shopify/polaris/build/esm/styles.css";
import { PolarisProvider } from "@/service/PolarisProvider";

export const metadata = {
  title: "AkashRift Admin",
  description: "This is admin page of @AkashaRift",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <PolarisProvider>{children}</PolarisProvider>
        </div>
      </body>
    </html>
  );
}
