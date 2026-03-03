export type Project = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "sprite",
    title: "Sprite – Propuesta de campaña 360",
    description:
      "Campaña integral para el lanzamiento de un nuevo producto apoyada en redes y medios convencionales.",
    cover: "/SPRITE/propuesta para perfume sprite.png",
    tags: ["Campaña", "Gráfico", "Marca"],
    link: "https://www.canva.com/design/DAGxa2zEKTU/ikT1svqAKEzYUJigAIo1rg/edit?utm_content=DAGxa2zEKTU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    slug: "cinemark",
    title: "Cinemark – Insights visuales",
    description: "Piezas gráficas para comunicación visual y digital.",
    cover: "/CINEMARK/Insight.png",
    tags: ["Gráfico", "Digital"],
  },
  {
    slug: "monster",
    title: "Monster – Agencia Morpho",
    description: "Diseño de piezas para campaña con enfoque visual.",
    cover: "/MONSTER/AGENCIA MORPHO.png",
    tags: ["Gráfico", "Publicidad"],
  },
  {
    slug: "remax",
    title: "REMAX – Artes sociales",
    description: "Piezas para perfiles y portadas orientadas a conversión.",
    cover: "/REMAX/PORTADAS.png",
    tags: ["Digital", "Social"],
  },
  {
    slug: "converse",
    title: "Converse – Cine negro",
    description: "Video corto versión 36 segundos.",
    cover: "/VIDEOS/CONVERSE/cine negro.version 36seg.mp4",
    tags: ["Video"],
  },
];
