"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFilm,
  faHouse,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "inicio", icon: faHouse },
    { href: "/projects", label: "portfolio", icon: faFilm },
    { href: "/about", label: "sobre mi", icon: faUser },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0.03)_100%)]" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        <Link href="/" className="flex items-center">
          <Image
            src="/LOGO Y TIPOGRAFIA/LOGO-WEB.png"
            alt="Tortugrafo"
            width={148}
            height={52}
            className="h-9 w-auto object-contain md:h-10"
          />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pb-1 text-sm font-semibold uppercase tracking-[0.22em] [font-family:var(--font-secondary)] transition ${
                  isActive
                    ? "border-b border-secondary text-secondary"
                    : "border-b border-transparent text-foreground/82 hover:text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-border/70 bg-muted/70 p-2 md:hidden"
          aria-label="Abrir menú"
        >
          {open ? (
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
          )}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-background/95 md:hidden">
          <nav className="grid gap-1 px-4 py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold uppercase tracking-[0.2em] [font-family:var(--font-secondary)] transition ${
                    isActive
                      ? "bg-primary/20 text-secondary"
                      : "text-foreground/85 hover:bg-muted/70 hover:text-secondary"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
