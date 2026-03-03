"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCamera,
  faClapperboard,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

type ParallaxOptions = {
  scale: number;
  delay: number;
  transition: string;
  maxTransition: number;
};

type ParallaxInstance = {
  destroy?: () => void;
};

type ParallaxConstructor = new (
  element: HTMLImageElement,
  options: ParallaxOptions
) => ParallaxInstance;

export default function Hero() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const instanceRef = useRef<ParallaxInstance | null>(null);

  useEffect(() => {
    let mounted = true;
    const initParallax = async () => {
      if (!imgRef.current) return;
      const mod = (await import("simple-parallax-js/vanilla")) as unknown as {
        default: ParallaxConstructor;
      };
      if (!mounted) return;
      const SimpleParallax = mod.default;
      instanceRef.current = new SimpleParallax(imgRef.current, {
        scale: 1.01,
        delay: 0.2,
        transition: "cubic-bezier(0,0,0,1)",
        maxTransition: 4,
      });
    };

    void initParallax();

    return () => {
      mounted = false;
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, []);

  return (
    <section className="relative h-[68vh] min-h-[440px] overflow-hidden md:h-[76vh]">
      <img
        ref={imgRef}
        src="/pexels-luisdelrio-15286.jpg"
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover object-[50%_72%] md:object-[50%_80%]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(76,173,111,0.3)_0%,rgba(9,19,15,0.12)_38%,rgba(6,12,10,0.72)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/65 to-background/28 md:from-background/88 md:via-background/56 md:to-transparent" />
      <div className="absolute inset-0 z-20 flex items-end pb-8 pt-24 md:items-center md:pb-0 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl rounded-2xl border border-primary/30 bg-[linear-gradient(180deg,rgba(10,26,19,0.78),rgba(8,19,15,0.58))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-7">
            <span className="inline-flex items-center rounded-full border border-secondary/35 bg-secondary/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-secondary">
              Portafolio creativo
            </span>
            <h1 className="mt-3 text-5xl leading-[0.88] sm:text-7xl">Tortugrafo</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-[1.08rem]">
              Dirección visual, fotografía y producción audiovisual con enfoque
              estratégico en comunicación de marca.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5 text-xs uppercase tracking-[0.18em] text-foreground/82">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/35 px-3 py-1.5">
                <FontAwesomeIcon icon={faClapperboard} className="h-3.5 w-3.5 text-secondary" />
                Producción
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/35 px-3 py-1.5">
                <FontAwesomeIcon icon={faCamera} className="h-3.5 w-3.5 text-secondary" />
                Fotografía
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/35 px-3 py-1.5">
                <FontAwesomeIcon icon={faPenNib} className="h-3.5 w-3.5 text-secondary" />
                Diseño
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-primary/70 bg-primary px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Ver proyectos
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-border/90 bg-background/45 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/95 transition hover:-translate-y-0.5 hover:border-secondary/70 hover:text-secondary"
              >
                Sobre mí
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-4 z-30 rounded-full border border-border/75 bg-card/70 px-4 py-1 text-[10px] uppercase tracking-[0.24em] text-secondary backdrop-blur-md md:bottom-8 md:right-10">
        Director visual
      </div>
    </section>
  );
}
