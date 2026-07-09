export default function Stat({ n, label }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight text-white">{n}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}