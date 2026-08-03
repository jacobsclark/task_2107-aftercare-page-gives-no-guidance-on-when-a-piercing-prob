import { PageIntro } from "../site-shell";

export default function ContactPage() {
  return (
    <main>
      <PageIntro eyebrow="Contact" title="Questions about a healing piercing?">
        <p>
          Send a short message with the piercing type, date of appointment, and what you are noticing.
          For urgent medical symptoms, contact a healthcare professional directly.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="rounded-[2rem] bg-zinc-950 p-8 text-white">
            <h2 className="text-2xl font-semibold">Inkline Piercing</h2>
            <div className="mt-8 space-y-6 text-zinc-300">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">Address</p>
                <p className="mt-2 leading-7">Studio address<br />Vienna, Austria</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">Hours</p>
                <p className="mt-2 leading-7">Tuesday–Saturday<br />By appointment</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">Response time</p>
                <p className="mt-2 leading-7">We aim to reply within one business day.</p>
              </div>
            </div>
          </div>

          <form className="rounded-[2rem] border border-zinc-200 p-6 shadow-sm sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-zinc-950">
                Name
                <input className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 font-normal outline-none transition focus:border-[#8f1d2c]" name="name" type="text" />
              </label>
              <label className="text-sm font-semibold text-zinc-950">
                Email
                <input className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 font-normal outline-none transition focus:border-[#8f1d2c]" name="email" type="email" />
              </label>
              <label className="text-sm font-semibold text-zinc-950 sm:col-span-2">
                Piercing type
                <input className="mt-2 w-full rounded-2xl border border-zinc-300 px-4 py-3 font-normal outline-none transition focus:border-[#8f1d2c]" name="piercing" type="text" placeholder="Example: nostril, helix, navel" />
              </label>
              <label className="text-sm font-semibold text-zinc-950 sm:col-span-2">
                Message
                <textarea className="mt-2 min-h-40 w-full rounded-2xl border border-zinc-300 px-4 py-3 font-normal outline-none transition focus:border-[#8f1d2c]" name="message" />
              </label>
            </div>
            <button className="mt-6 rounded-full bg-[#8f1d2c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#741625]" type="submit">
              Send question
            </button>
            <p className="mt-4 text-sm leading-6 text-zinc-500">
              This form is a front-end placeholder. Connect it to email or a form service before launch.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
