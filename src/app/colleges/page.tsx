"use client";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useCompare } from "@/hooks/useCompare";
import mockColleges from "@/mock/colleges.json";
import Link from "next/link";

export default function CollegesPage() {
  const [colleges, setColleges] = useState(mockColleges);
  const [search, setSearch] = useState("");
  const [selectedLoc, setSelectedLoc] = useState("All");
  const [maxFees, setMaxFees] = useState(400000);

  const debouncedSearch = useDebounce(search, 300);
  const { compareIds, toggleCompare, isCompared } = useCompare();

  const filtered = colleges.filter((c) => {
    const sMatch = c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || c.location.toLowerCase().includes(debouncedSearch.toLowerCase());
    const lMatch = selectedLoc === "All" || c.location.includes(selectedLoc);
    const fMatch = c.fees <= maxFees;
    return sMatch && lMatch && fMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">College Discovery Platform</h1>
            <p className="text-sm text-slate-500">Find and benchmark your absolute ideal career option.</p>
          </div>
          {compareIds.length > 0 && (
            <Link href="/compare" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow transition-all flex items-center gap-2">
              Compare Basket Matrix <span>({compareIds.length})</span>
            </Link>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar UI Container */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 h-fit space-y-4">
            <h2 className="font-bold text-slate-700 border-b pb-2">Filters Dashboard</h2>
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Search Name</label>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border p-2 rounded text-sm bg-slate-50" placeholder="Type name..." />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Region Location</label>
              <select value={selectedLoc} onChange={(e) => setSelectedLoc(e.target.value)} className="w-full border p-2 rounded text-sm bg-slate-50">
                <option value="All">All Locations</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kakinada">Kakinada</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 block mb-1">Max Fees: ₹{maxFees.toLocaleString()}</label>
              <input type="range" min="80000" max="400000" step="10000" value={maxFees} onChange={(e) => setMaxFees(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
          </div>

          {/* Colleges Profiles Listing Cards Row Systems Grid Area */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <Link href={`/college/${c.id}`} className="hover:text-indigo-600 transition-colors cursor-pointer">
                      <h3 className="font-bold text-slate-800 text-base leading-snug">{c.name}</h3>
                    </Link>
                    <span className="bg-amber-50 text-amber-700 font-bold text-xs px-1.5 py-0.5 rounded border border-amber-200 shrink-0">★ {c.rating}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">📍 {c.location}</p>
                </div>
                <div className="border-t pt-3 mt-2 flex flex-col gap-3">
                  <div className="flex justify-between text-xs font-medium">
                    <div><span className="text-slate-400 block text-[10px]">Annual Tuition</span> ₹{c.fees.toLocaleString()}</div>
                    <div className="text-right"><span className="text-slate-400 block text-[10px]">Avg Placement</span> {c.placements.average}</div>
                  </div>
                  <button 
                    onClick={() => toggleCompare(c.id)} 
                    className={`w-full py-1.5 rounded text-xs font-bold border transition-all ${
                      isCompared(c.id) 
                        ? "bg-rose-50 border-rose-200 text-rose-600" 
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {isCompared(c.id) ? "✕ Clear Select" : "⇄ Add to Compare"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}