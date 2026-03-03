"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";

function formatLabelFromPath(filePath: string) {
  const base = filePath.split("/").pop() ?? filePath;
  return base.replace(/\.[^/.]+$/, "").replaceAll("-", " ");
}

function formatSectionLabel(section: string) {
  return section
    .replace(/\.[^/.]+$/, "")
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isVideoPath(filePath: string) {
  const normalized = filePath.toLowerCase();
  return (
    normalized.endsWith(".mp4") ||
    normalized.endsWith(".webm") ||
    normalized.endsWith(".mov") ||
    normalized.endsWith(".m4v")
  );
}

function getSectionMeaning(section: string) {
  const normalized = section.toUpperCase();
  if (normalized.includes("CINEMARK")) {
    return "Comunicación visual para cine: piezas diseñadas para atraer audiencia y reforzar campaña.";
  }
  if (normalized.includes("MONSTER")) {
    return "Identidad de energía y alto impacto: dirección gráfica con actitud y presencia de marca.";
  }
  if (normalized.includes("REMAX")) {
    return "Contenido comercial para conversión: portadas y artes orientadas a captar clientes.";
  }
  if (normalized.includes("SPRITE")) {
    return "Concepto creativo 360: propuesta de campaña con enfoque publicitario y posicionamiento.";
  }
  if (normalized.includes("LOGO") || normalized.includes("TIPOGRAFIA")) {
    return "Base de identidad visual: construcción de lenguaje gráfico, logo y sistema tipográfico.";
  }
  if (normalized.includes("VIDEO") && normalized.includes("CONVERSE")) {
    return "Narrativa audiovisual de marca: pieza estilo cine para comunicar personalidad y tono.";
  }
  if (normalized.includes("VIDEO")) {
    return "Producción audiovisual: dirección, edición y ritmo visual para comunicar historias.";
  }
  if (normalized.includes("IMAGENES")) {
    return "Exploración visual y material de apoyo para mostrar estilo, técnica y versatilidad.";
  }
  return "Proyecto visual orientado a comunicar una idea de marca con estética y estrategia.";
}

function shouldHideSection(section: string) {
  const normalized = section.toUpperCase();
  return (
    normalized.includes("LOGO") ||
    normalized.includes("TIPOGRAFIA") ||
    normalized.includes("PEXELS")
  );
}

export default function ProjectSectionCarousel({
  sections,
}: {
  sections: { section: string; images: string[] }[];
}) {
  const availableSections = useMemo(
    () => {
      const filteredSections = sections.filter(
        (sectionGroup) =>
          sectionGroup.images.length > 0 &&
          !shouldHideSection(sectionGroup.section)
      );

      return filteredSections.sort((left, right) => {
        const leftIsExtra = left.section.toUpperCase().includes("IMAGENES EXTRA");
        const rightIsExtra = right.section.toUpperCase().includes("IMAGENES EXTRA");
        if (leftIsExtra === rightIsExtra) return 0;
        return leftIsExtra ? 1 : -1;
      });
    },
    [sections]
  );

  const [activeSection, setActiveSection] = useState(
    availableSections[0]?.section ?? ""
  );
  const [indexesBySection, setIndexesBySection] = useState<
    Record<string, number>
  >({});
  const [revealedBySection, setRevealedBySection] = useState<
    Record<string, boolean>
  >({});
  const [previewOffset, setPreviewOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const timelineRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const currentSection = useMemo(
    () =>
      availableSections.find(
        (sectionGroup) => sectionGroup.section === activeSection
      ) ?? availableSections[0],
    [activeSection, availableSections]
  );

  const activeImages = currentSection?.images ?? [];
  const totalSlides = activeImages.length;
  const rawIndex = indexesBySection[currentSection?.section ?? ""] ?? 0;
  const safeIndex =
    totalSlides === 0 ? 0 : Math.min(rawIndex, Math.max(totalSlides - 1, 0));
  const currentImage = activeImages[safeIndex];
  const currentIsVideo = currentImage ? isVideoPath(currentImage) : false;
  const progressPercent =
    totalSlides <= 1 ? 100 : ((safeIndex + 1) / totalSlides) * 100;

  const goPrevForSection = (sectionName: string, sectionTotalSlides: number) => {
    if (sectionTotalSlides <= 1) return;
    setIndexesBySection((old) => ({
      ...old,
      [sectionName]:
        ((old[sectionName] ?? 0) - 1 + sectionTotalSlides) % sectionTotalSlides,
    }));
  };

  const goNextForSection = (sectionName: string, sectionTotalSlides: number) => {
    if (sectionTotalSlides <= 1) return;
    setIndexesBySection((old) => ({
      ...old,
      [sectionName]: ((old[sectionName] ?? 0) + 1) % sectionTotalSlides,
    }));
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!availableSections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealedBySection((old) => {
          let changed = false;
          const next = { ...old };
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const sectionName = entry.target.getAttribute("data-section");
            if (!sectionName || next[sectionName]) return;
            next[sectionName] = true;
            changed = true;
          });
          return changed ? next : old;
        });
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-12% 0px -35% 0px",
      }
    );

    availableSections.forEach((sectionGroup) => {
      const element = timelineRefs.current[sectionGroup.section];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [availableSections]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!availableSections.length) return;

    let rafId = 0;
    const syncActiveByScroll = () => {
      const switchLine = window.innerHeight * 0.32;
      let nextIndex = 0;

      availableSections.forEach((sectionGroup, index) => {
        const element = timelineRefs.current[sectionGroup.section];
        if (!element) return;
        if (element.getBoundingClientRect().top <= switchLine) {
          nextIndex = index;
        }
      });

      const nextSection = availableSections[nextIndex]?.section;
      if (!nextSection) return;
      setActiveSection((old) => (old === nextSection ? old : nextSection));
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        syncActiveByScroll();
      });
    };

    syncActiveByScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActiveByScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActiveByScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [availableSections]);

  useEffect(() => {
    if (!availableSections.length || !activeSection) return;

    const syncPreviewOffset = () => {
      if (window.innerWidth < 1024) {
        setPreviewOffset(0);
        return;
      }

      const firstSection = timelineRefs.current[availableSections[0].section];
      const activeSectionElement = timelineRefs.current[activeSection];
      if (!firstSection || !activeSectionElement) {
        setPreviewOffset(0);
        return;
      }

      const nextOffset = Math.max(
        0,
        activeSectionElement.offsetTop - firstSection.offsetTop
      );
      setPreviewOffset((old) =>
        Math.abs(old - nextOffset) < 1 ? old : nextOffset
      );
    };

    syncPreviewOffset();
    window.addEventListener("scroll", syncPreviewOffset, { passive: true });
    window.addEventListener("resize", syncPreviewOffset);
    return () => {
      window.removeEventListener("scroll", syncPreviewOffset);
      window.removeEventListener("resize", syncPreviewOffset);
    };
  }, [activeSection, availableSections]);

  const handleTimelineSelect = (sectionName: string) => {
    setActiveSection(sectionName);
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const target = timelineRefs.current[sectionName];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    if (paused || totalSlides <= 1 || currentIsVideo) return;
    const timer = setInterval(() => {
      setIndexesBySection((old) => ({
        ...old,
        [currentSection.section]: ((old[currentSection.section] ?? 0) + 1) % totalSlides,
      }));
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, currentIsVideo, currentSection, totalSlides]);

  const handleParallaxMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const moveX = (x - 0.5) * 26;
    const moveY = (y - 0.5) * 20;
    viewport.style.setProperty("--parallax-x", `${moveX.toFixed(1)}px`);
    viewport.style.setProperty("--parallax-y", `${moveY.toFixed(1)}px`);
  };

  const handleParallaxLeave = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.style.setProperty("--parallax-x", "0px");
    viewport.style.setProperty("--parallax-y", "0px");
  };

  if (!availableSections.length || totalSlides === 0 || !currentSection) return null;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-[linear-gradient(180deg,rgba(14,33,26,0.92),rgba(10,24,18,0.95))] p-3 md:p-5"
    >
      <div className="mb-4 flex gap-2 overflow-x-auto rounded-xl border border-border/70 bg-background/25 p-2.5 sm:flex-wrap">
        {availableSections.map((sectionGroup) => {
          const isActive = sectionGroup.section === currentSection.section;
          return (
            <button
              key={sectionGroup.section}
              type="button"
              onClick={() => handleTimelineSelect(sectionGroup.section)}
              className={`group inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold tracking-[0.06em] [font-family:var(--font-secondary)] transition sm:px-3.5 ${
                isActive
                  ? "border-secondary/70 bg-secondary/12 text-secondary shadow-[0_6px_16px_rgba(8,22,16,0.45)]"
                  : "border-border/70 bg-background/50 text-foreground/92 hover:border-primary/60 hover:bg-background/80"
              }`}
              title={formatSectionLabel(sectionGroup.section)}
            >
              <span
                className={`h-2 w-2 rounded-full transition ${
                  isActive
                    ? "bg-secondary shadow-[0_0_0_3px_rgba(217,241,181,0.2)]"
                    : "bg-foreground/45 group-hover:bg-primary/70"
                }`}
              />
              <span className="max-w-[210px] truncate">
                {formatSectionLabel(sectionGroup.section)}
              </span>
              <span className="rounded-full border border-border/60 bg-background/55 px-2 py-0.5 text-[9px] tracking-[0.08em] text-foreground/90">
                {sectionGroup.images.length}
              </span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:gap-6">
        <div className="relative hidden lg:block">
          <div className="absolute bottom-0 left-3 top-1 w-px bg-border/60" />
          <div className="space-y-6">
            {availableSections.map((sectionGroup, timelineIndex) => {
              const isActive = sectionGroup.section === currentSection.section;
              const isRevealed = revealedBySection[sectionGroup.section];
              return (
                <div
                  key={`${sectionGroup.section}-timeline`}
                  ref={(element) => {
                    timelineRefs.current[sectionGroup.section] = element;
                  }}
                  data-section={sectionGroup.section}
                  className="relative min-h-[50vh] scroll-mt-28"
                >
                  <article
                    className={`sticky top-24 rounded-xl border px-4 py-4 transition duration-500 ${
                      isActive
                        ? "border-primary/60 bg-card/95 shadow-[0_16px_44px_rgba(0,0,0,0.28)]"
                        : "border-border/70 bg-background/35"
                    } ${isRevealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isActive ? "bg-secondary" : "bg-foreground/35"
                        }`}
                      />
                      <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/65">
                        Proyecto {timelineIndex + 1}
                      </p>
                    </div>
                    <h3 className="text-xl uppercase">{sectionGroup.section}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      {getSectionMeaning(sectionGroup.section)}
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-secondary">
                      {sectionGroup.images.length} piezas
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative min-w-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div
            className="lg:transition-[margin] lg:duration-500 lg:ease-out"
            style={{ marginTop: `${previewOffset}px` }}
          >
          <div className="mb-3 rounded-xl border border-primary/25 bg-card/85 px-3 py-3 lg:hidden">
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/60">
              Empresa activa
            </p>
            <h3 className="mt-1 truncate text-lg uppercase">{currentSection.section}</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {getSectionMeaning(currentSection.section)}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-secondary">
              {currentSection.images.length} piezas
            </p>
          </div>
          <div className="mb-3 rounded-xl border border-border/70 bg-background/35 px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/60">
                  Proyecto activo
                </p>
                <h3 className="mt-1 truncate text-base uppercase md:text-lg">{currentSection.section}</h3>
              </div>
              <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
                {safeIndex + 1}/{activeImages.length}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/60">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div
            ref={viewportRef}
            onMouseMove={handleParallaxMove}
            onMouseLeave={handleParallaxLeave}
            className="relative overflow-hidden rounded-xl border border-border bg-muted"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,139,87,0.22)_0%,rgba(12,26,20,0.9)_75%)] transition-transform duration-300 ease-out [transform:translate3d(calc(var(--parallax-x,0px)*0.35),calc(var(--parallax-y,0px)*0.35),0)]" />
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${safeIndex * 100}%)` }}
            >
              {activeImages.map((imagePath) => (
                <div
                  key={`${currentSection.section}-${imagePath}`}
                  className="relative h-[58vw] min-h-[210px] max-h-[320px] w-full shrink-0 p-2 md:h-[58vh] md:min-h-[280px] md:max-h-none md:p-3"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border/70 bg-background/35 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out [transform:translate3d(calc(var(--parallax-x,0px)*-0.28),calc(var(--parallax-y,0px)*-0.28),0)]">
                    {isVideoPath(imagePath) ? (
                      <video
                        src={imagePath}
                        className="h-full w-full object-contain bg-black/40"
                        playsInline
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={imagePath}
                        alt={formatLabelFromPath(imagePath)}
                        fill
                        className="object-contain transition duration-700 ease-out"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </div>
            {totalSlides > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goPrevForSection(currentSection.section, totalSlides)}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2.5 backdrop-blur-md transition hover:scale-105 hover:bg-background md:left-3 md:p-3"
                  aria-label="Anterior"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goNextForSection(currentSection.section, totalSlides)}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2.5 backdrop-blur-md transition hover:scale-105 hover:bg-background md:right-3 md:p-3"
                  aria-label="Siguiente"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4">
            {activeImages.map((imagePath, imageIndex) => {
              const isActive = imageIndex === safeIndex;
              return (
                <button
                  key={`${currentSection.section}-thumb-${imagePath}`}
                  type="button"
                  onClick={() =>
                    setIndexesBySection((old) => ({
                      ...old,
                      [currentSection.section]: imageIndex,
                    }))
                  }
                  className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition md:h-24 md:w-auto ${
                    isActive
                      ? "border-secondary ring-1 ring-secondary/70"
                      : "border-border/70 hover:border-secondary/50"
                  }`}
                >
                  {isVideoPath(imagePath) ? (
                    <video
                      src={imagePath}
                      className={`h-full w-full object-cover transition duration-300 ${
                        isActive ? "scale-105" : "opacity-80 group-hover:scale-105"
                      }`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={imagePath}
                      alt={formatLabelFromPath(imagePath)}
                      fill
                      className={`object-cover transition duration-300 ${
                        isActive ? "scale-105" : "opacity-80 group-hover:scale-105"
                      }`}
                    />
                  )}
                  <div
                    className={`absolute inset-0 ${
                      isActive
                        ? "bg-gradient-to-t from-background/45 via-transparent to-transparent"
                        : "bg-black/35 group-hover:bg-black/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-background/35 px-3 py-2">
            <p className="truncate text-[11px] uppercase tracking-wide text-foreground/75">
              {formatLabelFromPath(currentImage)}
            </p>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              {safeIndex + 1}/{activeImages.length}
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
