import Image from "next/image";
import { about } from "@/content/about";
import ScrollReveal from "@/components/ScrollReveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faCamera,
  faChartLine,
  faCircleCheck,
  faClapperboard,
  faFileLines,
  faImage,
  faPenNib,
  faStar,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

function getSpecialtyIcon(text: string) {
  const normalized = text.toLowerCase();
  if (normalized.includes("video")) return faVideo;
  if (normalized.includes("grabación") || normalized.includes("dirección")) {
    return faClapperboard;
  }
  if (normalized.includes("flyers") || normalized.includes("artes")) {
    return faPenNib;
  }
  return faBullhorn;
}

function getServiceIcon(text: string) {
  const normalized = text.toLowerCase();
  if (normalized.includes("fotografía")) return faCamera;
  if (normalized.includes("camarógrafo")) return faClapperboard;
  if (normalized.includes("diseño")) return faImage;
  if (normalized.includes("manuales")) return faFileLines;
  if (normalized.includes("marketing")) return faChartLine;
  if (normalized.includes("edición")) return faVideo;
  return faCircleCheck;
}

export default function AboutPage() {
  return (
    <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 overflow-x-hidden px-4 py-10 md:grid-cols-3">
      <div className="hero-pulse pointer-events-none absolute left-[-80px] top-2 h-44 w-44 rounded-full bg-primary/18 blur-3xl" />
      <div className="hero-float pointer-events-none absolute right-[-60px] top-24 h-36 w-36 rounded-full bg-secondary/10 blur-3xl" />

      <div className="md:col-span-1">
        <ScrollReveal threshold={0.01} rootMargin="0px 0px 34% 0px">
          <div className="overflow-hidden rounded-2xl border border-primary/25 bg-card/75 shadow-[0_16px_42px_rgba(0,0,0,0.35)] transition duration-300 hover:border-primary/40 hover:shadow-[0_18px_48px_rgba(0,0,0,0.42)]">
            <Image
              src="/LOGO Y TIPOGRAFIA/LOGO-WEB.png"
              alt="Tortugrafo"
              width={600}
              height={600}
              className="h-auto w-full"
            />
          </div>
        </ScrollReveal>
        <div className="mt-4 grid gap-2">
          <ScrollReveal delay={80} threshold={0.01} rootMargin="0px 0px 34% 0px">
            <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground/80 transition duration-300 hover:border-secondary/30 hover:bg-background/60">
              <FontAwesomeIcon icon={faStar} className="h-3.5 w-3.5 text-secondary" />
              Dirección visual
            </div>
          </ScrollReveal>
          <ScrollReveal delay={130} threshold={0.01} rootMargin="0px 0px 34% 0px">
            <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground/80 transition duration-300 hover:border-secondary/30 hover:bg-background/60">
              <FontAwesomeIcon icon={faClapperboard} className="h-3.5 w-3.5 text-secondary" />
              Producción audiovisual
            </div>
          </ScrollReveal>
          <ScrollReveal delay={180} threshold={0.01} rootMargin="0px 0px 34% 0px">
            <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground/80 transition duration-300 hover:border-secondary/30 hover:bg-background/60">
              <FontAwesomeIcon icon={faCamera} className="h-3.5 w-3.5 text-secondary" />
              Fotografía creativa
            </div>
          </ScrollReveal>
        </div>
      </div>
      <div className="md:col-span-2">
        <ScrollReveal delay={80} threshold={0.01} rootMargin="0px 0px 32% 0px">
          <h1 className="text-4xl uppercase">{about.title}</h1>
        </ScrollReveal>
        <ScrollReveal delay={120} threshold={0.01} rootMargin="0px 0px 32% 0px">
          <p className="mt-4 text-lg leading-relaxed text-foreground/95">{about.intro}</p>
        </ScrollReveal>
        {about.details.map((d, index) => (
          <ScrollReveal
            key={d}
            delay={160 + index * 60}
            threshold={0.01}
            rootMargin="0px 0px 32% 0px"
          >
            <p className="mt-3 text-base leading-relaxed text-foreground/85">{d}</p>
          </ScrollReveal>
        ))}
        <ScrollReveal delay={220} threshold={0.01} rootMargin="0px 0px 28% 0px">
          <h2 className="mt-8 flex items-center gap-2 text-2xl uppercase">
            <FontAwesomeIcon icon={faStar} className="h-5 w-5 text-secondary" />
            {about.specialtiesTitle}
          </h2>
        </ScrollReveal>
        <div className="mt-3 grid gap-2">
          {about.specialties.map((s, index) => (
            <ScrollReveal
              key={s}
              delay={280 + index * 60}
              threshold={0.01}
              rootMargin="0px 0px 22% 0px"
            >
              <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-[linear-gradient(180deg,rgba(14,33,26,0.95),rgba(10,24,18,0.92))] px-3 py-2.5 text-foreground/90 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
                <FontAwesomeIcon icon={getSpecialtyIcon(s)} className="h-4 w-4 text-secondary" />
                <span>{s}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={300} threshold={0.01} rootMargin="0px 0px 24% 0px">
          <h2 className="mt-8 flex items-center gap-2 text-2xl uppercase">
            <FontAwesomeIcon icon={faPenNib} className="h-5 w-5 text-secondary" />
            {about.servicesTitle}
          </h2>
        </ScrollReveal>
        <div className="mt-3 grid gap-2">
          {about.services.map((s, index) => (
            <ScrollReveal
              key={s}
              delay={340 + index * 60}
              threshold={0.01}
              rootMargin="0px 0px 20% 0px"
            >
              <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-background/35 px-3 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:bg-background/55">
                <FontAwesomeIcon icon={getServiceIcon(s)} className="h-4 w-4 text-secondary" />
                <span className="text-foreground/90">{s}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
