import Link from "next/link";

const highlights = [
  "Clear instructions for every common piercing area",
  "Practical healing timelines and warning signs",
  "Simple answers for swelling, jewelry changes, and cleaning",
];

export default function Home() {
  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f1d2c]">
              Piercing aftercare in Vienna
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
              Calm, clear guidance for healing well.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
              Inkline Piercing helps clients care for fresh piercings with clean instructions,
              realistic timelines, and friendly support after your appointment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/aftercare"
                className="rounded-full bg-[#8f1d2c] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#741625]"
              >
                View aftercare steps
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-950 transition hover:border-zinc-950"
              >
                Ask a question
              </Link>
            </div>
          </div>
          <div className="min-h-[420px] rounded-[2rem] border border-zinc-200 bg-[radial-gradient(circle_at_30%_20%,#8f1d2c_0,#8f1d2c_16%,transparent_17%),linear-gradient(135deg,#111_0%,#2d2d2d_45%,#f4f4f5_45%,#fff_100%)] p-6 shadow-sm">
            <div className="flex h-full items-end rounded-[1.5rem] border border-white/40 p-6">
              <div className="max-w-xs rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur">
                <p className="text-sm font-semibold text-zinc-950">Studio photo placeholder</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Replace this with a welcoming image of your studio, treatment room, or exterior.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-3 lg:px-8">
          {highlights.map((item) => (
            <div key={item} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200">
              <p className="text-base font-semibold leading-7 text-zinc-950">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">What you’ll find here</h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              Use this site as a digital version of your printed aftercare sheet, organized by
              piercing type so clients can quickly find the instructions they need.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Ear", "Nose", "Navel", "Oral", "Eyebrow", "Surface"].map((type) => (
              <Link
                key={type}
                href="/aftercare"
                className="rounded-2xl border border-zinc-200 p-5 font-semibold text-zinc-950 transition hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
              >
                {type} aftercare
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
