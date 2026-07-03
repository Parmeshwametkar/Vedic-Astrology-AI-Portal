import React from "react";

interface House {
  house: number;
  sign: string;
  planets: string[];
}

interface ChartProps {
  houses: House[];
}

export default function SouthIndianChart({ houses }: ChartProps) {
  // South Indian chart is a fixed 4x4 layout where:
  // Row 0: Pisces (Meena), Aries (Mesha), Taurus (Vrish), Gemini (Mithun)
  // Row 1: Aquarius (Kumbha), [CENTER MERGED AREA], Cancer (Karka)
  // Row 2: Capricorn (Makar), [CENTER MERGED AREA], Leo (Simha)
  // Row 3: Sagittarius (Dhanu), Scorpio (Vrisch), Libra (Tula), Virgo (Kanya)
  // We match houses to their active zodiac signs.

  const gridCells = [
    { name: "Pisces (Meena)", code: "Meena", r: 0, c: 0 },
    { name: "Aries (Mesha)", code: "Mesha", r: 0, c: 1 },
    { name: "Taurus (Vrishabha)", code: "Vrishabha", r: 0, c: 2 },
    { name: "Gemini (Mithuna)", code: "Mithuna", r: 0, c: 3 },
    { name: "Cancer (Karka)", code: "Karka", r: 1, c: 3 },
    { name: "Leo (Simha)", code: "Simha", r: 2, c: 3 },
    { name: "Virgo (Kanya)", code: "Kanya", r: 3, c: 3 },
    { name: "Libra (Tula)", code: "Tula", r: 3, c: 2 },
    { name: "Scorpio (Vrischika)", code: "Vrischika", r: 3, c: 1 },
    { name: "Sagittarius (Dhanu)", code: "Dhanu", r: 3, c: 0 },
    { name: "Capricorn (Makara)", code: "Makara", r: 2, c: 0 },
    { name: "Aquarius (Kumbha)", code: "Kumbha", r: 1, c: 0 },
  ];

  const getPlanetsForSign = (signName: string) => {
    // Find if any house has this sign
    const cleanName = signName.toLowerCase();
    const houseMatch = houses.find(h => {
      const hSign = h.sign.toLowerCase();
      return hSign.includes(cleanName.split(" ")[0]) || cleanName.includes(hSign.split(" ")[0]);
    });
    
    if (houseMatch) {
      const houseLabel = `H${houseMatch.house}`;
      const planetsList = houseMatch.planets.join(", ");
      return {
        label: houseLabel,
        planets: planetsList
      };
    }
    return null;
  };

  return (
    <div className="w-full max-w-[340px] mx-auto p-3 bg-slate-900/90 rounded-xl border border-purple-500/30 shadow-xl" id="south-indian-kundli">
      <div className="text-center text-xs font-semibold text-purple-400 mb-2 tracking-widest uppercase">
        South Indian (Rashi Chart)
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full aspect-square bg-slate-950 p-1 border-2 border-purple-500 rounded-lg overflow-hidden">
        {/* Render grid of 16 squares */}
        {Array.from({ length: 16 }).map((_, idx) => {
          const row = Math.floor(idx / 4);
          const col = idx % 4;

          // Check if center 4 cells (row 1,2 and col 1,2)
          const isCenter = (row === 1 || row === 2) && (col === 1 || col === 2);

          if (isCenter) {
            // Render the central merged mandala on one cell and let grid-span or blank others
            if (row === 1 && col === 1) {
              return (
                <div key={idx} className="col-span-2 row-span-2 flex flex-col justify-center items-center bg-purple-950/20 border border-purple-500/20 text-center p-2 rounded">
                  <div className="text-[20px] animate-spin-slow">🌀</div>
                  <div className="text-[8px] text-purple-400 tracking-wider uppercase mt-1 font-semibold">Vedic Jyotish</div>
                </div>
              );
            }
            return null; // Skip rendering since col-span-2 row-span-2 covers it
          }

          // Otherwise, find the zodiac sign for this outer cell
          const cell = gridCells.find(c => c.r === row && c.c === col);
          if (!cell) return <div key={idx} className="bg-slate-900/40 border border-purple-500/10"></div>;

          const activeData = getPlanetsForSign(cell.name);

          return (
            <div key={idx} className="bg-slate-900 border border-purple-500/30 p-1 flex flex-col justify-between text-left h-full rounded hover:bg-slate-800/80 transition-colors">
              <div className="text-[8px] font-bold text-amber-500 truncate leading-tight">
                {cell.name.split(" ")[0]}
              </div>
              
              {activeData && (
                <div className="my-auto text-center">
                  <div className="text-[9px] font-mono font-bold text-slate-100 truncate">{activeData.planets}</div>
                </div>
              )}

              <div className="flex justify-between items-center text-[7px] text-purple-400">
                <span>{cell.name.split(" ")[1] || ""}</span>
                <span className="font-mono font-semibold">{activeData?.label || ""}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
