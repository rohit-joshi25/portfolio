import type { Metadata } from "next";
import HelpInterview from "@/components/HelpInterview";

export const metadata: Metadata = {
  title: "Laravel interview prep",
  description: "Private Laravel interview questions for ~1 year experience.",
  robots: { index: false, follow: false },
};

export default function HelpPage() {
  return <HelpInterview />;
}
