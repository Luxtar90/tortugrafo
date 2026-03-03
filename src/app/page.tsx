import Image from "next/image";
import Link from "next/link";
import { about } from "@/content/about";
import { getPublicImagesBySection } from "@/lib/publicImages";
import ProjectSectionCarousel from "@/components/ProjectSectionCarousel";
import Hero from "@/components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  const imageSections = await getPublicImagesBySection();

  return (
    <>
      <Hero />
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <section className="relative border-t border-border pt-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-block h-1 w-12 rounded-full bg-primary" />
          <h2 className="text-3xl uppercase">About Me</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-primary/30 bg-[linear-gradient(180deg,rgba(14,33,26,0.95),rgba(10,24,18,0.92))] p-6 shadow-[0_0_0_1px_rgba(31,107,74,0.15),0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-sm">
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
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/35 bg-background/30 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary/15"
            >
              Ver perfil completo{" "}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-4 w-4"
              />
            </Link>
          </div>
          <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-primary/25 bg-muted shadow-[0_16px_44px_rgba(0,0,0,0.3)]">
            <Image
              src="/IMAGENES EXTRA/retouch_2026030213415598.jpg.jpeg"
              alt="Retrato Tortugrafo"
              fill
              className="object-cover object-center opacity-85 transition duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/8" />
          </div>
        </div>
      </section>

      <section className="mt-10 border-t border-border pt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1 w-12 bg-primary" />
            <h2 className="text-3xl uppercase">My Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground"
          >
            Ver todos
          </Link>
        </div>
        <ProjectSectionCarousel sections={imageSections} />
      </section>

      <section className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1.3fr_0.7fr] md:p-8">
          <div>
            <h2 className="text-5xl uppercase leading-[0.9] md:text-7xl">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 max-w-xl text-foreground/80">
              Si buscas piezas visuales con estrategia, coherencia y ejecución sólida, trabajemos en tu próxima campaña.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                <FontAwesomeIcon icon={faPhone} className="h-4 w-4" /> Contacto
                directo
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" /> Proyecto
                nuevo
              </span>
            </div>
          </div>
          <div className="flex items-end justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
            >
              Explorar trabajos{" "}
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
