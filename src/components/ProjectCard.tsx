import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ p }: { p: Project }) {
  const isVideo = p.cover.toLowerCase().endsWith(".mp4");
  return (
    <div className="card rounded-lg overflow-hidden">
      <div className="relative aspect-[4/3]">
        {isVideo ? (
          <video src={p.cover} className="w-full h-full object-cover" muted autoPlay loop playsInline />
        ) : (
          <Image src={p.cover} alt={p.title} fill className="object-cover" />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{p.title}</h3>
        <p className="text-sm text-foreground/80 mt-1">{p.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {p.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-muted border border-border">
              {t}
            </span>
          ))}
        </div>
        {p.link && (
          <Link href={p.link} target="_blank" className="inline-block mt-4 btn-primary px-4 py-2 rounded">
            Ver más
          </Link>
        )}
      </div>
    </div>
  );
}
