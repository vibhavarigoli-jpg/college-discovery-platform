"use client";
import { useState, useEffect } from "react";

export function useCompare() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("basket_slots");
    if (saved) setCompareIds(JSON.parse(saved));
  }, []);

  const toggleCompare = (id: string) => {
    let updated: string[];
    if (compareIds.includes(id)) {
      updated = compareIds.filter((item) => item !== id);
    } else {
      if (compareIds.length >= 3) {
        alert("Maximum 3 colleges mathrame add cheyogalamu!");
        return;
      }
      updated = [...compareIds, id];
    }
    setCompareIds(updated);
    localStorage.setItem("basket_slots", JSON.stringify(updated));
  };

  return { compareIds, toggleCompare, isCompared: (id: string) => compareIds.includes(id) };
}