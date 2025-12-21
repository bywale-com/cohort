import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact - Cohort",
  description: "Get in touch with the Cohort team.",
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

