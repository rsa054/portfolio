import type { Metadata } from "next";
import { ResumeView } from "./resume-view";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Mr. Khatri · Software Engineer · Backend, Blockchain & AI Systems · Printable resume.",
  robots: { index: false, follow: false },
};

export default function ResumePage() {
  return <ResumeView />;
}
