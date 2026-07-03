import React from "react";

interface House {
  house: number;
  sign: string;
  planets: string[];
}

interface ChartProps {
  houses: House[];
}

export default function NorthIndianChart({ houses }: ChartProps) {
  // Map house sequence in North Indian chart coordinates
  // Index corresponds to the physical diamond/triangle segments
  // House 1 is the top-center diamond, then counter-clockwise:
  // House 1: top diamond
  // House 2: top-left small triangle
  // House 3: left-top small triangle
  // House 4: left diamond
  // House 5: left-bottom small triangle
  // House 6: bottom-left small triangle
  // House 7: bottom diamond
  // House 8: bottom-right small triangle
  // House 9: right-bottom small triangle
  // House 10: right diamond
  // House 11: right-top small triangle
  // House 12: top-right small triangle

  const getPlanetsString = (houseNum: number) => {
    const h = houses.find((x) => x.house === houseNum);
    return h && h.planets.length > 0 ? h.planets.join(", ") : "";
  };

  const getSignString = (houseNum: number) => {
    const h = houses.find((x) => x.house === houseNum);
    if (!h) return "";
    // Extract just the number or abbreviation
    const num = h.sign.match(/\d+/) || h.sign.substring(0, 3);
    return num ? `${num}` : h.sign.substring(0, 3);
  };

  return (
    <div className="w-full max-w-[340px] mx-auto p-3 bg-slate-900/90 rounded-xl border border-amber-500/30 shadow-xl" id="north-indian-kundli">
      <div className="text-center text-xs font-semibold text-amber-400 mb-2 tracking-widest uppercase">
        North Indian (Lagna Chart)
      </div>
      <div className="relative w-full aspect-square bg-slate-950 border-2 border-amber-500 rounded-lg overflow-hidden">
        <svg viewBox="0 0 400 400" className="w-full h-full stroke-amber-500/60 stroke-[1.5] fill-none">
          {/* Main outer square boundary */}
          <rect x="0" y="0" width="400" height="400" className="stroke-amber-500 stroke-2" />

          {/* Diagonals */}
          <line x1="0" y1="0" x2="400" y2="400" />
          <line x1="400" y1="0" x2="0" y2="400" />

          {/* Center Diamond */}
          <polygon points="200,0 0,200 200,400 400,200" />
        </svg>

        {/* Dynamic Labels and Planets overlaid on SVG coordinates */}
        
        {/* House 1: Top Center Diamond */}
        <div className="absolute top-[120px] left-[180px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(1)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(1)}</span>
          <span className="block text-[8px] text-amber-500/40">H1</span>
        </div>

        {/* House 2: Top Left Triangle */}
        <div className="absolute top-[50px] left-[80px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(2)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(2)}</span>
          <span className="block text-[8px] text-amber-500/40">H2</span>
        </div>

        {/* House 3: Left Top Triangle */}
        <div className="absolute top-[120px] left-[35px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(3)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(3)}</span>
          <span className="block text-[8px] text-amber-500/40">H3</span>
        </div>

        {/* House 4: Left Center Diamond */}
        <div className="absolute top-[180px] left-[100px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(4)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(4)}</span>
          <span className="block text-[8px] text-amber-500/40">H4</span>
        </div>

        {/* House 5: Left Bottom Triangle */}
        <div className="absolute top-[240px] left-[35px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(5)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(5)}</span>
          <span className="block text-[8px] text-amber-500/40">H5</span>
        </div>

        {/* House 6: Bottom Left Triangle */}
        <div className="absolute top-[310px] left-[80px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(6)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(6)}</span>
          <span className="block text-[8px] text-amber-500/40">H6</span>
        </div>

        {/* House 7: Bottom Center Diamond */}
        <div className="absolute top-[240px] left-[180px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(7)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(7)}</span>
          <span className="block text-[8px] text-amber-500/40">H7</span>
        </div>

        {/* House 8: Bottom Right Triangle */}
        <div className="absolute top-[310px] right-[80px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(8)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(8)}</span>
          <span className="block text-[8px] text-amber-500/40">H8</span>
        </div>

        {/* House 9: Right Bottom Triangle */}
        <div className="absolute top-[240px] right-[35px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(9)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(9)}</span>
          <span className="block text-[8px] text-amber-500/40">H9</span>
        </div>

        {/* House 10: Right Center Diamond */}
        <div className="absolute top-[180px] right-[100px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(10)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(10)}</span>
          <span className="block text-[8px] text-amber-500/40">H10</span>
        </div>

        {/* House 11: Right Top Triangle */}
        <div className="absolute top-[120px] right-[35px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(11)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(11)}</span>
          <span className="block text-[8px] text-amber-500/40">H11</span>
        </div>

        {/* House 12: Top Right Triangle */}
        <div className="absolute top-[50px] right-[80px] text-center w-[40px]">
          <span className="block text-[11px] font-bold text-amber-400">{getSignString(12)}</span>
          <span className="block text-[10px] text-slate-100 font-mono font-bold">{getPlanetsString(12)}</span>
          <span className="block text-[8px] text-amber-500/40">H12</span>
        </div>
      </div>
    </div>
  );
}
