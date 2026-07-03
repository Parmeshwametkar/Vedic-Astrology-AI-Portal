import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Calendar,
  Moon,
  Sun,
  Award,
  MessageSquare,
  Phone,
  Video,
  BookOpen,
  Heart,
  Compass,
  HelpCircle,
  FileText,
  Users,
  Settings,
  DollarSign,
  Wallet,
  Send,
  User,
  Globe,
  Download,
  Search,
  Menu,
  X,
  Bell,
  Plus,
  Trash2,
  Star,
  Check,
  AlertCircle
} from "lucide-react";

import { Astrologer, Blog, Booking, SavedKundli, Transaction, WalletState, PanchangInfo, ZodiacSign, TarotCard } from "./types";
import { zodiacSigns, tarotCards, festivalCalendar, muhurats, gemstones } from "./data";

// Helper components
import NorthIndianChart from "./components/NorthIndianChart";
import SouthIndianChart from "./components/SouthIndianChart";
import {
  AboutUsPage,
  SuccessStoriesPage,
  ContactPage,
  FAQPage,
  PrivacyPolicyPage,
  TermsPage
} from "./components/PagesContent";
import { AstrologerPanelComponent, AdminPanelComponent } from "./components/AstroAdminPanels";

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<string>("home");
  const [language, setLanguage] = useState<"English" | "हिन्दी" | "मराठी">("English");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // User authentication mock
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Parmeshwar Metkar",
    phone: "+91 9876543210",
    email: "parmeshwar@gmail.com",
    gender: "Male"
  });
  const [otpLoginMode, setOtpLoginMode] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Core API State
  const [astrologers, setAstrologers] = useState<Astrologer[]>([]);
  const [savedKundlis, setSavedKundlis] = useState<SavedKundli[]>([]);
  const [wallet, setWallet] = useState<WalletState>({ balance: 550, transactions: [] });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Feature specific states
  // 1. Daily Horoscope
  const [horoscopeSign, setHoroscopeSign] = useState("Aries");
  const [horoscopeReport, setHoroscopeReport] = useState<string>("");

  // 2. Free Kundli Generator
  const [kundliForm, setKundliForm] = useState({
    name: "Parmeshwar Metkar",
    dob: "1995-08-15",
    tob: "14:30",
    pob: "Mumbai, Maharashtra, India",
    gender: "Male",
    chartType: "North" as "North" | "South"
  });
  const [activeKundli, setActiveKundli] = useState<any>(null);

  // 3. Kundli Matching
  const [matchingForm, setMatchingForm] = useState({
    maleName: "Rahul Sharma",
    maleDob: "1994-05-12",
    maleTob: "07:15",
    malePob: "New Delhi, India",
    femaleName: "Priya Patel",
    femaleDob: "1996-09-18",
    femaleTob: "18:45",
    femalePob: "Ahmedabad, India"
  });
  const [matchingReport, setMatchingReport] = useState<any>(null);

  // 4. AI Astrologer Chat
  const [chatMessages, setChatMessages] = useState<any[]>([
    { role: "assistant", content: "Hari Om seeker! I am Aacharya Shastri. Share your birth details or ask any cosmic query about career, love, health, or Sade Sati.", timestamp: new Date().toISOString() }
  ]);
  const [chatInput, setChatInput] = useState("");

  // 5. Tarot Reading
  const [tarotQuery, setTarotQuery] = useState("");
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [tarotReport, setTarotReport] = useState<string>("");
  const [tarotFlipped, setTarotFlipped] = useState<{ [key: string]: boolean }>({});

  // 6. Numerology
  const [numerologyForm, setNumerologyForm] = useState({
    name: "Parmeshwar Metkar",
    dob: "1995-08-15"
  });
  const [numerologyReport, setNumerologyReport] = useState<any>(null);

  // 7. Panchang
  const [panchangDate, setPanchangDate] = useState(new Date().toISOString().split("T")[0]);
  const [panchangInfo, setPanchangInfo] = useState<PanchangInfo | null>(null);

  // 8. Active Astrologer Consultation Simulator
  const [activeConsultation, setActiveConsultation] = useState<any>(null);
  const [consultationInput, setConsultationInput] = useState("");
  const [consultationChat, setConsultationChat] = useState<any[]>([]);

  // 9. Wallet / Recharge
  const [rechargeAmount, setRechargeAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Astrologer Panel registration status
  const [astrologerStatusMsg, setAstrologerStatusMsg] = useState("");

  // Role management (User, Astrologer, Admin Panels)
  const [currentRole, setCurrentRole] = useState<"user" | "astrologer" | "admin">("user");

  // Notifications
  const [notifications, setNotifications] = useState<string[]>([
    "Welcome! ₹550 welcome balance credited to your Astro-wallet.",
    "Auspicious Abhijit Muhurat started. Perfect time to generate free Kundli."
  ]);

  // Load Initial Server Data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [resAstros, resKundlis, resWallet, resBookings, resBlogs] = await Promise.all([
        fetch("/api/astrologers").then(r => r.json()),
        fetch("/api/kundlis").then(r => r.json()),
        fetch("/api/wallet").then(r => r.json()),
        fetch("/api/bookings").then(r => r.json()),
        fetch("/api/blogs").then(r => r.json())
      ]);

      setAstrologers(resAstros);
      setSavedKundlis(resKundlis);
      setWallet(resWallet);
      setBookings(resBookings);
      setBlogs(resBlogs);
    } catch (err) {
      console.error("Error fetching initial server state", err);
    }
  };

  // 1. Get Daily Horoscope
  const handleGetHoroscope = async (signName: string) => {
    setLoading(true);
    setHoroscopeSign(signName);
    try {
      const res = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign: signName, date: "today", language })
      });
      const data = await res.json();
      setHoroscopeReport(data.prediction);
      setActivePage("daily-horoscope");
    } catch (err) {
      console.error("Horoscope load failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Generate Kundli
  const handleGenerateKundli = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: kundliForm.name,
          dob: kundliForm.dob,
          tob: kundliForm.tob,
          pob: kundliForm.pob,
          gender: kundliForm.gender,
          chartType: kundliForm.chartType
        })
      });
      const data = await res.json();
      setActiveKundli(data);
      // Refresh saved list
      const resList = await fetch("/api/kundlis");
      setSavedKundlis(await resList.json());
    } catch (err) {
      console.error("Kundli generator error", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Saved Kundli
  const handleDeleteKundli = async (id: string) => {
    if (!confirm("Remove this Kundli profile?")) return;
    try {
      await fetch(`/api/kundlis/${id}`, { method: "DELETE" });
      setSavedKundlis(savedKundlis.filter(k => k.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Kundli Matching
  const handleKundliMatching = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/matching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          male: { name: matchingForm.maleName, dob: matchingForm.maleDob, tob: matchingForm.maleTob, pob: matchingForm.malePob },
          female: { name: matchingForm.femaleName, dob: matchingForm.femaleDob, tob: matchingForm.femaleTob, pob: matchingForm.femalePob }
        })
      });
      const data = await res.json();
      setMatchingReport(data);
    } catch (err) {
      console.error("Matching compilation failed", err);
    } finally {
      setLoading(false);
    }
  };

  // 4. AI Chat Consultation
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: "user", content: chatInput, timestamp: new Date().toISOString() };
    const updatedMsgs = [...chatMessages, userMsg];
    setChatMessages(updatedMsgs);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMsgs,
          birthDetails: activeKundli ? { name: activeKundli.name, dob: activeKundli.dob, tob: activeKundli.tob, pob: activeKundli.pob } : null
        })
      });
      const data = await res.json();
      setChatMessages([...updatedMsgs, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 5. Tarot Pull Selection
  const handleDrawTarotCard = (card: TarotCard) => {
    if (drawnCards.find(c => c.id === card.id)) return; // Already drawn
    if (drawnCards.length >= 3) return; // Max 3 cards

    setDrawnCards([...drawnCards, card]);
    setTarotFlipped({ ...tarotFlipped, [card.id]: true });
  };

  const handleInterpretTarot = async () => {
    if (drawnCards.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards: drawnCards, query: tarotQuery })
      });
      const data = await res.json();
      setTarotReport(data.reading);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetTarot = () => {
    setDrawnCards([]);
    setTarotReport("");
    setTarotFlipped({});
    setTarotQuery("");
  };

  // 6. Numerology
  const handleGetNumerology = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/numerology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numerologyForm)
      });
      const data = await res.json();
      setNumerologyReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 7. Get Panchang for Selected Date
  const handleGetPanchang = async (dateStr: string) => {
    setPanchangDate(dateStr);
    try {
      const res = await fetch("/api/panchang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr })
      });
      const data = await res.json();
      setPanchangInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-fetch Panchang on load
  useEffect(() => {
    handleGetPanchang(panchangDate);
  }, []);

  // 8. Talk to Astrologer & Video Consultation Simulation
  const handleInitiateConsultation = async (astro: Astrologer, type: "Chat" | "Video") => {
    if (wallet.balance < astro.rate) {
      alert(`Your Astro-wallet balance (₹${wallet.balance}) is too low for ₹${astro.rate}/min consultation rate. Please top up your wallet.`);
      setActivePage("pricing");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          astroName: astro.name,
          type,
          rate: astro.rate
        })
      });
      const data = await res.json();

      if (data.success) {
        setWallet({ ...wallet, balance: data.balance, transactions: [data.transaction, ...wallet.transactions] });
        setBookings([data.booking, ...bookings]);
        
        // Open simulated live consultation room
        setActiveConsultation({ ...astro, consultType: type, bookingId: data.booking.id });
        setConsultationChat([
          { role: "astrologer", content: `Hari Om! Namaskar. I am ${astro.name}. I am looking over your Vedic birth chart alignment right now. Please type your query.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]);
        setActivePage("consultation-room");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendConsultationMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationInput.trim()) return;

    const userMsg = { role: "user", content: consultationInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedChat = [...consultationChat, userMsg];
    setConsultationChat(updatedChat);
    setConsultationInput("");

    // Trigger realistic simulated Vedic reply in 2 seconds
    setTimeout(() => {
      const replies = [
        "Your planetary configurations are quite strong in the 10th house of career. Rahu's transit may create a short confusion, but Jupiter will steady everything. Seek green leaves.",
        "Your Moon sign is under a constructive phase. Wearing an Emerald on Wednesday will significantly boost your communication and clarity.",
        "I am looking at your Dasha. The current Sun MahaDasha will bring administrative opportunities. Perform daily Surya Arghya.",
        "For your relationship query, the 7th house lord is conjunct with Mercury. Communication is the absolute key here. Chanting Om Namah Shivaya daily will help clear any mutual blocks."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setConsultationChat(prev => [...prev, { role: "astrologer", content: randomReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  // 9. Wallet Recharge Simulator
  const handleRechargeWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/wallet/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: rechargeAmount, method: paymentMethod })
      });
      const data = await res.json();
      if (data.success) {
        setWallet({ balance: data.balance, transactions: [data.transaction, ...wallet.transactions] });
        setShowPaymentModal(false);
        setNotifications([`₹${rechargeAmount} added successfully via ${paymentMethod}!`, ...notifications]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 10. SMS OTP Authentication Simulation
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone) return;
    setOtpSent(true);
    setNotifications([`SMS containing secret OTP code sent to ${loginPhone}`, ...notifications]);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginOtp === "1234" || loginOtp === "7777" || loginOtp.length > 2) {
      setUserLoggedIn(true);
      setCurrentUser({
        name: "Dev Seeker",
        phone: loginPhone,
        email: "seeker@vedicastrology.in",
        gender: "Male"
      });
      setOtpLoginMode(false);
      setOtpSent(false);
      setNotifications(["Logged in successfully using OTP!", ...notifications]);
    } else {
      alert("Invalid verification code. Enter 1234 or any code to test.");
    }
  };

  // Astrologer Panels Operations (via callback to component)
  const handleApplyAstrologer = async (applyForm: any) => {
    try {
      const res = await fetch("/api/astrologers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applyForm)
      });
      const data = await res.json();
      setAstrologers([...astrologers, data.applicant]);
    } catch (err) {
      console.error(err);
    }
  };

  // Admin Panels Operations
  const handleAddBlog = async (blogData: any) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData)
      });
      const newPost = await res.json();
      setBlogs([newPost, ...blogs]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyAstrologer = (id: string) => {
    setAstrologers(astrologers.map(a => a.id === id ? { ...a, verified: true } : a));
  };

  const handleToggleStatus = (id: string) => {
    setAstrologers(astrologers.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === "Online" ? "Busy" : "Online" };
      }
      return a;
    }));
  };

  // Trigger Print Report for PDF download
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] stars-bg relative flex flex-col selection:bg-amber-500 selection:text-slate-900">
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <header className="sticky top-0 z-50 glass-panel border-b border-amber-500/20 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-amber-400 hover:text-amber-300"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Cosmic Logo */}
          <div
            onClick={() => { setActivePage("home"); setCurrentRole("user"); }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center glow-gold group-hover:scale-105 transition-transform">
              <span className="text-lg animate-spin-slow text-slate-950 font-bold">🔱</span>
            </div>
            <div>
              <h1 className="text-sm md:text-lg font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-purple-400 tracking-wider">
                Vedic Jyotish AI
              </h1>
              <p className="text-[8px] text-slate-400 tracking-widest uppercase hidden md:block">Varanasi lineage</p>
            </div>
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Role Switching Badge */}
          <div className="hidden lg:flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            {(["user", "astrologer", "admin"] as const).map(role => (
              <button
                key={role}
                onClick={() => {
                  setCurrentRole(role);
                  if (role === "astrologer") setActivePage("astrologer-panel");
                  else if (role === "admin") setActivePage("admin-panel");
                  else setActivePage("home");
                }}
                className={`px-2.5 py-0.5 text-[10px] rounded transition-all capitalize font-bold ${currentRole === role ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"}`}
              >
                {role === "user" ? "Seeker Mode" : role === "astrologer" ? "Astro Panel" : "Admin Panel"}
              </button>
            ))}
          </div>

          {/* Language selector */}
          <div className="flex items-center bg-slate-950/80 px-2 py-1 rounded border border-slate-800 gap-1 text-[10px]">
            <Globe size={11} className="text-slate-400" />
            {(["English", "हिन्दी", "मराठी"] as const).map(ln => (
              <button
                key={ln}
                onClick={() => setLanguage(ln)}
                className={`px-1 rounded font-semibold transition-colors ${language === ln ? "text-amber-400 bg-amber-500/10" : "text-slate-400 hover:text-slate-200"}`}
              >
                {ln === "English" ? "EN" : ln === "हिन्दी" ? "हिं" : "मरा"}
              </button>
            ))}
          </div>

          {/* Wallet Balance widget */}
          <div
            onClick={() => setActivePage("pricing")}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 text-amber-400 cursor-pointer hover:border-amber-500/40 transition-colors"
          >
            <Wallet size={14} />
            <span className="text-xs font-mono font-bold">₹{wallet.balance}</span>
            <Plus size={11} className="bg-amber-500 text-slate-950 rounded-full" />
          </div>

          {/* SMS / Google Mock Authentication Button */}
          {userLoggedIn ? (
            <div className="flex items-center gap-1 text-slate-300">
              <User size={14} className="text-amber-400" />
              <span className="text-xs hidden md:inline truncate max-w-[100px]">{currentUser.name}</span>
            </div>
          ) : (
            <button
              onClick={() => setOtpLoginMode(true)}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* 2. DUAL-COLUMN BODY LAYOUT */}
      <div className="flex-1 flex relative">
        
        {/* SIDE BAR NAVIGATION DRAWER */}
        <aside className={`w-[240px] shrink-0 border-r border-slate-800/80 bg-slate-950/90 z-40 flex flex-col justify-between p-3 absolute md:relative top-0 bottom-0 left-0 transition-transform md:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="space-y-6">
            
            {/* Quick search sign */}
            <div className="space-y-1">
              <label className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Select Zodiac Sign</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 text-slate-500" size={13} />
                <select
                  onChange={(e) => handleGetHoroscope(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 bg-slate-900 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                  defaultValue="Aries"
                >
                  {zodiacSigns.map(z => (
                    <option key={z.name} value={z.name}>{z.name} ({z.sanskritName})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Core Cosmic Pages list */}
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold px-2 mb-1">Divine Portal</p>
              
              <button
                onClick={() => { setActivePage("home"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "home" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>🌀</span> Home Grid
              </button>

              <button
                onClick={() => { setActivePage("daily-horoscope"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "daily-horoscope" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>♈</span> Daily Horoscope
              </button>

              <button
                onClick={() => { setActivePage("kundli-generator"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "kundli-generator" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>🗺️</span> Free Kundli Generator
              </button>

              <button
                onClick={() => { setActivePage("kundli-matching"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "kundli-matching" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>💑</span> Kundli Matching
              </button>

              <button
                onClick={() => { setActivePage("ai-astrology-chat"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "ai-astrology-chat" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>🤖</span> AI Astrology Chat
              </button>

              <button
                onClick={() => { setActivePage("talk-to-astrologer"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "talk-to-astrologer" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>🗣️</span> Talk to Astrologer
              </button>

              <button
                onClick={() => { setActivePage("tarot-reading"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "tarot-reading" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>🃏</span> Tarot Reading
              </button>

              <button
                onClick={() => { setActivePage("numerology"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "numerology" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>🔢</span> Numerology
              </button>

              <button
                onClick={() => { setActivePage("panchang"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "panchang" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>📅</span> Panchang & Muhurat
              </button>

              <button
                onClick={() => { setActivePage("gemstone-recommendation"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "gemstone-recommendation" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>💎</span> Gemstones Advice
              </button>

              <button
                onClick={() => { setActivePage("astrology-blog"); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded text-xs flex items-center gap-2 ${activePage === "astrology-blog" ? "bg-amber-500/10 text-amber-400 font-bold border-l-2 border-amber-500" : "text-slate-300 hover:bg-slate-900"}`}
              >
                <span>📝</span> Astrology Blogs
              </button>
            </div>

            {/* Informational list */}
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold px-2 mb-1">Company & Details</p>

              <button onClick={() => { setActivePage("about-us"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-1 text-xs text-slate-400 hover:text-slate-100 block">About Us</button>
              <button onClick={() => { setActivePage("success-stories"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-1 text-xs text-slate-400 hover:text-slate-100 block">Success Stories</button>
              <button onClick={() => { setActivePage("pricing"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-1 text-xs text-slate-400 hover:text-slate-100 block">Pricing & Wallet</button>
              <button onClick={() => { setActivePage("contact"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-1 text-xs text-slate-400 hover:text-slate-100 block">Contact Us</button>
              <button onClick={() => { setActivePage("faq"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-1 text-xs text-slate-400 hover:text-slate-100 block">FAQ</button>
              <button onClick={() => { setActivePage("privacy-policy"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-1 text-xs text-slate-400 hover:text-slate-100 block">Privacy Policy</button>
              <button onClick={() => { setActivePage("terms"); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-1 text-xs text-slate-400 hover:text-slate-100 block">Terms & Conditions</button>
            </div>
          </div>

          {/* Quick role toggler for Mobile */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex flex-col gap-1 text-[10px]">
              <p className="text-[8px] text-slate-500 uppercase font-semibold">Switch Console</p>
              <button onClick={() => { setCurrentRole("user"); setActivePage("home"); }} className={`text-left px-2 py-1 rounded ${currentRole === "user" ? "text-amber-400 font-bold bg-amber-500/10" : "text-slate-400"}`}>Seeker Panel</button>
              <button onClick={() => { setCurrentRole("astrologer"); setActivePage("astrologer-panel"); }} className={`text-left px-2 py-1 rounded ${currentRole === "astrologer" ? "text-purple-400 font-bold bg-purple-500/10" : "text-slate-400"}`}>Astrologer Panel</button>
              <button onClick={() => { setCurrentRole("admin"); setActivePage("admin-panel"); }} className={`text-left px-2 py-1 rounded ${currentRole === "admin" ? "text-amber-400 font-bold bg-slate-800" : "text-slate-400"}`}>Admin Panel</button>
            </div>
          </div>
        </aside>

        {/* MAIN BODY SCROLLABLE VIEW CONTAINER */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 pb-20">
          
          {/* Notifications ticker */}
          {notifications.length > 0 && (
            <div className="bg-slate-900 border border-amber-500/20 px-4 py-2 rounded-xl text-xs text-amber-300 flex items-center justify-between shadow-lg max-w-4xl mx-auto">
              <span className="truncate flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400 animate-pulse shrink-0" />
                {notifications[0]}
              </span>
              <button onClick={() => setNotifications(notifications.slice(1))} className="text-slate-500 hover:text-amber-400 text-[10px] font-bold uppercase shrink-0 ml-2">Dismiss</button>
            </div>
          )}

          {/* Loading Mask overlay */}
          {loading && (
            <div className="fixed inset-0 bg-slate-950/80 z-50 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 border-t-amber-500 border-r-amber-500 animate-spin flex items-center justify-center">
                <span className="text-2xl">🕉️</span>
              </div>
              <p className="text-amber-400 font-display text-sm tracking-widest uppercase">Calculating cosmic alignments...</p>
            </div>
          )}

          {/* ================= PAGE 1: HOME PAGE ================= */}
          {activePage === "home" && (
            <div className="space-y-12">
              
              {/* Hero Banner Section */}
              <section className="relative overflow-hidden rounded-3xl glass-panel p-6 md:p-12 border-2 border-amber-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
                <div className="space-y-6 max-w-xl text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    ✨ India's Preeminent Vedic Astro AI
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                    Reveal Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-purple-400">Cosmic Destiny</span> Today
                  </h2>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    Access genuine, non-tropical calculations rooted in classic Varanasi traditions. Connect with premium certified astrologers or harness our real-time Gemini AI for complete, uncompromised divine clarity.
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActivePage("kundli-generator")}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider font-display glow-gold"
                    >
                      Generate Free Kundli
                    </button>
                    <button
                      onClick={() => setActivePage("talk-to-astrologer")}
                      className="px-6 py-3 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 font-bold rounded-xl transition-all text-sm uppercase tracking-wider font-display"
                    >
                      Talk to Astrologer (₹15/min)
                    </button>
                  </div>
                </div>

                {/* Rotating Cosmic Zodiac Emblem */}
                <div className="relative shrink-0 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-600/20 rounded-full blur-2xl animate-float"></div>
                  {/* Outer ring */}
                  <div className="absolute w-full h-full border-2 border-dashed border-amber-500/40 rounded-full animate-spin-slow"></div>
                  {/* Kundli emblem layout */}
                  <div className="w-[85%] h-[85%] rounded-full border border-amber-500/30 flex items-center justify-center p-4 bg-slate-950/80 shadow-inner">
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl animate-float">☀️</div>
                      <p className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mt-3 font-bold">Kala Purusha</p>
                      <p className="text-[8px] text-slate-500 mt-1 uppercase font-semibold">12 Rashis Active</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Horoscope Signs Selector & Search */}
              <section className="space-y-6 max-w-6xl mx-auto">
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold text-amber-400">Search Your Daily Horoscope</h3>
                  <p className="text-xs text-slate-400">Click your Sidereal moon sign to access daily Jyotish advice</p>
                </div>
                
                {/* 12 Signs Grid */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {zodiacSigns.map(z => (
                    <div
                      key={z.name}
                      onClick={() => handleGetHoroscope(z.name)}
                      className="p-4 rounded-2xl glass-panel border border-slate-800/80 hover:border-amber-500/40 cursor-pointer text-center group transition-all hover:-translate-y-1"
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform">{z.symbol}</div>
                      <h4 className="text-xs font-bold text-slate-200 mt-2 font-display">{z.name}</h4>
                      <p className="text-[9px] text-amber-400/80 font-semibold">{z.sanskritName}</p>
                      <span className="inline-block mt-2 text-[8px] px-2 py-0.5 rounded bg-slate-950 text-slate-500 uppercase">{z.element}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dynamic AI Astrology Features Showcase */}
              <section className="p-8 rounded-3xl glass-panel border border-purple-500/10 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">💼</div>
                  <h4 className="text-base font-bold font-display text-amber-300">AI Career Predictions</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Let Gemini analyze your 10th house (Karma Bhava) and Saturn placements to suggest peak growth periods, business transitions, and remedies.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">❤️</div>
                  <h4 className="text-base font-bold font-display text-purple-300">AI Marriage Predictions</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Check your Navamsa chart alignment and 7th house aspects dynamically. Identify any potential Manglik blocks and access clean traditional remedies.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">💰</div>
                  <h4 className="text-base font-bold font-display text-emerald-300">AI Finance Insights</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Access deep reviews of Dhana Yogas in your Kundli. Get clear instructions on satisfying business ventures and auspicious investments.
                  </p>
                </div>
              </section>

              {/* Top Verified Astrologers List */}
              <section className="space-y-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <h3 className="text-2xl font-display font-bold text-amber-400">Talk to Certified Astrologers</h3>
                    <p className="text-xs text-slate-400">Instantly connect via Chat, Voice, or Video call consultation</p>
                  </div>
                  <button onClick={() => setActivePage("talk-to-astrologer")} className="text-xs text-amber-400 hover:underline">View All Astrologers →</button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {astrologers.slice(0, 3).map(astro => (
                    <div key={astro.id} className="p-5 rounded-2xl glass-panel space-y-4 border border-amber-500/10 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={astro.avatar} alt={astro.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/30" />
                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${astro.status === "Online" ? "bg-emerald-500" : "bg-amber-500"}`} />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                              {astro.name} {astro.verified && <Check size={14} className="bg-amber-500 text-slate-950 rounded-full p-0.5" />}
                            </h4>
                            <p className="text-[10px] text-amber-400">{astro.specialty}</p>
                            <p className="text-[9px] text-slate-500">{astro.experience} experience</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">"{astro.bio}"</p>
                        <div className="flex flex-wrap gap-1 text-[9px] text-slate-400">
                          {astro.languages.map(l => (
                            <span key={l} className="px-1.5 py-0.5 rounded bg-slate-950 font-semibold">{l}</span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-slate-500">Rate</p>
                          <p className="text-xs font-bold text-amber-400">₹{astro.rate}/min</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleInitiateConsultation(astro, "Chat")}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <MessageSquare size={12} /> Chat
                          </button>
                          <button
                            onClick={() => handleInitiateConsultation(astro, "Video")}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Video size={12} /> Video
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Latest Astrology Blogs */}
              <section className="space-y-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-display font-bold text-amber-400">Vedic Astrology Wisdom</h3>
                  <button onClick={() => setActivePage("astrology-blog")} className="text-xs text-amber-400 hover:underline">Read All Articles →</button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {blogs.slice(0, 2).map(blog => (
                    <div key={blog.id} className="p-6 rounded-2xl glass-panel space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase">{blog.category}</span>
                        <h4 className="text-base font-bold font-display text-slate-100">{blog.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{blog.content}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-500">
                        <span>By {blog.author}</span>
                        <span>{blog.date} | {blog.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Customer Reviews Section */}
              <section className="py-6 max-w-6xl mx-auto">
                <SuccessStoriesPage />
              </section>

              {/* Mobile App Download Interactive Promo Banner */}
              <section className="p-8 rounded-3xl bg-gradient-to-tr from-purple-900/30 to-slate-900 border border-purple-500/20 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 text-left max-w-md">
                  <h3 className="text-2xl font-display font-bold text-amber-400">Carry the Cosmos in Your Pocket</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Download the **Vedic Jyotish AI** smartphone app to access automatic birth reports, daily Panchang updates, instant astrologer dial-ins, and secure custom widgets on your phone.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded bg-slate-950 text-xs font-bold border border-slate-800 cursor-pointer hover:border-amber-500/40 text-slate-300"> App Store</span>
                    <span className="px-3 py-1.5 rounded bg-slate-950 text-xs font-bold border border-slate-800 cursor-pointer hover:border-amber-500/40 text-slate-300">🤖 Google Play</span>
                  </div>
                </div>
                {/* Mobile Mockup representation */}
                <div className="w-[180px] h-[300px] border-4 border-slate-800 bg-slate-950 rounded-3xl relative overflow-hidden flex flex-col justify-between p-3 shrink-0 shadow-2xl">
                  <div className="w-12 h-4 bg-slate-800 rounded-full mx-auto" />
                  <div className="space-y-2 mt-4 text-center">
                    <span className="text-3xl">🔮</span>
                    <p className="text-[10px] font-bold text-amber-400">Kundli Engine Live</p>
                    <div className="w-12 h-1 bg-amber-500 rounded mx-auto" />
                  </div>
                  <div className="p-2 rounded bg-slate-900 text-[8px] text-slate-400 text-center">
                    ₹550 Wallet Active
                  </div>
                </div>
              </section>

              {/* Newsletter section */}
              <section className="p-6 rounded-2xl glass-panel text-center max-w-2xl mx-auto space-y-4">
                <h3 className="text-lg font-display text-amber-300 font-bold">Divine Weekly Guidance Newsletter</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">Get major transit insights (Guru Gochara, Shani Sade Sati updates) directly to your inbox weekly.</p>
                <form onSubmit={e => { e.preventDefault(); alert("Hari Om! You have subscribed successfully to weekly cosmic guides."); }} className="flex max-w-md mx-auto gap-2">
                  <input type="email" placeholder="Your Email Address" required className="flex-1 text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none" />
                  <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded text-xs uppercase tracking-wider">Subscribe</button>
                </form>
              </section>

              {/* Premium footer */}
              <footer className="border-t border-slate-800/80 pt-8 text-center text-xs text-slate-500 space-y-4">
                <p>© 2026 Vedic Jyotish AI Portal. Developed according to classical Parashara calculations. All spiritual guidelines reserved.</p>
                <div className="flex justify-center gap-4 text-[10px]">
                  <span className="cursor-pointer hover:text-amber-400" onClick={() => setActivePage("privacy-policy")}>Privacy Policy</span>
                  <span className="cursor-pointer hover:text-amber-400" onClick={() => setActivePage("terms")}>Terms & Conditions</span>
                  <span className="cursor-pointer hover:text-amber-400" onClick={() => setActivePage("about-us")}>Lineage & Tradition</span>
                </div>
              </footer>

            </div>
          )}

          {/* ================= PAGE 2: ABOUT US ================= */}
          {activePage === "about-us" && <AboutUsPage />}

          {/* ================= PAGE 3: DAILY HOROSCOPE prediction ================= */}
          {activePage === "daily-horoscope" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">{horoscopeSign} Daily Horoscope</h2>
                <p className="text-xs text-slate-400 font-mono tracking-wider mt-1">Language: {language} | Sidereal Coordinate Forecast</p>
              </div>

              {/* Signs picker inside page for quick switching */}
              <div className="flex flex-wrap gap-1 bg-slate-950 p-2 rounded-xl border border-slate-800 justify-center">
                {zodiacSigns.map(z => (
                  <button
                    key={z.name}
                    onClick={() => handleGetHoroscope(z.name)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${horoscopeSign === z.name ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {z.name}
                  </button>
                ))}
              </div>

              {horoscopeReport ? (
                <div className="p-6 md:p-8 rounded-2xl glass-panel space-y-6 border border-amber-500/30 relative">
                  <div className="absolute top-4 right-4 text-4xl opacity-10">🕉️</div>
                  
                  {/* Dynamic report content formatted with Markdown headings */}
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {horoscopeReport}
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">Perform recommended daily remedies for maximum shielding.</p>
                    <button
                      onClick={handlePrint}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded flex items-center gap-1"
                    >
                      <Download size={12} /> Download Prediction
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl glass-panel text-slate-400 space-y-4">
                  <div className="text-5xl">♈</div>
                  <p>Select your moon sign or click 'Get Divine Forecast' to analyze planetary configurations dynamically.</p>
                  <button
                    onClick={() => handleGetHoroscope(horoscopeSign)}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl uppercase tracking-wider"
                  >
                    Get Divine Forecast
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ================= PAGE 4: FREE KUNDLI GENERATOR ================= */}
          {activePage === "kundli-generator" && (
            <div className="max-w-5xl mx-auto space-y-8">
              
              <div className="grid md:grid-cols-5 gap-8 items-start">
                
                {/* Inputs column */}
                <form onSubmit={handleGenerateKundli} className="md:col-span-2 p-6 rounded-2xl glass-panel space-y-4 border border-amber-500/10">
                  <h3 className="text-xl font-display text-amber-300 font-bold border-b border-slate-800 pb-2">Birth Details Input</h3>
                  
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">Seeker's Name</label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200 font-semibold"
                      value={kundliForm.name}
                      onChange={e => setKundliForm({ ...kundliForm, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Date of Birth</label>
                      <input
                        type="date"
                        required
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                        value={kundliForm.dob}
                        onChange={e => setKundliForm({ ...kundliForm, dob: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Time of Birth</label>
                      <input
                        type="time"
                        required
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                        value={kundliForm.tob}
                        onChange={e => setKundliForm({ ...kundliForm, tob: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">Place of Birth (Town/State/Country)</label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                      value={kundliForm.pob}
                      onChange={e => setKundliForm({ ...kundliForm, pob: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Gender</label>
                      <select
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                        value={kundliForm.gender}
                        onChange={e => setKundliForm({ ...kundliForm, gender: e.target.value })}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Chart Layout</label>
                      <select
                        className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                        value={kundliForm.chartType}
                        onChange={e => setKundliForm({ ...kundliForm, chartType: e.target.value as "North" | "South" })}
                      >
                        <option value="North">North Indian (Lagna)</option>
                        <option value="South">South Indian (Rashi)</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition-colors uppercase tracking-widest font-display">
                    Generate Divine Chart
                  </button>
                </form>

                {/* Report layout */}
                <div className="md:col-span-3 space-y-6">
                  {activeKundli ? (
                    <div className="space-y-6">
                      
                      {/* Flex layout for chart drawing and meta info */}
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        
                        {/* Dynamic SVG chart drawing */}
                        {kundliForm.chartType === "North" ? (
                          <NorthIndianChart houses={activeKundli.chartData.houses} />
                        ) : (
                          <SouthIndianChart houses={activeKundli.chartData.houses} />
                        )}

                        {/* Birth Summary cards */}
                        <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs space-y-3">
                          <h4 className="text-amber-300 font-bold font-display uppercase tracking-wider">Birth Alignments</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-slate-500">Moon Sign (Rashi)</p>
                              <p className="font-bold text-slate-200">{activeKundli.rashi}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Birth Nakshatra</p>
                              <p className="font-bold text-slate-200">{activeKundli.nakshatra}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Ascendant (Lagna)</p>
                              <p className="font-bold text-slate-200">{activeKundli.lagna}</p>
                            </div>
                            <div>
                              <p className="text-slate-500">Vedic Dasha Mode</p>
                              <p className="font-bold text-slate-200">Jupiter MahaDasha</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-800">
                            <button
                              onClick={handlePrint}
                              className="w-full py-1.5 bg-amber-500 text-slate-950 font-bold rounded text-[10px] flex items-center justify-center gap-1"
                            >
                              <Download size={11} /> Download PDF Report
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Gemini report */}
                      <div className="p-6 rounded-2xl glass-panel space-y-4 border border-amber-500/20 text-left">
                        <h4 className="text-lg font-display text-amber-300 font-semibold flex items-center gap-1">
                          <Sparkles size={16} /> Parashari Astro-Report Summary
                        </h4>
                        <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                          {activeKundli.report}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-2xl border border-slate-800/80 bg-slate-950/40 text-slate-400 space-y-4">
                      <div className="text-5xl">🗺️</div>
                      <h4 className="text-lg font-display text-amber-400 font-semibold">Your Birth Chart is Waiting</h4>
                      <p className="text-xs max-w-md mx-auto">
                        Provide your name, date, precise time, and coordinates of birth to create an authentic Vedic Kundli.
                      </p>
                    </div>
                  )}

                  {/* Saved Profiles section */}
                  {savedKundlis.length > 0 && (
                    <div className="p-5 rounded-2xl glass-panel space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Saved Family Kundlis</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {savedKundlis.map(k => (
                          <div key={k.id} className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-slate-200">{k.name}</p>
                              <p className="text-[10px] text-slate-500">{k.dob} | {k.tob} | {k.pob}</p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setKundliForm({
                                    name: k.name,
                                    dob: k.dob,
                                    tob: k.tob,
                                    pob: k.pob,
                                    gender: k.gender,
                                    chartType: "North"
                                  });
                                }}
                                className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded text-[9px] font-bold"
                              >
                                Load
                              </button>
                              <button onClick={() => handleDeleteKundli(k.id)} className="p-1 text-slate-500 hover:text-red-400">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 5: KUNDLI MATCHING (Ashtakoota Milan) ================= */}
          {activePage === "kundli-matching" && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Ashtakoota Marriage Matching</h2>
                <p className="text-xs text-slate-400">Traditional 36 Guna Milan compatibility based on Moon Nakshatras</p>
              </div>

              <form onSubmit={handleKundliMatching} className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl glass-panel border border-amber-500/10">
                {/* Male Details */}
                <div className="p-4 bg-slate-950/80 rounded-xl space-y-3 border border-slate-800/80">
                  <h3 className="text-sm font-bold text-purple-400 border-b border-slate-800 pb-1">Male Partner Details</h3>
                  <div>
                    <label className="block text-[9px] text-slate-400 uppercase mb-1">Name</label>
                    <input type="text" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.maleName} onChange={e => setMatchingForm({ ...matchingForm, maleName: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] text-slate-400 uppercase mb-1">Date of Birth</label>
                      <input type="date" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.maleDob} onChange={e => setMatchingForm({ ...matchingForm, maleDob: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-400 uppercase mb-1">Time of Birth</label>
                      <input type="time" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.maleTob} onChange={e => setMatchingForm({ ...matchingForm, maleTob: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 uppercase mb-1">Place of Birth</label>
                    <input type="text" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.malePob} onChange={e => setMatchingForm({ ...matchingForm, malePob: e.target.value })} />
                  </div>
                </div>

                {/* Female Details */}
                <div className="p-4 bg-slate-950/80 rounded-xl space-y-3 border border-slate-800/80">
                  <h3 className="text-sm font-bold text-amber-400 border-b border-slate-800 pb-1">Female Partner Details</h3>
                  <div>
                    <label className="block text-[9px] text-slate-400 uppercase mb-1">Name</label>
                    <input type="text" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.femaleName} onChange={e => setMatchingForm({ ...matchingForm, femaleName: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] text-slate-400 uppercase mb-1">Date of Birth</label>
                      <input type="date" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.femaleDob} onChange={e => setMatchingForm({ ...matchingForm, femaleDob: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-[9px] text-slate-400 uppercase mb-1">Time of Birth</label>
                      <input type="time" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.femaleTob} onChange={e => setMatchingForm({ ...matchingForm, femaleTob: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 uppercase mb-1">Place of Birth</label>
                    <input type="text" required className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200" value={matchingForm.femalePob} onChange={e => setMatchingForm({ ...matchingForm, femalePob: e.target.value })} />
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <button type="submit" className="px-8 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest font-display">
                    Calculate Guna Match Compatibility
                  </button>
                </div>
              </form>

              {matchingReport ? (
                <div className="grid md:grid-cols-5 gap-6 items-start">
                  
                  {/* Guna Table column */}
                  <div className="md:col-span-2 p-5 rounded-2xl glass-panel space-y-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-400">Total Compatibility Score</p>
                      <div className="text-3xl font-bold font-mono text-amber-400 mt-1">{matchingReport.gunaScore} / {matchingReport.maxScore}</div>
                      <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mt-2">
                        {matchingReport.gunaScore >= 18 ? "Auspicious Match" : "Dosha remedies recommended"}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {Object.entries(matchingReport.gunaAnalysis).map(([k, val]: any) => (
                        <div key={k} className="flex justify-between items-center p-2 bg-slate-950/60 rounded">
                          <span className="capitalize font-medium text-slate-400">{k}</span>
                          <span className="font-semibold text-slate-200">{val.score} / {val.max} ({val.status})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gemini Match insight */}
                  <div className="md:col-span-3 p-6 rounded-2xl glass-panel border border-amber-500/20 text-left space-y-4">
                    <h4 className="text-lg font-display text-amber-300 font-semibold flex items-center gap-1">
                      <Heart size={16} className="text-amber-400 animate-pulse" /> Astro Matchmaker Insight
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {matchingReport.matchInsight}
                    </p>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl border border-slate-800/80 bg-slate-950/40 text-slate-400">
                  <p className="text-xs">Submit both male and female birth parameters to perform detailed Ashtakoota compatibility analysis.</p>
                </div>
              )}
            </div>
          )}

          {/* ================= PAGE 6: AI ASTROLOGY CHAT ================= */}
          {activePage === "ai-astrology-chat" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Varanasi AI Astro-Assistant</h2>
                <p className="text-xs text-slate-400">Consult immediately with our conversational Vedic oracle powered by Gemini</p>
              </div>

              {/* Chat messenger panel */}
              <div className="p-4 rounded-2xl glass-panel border border-amber-500/20 h-[500px] flex flex-col justify-between">
                
                {/* Messages log */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed text-left ${msg.role === "user" ? "bg-purple-600/30 text-slate-200 rounded-tr-none border border-purple-500/20" : "bg-slate-950/80 text-slate-300 rounded-tl-none border border-amber-500/10"}`}>
                        <div className="font-bold text-[9px] mb-1 text-amber-400">
                          {msg.role === "user" ? "You" : "Aacharya Shastri AI"}
                        </div>
                        <p className="whitespace-pre-line">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat input form */}
                <form onSubmit={handleSendChat} className="flex gap-2 border-t border-slate-800/80 pt-3">
                  <input
                    type="text"
                    required
                    placeholder="Type your question (e.g. When will my financial block clear?)"
                    className="flex-1 text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                  />
                  <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1">
                    <Send size={13} /> Ask Shastri
                  </button>
                </form>

              </div>
            </div>
          )}

          {/* ================= PAGE 7: TALK TO ASTROLOGER & LISTS ================= */}
          {activePage === "talk-to-astrologer" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Certified Astrologer Consultations</h2>
                <p className="text-xs text-slate-400">Secure immediate voice or chat consultation with certified scholars of Varanasi</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {astrologers.map(astro => (
                  <div key={astro.id} className="p-5 rounded-2xl glass-panel space-y-4 border border-amber-500/10 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={astro.avatar} alt={astro.name} className="w-12 h-12 rounded-full object-cover border border-amber-500/30" />
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${astro.status === "Online" ? "bg-emerald-500" : "bg-amber-500"}`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                            {astro.name} {astro.verified && <Check size={14} className="bg-amber-500 text-slate-950 rounded-full p-0.5" />}
                          </h4>
                          <p className="text-[10px] text-amber-400">{astro.specialty}</p>
                          <p className="text-[9px] text-slate-500">{astro.experience} experience</p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">"{astro.bio}"</p>
                      <div className="flex flex-wrap gap-1 text-[9px] text-slate-400">
                        {astro.languages.map(l => (
                          <span key={l} className="px-1.5 py-0.5 rounded bg-slate-950 font-semibold">{l}</span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-slate-500">Rate</p>
                        <p className="text-xs font-bold text-amber-400">₹{astro.rate}/min</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleInitiateConsultation(astro, "Chat")}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <MessageSquare size={12} /> Chat
                        </button>
                        <button
                          onClick={() => handleInitiateConsultation(astro, "Video")}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <Video size={12} /> Video
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= PAGE 8: SIMULATED CONSULTATION ROOM ================= */}
          {activePage === "consultation-room" && activeConsultation && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex justify-between items-center text-xs text-purple-300">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Consultation Session in progress: **{activeConsultation.name}** ({activeConsultation.consultType})
                </span>
                <span className="font-mono font-bold text-amber-400">Rate: ₹{activeConsultation.rate}/min</span>
              </div>

              <div className="grid md:grid-cols-4 gap-6 items-start">
                
                {/* Astrologer profile details */}
                <div className="p-4 rounded-2xl glass-panel text-center space-y-3">
                  <img src={activeConsultation.avatar} alt="" className="w-16 h-16 rounded-full mx-auto border-2 border-amber-500/20" />
                  <h3 className="text-sm font-bold text-slate-100">{activeConsultation.name}</h3>
                  <p className="text-[10px] text-amber-400">{activeConsultation.specialty}</p>
                  <button
                    onClick={() => {
                      if (confirm("Disconnect consultation session? Any remaining minutes balance will be refunded.")) {
                        setActiveConsultation(null);
                        setActivePage("talk-to-astrologer");
                      }
                    }}
                    className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded transition-colors"
                  >
                    Disconnect Call
                  </button>
                </div>

                {/* Live Chat messenger */}
                <div className="md:col-span-3 p-4 rounded-2xl glass-panel h-[400px] flex flex-col justify-between">
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 text-xs">
                    {consultationChat.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`p-3 rounded-xl max-w-[85%] text-left ${msg.role === "user" ? "bg-amber-500/10 text-amber-300 border border-amber-500/20" : "bg-slate-950 border border-slate-800"}`}>
                          <p>{msg.content}</p>
                          <span className="block text-[8px] text-slate-500 mt-1 text-right">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendConsultationMsg} className="flex gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Type your reply to Pandit ji..."
                      className="flex-1 text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded focus:border-amber-500 outline-none text-slate-200"
                      value={consultationInput}
                      onChange={e => setConsultationInput(e.target.value)}
                    />
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-bold text-xs rounded-lg uppercase">
                      Send
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* ================= PAGE 9: TAROT READING (Interactive Draw) ================= */}
          {activePage === "tarot-reading" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Mystic Tarot Reading</h2>
                <p className="text-xs text-slate-400">Ask a question, draw three cosmic cards for Past, Present, and Future predictions</p>
              </div>

              {/* Tarot query input */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Enter your specific doubt (e.g. Will I buy a home in 22026?)"
                  className="flex-1 text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded outline-none focus:border-amber-500"
                  value={tarotQuery}
                  onChange={e => setTarotQuery(e.target.value)}
                />
                <button
                  onClick={handleInterpretTarot}
                  disabled={drawnCards.length < 3}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded disabled:opacity-50 transition-all uppercase font-display"
                >
                  Interpret Cards
                </button>
                {drawnCards.length > 0 && (
                  <button onClick={handleResetTarot} className="px-2 py-1 text-xs text-slate-500 hover:text-slate-300">
                    Reset
                  </button>
                )}
              </div>

              {/* Chosen Slots Past / Present / Future */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto text-center">
                {["Past", "Present", "Future"].map((slotName, slotIdx) => {
                  const card = drawnCards[slotIdx];
                  return (
                    <div key={slotName} className="p-4 rounded-xl border-2 border-dashed border-slate-800 bg-slate-950/40 min-h-[140px] flex flex-col justify-between items-center relative overflow-hidden">
                      <span className="text-[10px] uppercase text-amber-500/50 font-bold tracking-widest">{slotName}</span>
                      
                      {card ? (
                        <div className="space-y-1 my-auto animate-float">
                          <span className="text-4xl block">{card.image}</span>
                          <span className="text-[11px] font-bold text-amber-300 block">{card.name}</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-600 my-auto">Slot empty</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Main Deck of Cards face down */}
              {drawnCards.length < 3 && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 text-center">Draw {3 - drawnCards.length} more cards from the cosmic deck below</p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                    {tarotCards.map((card) => {
                      const isDrawn = drawnCards.some(c => c.id === card.id);
                      return (
                        <div
                          key={card.id}
                          onClick={() => handleDrawTarotCard(card)}
                          className={`w-14 h-22 rounded-lg border flex items-center justify-center text-xl cursor-pointer select-none transition-all ${isDrawn ? "opacity-20 border-slate-800 bg-slate-900 cursor-not-allowed scale-95" : "bg-gradient-to-br from-purple-950 to-slate-900 border-purple-500/40 hover:-translate-y-1 hover:border-amber-500/40"}`}
                        >
                          {isDrawn ? "✓" : "🔮"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Display Gemini analysis */}
              {tarotReport && (
                <div className="p-6 rounded-2xl glass-panel border border-amber-500/30 text-left max-w-3xl mx-auto space-y-4">
                  <h4 className="text-lg font-display text-amber-300 font-semibold border-b border-slate-800 pb-2">Yogi Anand's Interpretation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {tarotReport}
                  </p>
                </div>
              )}

            </div>
          )}

          {/* ================= PAGE 10: NUMEROLOGY ================= */}
          {activePage === "numerology" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Vedic Numerology Analysis</h2>
                <p className="text-xs text-slate-400">Calculate Life Path, Expression, and destiny numbers with Chaldean values</p>
              </div>

              <div className="grid md:grid-cols-5 gap-6 items-start">
                <form onSubmit={handleGetNumerology} className="md:col-span-2 p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-4">
                  <h3 className="text-sm font-bold text-amber-300 uppercase">Input Credentials</h3>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 outline-none"
                      value={numerologyForm.name}
                      onChange={e => setNumerologyForm({ ...numerologyForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">Date of Birth</label>
                    <input
                      type="date"
                      required
                      className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 outline-none"
                      value={numerologyForm.dob}
                      onChange={e => setNumerologyForm({ ...numerologyForm, dob: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded uppercase tracking-wider">
                    Evaluate Numbers
                  </button>
                </form>

                <div className="md:col-span-3">
                  {numerologyReport ? (
                    <div className="space-y-4">
                      {/* Metric widgets */}
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                          <p className="text-[10px] text-slate-500 uppercase">Life Path Number</p>
                          <p className="text-3xl font-bold font-mono text-amber-400 mt-1">{numerologyReport.lifePath}</p>
                          <p className="text-[9px] text-slate-400 mt-1 font-semibold">Destiny calling and inner soul map</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                          <p className="text-[10px] text-slate-500 uppercase">Expression Number</p>
                          <p className="text-3xl font-bold font-mono text-purple-400 mt-1">{numerologyReport.destinyNumber}</p>
                          <p className="text-[9px] text-slate-400 mt-1 font-semibold">Outer capability and active career</p>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 text-left">
                        <h4 className="text-sm font-bold text-amber-300 font-display border-b border-slate-800 pb-2">Dr. Radha Iyer's Numerology Portrait</h4>
                        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mt-3">
                          {numerologyReport.portrait}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-400">
                      <p className="text-xs">Provide your name and dob to evaluate destiny and expression numbers.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================= PAGE 11: PANCHANG & MUHURAT ================= */}
          {activePage === "panchang" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Daily Panchang & Muhurat Finder</h2>
                <p className="text-xs text-slate-400">Calculate Tithi, Nakshatra, Rahu kalam and auspicious Abhijit timings</p>
              </div>

              {/* Date picker */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 max-w-md mx-auto flex items-center justify-between gap-4">
                <label className="text-xs font-semibold text-slate-300 uppercase shrink-0">Select Date</label>
                <input
                  type="date"
                  className="flex-1 text-xs px-3 py-1.5 bg-slate-900 border border-slate-800 rounded outline-none text-slate-200"
                  value={panchangDate}
                  onChange={e => handleGetPanchang(e.target.value)}
                />
              </div>

              {panchangInfo ? (
                <div className="grid md:grid-cols-5 gap-6">
                  
                  {/* Panchang table */}
                  <div className="md:col-span-3 p-5 rounded-2xl glass-panel space-y-4">
                    <h3 className="text-sm font-bold text-amber-300 font-display border-b border-slate-800 pb-2">Sidereal Solar Metrics</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                      <div className="p-2.5 bg-slate-950 rounded">
                        <span className="text-[10px] text-slate-500 uppercase block">Active Tithi</span>
                        <span className="font-bold text-slate-100">{panchangInfo.tithi}</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded">
                        <span className="text-[10px] text-slate-500 uppercase block">Birth Nakshatra</span>
                        <span className="font-bold text-slate-100">{panchangInfo.nakshatra}</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded">
                        <span className="text-[10px] text-slate-500 uppercase block">Rithu (Season)</span>
                        <span className="font-bold text-slate-100">{panchangInfo.rithu}</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded">
                        <span className="text-[10px] text-slate-500 uppercase block">Sunrise / Sunset</span>
                        <span className="font-bold text-slate-100">{panchangInfo.sunrise} / {panchangInfo.sunset}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded text-xs space-y-2">
                      <h4 className="font-bold text-amber-400">Cautionary Timings (Rahu Kalam)</h4>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span>Rahu Kalam:</span>
                        <span className="font-mono font-bold text-red-400">{panchangInfo.rahukalam}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span>Gulika Kalam:</span>
                        <span className="font-mono">{panchangInfo.gulikakalam}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 text-[11px]">
                        <span>Abhijit Muhurat (Auspicious):</span>
                        <span className="font-mono font-bold text-emerald-400">{panchangInfo.abhijitMuhurat}</span>
                      </div>
                    </div>
                  </div>

                  {/* Auspicious Muhurats list */}
                  <div className="md:col-span-2 p-5 rounded-2xl glass-panel space-y-3">
                    <h3 className="text-sm font-bold text-amber-300 font-display">2026 Auspicious Muhurats</h3>
                    <div className="space-y-3">
                      {muhurats.map((m, idx) => (
                        <div key={idx} className="p-3 bg-slate-950 rounded text-xs border border-slate-800">
                          <p className="font-bold text-slate-200">{m.purpose}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">Recommended Dates: <span className="text-amber-400 font-mono font-bold">{m.dates}</span></p>
                          <p className="text-[9px] text-slate-500 mt-0.5 italic">{m.planetaryAlignment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl glass-panel text-slate-400">
                  <p>Click Select Date to synchronize classical Varanasi Solar Panchang calendars.</p>
                </div>
              )}
            </div>
          )}

          {/* ================= PAGE 12: GEMSTONE RECOMMENDATION ================= */}
          {activePage === "gemstone-recommendation" && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Vedic Gemstone Recommendations (Navaratna)</h2>
                <p className="text-xs text-slate-400">According to classical Parashara calculations of weak planets and sub-divisional strengths</p>
              </div>

              {/* Gemstones grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {gemstones.map((gem, idx) => (
                  <div key={idx} className="p-5 rounded-2xl glass-panel space-y-3 border border-amber-500/10 hover:border-amber-500/30 transition-all flex flex-col justify-between">
                    <div className="space-y-2 text-left">
                      <span className="text-2xl">💎</span>
                      <h3 className="text-sm font-bold text-slate-100 font-display">{gem.name}</h3>
                      <p className="text-[10px] text-amber-400">Ruling Planet: {gem.planet}</p>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">{gem.benefits}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-medium">
                      <span className="text-amber-500 font-semibold uppercase">Rule: </span>{gem.rules}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= PAGE 13: ASTROLOGY BLOG ================= */}
          {activePage === "astrology-blog" && (
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Vedic Astrology Blog Posts</h2>
                <p className="text-xs text-slate-400">Timeless spiritual advice and transit guides written by certified senior scholars</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {blogs.map(blog => (
                  <div key={blog.id} className="p-6 rounded-2xl glass-panel space-y-3 flex flex-col justify-between border border-slate-800">
                    <div className="space-y-2 text-left">
                      <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold uppercase">{blog.category}</span>
                      <h4 className="text-lg font-bold font-display text-slate-100">{blog.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{blog.content}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-[10px] text-slate-500">
                      <span>By {blog.author}</span>
                      <span>{blog.date} | {blog.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= PAGE 14: SUCCESS STORIES ================= */}
          {activePage === "success-stories" && <SuccessStoriesPage />}

          {/* ================= PAGE 15: PRICING & RECHARGE WALLET ================= */}
          {activePage === "pricing" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-display font-bold text-amber-400">Pricing & Astro-Wallet Top Up</h2>
                <p className="text-xs text-slate-400">Recharge immediately to query astrologers. Transparent rates, no hidden taxes</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Standard Wallet Card */}
                <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 text-center space-y-4">
                  <span className="text-3xl">👛</span>
                  <h3 className="text-lg font-bold text-slate-100">Seeker Wallet</h3>
                  <div className="text-3xl font-bold font-mono text-amber-400">₹{wallet.balance}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Available for consultations. Typical rate with senior Varanasi Acharyas is ₹15 - ₹20 per consultation minute.
                  </p>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl uppercase tracking-widest"
                  >
                    Top-up Wallet
                  </button>
                </div>

                {/* Simulated transactions log */}
                <div className="md:col-span-2 p-6 rounded-2xl glass-panel space-y-3 text-left">
                  <h3 className="text-sm font-bold text-amber-300 font-display uppercase tracking-wider">Astro-Wallet Statements</h3>
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin">
                    {wallet.transactions.map((tr, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950/80 border border-slate-800 rounded flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-300">{tr.description}</p>
                          <p className="text-[9px] text-slate-500">{new Date(tr.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`font-mono font-bold ${tr.type === "credit" ? "text-emerald-400" : "text-amber-400"}`}>
                          {tr.type === "credit" ? "+" : "-"} ₹{tr.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= PAGE 16: CONTACT ================= */}
          {activePage === "contact" && <ContactPage />}

          {/* ================= PAGE 17: FAQ ================= */}
          {activePage === "faq" && <FAQPage />}

          {/* ================= PAGE 18: PRIVACY POLICY ================= */}
          {activePage === "privacy-policy" && <PrivacyPolicyPage />}

          {/* ================= PAGE 19: TERMS ================= */}
          {activePage === "terms" && <TermsPage />}

          {/* ================= PAGE 20: ASTROLOGER PANEL ================= */}
          {activePage === "astrologer-panel" && (
            <AstrologerPanelComponent
              astrologers={astrologers}
              bookings={bookings}
              onApplyAstrologer={handleApplyAstrologer}
            />
          )}

          {/* ================= PAGE 21: ADMIN PANEL ================= */}
          {activePage === "admin-panel" && (
            <AdminPanelComponent
              astrologers={astrologers}
              blogs={blogs}
              bookings={bookings}
              savedKundlis={savedKundlis}
              onAddBlog={handleAddBlog}
              onVerifyAstrologer={handleVerifyAstrologer}
              onToggleStatus={handleToggleStatus}
            />
          )}

        </main>
      </div>

      {/* ================= PAYMENT MODAL SIMULATOR ================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-950/85 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleRechargeWallet} className="w-full max-w-sm p-6 rounded-2xl glass-panel space-y-4 border-2 border-amber-500/30 text-left relative">
            <button type="button" onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-100">
              <X size={18} />
            </button>
            <h3 className="text-lg font-display text-amber-300 font-bold border-b border-slate-800 pb-2">Razorpay Checkout Gateway</h3>
            
            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Select Recharge Bundle</label>
              <select
                className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded outline-none text-slate-200"
                value={rechargeAmount}
                onChange={e => setRechargeAmount(e.target.value)}
              >
                <option value="200">₹200 (13 Consult Mins)</option>
                <option value="500">₹500 (33 Consult Mins)</option>
                <option value="1000">₹1000 (66 Consult Mins)</option>
                <option value="2000">₹2000 (133 Consult Mins)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 uppercase mb-1">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {["UPI", "Stripe", "NetBanking"].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`py-1.5 rounded text-xs font-semibold border ${paymentMethod === m ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-slate-800 bg-slate-950 text-slate-400"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded text-xs text-slate-400 leading-relaxed font-semibold">
              Recharging is secure. UPI and card credentials are authenticated instantly via simulated webhooks.
            </div>

            <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded uppercase tracking-wider">
              Authorize Payment (₹{rechargeAmount})
            </button>
          </form>
        </div>
      )}

      {/* ================= OTP LOGIN MODAL SIMULATOR ================= */}
      {otpLoginMode && (
        <div className="fixed inset-0 bg-slate-950/85 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm p-6 rounded-2xl glass-panel space-y-4 border border-purple-500/20 text-left relative">
            <button onClick={() => setOtpLoginMode(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-100">
              <X size={18} />
            </button>
            <h3 className="text-lg font-display text-amber-300 font-bold border-b border-slate-800 pb-2">OTP / Phone Seeker Login</h3>
            
            {!otpSent ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Enter Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded outline-none"
                    value={loginPhone}
                    onChange={e => setLoginPhone(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded">
                  Request Secret OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Enter Verification Code (Use 1234 or any code)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1234"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-800 rounded outline-none text-center font-mono text-lg tracking-widest"
                    value={loginOtp}
                    onChange={e => setLoginOtp(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded uppercase">
                  Verify Credentials
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
