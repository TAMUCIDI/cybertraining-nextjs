import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyber-DART Content Studio",
  description: "Authenticated content administration for Cyber-DART.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
