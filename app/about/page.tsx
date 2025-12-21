import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About - Cohort",
  description:
    "Learn more about Cohort and how we help operations teams manage shift coverage.",
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-4xl font-bold mb-8">About Cohort</h1>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-lg text-gray-600">
              Cohort is built for operations teams who run shifts and live inside
              the same recurring problem: coverage breaks don&apos;t announce
              themselves early, and when they finally surface, they surface as
              urgency.
            </p>
            <p className="text-lg text-gray-600">
              The software sits in the middle of the workflow your team already
              has. It&apos;s not &quot;another system&quot; that creates more
              admin; it&apos;s an operational layer designed to reduce
              last-minute scramble.
            </p>
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              We exist to reverse that timeline. Instead of ops being the first
              to feel a gap, Cohort pushes accountability upstream so coverage
              reliability becomes visible before the shift is already breaking.
            </p>
            <h2 className="text-2xl font-semibold mt-12 mb-4">Who We Serve</h2>
            <p className="text-lg text-gray-600">
              Teams with multiple sites, day/night rotations, and strict fit
              requirements use Cohort to avoid the worst trade in shift work:
              trading predictability for speed.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

