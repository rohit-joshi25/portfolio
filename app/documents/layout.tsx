import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents",
  robots: { index: false, follow: false },
};

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
