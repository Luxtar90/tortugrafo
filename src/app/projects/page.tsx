import { getPublicImagesBySection } from "@/lib/publicImages";
import ProjectSectionCarousel from "@/components/ProjectSectionCarousel";

export default async function ProjectsPage() {
  const imageSections = await getPublicImagesBySection();
  const totalImages = imageSections.reduce(
    (acc, section) => acc + section.images.length,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Mis Proyectos</h1>
      <p className="mt-2 text-foreground/80 max-w-2xl">
        Todo el material está organizado por empresa para que cada proyecto tenga sus piezas completas.
      </p>
      <section className="mt-8 border-t border-border pt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold uppercase">Proyectos por Empresa</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-foreground/70">
            {totalImages} imágenes
          </span>
        </div>
        <ProjectSectionCarousel sections={imageSections} />
      </section>
    </div>
  );
}
