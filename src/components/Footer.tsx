export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-sm text-foreground/70">
        <p>© {new Date().getFullYear()} Tortugrafo</p>
        <p>Dirección visual • Fotografía • Producción audiovisual • Este portafolio fue desarrollado por Luxtarlabs</p>
      </div>
    </footer>
  );
}
