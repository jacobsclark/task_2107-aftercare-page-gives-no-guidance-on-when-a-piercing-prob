import Link from "next/link";
import { PageIntro } from "../site-shell";

const posts = [
  {
    title: "How to prepare for an ear cartilage piercing",
    category: "Ear",
    excerpt: "A short checklist for sleep, headphones, hair care, and choosing the right side.",
  },
  {
    title: "Why downsizing jewelry matters",
    category: "Oral",
    excerpt: "Swelling jewelry is temporary. Here is why a follow-up fit check helps protect your teeth and tissue.",
  },
  {
    title: "Navel piercing healing in summer",
    category: "Navel",
    excerpt: "Clothing, sweat, and swimming plans can affect healing. Keep it simple with these seasonal tips.",
  },
  {
    title: "What causes nose piercing bumps?",
    category: "Nose",
    excerpt: "Common irritation triggers and when to ask your piercer to check the jewelry angle or fit.",
  },
];

const categories = ["Ear", "Nose", "Navel", "Oral", "Eyebrow", "Surface"];

export default function BlogPage() {
  return (
    <main>
      <PageIntro eyebrow="Blog" title="Studio updates and piercing care tips">
        <p>
          A simple text-and-image blog for seasonal advice, jewelry guidance, and body-area-specific healing tips.
          These sample cards can become individual posts when you are ready to publish.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[220px_1fr] lg:px-8">
          <aside>
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">Categories</h2>
            <div className="mt-5 flex flex-wrap gap-2 lg:flex-col">
              {categories.map((category) => (
                <Link
                  key={category}
                  href="/blog"
                  className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-[#8f1d2c] hover:text-[#8f1d2c]"
                >
                  {category}
                </Link>
              ))}
            </div>
          </aside>

          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <article key={post.title} className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
                <div className="h-48 bg-[linear-gradient(135deg,#111_0%,#282828_52%,#8f1d2c_52%,#8f1d2c_100%)]" />
                <div className="p-6">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8f1d2c]">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950">{post.title}</h2>
                  <p className="mt-3 leading-7 text-zinc-600">{post.excerpt}</p>
                  <Link href="/blog" className="mt-5 inline-block text-sm font-semibold text-[#8f1d2c]">
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
