import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cohort.example.com";

export const metadata: Metadata = {
  title: "Cohort - Shift Coverage Management That Works",
  description:
    "Cohort exists to reverse the timeline of coverage breaks. Instead of ops being the first to feel a gap, Cohort pushes accountability upstream so coverage reliability becomes visible before the shift is already breaking.",
  openGraph: {
    title: "Cohort - Shift Coverage Management That Works",
    description:
      "Cohort exists to reverse the timeline of coverage breaks. Instead of ops being the first to feel a gap, Cohort pushes accountability upstream so coverage reliability becomes visible before the shift is already breaking.",
    url: baseUrl,
    siteName: "Cohort",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cohort - Shift Coverage Management That Works",
    description:
      "Cohort exists to reverse the timeline of coverage breaks. Instead of ops being the first to feel a gap, Cohort pushes accountability upstream so coverage reliability becomes visible before the shift is already breaking.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Shift Coverage Management
              <br />
              That Works Before You Need It
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Cohort exists to reverse the timeline of coverage breaks. Instead
              of ops being the first to feel a gap, Cohort pushes accountability
              upstream so coverage reliability becomes visible before the shift
              is already breaking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              The Problem You Know Too Well
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  Coverage Breaks Don&apos;t Announce Themselves Early
                </h3>
                <p className="text-gray-600">
                  When they finally surface, they surface as urgency. A
                  call-in. A no-show. A last-minute surge. The work doesn&apos;t
                  pause, but the plan does.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  The Burden Lands on You
                </h3>
                <p className="text-gray-600">
                  In that moment, the burden lands on supervisors and
                  ops—phones ringing, scrambling for a replacement, re-routing
                  work, calming stakeholders, and then updating whoever supplied
                  the labor after the disruption has already hit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              How Cohort Changes That
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  From Reactive Firefighting to Controlled Coverage
                </h3>
                <p className="text-gray-600 text-lg">
                  From the user&apos;s perspective, it feels like moving from
                  reactive firefighting to controlled coverage: you can see
                  what&apos;s actually covered, what&apos;s at risk, and
                  what&apos;s being actively handled—without needing to chase
                  people down or run manual checklists just to confirm
                  you&apos;re safe.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  A Ready Bench, Not a Scramble
                </h3>
                <p className="text-gray-600 text-lg">
                  Cohort maintains a ready bench aligned to your environment and
                  site requirements, so when a drop happens, replacement
                  selection and mobilization happens before your floor is exposed.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Works With What You Have
                </h3>
                <p className="text-gray-600 text-lg">
                  If you already run in-house coverage, use vendors, or a mix of
                  both, Cohort doesn&apos;t require a rip-and-replace. It&apos;s
                  designed to plug into what you&apos;re already doing and remove
                  the specific pain your people actually feel: being the last to
                  know, and the first to absorb the consequences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Stop Being the Last to Know?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Teams with multiple sites, day/night rotations, and strict fit
              requirements use Cohort to avoid the worst trade in shift work:
              trading predictability for speed.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

