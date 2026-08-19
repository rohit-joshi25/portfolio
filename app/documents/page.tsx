import type { Metadata } from "next";
import DocumentsPanel from "@/components/DocumentsPanel";

export const metadata: Metadata = {
  title: "Documents",
  description: "Private documents — resume only.",
  robots: { index: false, follow: false },
};

export default function DocumentsPage() {
  return <DocumentsPanel />;
}
