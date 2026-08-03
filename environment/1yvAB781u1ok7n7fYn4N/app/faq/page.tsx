import { PageIntro } from "../site-shell";

const faqs = [
  {
    question: "When can I change my jewelry?",
    answer: "Wait until the piercing is fully healed or your piercer confirms it is ready. Many piercings feel comfortable before the tissue is stable, so changing too early can irritate or damage the channel.",
  },
  {
    question: "What should I do if my piercing swells?",
    answer: "Some swelling is normal in the first days. Keep cleaning gentle, avoid pressure, and contact the studio if the jewelry feels tight, sinks into the skin, or swelling increases suddenly.",
  },
  {
    question: "Can I swim with a fresh piercing?",
    answer: "Avoid pools, lakes, hot tubs, and baths during early healing. They can introduce bacteria and soften healing tissue. Showering is fine if you dry the area afterward.",
  },
  {
    question: "Is crust normal?",
    answer: "Yes. Clear or pale fluid can dry into crust around new piercings. Soften it with sterile saline or shower water and let it come away naturally instead of picking it off.",
  },
  {
    question: "What is a piercing bump?",
    answer: "A bump is often irritation from pressure, moisture, movement, or unsuitable jewelry. Do not pop it. Check the fit, reduce friction, and ask your piercer for advice.",
  },
  {
    question: "How often should I clean it?",
    answer: "Most fresh piercings do well with sterile saline once or twice daily. Over-cleaning can dry and irritate the skin, so keep the routine simple.",
  },
];

export default function FAQPage() {
  return (
    <main>
      <PageIntro eyebrow="FAQ" title="Common questions after your appointment">
        <p>
          Quick answers for the questions clients ask most. If something feels unusual or painful,
          send a clear photo and a short description through the contact page.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
          <div className="divide-y divide-zinc-200 rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
            {faqs.map((item) => (
              <article key={item.question} className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-zinc-950">{item.question}</h2>
                <p className="mt-3 leading-7 text-zinc-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
