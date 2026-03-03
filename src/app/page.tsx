import Image from "next/image";
import Link from "next/link";
import { about } from "@/content/about";
import { getPublicImagesBySection } from "@/lib/publicImages";
import ProjectSectionCarousel from "@/components/ProjectSectionCarousel";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  const imageSections = await getPublicImagesBySection();
  const whatsappNumber = "59163803164";
  const instagramHandle = "tortugrafo_";
  const whatsappHref = `https://wa.me/${whatsappNumber}`;
  const instagramHref = "https://www.instagram.com/tortugrafo_/";

  return (
    <>
      <Hero />
      <div className="mx-auto w-full max-w-6xl overflow-x-hidden px-4 py-8 md:px-8 md:py-12">
      <section className="relative border-t border-border pt-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="hero-pulse pointer-events-none absolute left-[-70px] top-6 h-36 w-36 rounded-full bg-primary/18 blur-3xl" />
        <div className="hero-float pointer-events-none absolute right-0 top-10 h-28 w-28 rounded-full bg-secondary/10 blur-3xl" />
        <ScrollReveal className="mb-5 flex items-center gap-3">
          <span className="inline-block h-1 w-12 rounded-full bg-primary transition-all duration-500" />
          <h2 className="text-3xl uppercase">Sobre mí</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <ScrollReveal
            delay={120}
            className="rounded-2xl border border-primary/30 bg-[linear-gradient(180deg,rgba(14,33,26,0.95),rgba(10,24,18,0.92))] p-6 shadow-[0_0_0_1px_rgba(31,107,74,0.15),0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_0_0_1px_rgba(31,107,74,0.35),0_22px_64px_rgba(0,0,0,0.42)]"
          >
            <p className="text-[1.02rem] font-medium leading-relaxed text-foreground/95">
              {about.intro}
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/82">
              {about.details[0]}
            </p>
            <p className="mt-3 text-base leading-relaxed text-foreground/82">
              {about.details[1]}
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/35 bg-background/30 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/15 hover:shadow-[0_10px_24px_rgba(24,94,62,0.38)]"
            >
              Ver perfil completo{" "}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </ScrollReveal>
          <ScrollReveal
            delay={220}
            className="group relative min-h-[280px] overflow-hidden rounded-2xl border border-primary/25 bg-muted shadow-[0_16px_44px_rgba(0,0,0,0.3)] transition duration-500 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_22px_60px_rgba(0,0,0,0.42)]"
          >
            <Image
              src="/IMAGENES EXTRA/retouch_2026030213415598.jpg.jpeg"
              alt="Retrato Tortugrafo"
              fill
              className="object-cover object-center opacity-85 transition duration-1000 group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent transition duration-700 group-hover:via-background/8" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/8 transition duration-500 group-hover:ring-secondary/30" />
            <div className="hero-pulse pointer-events-none absolute left-5 top-5 h-14 w-14 rounded-full border border-secondary/25 bg-secondary/10 blur-xl" />
          </ScrollReveal>
        </div>
      </section>

      <section className="relative mt-10 border-t border-border pt-8">
        <div className="hero-float pointer-events-none absolute right-[-30px] top-4 h-24 w-24 rounded-full bg-primary/14 blur-3xl" />
        <ScrollReveal
          threshold={0.01}
          rootMargin="0px 0px 32% 0px"
          className="mb-5 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block h-1 w-12 bg-primary" />
            <h2 className="text-3xl uppercase">Mis proyectos</h2>
          </div>
          <Link
            href="/projects"
            className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground"
          >
            Ver todos
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={80} threshold={0.01} rootMargin="0px 0px 28% 0px">
          <ProjectSectionCarousel sections={imageSections} />
        </ScrollReveal>
      </section>

      <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1.3fr_0.7fr] md:p-8">
          <div>
            <h2 className="text-4xl uppercase leading-[0.9] sm:text-5xl md:text-7xl">
              Contacto
            </h2>
            <p className="mt-4 max-w-xl text-foreground/80">
              Si quieres trabajar con Tortugrafo, escríbele directo por WhatsApp o Instagram.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 uppercase tracking-[0.08em] transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10"
              >
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" />
                +{whatsappNumber}
              </a>
              <a
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 uppercase tracking-[0.08em] transition duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10"
              >
                <span className="font-semibold">Instagram</span> @{instagramHandle}
              </a>
            </div>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90 md:w-auto"
            >
              Escríbeme ahora{" "}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-[18px] w-[18px]"
              />
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
