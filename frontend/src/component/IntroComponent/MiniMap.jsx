import React from "react";

export default function MiniMap() {
  return (
    <div
      className="relative h-10 w-16 overflow-hidden rounded-lg border border-white/10"
      style={{
        background:
          "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.4), transparent 60%), radial-gradient(circle at 70% 70%, rgba(16,185,129,0.35), transparent 60%), #0b0b0f",
      }}
    >
      <svg viewBox="0 0 64 40" className="absolute inset-0 h-full w-full">
        <path d="M4 30 Q 20 8, 34 22 T 60 14" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" strokeDasharray="2 3" />
        <circle cx="4" cy="30" r="1.8" fill="#60a5fa" />
        <circle cx="60" cy="14" r="1.8" fill="#34d399" />
      </svg>
    </div>
  );
}