"use client"

function wavePath(yBase: number, amp: number, len = 1440, waves = 2) {
  let d = `M 0 ${yBase}`
  const step = 20
  for (let x = 0; x <= len; x += step) {
    const y = yBase + Math.sin((x / len) * Math.PI * 2 * waves) * amp
    d += ` L ${x} ${y.toFixed(1)}`
  }
  return d
}

function DottedLine({ d, color, glow, width = 1440 }: { d: string; color: string; glow: string; width?: number }) {
  // Render dots along path by sampling: use many small circles via <circle> is heavy,
  // instead use SVG path with round dotted stroke = wavy line composed of small dots
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeDasharray="0.1 14"
      opacity={0.85}
      style={{ filter: `drop-shadow(0 0 6px ${glow}) drop-shadow(0 0 18px ${glow})` }}
    />
  )
}

export default function DottedWaves({ className = "" }: { className?: string }) {
  const waves = [
    { y: 120, amp: 46, c1: "#00d4ff", g1: "rgba(0,212,255,0.8)", o: 0.9, w: 1 },
    { y: 210, amp: 62, c1: "#7b2ff7", g1: "rgba(123,47,247,0.8)", o: 0.7, w: 2 },
    { y: 300, amp: 40, c1: "#ff4a95", g1: "rgba(255,74,149,0.8)", o: 0.75, w: 1.5 },
    { y: 390, amp: 58, c1: "#00ffb2", g1: "rgba(0,255,178,0.7)", o: 0.55, w: 2.4 },
    { y: 480, amp: 44, c1: "#00d4ff", g1: "rgba(0,212,255,0.7)", o: 0.5, w: 3 },
  ]
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="dotted-wave-wrap absolute inset-0">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" className="h-full w-full opacity-60" focusable="false">
          {waves.map((w, i) => (
            <g key={i} opacity={w.o} className="dot-wave">
              <DottedLine d={wavePath(w.y, w.amp, 1440, w.w)} color={w.c1} glow={w.g1} />
              <DottedLine d={wavePath(w.y + 26, w.amp * 0.9, 1440, w.w)} color={w.c1} glow={w.g1} />
            </g>
          ))}
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  )
}
