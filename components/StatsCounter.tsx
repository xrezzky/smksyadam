"use client";

import { useEffect, useRef, useState } from "react";

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

function CountUpItem({ stat, active }: { stat: Stat; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(stat.value);
      return;
    }

    const duration = 1100;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.value]);

  return (
    <div className="text-center">
      <div className="font-serif text-[clamp(28px,5vw,38px)] font-bold text-blue-900">
        {display}
        {stat.suffix ?? ""}
      </div>
      <div className="mt-1 text-[13px] text-gray-500">{stat.label}</div>
    </div>
  );
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s) => (
        <CountUpItem key={s.label} stat={s} active={active} />
      ))}
    </div>
  );
}
