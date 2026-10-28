import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/*
  Setup:
    npm install framer-motion
  Tailwind must be configured in your project (v3 or v4).
*/

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Reveal = ({ children, className = "", i = 0 }) => (
  <motion.div
    className={className}
    variants={fade}
    custom={i}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
  >
    {children}
  </motion.div>
);

const TextLink = ({ children, href = "#apply", dark = false }) => (
  <a
    href={href}
    className={`group inline-flex items-center gap-1 text-[19px] md:text-[21px] hover:underline underline-offset-4 ${
      dark ? "text-[#2997ff]" : "text-[#0066cc]"
    }`}
  >
    {children}
    <span
      aria-hidden
      className="transition-transform group-hover:translate-x-0.5"
    >
      ›
    </span>
  </a>
);

const Button = ({ children, href = "#apply", variant = "primary" }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-[17px] font-normal transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0071e3]/40 ${
      variant === "primary"
        ? "bg-[#0071e3] text-white hover:bg-[#0077ed]"
        : "border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3] hover:text-white"
    }`}
  >
    {children}
  </a>
);

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="bg-[#fbfbfd] pt-12 text-center text-[#1d1d1f]"
    >
      <motion.div
        style={{ scale, opacity }}
        className="mx-auto max-w-[980px] px-5 pb-10 pt-20 md:pt-28"
      >
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-[19px] font-semibold md:text-[24px]"
        >
          Tech Mentorship Programme
        </motion.p>
        <motion.h1
          variants={fade}
          custom={1}
          initial="hidden"
          animate="show"
          className="mt-2 text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[64px] md:text-[88px]"
        >
          Learn from people
          <br />
          who ship.
        </motion.h1>
        <motion.p
          variants={fade}
          custom={2}
          initial="hidden"
          animate="show"
          className="mx-auto mt-5 max-w-[640px] text-[19px] leading-snug text-[#6e6e73] md:text-[24px]"
        >
          Twelve weeks of one-on-one guidance from working engineers, designers
          and product leads.
        </motion.p>
        <motion.div
          variants={fade}
          custom={3}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button>Apply now</Button>
          <TextLink href="#programme">Learn more</TextLink>
        </motion.div>
      </motion.div>

      {/* Product-style visual */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1024px] px-5"
      >
        <div className="overflow-hidden rounded-t-[28px] bg-gradient-to-b from-[#1d1d1f] to-[#000] p-3 shadow-2xl sm:p-5">
          <div className="rounded-[18px] bg-[#0b0b0d] p-5 text-left font-mono text-[12px] leading-relaxed text-[#a1a1a6] sm:p-8 sm:text-[14px]">
            <div className="mb-5 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <p>
              <span className="text-[#2997ff]">week 01</span> &nbsp;Set your
              goals with your mentor
            </p>
            <p>
              <span className="text-[#2997ff]">week 04</span> &nbsp;Ship your
              first real feature
            </p>
            <p>
              <span className="text-[#2997ff]">week 08</span> &nbsp;Get code
              review from a senior engineer
            </p>
            <p>
              <span className="text-[#2997ff]">week 12</span> &nbsp;Present your
              project. Get hired.
            </p>
            <p className="mt-4 text-white">Ready for the next step</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Statement() {
  return (
    <section className="bg-white px-5 py-28 text-center md:py-40">
      <Reveal>
        <h2 className="mx-auto max-w-[900px] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#1d1d1f] sm:text-[48px] md:text-[64px]">
          Tutorials teach syntax.
          <br />
          <span className="text-[#86868b]">Mentors teach judgment.</span>
        </h2>
      </Reveal>
    </section>
  );
}

const features = [
  {
    title: "One-on-one sessions.",
    body: "Weekly calls with a mentor matched to your goals, stack and schedule.",
    className: "md:col-span-2 bg-[#f5f5f7] text-[#1d1d1f]",
    sub: "text-[#6e6e73]",
  },
  {
    title: "Real projects.",
    body: "Build software that goes live, with feedback at every step.",
    className: "bg-black text-white",
    sub: "text-[#a1a1a6]",
  },
  {
    title: "Code reviews.",
    body: "Learn how professionals read, question and improve code.",
    className: "bg-black text-white",
    sub: "text-[#a1a1a6]",
  },
  {
    title: "Career support.",
    body: "Portfolio reviews, mock interviews and introductions to hiring teams.",
    className: "md:col-span-2 bg-[#f5f5f7] text-[#1d1d1f]",
    sub: "text-[#6e6e73]",
  },
];

function Features() {
  return (
    <section id="programme" className="bg-white px-5 pb-28">
      <div className="mx-auto max-w-[1024px]">
        <Reveal>
          <h2 className="mb-10 text-[32px] font-semibold tracking-[-0.02em] text-[#1d1d1f] md:text-[48px]">
            Everything you need.
            <span className="text-[#86868b]"> Nothing you don’t.</span>
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              i={i}
              className={f.className + " rounded-[28px]"}
            >
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex h-full min-h-[280px] flex-col justify-between rounded-[28px] p-8 md:min-h-[340px] md:p-10"
              >
                <h3 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] md:text-[34px]">
                  {f.title}
                </h3>
                <p
                  className={`mt-4 max-w-[420px] text-[17px] leading-snug md:text-[19px] ${f.sub}`}
                >
                  {f.body}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  ["500+", "mentees guided"],
  ["120", "mentors from top tech teams"],
  ["92%", "reach their career goal"],
];

function Outcomes() {
  return (
    <section
      id="outcomes"
      className="bg-black px-5 py-28 text-center text-white md:py-40"
    >
      <Reveal>
        <h2 className="mx-auto max-w-[800px] text-[36px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[56px] md:text-[72px]">
          Results you can measure.
        </h2>
      </Reveal>
      <div className="mx-auto mt-16 grid max-w-[1024px] gap-12 md:grid-cols-3">
        {stats.map(([n, l], i) => (
          <Reveal key={l} i={i}>
            <p className="text-[64px] font-semibold leading-none tracking-[-0.04em] md:text-[88px]">
              {n}
            </p>
            <p className="mt-3 text-[19px] text-[#a1a1a6]">{l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const mentors = [
  { name: "Amara Silva", role: "Staff Engineer", area: "Backend & systems" },
  { name: "Daniel Perera", role: "Design Lead", area: "Product design" },
  { name: "Priya Nair", role: "Engineering Manager", area: "Career growth" },
  { name: "Kenji Tanaka", role: "ML Engineer", area: "AI & data" },
];

function Mentors() {
  return (
    <section id="mentors" className="bg-[#f5f5f7] px-5 py-28">
      <div className="mx-auto max-w-[1024px]">
        <Reveal>
          <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-[#1d1d1f] md:text-[48px]">
            Meet your mentors.
            <span className="text-[#86868b]">
              {" "}
              Real people, real experience.
            </span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mentors.map((m, i) => (
            <Reveal key={m.name} i={i}>
              <div className="rounded-[24px] bg-white p-6">
                <div
                  aria-hidden
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#e8e8ed] to-[#d2d2d7] text-[28px] font-semibold text-[#1d1d1f]"
                >
                  {m.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <h3 className="text-[19px] font-semibold text-[#1d1d1f]">
                  {m.name}
                </h3>
                <p className="text-[15px] text-[#6e6e73]">{m.role}</p>
                <p className="mt-3 text-[15px] text-[#1d1d1f]">{m.area}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="bg-white px-5 py-28 text-center md:py-36">
      <Reveal>
        <blockquote className="mx-auto max-w-[820px] text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#1d1d1f] md:text-[44px]">
          “My mentor reviewed every pull request I opened. Three months later, I
          got my first offer.”
        </blockquote>
        <p className="mt-6 text-[17px] text-[#6e6e73]">
          Nimali F., Junior Developer
        </p>
      </Reveal>
    </section>
  );
}

const faqs = [
  [
    "Who can apply?",
    "Students, career changers and junior developers. No prior professional experience is required.",
  ],
  [
    "How much time does it take?",
    "Plan for about five hours a week: one mentor call plus project work.",
  ],
  [
    "Is the programme online?",
    "Yes. Sessions run over video, and you can join from anywhere.",
  ],
  [
    "What does it cost?",
    "Contact us for current pricing and scholarship options.",
  ],
];

function FAQ() {
  return (
    <section id="faq" className="bg-[#f5f5f7] px-5 py-28">
      <div className="mx-auto max-w-[760px]">
        <Reveal>
          <h2 className="text-center text-[32px] font-semibold tracking-[-0.02em] text-[#1d1d1f] md:text-[48px]">
            Questions? Answered.
          </h2>
        </Reveal>
        <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[19px] font-semibold text-[#1d1d1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]">
                {q}
                <span className="ml-4 text-[28px] font-light text-[#86868b] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[640px] text-[17px] leading-relaxed text-[#6e6e73]">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="apply" className="bg-white px-5 py-28 text-center md:py-40">
      <Reveal>
        <h2 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1d1d1f] sm:text-[64px] md:text-[80px]">
          Your next level
          <br />
          starts here.
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[19px] text-[#6e6e73] md:text-[24px]">
          The next cohort begins soon. Spaces are limited.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="mailto:hello@example.com">Apply now</Button>
          <Button href="#programme" variant="secondary">
            See the programme
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f5f5f7] px-5 py-8 text-[12px] text-[#6e6e73]">
      <div className="mx-auto flex max-w-[1024px] flex-col justify-between gap-3 border-t border-black/10 pt-4 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Tech Mentorship Programme. All rights
          reserved.
        </p>
        <p className="flex gap-4">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div
      className="scroll-smooth antialiased"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <main>
        <Hero />
        <Statement />
        <Features />
        <Outcomes />
        <Mentors />
        <Quote />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
