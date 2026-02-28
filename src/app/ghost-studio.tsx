"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ── 11 Ghost SVG style renderers ──────────────────────────────────────── */

const STYLES = [
  {
    id: "classic",
    name: "Classic",
    desc: "The original ghost silhouette",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 20 C55 20 30 55 30 95 L30 185 L50 165 L70 185 L90 165 L110 185 L130 165 L150 185 L170 165 L170 95 C170 55 145 20 100 20Z"
          fill={fill} stroke={stroke} strokeWidth={sw}/>
        <ellipse cx="80" cy="95" rx="14" ry="17" fill={bg}/>
        <ellipse cx="120" cy="95" rx="14" ry="17" fill={bg}/>
      </svg>
    ),
  },
  {
    id: "rounded",
    name: "Chubby",
    desc: "Extra soft and round",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 230" fill="none">
        <path d="M100 18 C48 18 25 60 25 100 L25 192 Q25 200 33 196 L48 188 Q56 183 64 188 L80 197 Q88 202 96 197 L104 192 Q112 187 120 192 L136 201 Q144 206 152 201 L167 192 Q175 187 175 192 L175 100 C175 60 152 18 100 18Z"
          fill={fill} stroke={stroke} strokeWidth={sw}/>
        <ellipse cx="80" cy="100" rx="16" ry="19" fill={bg}/>
        <ellipse cx="120" cy="100" rx="16" ry="19" fill={bg}/>
      </svg>
    ),
  },
  {
    id: "outline",
    name: "Outline",
    desc: "Clean line art ghost",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none">
        <path d="M100 22 C56 22 32 58 32 97 L32 183 L52 163 L72 183 L92 163 L112 183 L132 163 L152 183 L168 163 L168 97 C168 58 144 22 100 22Z"
          fill="none" stroke={fill} strokeWidth={Math.max(sw, 5)} strokeLinejoin="round" strokeLinecap="round"/>
        <ellipse cx="80" cy="96" rx="13" ry="16" fill={fill}/>
        <ellipse cx="120" cy="96" rx="13" ry="16" fill={fill}/>
        <ellipse cx="78" cy="93" rx="4" ry="5" fill={bg === "#ffffff" ? "#fff" : bg}/>
        <ellipse cx="118" cy="93" rx="4" ry="5" fill={bg === "#ffffff" ? "#fff" : bg}/>
      </svg>
    ),
  },
  {
    id: "pixel",
    name: "Pixel",
    desc: "8-bit retro ghost",
    render: ({ fill, bg }: GhostProps) => {
      const S = 18;
      const grid = [
        [0,0,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,0,0,1,1],
        [1,1,0,0,1,1,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,0,1,1,1,1,0,1,1],
        [1,0,0,1,1,1,1,0,0,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,0,1,1,0,0,1,1,0,1],
        [0,0,1,1,0,0,1,1,0,0],
      ];
      return (
        <svg viewBox={`0 0 ${10*S} ${12*S}`} fill="none" shapeRendering="crispEdges">
          {grid.flatMap((row, r) =>
            row.map((cell, c) => cell ? (
              <rect key={`${r}-${c}`} x={c*S} y={r*S} width={S} height={S} fill={fill}/>
            ) : null)
          )}
          {[[2,3],[3,3],[2,4],[3,4],[6,3],[7,3],[6,4],[7,4]].map(([c,r]) => (
            <rect key={`e${c}${r}`} x={c*S} y={r*S} width={S} height={S} fill={bg}/>
          ))}
        </svg>
      );
    },
  },
  {
    id: "sharp",
    name: "Sharp",
    desc: "Angular, geometric ghost",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none">
        <path d="M100 20 L40 65 L35 185 L55 160 L75 185 L100 160 L125 185 L145 160 L165 185 L165 65 Z"
          fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="miter"/>
        <polygon points="75,80 88,115 62,115" fill={bg}/>
        <polygon points="125,80 138,115 112,115" fill={bg}/>
      </svg>
    ),
  },
  {
    id: "drip",
    name: "Drip",
    desc: "Melting ghost vibes",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 240" fill="none">
        <path d="M100 18 C55 18 28 58 28 98 L28 170 Q30 180 38 178 Q46 175 48 185 Q50 195 58 193 Q66 190 68 200 Q70 210 78 207 L90 200 Q98 196 106 200 L118 207 Q126 210 128 200 Q130 190 138 193 Q146 195 148 185 Q150 175 158 178 Q166 180 168 170 L172 98 C172 58 145 18 100 18Z"
          fill={fill} stroke={stroke} strokeWidth={sw}/>
        <ellipse cx="82" cy="97" rx="14" ry="17" fill={bg}/>
        <ellipse cx="118" cy="97" rx="14" ry="17" fill={bg}/>
      </svg>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    desc: "Ultra simplified ghost",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 210" fill="none">
        <path d="M100 30 C62 30 42 62 42 92 L42 175 Q57 155 72 175 Q87 155 100 175 Q113 155 128 175 Q143 155 158 175 L158 92 C158 62 138 30 100 30Z"
          fill={fill} stroke={stroke} strokeWidth={sw}/>
        <circle cx="82" cy="90" r="11" fill={bg}/>
        <circle cx="118" cy="90" r="11" fill={bg}/>
      </svg>
    ),
  },
  {
    id: "haunted",
    name: "Haunted",
    desc: "Scary ghost with expression",
    render: ({ fill, stroke, bg, sw }: GhostProps) => (
      <svg viewBox="0 0 200 230" fill="none">
        <path d="M100 15 C50 15 25 58 25 100 L25 190 L45 168 L65 190 L85 168 L100 182 L115 168 L135 190 L155 168 L175 190 L175 100 C175 58 150 15 100 15Z"
          fill={fill} stroke={stroke} strokeWidth={sw}/>
        <line x1="62" y1="78" x2="88" y2="88" stroke={bg} strokeWidth="5" strokeLinecap="round"/>
        <line x1="138" y1="78" x2="112" y2="88" stroke={bg} strokeWidth="5" strokeLinecap="round"/>
        <ellipse cx="80" cy="100" rx="13" ry="16" fill={bg}/>
        <ellipse cx="120" cy="100" rx="13" ry="16" fill={bg}/>
        <path d="M78 130 Q90 145 100 138 Q110 145 122 130" stroke={bg} strokeWidth="4" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: "dot",
    name: "Dot",
    desc: "Halftone dot matrix ghost",
    render: ({ fill, bg }: GhostProps) => {
      const R = 5.2;
      const G = 13;
      const COLS = 14;
      const ROWS = 16;
      const mask = [
        [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,2,2,1,1,1,1,2,2,1,1,1],
        [1,1,1,2,2,1,1,1,1,2,2,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,1,1,1,1,0,0,1,1],
        [1,0,0,0,1,1,1,1,1,1,0,0,0,1],
        [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
      ];
      const W = COLS * G;
      const H = ROWS * G;
      return (
        <svg viewBox={`0 0 ${W} ${H}`} fill="none">
          {mask.flatMap((row, r) =>
            row.map((cell, c) => {
              if (cell === 0) return null;
              const cx = c * G + G/2;
              const cy = r * G + G/2;
              return <circle key={`${r}-${c}`} cx={cx} cy={cy} r={R} fill={cell === 2 ? bg : fill}/>;
            })
          )}
        </svg>
      );
    },
  },
  {
    id: "pencil",
    name: "Pencil",
    desc: "Single continuous line drawing",
    render: ({ fill, sw }: GhostProps) => (
      <svg viewBox="0 0 200 220" fill="none">
        <path
          d="M100 22 C100 22 138 24 158 52 C174 74 172 100 172 118 L172 175 C172 178 168 176 165 172 C160 165 156 160 152 168 C148 176 145 180 140 174 C135 168 130 163 125 170 C120 177 115 180 110 175 C105 170 100 167 95 172 C90 177 86 178 82 173 C78 168 73 163 68 170 C63 177 58 176 56 172 C53 168 50 165 48 168 C44 171 40 176 36 172 L28 165 L28 118 C28 100 28 74 44 52 C60 28 100 22 100 22Z"
          fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)} strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="80" cy="95" r="14" fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)}/>
        <circle cx="120" cy="95" r="14" fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)}/>
        <circle cx="80" cy="95" r="8" fill="none" stroke={fill} strokeWidth="1" opacity="0.5"/>
        <circle cx="120" cy="95" r="8" fill="none" stroke={fill} strokeWidth="1" opacity="0.5"/>
        <path d="M28 168 C24 172 20 178 24 183 C28 188 34 184 32 178" fill="none" stroke={fill} strokeWidth={Math.max(sw, 1.8)} strokeLinecap="round"/>
      </svg>
    ),
  },
];

interface GhostProps {
  fill: string;
  stroke: string;
  bg: string;
  sw: number;
}

/* ── Hex color wheel picker ─────────────────────────────────────────── */
function HexColorPicker({ color, onChange, size = 200 }: { color: string; onChange: (c: string) => void; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragging = useRef(false);
  const [brightness, setBrightness] = useState(1);
  const brightnessVal = useRef(1);

  const drawWheel = useCallback((ctx: CanvasRenderingContext2D, brt: number) => {
    const cx = size / 2, cy = size / 2, r = size / 2 - 4;
    ctx.clearRect(0, 0, size, size);
    for (let angle = 0; angle < 360; angle++) {
      const start = (angle - 1) * Math.PI / 180;
      const end = (angle + 1) * Math.PI / 180;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, `hsla(${angle},0%,${brt * 100}%,1)`);
      grad.addColorStop(1, `hsla(${angle},100%,${brt * 50}%,1)`);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawWheel(ctx, brightnessVal.current);
  }, [drawWheel]);

  const pickColor = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const dist = Math.sqrt((x - size/2) ** 2 + (y - size/2) ** 2);
    if (dist > size / 2 - 2) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixel = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
    const hex = "#" + [pixel[0], pixel[1], pixel[2]].map(v => v.toString(16).padStart(2, "0")).join("");
    onChange(hex);
  }, [size, onChange]);

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setBrightness(val);
    brightnessVal.current = val;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawWheel(ctx, val);
  };

  const hexToHSL = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h = 0, s = 0;
    const l = (max+min)/2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      if (max===r) h = ((g-b)/d + (g<b?6:0))/6;
      else if (max===g) h = ((b-r)/d+2)/6;
      else h = ((r-g)/d+4)/6;
    }
    return [h*360, s, l];
  };

  const [h, s] = hexToHSL(color);
  const r = (size/2 - 4) * s;
  const mx = size/2 + r * Math.cos(h * Math.PI / 180);
  const my = size/2 + r * Math.sin(h * Math.PI / 180);

  return (
    <div className="flex flex-col items-center" style={{ gap: 12 }}>
      <div
        className="relative shrink-0"
        style={{ width: size, height: size, cursor: "crosshair" }}
        onMouseDown={e => { dragging.current = true; pickColor(e); }}
        onMouseMove={e => { if (dragging.current) pickColor(e); }}
        onMouseUp={() => dragging.current = false}
        onMouseLeave={() => dragging.current = false}
      >
        <canvas ref={canvasRef} width={size} height={size} style={{ borderRadius: "50%", display: "block", width: size, height: size }} />
        <div style={{
          position: "absolute", left: mx - 8, top: my - 8, width: 16, height: 16,
          borderRadius: "50%", border: "2.5px solid #fff", boxShadow: "0 0 0 1.5px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.5)",
          background: color, pointerEvents: "none",
        }} />
      </div>
      <div className="w-full" style={{ padding: "0 4px" }}>
        <div className="font-mono" style={{ fontSize: 10, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 6 }}>BRIGHTNESS</div>
        <div className="relative" style={{ height: 20 }}>
          <div style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            width: "100%", height: 8, borderRadius: 4,
            background: `linear-gradient(to right, #000, ${color})`,
          }}/>
          <input type="range" min="0.1" max="1" step="0.01" value={brightness} onChange={handleBrightnessChange}
            className="studio-range"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}/>
        </div>
      </div>
    </div>
  );
}

/* ── Preset palette swatches ────────────────────────────────────────── */
const PRESETS = [
  "#000000","#ffffff","#FF5733","#FFD700","#4FAAFF",
  "#6B5CE7","#00C48C","#FF69B4","#FF8C00","#00BFFF",
  "#7CFC00","#DC143C","#8B4513","#708090","#FFE4B5",
];

/* ── Ghost Studio component ─────────────────────────────────────────── */
export default function GhostStudio({ accentColor }: { accentColor: string }) {
  const [styleIdx, setStyleIdx] = useState(0);
  const [ghostColor, setGhostColor] = useState("#1a1a1a");
  const [eyeColor, setEyeColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#f0f0f0");
  const [activeTarget, setActiveTarget] = useState<"ghost" | "eye" | "bg">("ghost");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState("#000000");

  const activeStyle = STYLES[styleIdx];
  const targetColors = { ghost: ghostColor, eye: eyeColor, bg: bgColor };
  const setTargetColor = { ghost: setGhostColor, eye: setEyeColor, bg: setBgColor };

  const activeColor = targetColors[activeTarget];
  const setActiveColor = (c: string) => setTargetColor[activeTarget](c);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length);
      if (e.key === "ArrowRight") setStyleIdx(i => (i + 1) % STYLES.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const ghostProps: GhostProps = { fill: ghostColor, stroke: strokeWidth > 0 ? strokeColor : "none", bg: eyeColor, sw: strokeWidth };

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${accentColor}20`, background: "#0a0a0a" }}>
      {/* Studio CSS */}
      <style>{`
        .studio-dot { width: 8px; height: 8px; border-radius: 50%; background: #333; transition: all 0.2s; cursor: pointer; flex-shrink: 0; }
        .studio-dot.active { background: #fff; transform: scale(1.4); }
        .studio-target-btn { padding: 8px 16px; border-radius: 6px; border: 1.5px solid transparent; cursor: pointer; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; transition: all 0.18s; }
        .studio-target-btn.active { border-color: #fff; background: rgba(255,255,255,0.08); }
        .studio-target-btn:not(.active) { border-color: #333; background: transparent; color: #666; }
        .studio-target-btn:not(.active):hover { border-color: #555; color: #aaa; }
        .studio-swatch { width: 26px; height: 26px; border-radius: 6px; cursor: pointer; border: 2px solid transparent; transition: transform 0.15s, border-color 0.15s; flex-shrink: 0; }
        .studio-swatch:hover { transform: scale(1.18); border-color: rgba(255,255,255,0.4); }
        .studio-arrow { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid #333; background: transparent; color: #888; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: all 0.18s; }
        .studio-arrow:hover { border-color: #fff; color: #fff; background: rgba(255,255,255,0.06); }
        @keyframes ghostIn { from { opacity: 0; transform: scale(0.88) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .ghost-anim { animation: ghostIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #fff; cursor: pointer; border: 2px solid #333; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: "18px 24px", borderBottom: "1px solid #1e1e1e" }}>
        <div>
          <h3 className="font-mono text-sm font-bold text-white" style={{ letterSpacing: "0.12em" }}>GHOST STUDIO</h3>
          <p className="font-mono" style={{ fontSize: 10, color: "#555", letterSpacing: "0.08em", marginTop: 2 }}>click or use arrow keys to cycle styles</p>
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C48C", boxShadow: "0 0 8px #00C48C" }}/>
          <span className="font-mono" style={{ fontSize: 10, color: "#555", letterSpacing: "0.08em" }}>LIVE PREVIEW</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: 520 }}>

        {/* Left: Controls */}
        <div className="lg:w-[280px] shrink-0 overflow-y-auto" style={{ borderRight: "1px solid #1a1a1a", background: "#0c0c0c" }}>

          {/* Style selector */}
          <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1a1a1a" }}>
            <p className="font-mono" style={{ fontSize: 9, color: "#555", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: 14 }}>STYLE — {styleIdx + 1}/{STYLES.length}</p>
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <button className="studio-arrow" onClick={() => setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length)}>&#8249;</button>
              <div className="text-center">
                <p className="font-mono text-base font-bold text-white" style={{ letterSpacing: "0.04em" }}>{activeStyle.name}</p>
                <p style={{ fontSize: 10, color: "#666", marginTop: 3 }}>{activeStyle.desc}</p>
              </div>
              <button className="studio-arrow" onClick={() => setStyleIdx(i => (i + 1) % STYLES.length)}>&#8250;</button>
            </div>
            <div className="flex justify-center" style={{ gap: 8 }}>
              {STYLES.map((s, i) => (
                <div key={s.id} className={`studio-dot${i === styleIdx ? " active" : ""}`} onClick={() => setStyleIdx(i)} title={s.name}/>
              ))}
            </div>
          </div>

          {/* Color target */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
            <p className="font-mono" style={{ fontSize: 9, color: "#555", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: 12 }}>EDIT COLOR</p>
            <div className="flex" style={{ gap: 8 }}>
              {([
                { id: "ghost" as const, label: "GHOST", color: ghostColor },
                { id: "eye" as const, label: "EYES", color: eyeColor },
                { id: "bg" as const, label: "BG", color: bgColor },
              ]).map(t => (
                <button key={t.id} className={`studio-target-btn font-mono flex-1${activeTarget === t.id ? " active" : ""}`}
                  onClick={() => setActiveTarget(t.id)}
                  style={{ color: activeTarget === t.id ? "#fff" : "#666" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: t.color, margin: "0 auto 5px", border: "1px solid rgba(255,255,255,0.15)" }}/>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color wheel */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a" }}>
            <HexColorPicker color={activeColor} onChange={setActiveColor} size={238} />
            <div className="flex items-center" style={{ gap: 10, marginTop: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: activeColor, border: "1px solid #333", flexShrink: 0 }}/>
              <input
                className="font-mono"
                value={activeColor}
                onChange={e => { const v = e.target.value; if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setActiveColor(v); }}
                style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#fff", padding: "8px 12px", fontSize: 13, letterSpacing: "0.08em", outline: "none", borderRadius: 6 }}
              />
            </div>
          </div>

          {/* Presets */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #1a1a1a" }}>
            <p className="font-mono" style={{ fontSize: 9, color: "#555", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: 10 }}>PRESETS</p>
            <div className="flex flex-wrap" style={{ gap: 7 }}>
              {PRESETS.map(p => (
                <div key={p} className="studio-swatch" style={{ background: p, border: p === activeColor ? "2px solid #fff" : "2px solid #2a2a2a" }}
                  onClick={() => setActiveColor(p)} title={p}/>
              ))}
            </div>
          </div>

          {/* Stroke */}
          <div style={{ padding: "14px 20px" }}>
            <p className="font-mono" style={{ fontSize: 9, color: "#555", letterSpacing: "0.14em", textTransform: "uppercase" as const, marginBottom: 12 }}>STROKE</p>
            <div style={{ marginBottom: 14 }}>
              <div className="flex justify-between" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: "#888", letterSpacing: "0.06em" }}>Width</span>
                <span className="font-mono" style={{ fontSize: 10, color: "#fff" }}>{strokeWidth}px</span>
              </div>
              <input type="range" min="0" max="12" step="0.5" value={strokeWidth} onChange={e => setStrokeWidth(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#fff" }}/>
            </div>
            {strokeWidth > 0 && (
              <div>
                <p style={{ fontSize: 10, color: "#888", letterSpacing: "0.06em", marginBottom: 8 }}>Stroke Color</p>
                <div className="flex flex-wrap" style={{ gap: 6 }}>
                  {["#000000","#ffffff","#FF5733","#FFD700","#4FAAFF","#6B5CE7","#00C48C","#FF69B4"].map(p => (
                    <div key={p} className="studio-swatch" style={{ background: p, border: p === strokeColor ? "2px solid #fff" : "2px solid #2a2a2a", width: 22, height: 22 }}
                      onClick={() => setStrokeColor(p)}/>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Preview */}
        <div className="flex-1 flex flex-col items-center justify-center relative" style={{ background: bgColor, transition: "background 0.3s ease", minHeight: 400 }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }}/>
          <div key={styleIdx} className="ghost-anim" style={{ width: 240, height: 240, display: "flex", alignItems: "center", justifyContent: "center", filter: strokeWidth > 0 ? "none" : "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}>
            {activeStyle.render(ghostProps)}
          </div>
          <p className="font-mono" style={{ fontSize: 11, color: "rgba(0,0,0,0.25)", letterSpacing: "0.16em", textTransform: "uppercase" as const, marginTop: 20, mixBlendMode: "multiply" as const }}>
            {activeStyle.name} &middot; {activeStyle.desc}
          </p>
          <div className="absolute bottom-6 flex items-center" style={{ gap: 16 }}>
            <button className="studio-arrow" style={{ borderColor: "rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.35)" }}
              onClick={() => setStyleIdx(i => (i - 1 + STYLES.length) % STYLES.length)}>&#8249;</button>
            <span className="font-mono" style={{ fontSize: 10, color: "rgba(0,0,0,0.3)", letterSpacing: "0.1em" }}>
              {styleIdx + 1} / {STYLES.length}
            </span>
            <button className="studio-arrow" style={{ borderColor: "rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.35)" }}
              onClick={() => setStyleIdx(i => (i + 1) % STYLES.length)}>&#8250;</button>
          </div>
        </div>

        {/* Right: Style grid */}
        <div className="hidden xl:flex flex-col" style={{ width: 220, borderLeft: "1px solid #1a1a1a", background: "#0c0c0c", overflowY: "auto" }}>
          <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #1a1a1a" }}>
            <p className="font-mono" style={{ fontSize: 9, color: "#555", letterSpacing: "0.14em", textTransform: "uppercase" as const }}>ALL STYLES</p>
          </div>
          <div className="flex flex-col flex-1" style={{ padding: 12, gap: 8 }}>
            {STYLES.map((s, i) => (
              <div key={s.id} onClick={() => setStyleIdx(i)}
                className="flex items-center cursor-pointer"
                style={{
                  borderRadius: 12, overflow: "hidden",
                  border: `1.5px solid ${i === styleIdx ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.05)"}`,
                  background: i === styleIdx ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.02)",
                  transition: "all 0.18s", padding: "12px 10px", gap: 12,
                }}>
                <div className="shrink-0 flex items-center justify-center" style={{ width: 44, height: 44 }}>
                  {s.render({ fill: i === styleIdx ? ghostColor : "#555", stroke: "none", bg: i === styleIdx ? eyeColor : "#0c0c0c", sw: 0 })}
                </div>
                <div>
                  <p className="font-mono text-xs font-bold" style={{ color: i === styleIdx ? "#fff" : "#555", letterSpacing: "0.06em" }}>{s.name}</p>
                  <p style={{ fontSize: 9, color: "#444", marginTop: 2 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
