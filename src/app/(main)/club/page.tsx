import { LeadForm } from "@/components/forms/LeadForm";

export default function LeadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-foreground/60">
            Have a question or interested in collaborating? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-content1 rounded-lg border border-divider p-8 shadow-lg">
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
