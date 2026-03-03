export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-foreground/70 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Tortugrafo</p>
        <p>Dirección visual • Fotografía • Producción audiovisual</p>
      </div>
    </footer>
  );
}
