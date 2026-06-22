"use client";

import { useEffect, useState, use } from "react";
import mockColleges from "@/mock/colleges.json";
import Link from "next/link";

interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  timestamp: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CollegeDetailPage({ params }: PageProps) {
  // Safe runtime unwrapping of asynchronous routing params
  const unwrappedParams = use(params);
  const [college, setCollege] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Reviews Local State Setup
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "demo-1",
      author: "Sai Kumar",
      text: "Outstanding campus infrastructure and excellent engineering labs system support.",
      rating: 5,
      timestamp: "June 2026"
    }
  ]);

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (unwrappedParams && unwrappedParams.id) {
      // Find matching mock item mapping data record
      const found = mockColleges.find((c) => c.id === unwrappedParams.id);
      setCollege(found || null);
    }
  }, [unwrappedParams]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      alert("Fields cannot be empty validation errors!");
      return;
    }
    const newReview: Review = {
      id: Date.now().toString(),
      author,
      text,
      rating,
      timestamp: "Just Now"
    };
    setReviews([newReview, ...reviews]);
    setAuthor("");
    setText("");
    setRating(5);
  };

  // Safe validation check if id data matching not found
  if (!college) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 font-medium space-y-4">
        <div className="text-indigo-600 text-sm font-bold tracking-wider animate-pulse">
          ⏳ Mapping Institution Matrix Context Profile...
        </div>
        <Link href="/colleges" className="text-xs text-slate-400 underline hover:text-indigo-600">
          Return back to Directory Index
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <header>
          <Link href="/colleges" className="text-xs font-bold text-indigo-600 hover:underline">
            ← Return back to Directory Index
          </Link>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-3 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 leading-snug">{college.name}</h1>
              <p className="text-sm text-slate-400 mt-1">📍 {college.location}</p>
            </div>
            <span className="bg-amber-100 text-amber-800 font-bold text-sm px-2.5 py-1 rounded-md border border-amber-200 shrink-0">
              ★ {college.rating} / 5.0
            </span>
          </div>
        </header>

        {/* Custom Tabbed Profile Controllers */}
        <div className="flex border-b border-slate-200">
          {["overview", "courses", "placements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-sm font-bold capitalize transition-all border-b-2 ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Display Area */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[160px]">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-700">Institution Summary</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Welcome to {college.name}. This premier institution located in {college.location} offers world-class curriculum structures and exceptional learning environments tailored for technical mastery and application engineering ecosystem standards.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg border text-sm">
                <span className="text-slate-500 font-medium">Estimated Annual Tuition Budget Structure: </span>
                <span className="font-bold text-slate-800">₹{college.fees.toLocaleString()} / year</span>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-700">Offered Core Disciplines</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {college.courses.map((course: string, i: number) => (
                  <div key={i} className="p-3 bg-slate-50 border rounded-lg text-sm text-slate-700 font-medium">
                    ⚡ {course}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "placements" && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-700">Annual Placement Standards Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-xs text-slate-400 font-medium block uppercase tracking-wider">Highest CTC</span>
                  <span className="text-xl font-black text-slate-800">{college.placements.highest}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-emerald-200 text-center">
                  <span className="text-xs text-slate-400 font-medium block uppercase tracking-wider">Average Annual Package</span>
                  <span className="text-xl font-black text-emerald-600">{college.placements.average}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Integrated User Comments & Reviews Feed Blocks Rendering */}
        <div className="space-y-6 border-t pt-6">
          <h2 className="text-xl font-bold text-slate-800">Student Testimonials & Reviews Matrix</h2>
          
          <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-700">Write an Institutional Experience Review</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Your Alias Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full bg-white border border-slate-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Star Score Allocation</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>★ {num} Stars Rating</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Review Message feedback data</label>
              <textarea
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share feedback context on placement, curriculum..."
                className="w-full bg-white border border-slate-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded shadow transition-all">
              Publish Feedback Entry Record
            </button>
          </form>

          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">{r.author}</span>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">★ {r.rating}.0</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{r.text}</p>
                <div className="text-[10px] text-slate-400 font-medium text-right">🕒 Registered: {r.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}