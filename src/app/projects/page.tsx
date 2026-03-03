import { getPublicImagesBySection } from "@/lib/publicImages";
import ProjectSectionCarousel from "@/components/ProjectSectionCarousel";
import ScrollReveal from "@/components/ScrollReveal";

export default async function ProjectsPage() {
  const imageSections = await getPublicImagesBySection();
  const totalSections = imageSections.length;
  const totalImages = imageSections.reduce(
    (acc, section) => acc + section.images.length,
    0
  );

  return (
    <div className="relative mx-auto max-w-7xl overflow-x-hidden px-4 py-10">
      <div className="hero-pulse pointer-events-none absolute left-[-90px] top-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
      <div className="hero-float pointer-events-none absolute right-[-70px] top-10 h-36 w-36 rounded-full bg-secondary/10 blur-3xl" />

      <ScrollReveal threshold={0.01} rootMargin="0px 0px 34% 0px">
        <section className="rounded-2xl border border-primary/25 bg-[linear-gradient(180deg,rgba(12,30,22,0.88),rgba(9,20,16,0.72))] p-5 shadow-[0_16px_44px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-secondary">
              Proyectos organizados
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-border/80 bg-background/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                {totalSections} empresas
              </span>
              <span className="inline-flex rounded-full border border-border/80 bg-background/30 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                {totalImages} piezas
              </span>
            </div>
          </div>
          <h1 className="mt-3 text-4xl font-semibold [font-family:var(--font-secondary)] md:text-5xl">
            Explora mis proyectos
          </h1>
          <p className="mt-3 max-w-3xl text-foreground/82">
            Selecciona una empresa y revisa sus piezas completas: diseño, foto y video.
          </p>
        </section>
      </ScrollReveal>

      <section className="relative mt-8 border-t border-border pt-8">
        <ScrollReveal
          delay={120}
          threshold={0.01}
          rootMargin="0px 0px 28% 0px"
          className="mb-5 flex flex-wrap items-start justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl font-semibold [font-family:var(--font-secondary)]">
              Filtra por empresa
            </h2>
            <p className="mt-1 text-sm text-foreground/72">
              Haz clic en una empresa para ver sus piezas.
            </p>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-foreground/70">
            {totalImages} imágenes
          </span>
        </ScrollReveal>
        <ScrollReveal delay={180} threshold={0.01} rootMargin="0px 0px 24% 0px">
          <ProjectSectionCarousel sections={imageSections} />
        </ScrollReveal>
      </section>
    </div>
  );
}
