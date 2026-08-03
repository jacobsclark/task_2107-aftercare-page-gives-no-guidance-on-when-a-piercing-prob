import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/aftercare", label: "Aftercare" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Inkline Piercing home">
          <span className="grid size-11 place-items-center rounded-full bg-[#8f1d2c] text-sm font-bold tracking-widest text-white">
            IP
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight text-zinc-950">
              Inkline Piercing
            </span>
            <span className="block text-xs uppercase tracking-[0.28em] text-zinc-500">
              Vienna Studio
            </span>
          </span>
        </Link>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-zinc-700">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#8f1d2c]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 text-sm sm:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">Inkline Piercing</p>
          <p className="mt-3 max-w-md text-zinc-400">
            Aftercare guidance for fresh and healing piercings. If you feel unwell,
            have severe pain, or suspect an infection, contact a qualified medical professional.
          </p>
        </div>
        <div>
          <p className="font-semibold">Social</p>
          <div className="mt-3 flex flex-col gap-2 text-zinc-400">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">TikTok</a>
            <a href="#" className="hover:text-white">Facebook</a>
          </div>
        </div>
        <div>
          <p className="font-semibold">Disclaimer</p>
          <p className="mt-3 text-zinc-400">
            This site provides general aftercare information and does not replace medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f1d2c]">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{children}</div>
      </div>
    </section>
  );
}
