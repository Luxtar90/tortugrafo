import Image from "next/image";
import { about } from "@/content/about";
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
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="overflow-hidden rounded-2xl border border-primary/25 bg-card/75 shadow-[0_16px_42px_rgba(0,0,0,0.35)]">
          <Image
            src="/LOGO Y TIPOGRAFIA/LOGO-WEB.png"
            alt="Tortugrafo"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
        <div className="mt-4 grid gap-2">
          <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground/80">
            <FontAwesomeIcon icon={faStar} className="h-3.5 w-3.5 text-secondary" />
            Dirección visual
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground/80">
            <FontAwesomeIcon icon={faClapperboard} className="h-3.5 w-3.5 text-secondary" />
            Producción audiovisual
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-foreground/80">
            <FontAwesomeIcon icon={faCamera} className="h-3.5 w-3.5 text-secondary" />
            Fotografía creativa
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        <h1 className="text-4xl uppercase">{about.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground/95">{about.intro}</p>
        {about.details.map((d) => (
          <p key={d} className="mt-3 text-base leading-relaxed text-foreground/85">{d}</p>
        ))}
        <h2 className="mt-8 flex items-center gap-2 text-2xl uppercase">
          <FontAwesomeIcon icon={faStar} className="h-5 w-5 text-secondary" />
          {about.specialtiesTitle}
        </h2>
        <ul className="mt-3 grid gap-2">
          {about.specialties.map((s) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-lg border border-primary/20 bg-[linear-gradient(180deg,rgba(14,33,26,0.95),rgba(10,24,18,0.92))] px-3 py-2.5 text-foreground/90"
            >
              <FontAwesomeIcon
                icon={getSpecialtyIcon(s)}
                className="h-4 w-4 text-secondary"
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-8 flex items-center gap-2 text-2xl uppercase">
          <FontAwesomeIcon icon={faPenNib} className="h-5 w-5 text-secondary" />
          {about.servicesTitle}
        </h2>
        <ul className="mt-3 grid gap-2">
          {about.services.map((s) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-lg border border-border/80 bg-background/35 px-3 py-2.5"
            >
              <FontAwesomeIcon
                icon={getServiceIcon(s)}
                className="h-4 w-4 text-secondary"
              />
              <span className="text-foreground/90">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
