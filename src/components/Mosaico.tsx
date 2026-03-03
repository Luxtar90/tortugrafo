"use client";
import { useEffect, useRef } from "react";
import "gridstack/dist/gridstack.min.css";

export default function Mosaico() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    import("gridstack").then(({ GridStack }) => {
      if (!gridRef.current) return;
      const grid = GridStack.init(
        {
          float: true,
          margin: 6,
          column: 12,
          cellHeight: 80,
        },
        gridRef.current
      );
      cleanup = () => grid.destroy(false);
    });
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-xl font-semibold mb-4">Mosaico</h2>
      <div ref={gridRef} className="grid-stack">
        <div className="grid-stack-item" gs-w="4" gs-h="3" gs-x="0" gs-y="0">
          <div className="grid-stack-item-content card rounded overflow-hidden flex items-center justify-center">
            <img src="/CINEMARK/Insight.png" className="w-full h-full object-cover" alt="Cinemark" />
          </div>
        </div>
        <div className="grid-stack-item" gs-w="4" gs-h="3" gs-x="4" gs-y="0">
          <div className="grid-stack-item-content card rounded overflow-hidden flex items-center justify-center">
            <img src="/SPRITE/propuesta para perfume sprite.png" className="w-full h-full object-cover" alt="Sprite" />
          </div>
        </div>
        <div className="grid-stack-item" gs-w="4" gs-h="3" gs-x="8" gs-y="0">
          <div className="grid-stack-item-content card rounded overflow-hidden flex items-center justify-center">
            <img src="/REMAX/PORTADAS.png" className="w-full h-full object-cover" alt="REMAX" />
          </div>
        </div>
        <div className="grid-stack-item" gs-w="6" gs-h="3" gs-x="0" gs-y="3">
          <div className="grid-stack-item-content card rounded overflow-hidden flex items-center justify-center">
            <img src="/MONSTER/AGENCIA MORPHO.png" className="w-full h-full object-cover" alt="MONSTER" />
          </div>
        </div>
        <div className="grid-stack-item" gs-w="6" gs-h="3" gs-x="6" gs-y="3">
          <div className="grid-stack-item-content card rounded overflow-hidden flex items-center justify-center">
            <img src="/IMAGENES EXTRA/Presentación - Toyota Supra MK5.png" className="w-full h-full object-cover" alt="Extra" />
          </div>
        </div>
      </div>
    </section>
  );
}
