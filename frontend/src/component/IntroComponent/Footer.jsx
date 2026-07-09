import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 px-6 text-xs text-white/40 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-black">
            <Compass className="h-3 w-3" />
          </div>
          <span className="text-white/70">WayPoint</span>
          <span>© 2026</span>
        </div>
        <div>Crafted for people who wander.</div>
      </div>
    </footer>
  );
}
