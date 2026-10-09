import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Seller",
  description:
    "Submit a demo application to list a student, alumni or campus business on Open Bazar.",
};

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
