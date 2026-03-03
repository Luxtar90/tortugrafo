const PUBLIC_MEDIA_PATHS = [
  "/CINEMARK/Insight.png",
  "/CINEMARK/Insight (1).png",
  "/CINEMARK/Insight (2).png",
  "/CINEMARK/Insight (3).png",
  "/CINEMARK/Insight (4).png",
  "/CINEMARK/Insight (5).png",
  "/CINEMARK/LOGO/CINEMARK-1949721778.jpg",
  "/IMAGENES EXTRA/Presentación - Toyota Supra MK5.png",
  "/IMAGENES EXTRA/retouch_2026030213415598.jpg.jpeg",
  "/LOGO Y TIPOGRAFIA/COLOR.png",
  "/LOGO Y TIPOGRAFIA/LOGO-WEB.png",
  "/MONSTER/AGENCIA MORPHO.png",
  "/MONSTER/AGENCIA MORPHO (1).png",
  "/MONSTER/AGENCIA MORPHO (2).png",
  "/MONSTER/LOGO/images (3).png",
  "/REMAX/1000710039.mp4",
  "/REMAX/1000710040.mp4",
  "/REMAX/1000710041.mp4",
  "/REMAX/1000710042.mp4",
  "/REMAX/1000710058.mp4",
  "/REMAX/1000710059.mp4",
  "/REMAX/ANNELISSE CUELLAR (1).png",
  "/REMAX/Arte 1.png",
  "/REMAX/Copia de ARTE DE PERFILES.png",
  "/REMAX/Elffy Laruta.png",
  "/REMAX/LUNES POR LA TARDE.mp4",
  "/REMAX/PERFILES.png",
  "/REMAX/PORTADAS.png",
  "/REMAX/LOGO/plus.png",
  "/SPRITE/propuesta para perfume sprite.png",
  "/SPRITE/propuesta para perfume sprite (1).png",
  "/SPRITE/propuesta para perfume sprite (2).png",
  "/SPRITE/propuesta para perfume sprite (3).png",
  "/SPRITE/propuesta para perfume sprite (4).png",
  "/SPRITE/propuesta para perfume sprite (5).png",
  "/SPRITE/LOGO/14847430454dcd39a77c7579c763a31d.jpg",
  "/VIDEOS/CONVERSE/cine negro.version 36seg.mp4",
  "/VIDEOS/CORTOMETRAJE/POSTER Y VIDEO FONDO/regresa (1).png",
  "/pexels-luisdelrio-15286.jpg",
];

export async function getPublicImages(): Promise<string[]> {
  return [...PUBLIC_MEDIA_PATHS]
    .sort((a, b) => a.localeCompare(b));
}

type ImageSection = {
  section: string;
  images: string[];
};

function getSectionName(imagePath: string) {
  const parts = imagePath.split("/").filter(Boolean);
  const top = parts[0] ?? "GENERAL";
  if (top === "VIDEOS") {
    return parts[1] ? `VIDEOS · ${parts[1]}` : "VIDEOS";
  }
  return top;
}

export async function getPublicImagesBySection(): Promise<ImageSection[]> {
  const images = await getPublicImages();
  const grouped = new Map<string, string[]>();

  for (const imagePath of images) {
    const section = getSectionName(imagePath);
    const bucket = grouped.get(section) ?? [];
    bucket.push(imagePath);
    grouped.set(section, bucket);
  }

  return [...grouped.entries()]
    .map(([section, imgs]) => ({
      section,
      images: imgs.sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.section.localeCompare(b.section));
}
