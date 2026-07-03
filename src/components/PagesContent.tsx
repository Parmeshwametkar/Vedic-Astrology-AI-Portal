import React from "react";
import { HelpCircle, Star, Send, Phone, Mail, MapPin } from "lucide-react";

export function AboutUsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-amber-400 mb-2">Our Celestial Lineage</h2>
        <p className="text-sm text-slate-400">Merging Classical Sidereal Calculation with Advanced Modern Heuristics</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-xl font-display text-amber-300">The Varanasi Tradition</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our algorithms are co-designed with traditional scholars from Varanasi and Pune. By evaluating planetary strengths (Shadbala), house divisions (Vargas), and transits (Gochara) against the precise Sidereal zodiac, we provide authentic Jyotish guidance.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Unlike superficial sun-sign columnists, we honor the Moon sign (Rashi) and Nakshatra placements as instructed by Maharishi Parashara thousands of years ago.
          </p>
        </div>
        <div className="relative p-6 rounded-2xl border border-purple-500/20 bg-purple-950/20 text-center space-y-3">
          <div className="text-5xl">🌌</div>
          <h3 className="text-lg font-display text-purple-300 font-semibold">AI Meets Ancient Wisdom</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We use Google Gemini AI as a natural language cosmic interpreter. It translates mathematical alignments, Dasha sequences, and Astakoota Guna metrics into compassionate, actionable remedial summaries.
          </p>
          <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] text-amber-400 font-mono">
            100% Secure & Ad-free Astro-Engine
          </div>
        </div>
      </div>
    </div>
  );
}

export function SuccessStoriesPage() {
  const stories = [
    { name: "Rohit Deshmukh", role: "Software Architect, Pune", text: "The Gemstone recommendation suggested Yellow Sapphire for my weak Jupiter. Within three months of wearing it under the prescribed Thursday Muhurat, I was offered an incredible VP role in a leading global company. Absolutely miraculous!" },
    { name: "Anjali & Vikram", role: "Married in 2025, Bengaluru", text: "We were highly skeptical about our marriage alignment, but the Kundli Matching report gave us 28 Gunas with an honest remedy for anshik Manglik Dosha. Today we share a blissful, deeply harmonious marriage." },
    { name: "Dr. Sandeep Iyer", role: "Consultant Cardiologist, Mumbai", text: "The AI Career & Finance reports are shockingly precise. The Dasha transitions predicted a major relocation and financial growth phase which materialized exactly to the week. Astounding work!" }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-amber-400 mb-2">Divine Testimonials</h2>
        <p className="text-sm text-slate-400">Real Life transformations guided by authentic Vedic remedies</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel flex flex-col justify-between hover:border-amber-500/40 transition-all">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">"{story.text}"</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-xs font-bold text-amber-300">{story.name}</div>
              <div className="text-[10px] text-slate-500">{story.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Om Namah Shivaya! Your cosmic query has been received. Our senior acharyas will connect within 24 hours.");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-amber-400 mb-2">Connect With Us</h2>
        <p className="text-sm text-slate-400">Seekers are always welcome. Write to our Varanasi head office.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-panel space-y-6">
          <h3 className="text-xl font-display text-amber-300">Office Coordinates</h3>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="text-amber-400 shrink-0 mt-1" size={18} />
              <div>
                <p className="font-bold">Headquarters (Varanasi Office)</p>
                <p className="text-xs text-slate-400">Kedar Ghat Road, Near Kashi Vishwanath Mandir, Varanasi, Uttar Pradesh, 221001, India</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-amber-400" size={18} />
              <span>+91 542 2275432 / +91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-amber-400" size={18} />
              <span>support@vedicjyotish.ai</span>
            </div>
          </div>
          {/* Static Map Mockup */}
          <div className="h-[140px] rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="text-center z-10">
              <div className="text-xl">🗺️</div>
              <p className="text-xs text-amber-400 font-bold mt-1">Ganga River Kedar Ghat</p>
              <p className="text-[10px] text-slate-500">Latitude: 25.3015 | Longitude: 83.0083</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-xl font-display text-amber-300">Send Cosmic Query</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Your Name</label>
              <input type="text" required className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200" placeholder="e.g. Amit" />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Email ID</label>
              <input type="email" required className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200" placeholder="e.g. amit@gmail.com" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">Subject</label>
            <input type="text" required className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200" placeholder="e.g. Gemstone advice doubt" />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 uppercase mb-1">Your Message</label>
            <textarea rows={4} required className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200 resize-none" placeholder="Provide your birth details if any specific concern..."></textarea>
          </div>
          <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded transition-colors flex items-center justify-center gap-2">
            <Send size={14} /> Submit Query
          </button>
        </form>
      </div>
    </div>
  );
}

export function FAQPage() {
  const faqs = [
    { q: "What is Vedic Astrology (Jyotish)?", a: "Vedic Astrology is an ancient Indian system of stellar observation. Unlike Western tropical astrology which is aligned with seasons, Jyotish uses the Sidereal zodiac, calculating the actual current coordinates of planets relative to the constellations." },
    { q: "How does Guna Milan matching work?", a: "We evaluate 8 dimensional grids (Ashtakoota) between birth star profiles of both partners. A matching score of 18 is required for marriage, while 25-32 indicates excellent compatibility." },
    { q: "Are the gemstones recommended here authentic?", a: "Our recommendations are strictly based on classical Vedic texts, considering planetary strength (Shadbala). Always purchase natural unheated gemstones with reliable laboratory certificates." },
    { q: "How does the AI Astrology Consultation operate?", a: "Our system combines traditional mathematical alignments of houses and Dashas with the Google Gemini API. It acts as an elite certified Vedic Master, offering immediate, deeply empathetic personal remedies." }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-display font-bold text-amber-400 mb-2">Frequently Asked Questions</h2>
        <p className="text-sm text-slate-400">Clear your doubts regarding cosmic science</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel space-y-2">
            <h3 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
              <HelpCircle size={16} className="text-amber-400 shrink-0" />
              {faq.q}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="p-6 rounded-2xl glass-panel space-y-4 max-w-4xl mx-auto text-sm text-slate-300 leading-relaxed">
      <h2 className="text-2xl font-display font-bold text-amber-400 border-b border-slate-800 pb-2">Privacy & Security Commitment</h2>
      <p className="text-xs text-slate-400">Last updated: July 2026</p>
      <p>
        At Vedic Jyotish AI, we treat your birth data (Name, Date of Birth, Time of Birth, and Place of Birth) as deeply sacred. We never trade, rent, or sell your personal details.
      </p>
      <h3 className="text-md font-bold text-amber-300">1. Data Encryption</h3>
      <p>
        All inputs are processed over Secure Socket Layer (SSL) and stored securely. Birth charts transmitted to the AI framework are completely anonymized to protect your identity.
      </p>
      <h3 className="text-md font-bold text-amber-300">2. Cookies and Storage</h3>
      <p>
        We utilize local storage exclusively to preserve your active session, language settings, and local wallet transaction cache for a fast-loading, offline-resilient experience.
      </p>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="p-6 rounded-2xl glass-panel space-y-4 max-w-4xl mx-auto text-sm text-slate-300 leading-relaxed">
      <h2 className="text-2xl font-display font-bold text-amber-400 border-b border-slate-800 pb-2">Terms & Conditions of Cosmic Guidance</h2>
      <p className="text-xs text-slate-400">Last updated: July 2026</p>
      <p>
        Welcome to Vedic Jyotish AI. By utilizing our portal and AI-driven consultation endpoints, you agree to the following ethical guidelines:
      </p>
      <h3 className="text-md font-bold text-amber-300">1. Spiritual Guidance Disclaimer</h3>
      <p>
        Vedic astrology is a cosmic guide of tendencies and spiritual alignment. Calculations do not substitute for certified professional, medical, legal, or financial advice.
      </p>
      <h3 className="text-md font-bold text-amber-300">2. Wallet Refunding Policy</h3>
      <p>
        Recharges are credited immediately. Refunding is processed transparently if a designated astrologer is unable to attend a pre-scheduled live consultation.
      </p>
    </div>
  );
}
