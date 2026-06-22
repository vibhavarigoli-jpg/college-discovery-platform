"use client";

import { useEffect, useState } from "react";
import { useCompare } from "@/hooks/useCompare";
import mockColleges from "@/mock/colleges.json";
import Link from "next/link";

export default function ComparePage() {
  const { compareIds, toggleCompare } = useCompare();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    setList(mockColleges.filter((c) => compareIds.includes(c.id)));
  }, [compareIds]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <Link href="/colleges" className="text-xs font-bold text-indigo-600 hover:underline">← Return back to Directory Index</Link>
          <h1 className="text-2xl font-bold text-slate-800 mt-2">Side-by-Side Comparison Grid</h1>
        </header>

        {list.length === 0 ? (
          <div className="bg-white border rounded-xl p-8 text-center text-slate-400 max-w-md mx-auto">Basket layout empty. Select colleges first.</div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 divide-x">
                  <th className="p-4 font-bold text-slate-500 w-44">Parameters</th>
                  {list.map((c) => (
                    <th key={c.id} className="p-4 font-bold text-slate-800 min-w-[220px]">
                      <div className="flex justify-between items-center gap-2">
                        <span className="truncate block">{c.name}</span>
                        <button onClick={() => toggleCompare(c.id)} className="text-xs text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Drop</button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="divide-x"><td className="p-4 font-semibold text-slate-500 bg-slate-50">Location</td>{list.map((c) => (<td key={c.id} className="p-4 text-slate-600">📍 {c.location}</td>))}</tr>
                <tr className="divide-x"><td className="p-4 font-semibold text-slate-500 bg-slate-50">Fees</td>{list.map((c) => (<td key={c.id} className="p-4 font-bold text-slate-700">₹{c.fees.toLocaleString()} / yr</td>))}</tr>
                <tr className="divide-x"><td className="p-4 font-semibold text-slate-500 bg-slate-50">User Score</td>{list.map((c) => (<td key={c.id} className="p-4"><span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-bold">★ {c.rating}</span></td>))}</tr>
                <tr className="divide-x"><td className="p-4 font-semibold text-slate-500 bg-slate-50">Placement Metric</td>{list.map((c) => (<td key={c.id} className="p-4 text-xs"><div className="font-semibold text-slate-700">Top Package: {c.placements.highest}</div><div className="font-bold text-emerald-600">Avg Package: {c.placements.average}</div></td>))}</tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}