import { PageIntro } from "../site-shell";
import TriagePanel from "./triage-panel";

const piercingTypes = [
  {
    name: "Ear piercings",
    timeline: "Lobes: 2–4 months. Cartilage: 6–12 months.",
    steps: ["Wash your hands before touching the area.", "Spray sterile saline on the front and back.", "Let it sit briefly, then pat dry with clean gauze or paper towel."],
    dos: ["Sleep on the opposite side when possible.", "Keep hair products away from the piercing.", "Use clean pillowcases."],
    donts: ["Do not twist the jewelry.", "Do not use alcohol, peroxide, or ointments.", "Do not remove crust with fingernails."],
    watch: "Excess heat, spreading redness, thick discharge, or pain that gets worse after the first week.",
  },
  {
    name: "Nose piercings",
    timeline: "Nostril: 4–6 months. Septum: 2–4 months.",
    steps: ["Clean with sterile saline twice daily.", "Dry gently so moisture does not collect around the jewelry.", "Rinse in the shower if buildup softens naturally."],
    dos: ["Be careful with towels and face masks.", "Keep makeup and skincare away from the opening.", "Return to the studio if the jewelry feels too tight."],
    donts: ["Do not rotate or pull the jewelry.", "Do not change jewelry before it is ready.", "Do not pick at bumps or crust."],
    watch: "A bump that grows quickly, embedded jewelry, strong throbbing, or yellow-green discharge.",
  },
  {
    name: "Navel piercings",
    timeline: "6–12 months, sometimes longer with friction or tight clothing.",
    steps: ["Clean with sterile saline once or twice daily.", "Dry fully after showers, sweating, or swimming.", "Wear loose waistbands while the piercing settles."],
    dos: ["Choose breathable clothing.", "Protect the area during sport or movement.", "Check that the jewelry has room for normal swelling."],
    donts: ["Do not wear high-waisted tight clothing over it.", "Do not soak in pools, lakes, or baths while fresh.", "Do not sleep directly on your stomach early on."],
    watch: "Migration, rejection signs, persistent redness across the skin, or jewelry pressing into the tissue.",
  },
  {
    name: "Oral piercings",
    timeline: "Tongue: 4–8 weeks. Lip: 3–6 months.",
    steps: ["Rinse with alcohol-free mouth rinse or clean water after eating.", "Clean the outside of lip piercings with sterile saline.", "Downsize jewelry when swelling has settled and your piercer recommends it."],
    dos: ["Eat slowly and choose soft foods at first.", "Use a new toothbrush.", "Drink plenty of water."],
    donts: ["Do not smoke, vape, or drink alcohol during early healing if possible.", "Do not play with the jewelry.", "Do not share drinks or kiss during the initial healing period."],
    watch: "Swelling that affects breathing or swallowing, jewelry sinking into tissue, or severe bleeding.",
  },
];

export default function AftercarePage() {
  return (
    <main>
      <PageIntro eyebrow="Aftercare" title="Piercing care by body area">
        <p>
          These are general guidelines for common piercings. Follow the exact instructions your piercer gave you,
          and contact the studio if you are unsure about swelling, placement, or jewelry fit.
        </p>
      </PageIntro>

      <TriagePanel />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 lg:px-8">
          {piercingTypes.map((type) => (
            <article key={type.name} className="rounded-[2rem] border border-zinc-200 p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">{type.name}</h2>
                  <p className="mt-2 text-zinc-600">Healing timeline: {type.timeline}</p>
                </div>
                <span className="w-fit rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">
                  Clean gently
                </span>
              </div>
              <div className="mt-8 grid gap-8 lg:grid-cols-4">
                <div>
                  <h3 className="font-semibold text-zinc-950">Cleaning steps</h3>
                  <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                    {type.steps.map((item) => <li key={item}>{item}</li>)}
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-950">Do</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                    {type.dos.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-950">Don’t</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
                    {type.donts.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-5">
                  <h3 className="font-semibold text-[#8f1d2c]">What to look out for</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{type.watch}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
