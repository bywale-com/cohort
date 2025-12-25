import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cohort.example.com";

export const metadata: Metadata = {
  title: "Contact - Cohort",
  description: "Get in touch with the Cohort team.",
  openGraph: {
    title: "Contact - Cohort",
    description: "Get in touch with the Cohort team.",
    url: `${baseUrl}/contact`,
    siteName: "Cohort",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact - Cohort",
    description: "Get in touch with the Cohort team.",
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-12">
            Have questions? We&apos;d love to hear from you.
          </p>
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

