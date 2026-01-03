import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const rotatingPhrases = [
  "Frontend Development",
  "Backend Development",
  "Website Upgrades",
  "Complete Website Overhauls",
];

const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must be under 255 characters." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Tell me a bit more about your project (min 10 characters)." })
    .max(1000, { message: "Message must be under 1000 characters." }),
});

const Index = () => {
  const { toast } = useToast();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});

  const hasAnimatedHero = useRef(false);

  useEffect(() => {
    const currentPhrase = rotatingPhrases[phraseIndex];

    const isComplete = !isDeleting && displayedText === currentPhrase;
    const isCleared = isDeleting && displayedText === "";

    // Base typing speeds (ms). Slightly faster for delete, moderate pause on full phrase.
    let delay = isDeleting ? 55 : 70;

    if (isComplete) {
      delay = 900; // shorter pause when fully typed
      const pauseHandle = setTimeout(() => setIsDeleting(true), delay);
      return () => clearTimeout(pauseHandle);
    }

    if (isCleared) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }

    const handle = setTimeout(() => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          return prev.slice(0, -1);
        }
        return currentPhrase.slice(0, prev.length + 1);
      });
    }, delay);

    return () => clearTimeout(handle);
  }, [displayedText, isDeleting, phraseIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse({ email, message });

    if (!result.success) {
      const fieldErrors: { email?: string; message?: string } = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === "email" || field === "message") {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    toast({
      title: "Message ready",
      description: "This is a demo form. Wire it to your backend or email service when you're ready.",
    });

    // Keep the values so the user can still copy them out.
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 md:px-10 md:py-14">
        {/* Top nav / branding */}
        <header className="mb-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg border border-emerald-500/40 bg-gradient-to-br from-primary/40 via-primary/10 to-background shadow-[0_0_25px_rgba(16,185,129,0.45)]" />
            <div className="leading-tight">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Web Developer</p>
              <p className="text-sm font-semibold text-foreground">Death</p>
            </div>
          </div>

          <nav className="hidden gap-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#services" className="transition-colors hover:text-foreground">
              Services
            </a>
            <a href="#skills" className="transition-colors hover:text-foreground">
              Skills
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
        </header>

        <main className="flex flex-1 flex-col gap-20 pb-10 md:gap-24 md:pb-16">
          {/* Hero */}
          <section
            id="hero"
            className="grid items-center gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)]"
          >
            <div className="space-y-6 md:space-y-8">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                California · Web Developer & Website Architect
              </p>
              <h1 className="text-3xl font-extrabold uppercase leading-tight text-foreground md:text-5xl">
                I Build Powerful
                <br />
                Professional Websites
              </h1>

              <div className="flex h-7 items-center gap-2 overflow-hidden text-sm font-medium uppercase tracking-[0.28em] text-primary">
                <span className="font-mono text-[0.8rem] tracking-[0.3em]">{displayedText}</span>
                <span className="h-4 w-px bg-primary animate-pulse" aria-hidden="true" />
              </div>

              <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                End-to-end website architecture, from interface design to backend logic. I design, build, upgrade,
                and overhaul high-performance sites for teams who care about quality.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button size="lg" className="shadow-[0_0_35px_rgba(16,185,129,0.55)]" asChild>
                  <a href="#contact">Let&apos;s Work</a>
                </Button>
                <span className="text-xs text-muted-foreground">
                  Available for select projects, redesigns, and long-term partnerships.
                </span>
              </div>
            </div>

            <div className="relative hidden h-full md:block">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.35)_0,_transparent_55%)]" />
              <div className="relative h-full rounded-2xl border border-emerald-500/50 bg-gradient-to-b from-secondary/40 via-background/40 to-background px-6 py-6 shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium uppercase tracking-[0.16em] text-primary">Profile</span>
                  <span>Since 2020</span>
                </div>
                <dl className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Name</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">Death</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Age</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">26</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Location</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">California, USA</dd>
                  </div>
                  <div>
                    <dt className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Graduated</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">Class of 2020</dd>
                  </div>
                </dl>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                <p className="mt-6 text-xs text-muted-foreground">
                  I build and refine production-grade web experiences focused on reliability and performance.
                </p>
              </div>
            </div>
          </section>

          {/* About */}
          <section
            id="about"
            className="space-y-4 opacity-0 animate-fade-in [animation-delay:120ms] [animation-fill-mode:forwards]"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">About Me</h2>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              I&apos;m Death, a 26-year-old web developer and website architect based in California. Since graduating in
              2020, I&apos;ve been designing, building, and upgrading websites for teams who expect their site to actually
              work for them — fast, stable, and easy to maintain.
            </p>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              I combine reliable engineering with a calm, problem-solving mindset: clear communication, thoughtful
              architecture, and an obsession with detail from first wireframe to the final deployment.
            </p>
          </section>

          {/* Services */}
          <section
            id="services"
            className="space-y-6 opacity-0 animate-fade-in [animation-delay:220ms] [animation-fill-mode:forwards]"
          >
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Services</h2>
              <p className="max-w-md text-xs text-muted-foreground">
                From targeted upgrades to complete rebuilds, I work end-to-end on your web stack.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: "Frontend Development",
                  description:
                    "Modern, responsive interfaces built for clarity, speed, and consistency across devices.",
                },
                {
                  title: "Backend Development",
                  description:
                    "Robust APIs, data models, and integrations that keep your product stable and secure.",
                },
                {
                  title: "Website Upgrades",
                  description:
                    "Performance tuning, UX refinements, accessibility, and design refreshes on existing sites.",
                },
                {
                  title: "Complete Website Overhauls",
                  description:
                    "Full redesigns and rebuilds that modernize legacy systems into clean, maintainable platforms.",
                },
              ].map((service, index) => (
                <article
                  key={service.title}
                  className="group relative overflow-hidden rounded-xl border border-border/70 bg-card/40 px-5 py-5 transition-transform duration-200 hover:-translate-y-1 hover:border-primary/70 hover:shadow-[0_0_35px_rgba(16,185,129,0.45)]"
                  style={{
                    animationDelay: `${260 + index * 80}ms`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22)_0,_transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground md:text-sm">{service.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section
            id="skills"
            className="space-y-6 opacity-0 animate-fade-in [animation-delay:260ms] [animation-fill-mode:forwards]"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Skills & Stack</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Frontend</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {[
                    "TypeScript",
                    "React / Next.js",
                    "Tailwind CSS",
                    "Component systems",
                    "Accessibility patterns",
                  ].map((item) => (
                    <li
                      key={item}
                      className="relative cursor-default pl-4 transition-colors hover:text-foreground"
                    >
                      <span className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Backend</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {[
                    "Node.js APIs",
                    "Relational databases",
                    "Authentication flows",
                    "API design / versioning",
                    "Background jobs",
                  ].map((item) => (
                    <li
                      key={item}
                      className="relative cursor-default pl-4 transition-colors hover:text-foreground"
                    >
                      <span className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Workflow & Tools</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {[
                    "Git & CI/CD",
                    "Performance audits",
                    "Monitoring & logging",
                    "Design handoff",
                    "Collaboration with product teams",
                  ].map((item) => (
                    <li
                      key={item}
                      className="relative cursor-default pl-4 transition-colors hover:text-foreground"
                    >
                      <span className="absolute left-0 top-1 h-1.5 w-1.5 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Projects placeholder */}
          <section
            className="space-y-4 opacity-0 animate-fade-in [animation-delay:300ms] [animation-fill-mode:forwards]"
          >
            <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Selected Work</h2>
            <p className="max-w-2xl text-xs text-muted-foreground md:text-sm">
              A curated selection of production projects will appear here. Each case study will break down the problem,
              the architecture, and the measurable impact of the final build.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {["Client Project Placeholder", "Case Study Placeholder"].map((title, index) => (
                <article
                  key={title}
                  className="group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card/40 px-5 py-5 text-xs text-muted-foreground transition-transform duration-200 hover:-translate-y-1 hover:border-primary/70 hover:text-foreground hover:shadow-[0_0_32px_rgba(16,185,129,0.35)]"
                >
                  <div>
                    <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Upcoming
                    </p>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">{title}</h3>
                    <p>
                      Structured for future case studies outlining goals, constraints, implementation details, and
                      results.
                    </p>
                  </div>
                  <span className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/80">
                    In Progress
                  </span>
                  <div className="pointer-events-none absolute inset-px -z-10 rounded-[inherit] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2)_0,_transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </article>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="space-y-6 rounded-2xl border border-border/80 bg-gradient-to-b from-secondary/40 via-background/40 to-background px-5 py-6 opacity-0 shadow-[0_0_40px_rgba(16,185,129,0.28)] animate-fade-in [animation-delay:340ms] [animation-fill-mode:forwards] md:px-7 md:py-8"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">Contact</h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
                  Ready for a new build, a focused upgrade, or a complete overhaul? Share a quick overview and I&apos;ll
                  respond with next steps.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Response window for serious inquiries: <span className="text-foreground">1–2 business days</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 md:space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border-border/80 bg-background/60 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
                >
                  Project details
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-border/80 bg-background/60 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  placeholder="Briefly describe your website, goals, timeline, and any relevant links."
                />
                {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Button type="submit" size="lg" className="shadow-[0_0_30px_rgba(16,185,129,0.55)]">
                  Contact Me
                </Button>
                <span className="text-xs text-muted-foreground">
                  This form is currently demonstration-only. Connect it to your preferred email or backend when you&apos;re
                  ready.
                </span>
              </div>
            </form>
          </section>
        </main>

        <footer className="mt-8 flex items-center justify-between border-t border-border/70 pt-5 text-[0.7rem] text-muted-foreground">
          <span>© {new Date().getFullYear()} Death. All rights reserved.</span>
          <span className="hidden sm:inline">Built with a focus on reliability, clarity, and long-term maintainability.</span>
        </footer>
      </div>
    </div>
  );
};

export default Index;
