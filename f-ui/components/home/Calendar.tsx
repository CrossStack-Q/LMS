"use client";

import { useState, useMemo, useEffect } from "react";

export default function Calendar() {
  const today = new Date();
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [weekIndex, setWeekIndex] = useState(0);

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  /** STEP 1 – Days of this month */
  const monthDays = useMemo(() => {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) => new Date(year, month, i + 1));
  }, [month, year]);

  /** STEP 2 – Convert into week rows */
  const monthWeeks = useMemo(() => {
    const weeks: (Date | null)[][] = [];
    let week = new Array(7).fill(null);

    monthDays.forEach((date) => {
      const js = date.getDay(); // 0 = Sun
      const index = js === 0 ? 6 : js - 1;
      week[index] = date;

      if (js === 0) {
        weeks.push(week);
        week = new Array(7).fill(null);
      }
    });

    if (week.some((d) => d !== null)) weeks.push(week);

    return weeks;
  }, [monthDays]);

  /** ⭐ FIX — Auto-jump to the week containing today */
  useEffect(() => {
    const index = monthWeeks.findIndex((week) =>
      week.some((day) => day && isSameDay(day, today))
    );
    if (index !== -1) {
      setWeekIndex(index);
    }
  }, [monthWeeks]);

  /** Swipe navigation */
  const goNext = () => {
    if (weekIndex < monthWeeks.length - 1) {
      setWeekIndex(weekIndex + 1);
    } else {
      const newMonth = month === 11 ? 0 : month + 1;
      const newYear = month === 11 ? year + 1 : year;
      setMonth(newMonth);
      setYear(newYear);
      setWeekIndex(0);
    }
  };

  const goPrev = () => {
    if (weekIndex > 0) {
      setWeekIndex(weekIndex - 1);
    } else {
      const newMonth = month === 0 ? 11 : month - 1;
      const newYear = month === 0 ? year - 1 : year;

      // compute last week of previous month
      const prevLast = new Date(newYear, newMonth + 1, 0).getDate();
      const prevDays = Array.from({ length: prevLast }, (_, i) => new Date(newYear, newMonth, i + 1));

      const prevWeeks: (Date | null)[][] = [];
      let wk = new Array(7).fill(null);

      prevDays.forEach((date) => {
        const js = date.getDay();
        const idx = js === 0 ? 6 : js - 1;
        wk[idx] = date;
        if (js === 0) {
          prevWeeks.push(wk);
          wk = new Array(7).fill(null);
        }
      });
      if (wk.some((d) => d !== null)) prevWeeks.push(wk);

      setMonth(newMonth);
      setYear(newYear);
      setWeekIndex(prevWeeks.length - 1);
    }
  };

  const activeWeek = monthWeeks[weekIndex];

  return (
    <div className="w-full rounded-3xl bg-gray-50 p-5 text-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={goPrev} className="text-xl">◀</button>

        <h3 className="font-semibold flex gap-2 ">
          {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
        </h3>

        <button onClick={goNext} className="text-xl">▶</button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 font-medium text-center text-sm text-zinc-800 mb-2">
        {daysOfWeek.map((d) => <div key={d}>{d}</div>)}
      </div>

      {/* Week row */}
      <div className="grid grid-cols-7 text-center text-zinc-500">
        {activeWeek.map((date, i) => {
          const isToday = date && isSameDay(date, today);

          return (
            <div
              key={i}
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full
                ${isToday ? "bg-purple-500 text-white font-bold" : ""}
              `}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
