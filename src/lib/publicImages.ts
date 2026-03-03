import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);
const MEDIA_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS]);

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    })
  );
  return files.flat();
}

export async function getPublicImages(): Promise<string[]> {
  const publicDir = path.join(process.cwd(), "public");
  const allFiles = await walk(publicDir);

  return allFiles
    .filter((file) => MEDIA_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .map((file) =>
      file
        .replace(publicDir, "")
        .split(path.sep)
        .join("/")
    )
    .filter((file) => file.length > 0)
    .map((file) => (file.startsWith("/") ? file : `/${file}`))
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
