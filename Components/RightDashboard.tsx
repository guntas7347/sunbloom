import {
  ShieldCheck,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ── tiny animated sparkline SVG ── */
function Sparkline({ color, delay = 0 }: { color: string; delay?: number }) {
  const [points, setPoints] = useState<number[]>([
    40, 55, 45, 60, 50, 70, 60, 80, 65, 85,
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setPoints((prev) => {
        const next = [
          ...prev.slice(1),
          Math.max(
            20,
            Math.min(95, prev[prev.length - 1] + (Math.random() - 0.4) * 15),
          ),
        ];
        return next;
      });
    }, 900 + delay);
    return () => clearInterval(id);
  }, [delay]);

  const pathD = points
    .map(
      (y, i) =>
        `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * 200} ${100 - y}`,
    )
    .join(" ");

  return (
    <svg
      viewBox="0 0 200 100"
      className="w-full h-12"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${pathD} L 200 100 L 0 100 Z`}
        fill={`url(#grad-${color})`}
        className="transition-all duration-500"
      />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-500"
      />
    </svg>
  );
}

/* ── animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const step = target / 60;
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(target, cur + step);
      setVal(Math.floor(cur));
      if (cur >= target) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [target]);
  return (
    <span>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── animated bar ── */
function Bar({
  pct,
  color,
  delay,
}: {
  pct: number;
  color: string;
  delay: string;
}) {
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
      <div
        className="h-full rounded-full transition-all ease-out"
        style={{
          width: `${pct}%`,
          background: color,
          animation: `growBar 1.4s ${delay} both`,
        }}
      />
    </div>
  );
}

const RightDashboard = () => {
  return (
    <>
      <style>{`
        @keyframes growBar { from { width: 0 } }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.4; transform:scale(.8) } }
        @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-8px) } }
      `}</style>
      <div
        className="flex-1 w-full relative"
        style={{ animation: "float 5s ease-in-out infinite" }}
      >
        {/* glow blob */}
        <div className="aspect-square bg-gradient-to-tr from-primary/30 to-primary/5 rounded-full absolute -top-10 -right-10 blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900">
          {/* dashboard header */}
          <div className="bg-slate-900 dark:bg-slate-800 px-5 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-slate-400 text-xs font-mono">
              Immigration Analytics — Live
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-green-400 text-xs font-bold">
              <span
                className="w-2 h-2 rounded-full bg-green-400"
                style={{ animation: "pulse-dot 1.2s infinite" }}
              />
              LIVE
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* stat cards row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: CheckCircle,
                  label: "Approvals",
                  count: 1240,
                  color: "#16a34a",
                },
                {
                  icon: Users,
                  label: "Clients",
                  count: 850,
                  color: "#2563eb",
                },
                {
                  icon: TrendingUp,
                  label: "Success %",
                  count: 96,
                  suffix: "%",
                  color: "#7c3aed",
                },
              ].map(({ icon: Icon, label, count, suffix, color }) => (
                <div
                  key={label}
                  className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 text-center"
                >
                  <Icon className="mx-auto mb-1" style={{ color }} size={18} />
                  <p className="text-lg font-black text-slate-900 dark:text-slate-100">
                    <Counter target={count} suffix={suffix} />
                  </p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>

            {/* applications trend chart */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Applications Filed
                </span>
                <span className="text-xs text-green-500 font-bold flex items-center gap-1">
                  <TrendingUp size={11} /> +18% this month
                </span>
              </div>
              <Sparkline color="#16a34a" delay={0} />
            </div>

            {/* approval rate chart */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Approval Rate Trend
                </span>
                <span className="text-xs text-blue-500 font-bold flex items-center gap-1">
                  <TrendingUp size={11} /> Steady rise
                </span>
              </div>
              <Sparkline color="#2563eb" delay={400} />
            </div>

            {/* visa type breakdown */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                Cases by Visa Type
              </span>
              {[
                {
                  label: "Express Entry",
                  pct: 82,
                  color: "linear-gradient(90deg,#16a34a,#4ade80)",
                  delay: "0.1s",
                },
                {
                  label: "Study Permit",
                  pct: 67,
                  color: "linear-gradient(90deg,#2563eb,#60a5fa)",
                  delay: "0.25s",
                },
                {
                  label: "Family Sponsor",
                  pct: 54,
                  color: "linear-gradient(90deg,#7c3aed,#a78bfa)",
                  delay: "0.4s",
                },
                {
                  label: "Work Permit",
                  pct: 46,
                  color: "linear-gradient(90deg,#ea580c,#fb923c)",
                  delay: "0.55s",
                },
              ].map(({ label, pct, color, delay }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      {label}
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {pct}%
                    </span>
                  </div>
                  <Bar pct={pct} color={color} delay={delay} />
                </div>
              ))}
            </div>

            {/* footer strip */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock size={12} />
              <span>
                Updated just now · Data reflects active case portfolio
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightDashboard;
