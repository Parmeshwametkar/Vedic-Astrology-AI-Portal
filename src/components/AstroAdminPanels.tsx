import React, { useState } from "react";
import { Astrologer, Blog, Booking, Transaction } from "../types";
import { ShieldCheck, Plus, Check, Star, DollarSign, Clock, Users, ArrowUpRight, Award } from "lucide-react";

interface AstrologerPanelProps {
  astrologers: Astrologer[];
  bookings: Booking[];
  onApplyAstrologer: (appData: any) => Promise<void>;
}

export function AstrologerPanelComponent({ astrologers, bookings, onApplyAstrologer }: AstrologerPanelProps) {
  const [isApplied, setIsApplied] = useState(false);
  const [applyForm, setApplyForm] = useState({
    name: "",
    specialty: "Vedic, Kundli, Muhurat",
    experience: "8",
    rate: "15",
    languages: "English, Hindi",
    bio: ""
  });

  const [withdrawForm, setWithdrawForm] = useState({
    amount: "500",
    upiId: ""
  });
  const [withdrawStatus, setWithdrawStatus] = useState("");

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    await onApplyAstrologer(applyForm);
    setIsApplied(true);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawForm.upiId) {
      setWithdrawStatus("Please enter a valid UPI ID");
      return;
    }
    setWithdrawStatus(`Withdrawal of ₹${withdrawForm.amount} initiated to ${withdrawForm.upiId}. Approved in 12 hours.`);
    setWithdrawForm({ amount: "500", upiId: "" });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-amber-400 mb-2">Astrologer Portal</h2>
        <p className="text-sm text-slate-400">Share your divine knowledge and serve seekers worldwide</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Registration Column */}
        <div className="md:col-span-2 space-y-6">
          {!isApplied ? (
            <form onSubmit={handleApply} className="p-6 rounded-2xl glass-panel space-y-4">
              <h3 className="text-lg font-display text-amber-300 font-bold border-b border-slate-800 pb-2">Apply as Certified Astrologer</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Full Name (Prefix Pandit/Dr/Aacharya)</label>
                  <input
                    type="text"
                    required
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                    placeholder="e.g. Pandit Harish Prasad"
                    value={applyForm.name}
                    onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Primary Specialty</label>
                  <input
                    type="text"
                    required
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                    placeholder="e.g. Vedic, K.P., Gemology"
                    value={applyForm.specialty}
                    onChange={e => setApplyForm({ ...applyForm, specialty: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    required
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                    placeholder="e.g. 10"
                    value={applyForm.experience}
                    onChange={e => setApplyForm({ ...applyForm, experience: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Per-Minute Rate (INR)</label>
                  <input
                    type="number"
                    required
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                    placeholder="e.g. 15"
                    value={applyForm.rate}
                    onChange={e => setApplyForm({ ...applyForm, rate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Languages Spoken</label>
                  <input
                    type="text"
                    required
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                    placeholder="English, Hindi, Marathi"
                    value={applyForm.languages}
                    onChange={e => setApplyForm({ ...applyForm, languages: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Astrological Bio & Lineage</label>
                <textarea
                  rows={4}
                  required
                  className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200 resize-none"
                  placeholder="Share details about your Gurukul backgrounds or study centers..."
                  value={applyForm.bio}
                  onChange={e => setApplyForm({ ...applyForm, bio: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded transition-colors uppercase tracking-widest">
                Submit Astrologer Credentials
              </button>
            </form>
          ) : (
            <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/15 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-3xl">✓</div>
              <h3 className="text-xl font-display font-bold text-emerald-400">Application Submitted!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Om Namah Shivaya! Your credentials and bio details have been logged. The verification panel will audit your certificates and schedule a mock reading session. Approval completes within 12 hours.
              </p>
              <button onClick={() => setIsApplied(false)} className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs rounded transition-colors font-semibold">
                Submit Another Application
              </button>
            </div>
          )}

          {/* Availability schedule */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-lg font-display text-amber-300 font-bold">Live Availability Timetable</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded flex flex-col items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-slate-200">{day}</span>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">Morning</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">Evening</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings and Withdrawals Column */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/20 space-y-4">
            <h3 className="text-md font-display font-bold text-amber-400 flex items-center gap-1">
              <DollarSign size={16} /> Earnings Dashboard
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <p className="text-[9px] text-slate-400 uppercase">This Month</p>
                <p className="text-lg font-bold text-amber-300">₹45,210</p>
              </div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800">
                <p className="text-[9px] text-slate-400 uppercase">Available Bal</p>
                <p className="text-lg font-bold text-purple-400">₹4,850</p>
              </div>
            </div>

            {/* Withdrawal form */}
            <form onSubmit={handleWithdraw} className="space-y-3 pt-2">
              <div className="border-t border-slate-800/80 pt-3">
                <label className="block text-[9px] text-slate-400 uppercase mb-1">Withdraw Amount (INR)</label>
                <select
                  className="w-full text-xs px-2 py-1.5 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                  value={withdrawForm.amount}
                  onChange={e => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                >
                  <option value="500">₹500</option>
                  <option value="1000">₹1000</option>
                  <option value="2000">₹2000</option>
                  <option value="4000">₹4000</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1">Your UPI ID (Paytm/GPay/PhonePe)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. astroshastri@okaxis"
                  className="w-full text-xs px-2 py-1.5 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                  value={withdrawForm.upiId}
                  onChange={e => setWithdrawForm({ ...withdrawForm, upiId: e.target.value })}
                />
              </div>
              <button type="submit" className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded transition-colors uppercase tracking-wider">
                Request Withdrawal
              </button>
              {withdrawStatus && (
                <p className="text-[9px] text-emerald-400 text-center font-semibold bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                  {withdrawStatus}
                </p>
              )}
            </form>
          </div>

          {/* Current consultations */}
          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <h3 className="text-sm font-semibold text-amber-300">Your Consultations</h3>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {bookings.map((booking, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 border border-slate-800 rounded text-xs flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-200">User Call Session</p>
                    <p className="text-[9px] text-slate-500">{booking.date} | {booking.time}</p>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/15 text-purple-400 font-bold border border-purple-500/20">{booking.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AdminPanelProps {
  astrologers: Astrologer[];
  blogs: Blog[];
  bookings: Booking[];
  savedKundlis: any[];
  onAddBlog: (blogData: any) => Promise<void>;
  onVerifyAstrologer: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function AdminPanelComponent({
  astrologers,
  blogs,
  bookings,
  savedKundlis,
  onAddBlog,
  onVerifyAstrologer,
  onToggleStatus
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "astrologers" | "blog-cms" | "coupons">("overview");
  
  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: "",
    category: "Vedic Wisdom",
    author: "Pandit Suresh Dwivedi",
    content: ""
  });
  const [blogSuccess, setBlogSuccess] = useState("");

  // Coupon state
  const [coupons, setCoupons] = useState([
    { code: "SHIVA50", discount: "50% Off", type: "First Recharge" },
    { code: "GANESH100", discount: "₹100 Cashback", type: "UPI special" }
  ]);
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "20% Off", type: "Festival Special" });

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;
    await onAddBlog(blogForm);
    setBlogSuccess("Astrology Blog Post published and synchronized live!");
    setBlogForm({
      title: "",
      category: "Vedic Wisdom",
      author: "Pandit Suresh Dwivedi",
      content: ""
    });
    setTimeout(() => setBlogSuccess(""), 4000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;
    setCoupons([...coupons, { ...newCoupon, code: newCoupon.code.toUpperCase() }]);
    setNewCoupon({ code: "", discount: "20% Off", type: "Festival Special" });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-amber-400 flex items-center gap-2">
            <ShieldCheck className="text-amber-400" /> Admin Controller Dashboard
          </h2>
          <p className="text-xs text-slate-400">Total Analytics, Astrologer Audits, CMS, and System configuration</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          {(["overview", "astrologers", "blog-cms", "coupons"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded transition-all capitalize ${activeTab === tab ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-100"}`}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl glass-panel space-y-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total Kundlis</p>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold font-mono text-amber-300">{savedKundlis.length + 120}</p>
                <span className="text-[9px] text-emerald-400 font-bold">+18%</span>
              </div>
            </div>
            <div className="p-4 rounded-xl glass-panel space-y-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Consultations</p>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold font-mono text-purple-400">{bookings.length + 420}</p>
                <span className="text-[9px] text-emerald-400 font-bold">+35%</span>
              </div>
            </div>
            <div className="p-4 rounded-xl glass-panel space-y-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Active Astrologers</p>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold font-mono text-amber-300">{astrologers.length}</p>
                <span className="text-[10px] text-slate-400 font-bold">100% Ok</span>
              </div>
            </div>
            <div className="p-4 rounded-xl glass-panel space-y-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Total Revenue</p>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold font-mono text-emerald-400">₹1,84,500</p>
                <span className="text-[9px] text-emerald-400 font-bold">+42%</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Bookings log */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1">Recent Consultations</h3>
              <div className="space-y-3">
                {bookings.map((booking, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/80 border border-slate-800 rounded flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-200">Astro-Consultation booking</p>
                      <p className="text-[10px] text-slate-400">Astrologer: {booking.astrologerName}</p>
                      <p className="text-[9px] text-slate-500 font-mono">{booking.date} at {booking.time}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">₹{booking.rate * 30} paid</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action checklist */}
            <div className="p-5 rounded-2xl glass-panel space-y-4">
              <h3 className="text-sm font-bold text-amber-300">System Checklist</h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2 text-emerald-400">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">✓</span>
                  <span>Google Gemini-3.5-Flash integration connected</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">✓</span>
                  <span>Razorpay/Stripe checkout webhook setup complete</span>
                </li>
                <li className="flex items-center gap-2 text-emerald-400">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">✓</span>
                  <span>Twilio/Fast2SMS authentication service active</span>
                </li>
                <li className="flex items-center gap-2 text-amber-400">
                  <span className="w-4 h-4 rounded-full bg-amber-500/10 flex items-center justify-center text-[10px] font-bold">!</span>
                  <span>3 Pending Astrologer KYC audits in system queue</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. ASTROLOGER AUDITS */}
      {activeTab === "astrologers" && (
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold text-amber-300">Verify and Audit Astrologers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Specialty</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Per-Min Rate</th>
                  <th className="p-3">Audit Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {astrologers.map(astro => (
                  <tr key={astro.id} className="hover:bg-slate-950/40">
                    <td className="p-3 font-bold text-slate-100 flex items-center gap-2">
                      <img src={astro.avatar} alt="" className="w-6 h-6 rounded-full" />
                      {astro.name}
                    </td>
                    <td className="p-3">{astro.specialty}</td>
                    <td className="p-3">{astro.experience}</td>
                    <td className="p-3">₹{astro.rate}/min</td>
                    <td className="p-3">
                      {astro.verified ? (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Verified & Active</span>
                      ) : (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">Pending KYC Review</span>
                      )}
                    </td>
                    <td className="p-3 space-x-2">
                      {!astro.verified && (
                        <button
                          onClick={() => onVerifyAstrologer(astro.id)}
                          className="px-2 py-1 bg-emerald-500 text-slate-950 font-bold rounded text-[9px] hover:bg-emerald-600"
                        >
                          Approve KYC
                        </button>
                      )}
                      <button
                        onClick={() => onToggleStatus(astro.id)}
                        className={`px-2 py-1 rounded text-[9px] font-bold ${astro.status === "Online" ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}
                      >
                        {astro.status === "Online" ? "Set Busy" : "Set Online"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. BLOG CMS */}
      {activeTab === "blog-cms" && (
        <form onSubmit={handleBlogSubmit} className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-sm font-bold text-amber-300">Create & Publish Cosmic Article</h3>
          {blogSuccess && (
            <p className="p-3 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded border border-emerald-500/20 text-center">
              {blogSuccess}
            </p>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Blog Title</label>
              <input
                type="text"
                required
                className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                placeholder="e.g. Navamsa Chart Secrets"
                value={blogForm.title}
                onChange={e => setBlogForm({ ...blogForm, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Category</label>
              <select
                className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                value={blogForm.category}
                onChange={e => setBlogForm({ ...blogForm, category: e.target.value })}
              >
                <option value="Vedic Wisdom">Vedic Wisdom</option>
                <option value="Transits">Transits</option>
                <option value="Gemstones">Gemstones</option>
                <option value="Tarot Reading">Tarot Reading</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">Article Content</label>
            <textarea
              rows={8}
              required
              className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200 resize-none"
              placeholder="Write detailed astrological guidance..."
              value={blogForm.content}
              onChange={e => setBlogForm({ ...blogForm, content: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded transition-colors uppercase tracking-wider">
            Publish Post Live
          </button>
        </form>
      )}

      {/* 4. COUPON CODE MANAGEMENT */}
      {activeTab === "coupons" && (
        <div className="grid md:grid-cols-2 gap-6">
          <form onSubmit={handleCreateCoupon} className="p-5 rounded-2xl glass-panel space-y-4">
            <h3 className="text-sm font-bold text-amber-300">Generate Coupon Code</h3>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Coupon Code (Alphanumeric)</label>
              <input
                type="text"
                required
                className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                placeholder="e.g. SHIVA50"
                value={newCoupon.code}
                onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Discount Metric</label>
                <select
                  className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                  value={newCoupon.discount}
                  onChange={e => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                >
                  <option value="10% Off">10% Off</option>
                  <option value="20% Off">20% Off</option>
                  <option value="50% Off">50% Off</option>
                  <option value="₹100 Cashback">₹100 Cashback</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 uppercase mb-1">Coupon Purpose</label>
                <input
                  type="text"
                  required
                  className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                  value={newCoupon.type}
                  onChange={e => setNewCoupon({ ...newCoupon, type: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded transition-colors uppercase tracking-wider">
              Add New Coupon
            </button>
          </form>

          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <h3 className="text-sm font-bold text-amber-300">Active Campaign Coupons</h3>
            <div className="space-y-2">
              {coupons.map((coupon, index) => (
                <div key={index} className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
                  <div>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 font-mono text-xs font-bold rounded border border-amber-500/20">{coupon.code}</span>
                    <p className="text-[10px] text-slate-400 mt-1">{coupon.type}</p>
                  </div>
                  <span className="text-xs font-bold text-purple-400">{coupon.discount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
