import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client to prevent crash if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY environment variable is not set or is a placeholder.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// In-Memory Database for saved items, blogs, bookings, and wallet transactions
const db = {
  savedKundlis: [
    {
      id: "k-1",
      name: "Parmeshwar Metkar",
      dob: "1995-08-15",
      tob: "14:30",
      pob: "Mumbai, India",
      gender: "Male",
      createdAt: "2026-07-01T12:00:00.000Z"
    },
    {
      id: "k-2",
      name: "Aditi Rao",
      dob: "1998-11-22",
      tob: "08:15",
      pob: "Pune, India",
      gender: "Female",
      createdAt: "2026-07-02T10:00:00.000Z"
    }
  ],
  wallet: {
    balance: 550, // INR
    transactions: [
      { id: "t-1", type: "credit", amount: 500, description: "Wallet Top-up via Razorpay", date: "2026-07-01T09:00:00.000Z" },
      { id: "t-2", type: "debit", amount: 150, description: "AstroChat with Aacharya Shastri", date: "2026-07-02T15:30:00.000Z" },
      { id: "t-3", type: "credit", amount: 200, description: "Referral Bonus", date: "2026-07-03T01:00:00.000Z" }
    ]
  },
  bookings: [
    {
      id: "b-1",
      astrologerName: "Aacharya Shastri",
      type: "Chat",
      date: "2026-07-04",
      time: "11:00 AM",
      status: "Scheduled",
      rate: 15
    },
    {
      id: "b-2",
      astrologerName: "Dr. Radha Iyer",
      type: "Video",
      date: "2026-07-05",
      time: "04:30 PM",
      status: "Scheduled",
      rate: 45
    }
  ],
  blogs: [
    {
      id: "blog-1",
      title: "Understanding Satellites vs Stars in Vedic Astrology",
      content: "Vedic astrology or Jyotish is a cosmic science that evaluates the movement of Grahas (planets) against the stellar backdrop of Nakshatras. Learn how Sade Sati affects your emotional and material grounding...",
      author: "Aacharya Shastri",
      category: "Vedic Wisdom",
      readTime: "5 min read",
      date: "June 28, 2026",
      likes: 42
    },
    {
      id: "blog-2",
      title: "The Auspiciousness of Guru Gochara (Jupiter Transit) 2026",
      content: "Jupiter transit holds immense gravity in Hindu astrology. It marks changes in career, expansion of consciousness, and spiritual luck. Check which zodiac signs will flourish during this magical transit...",
      author: "Pandit Suresh Dwivedi",
      category: "Transits",
      readTime: "8 min read",
      date: "July 01, 2026",
      likes: 129
    }
  ],
  astrologers: [
    {
      id: "astro-1",
      name: "Aacharya Shastri",
      specialty: "Vedic, Kundli, Muhurat",
      experience: "25 Years",
      languages: ["English", "Hindi", "Marathi"],
      rating: 4.9,
      reviewsCount: 1240,
      rate: 15,
      status: "Online",
      verified: true,
      bio: "An authority on Vedic Horoscopes, offering deep insights on marriage, health, and gemstone remedies.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
    },
    {
      id: "astro-2",
      name: "Dr. Radha Iyer",
      specialty: "Numerology, K.P. Astrology",
      experience: "18 Years",
      languages: ["English", "Hindi", "Tamil"],
      rating: 4.8,
      reviewsCount: 810,
      rate: 20,
      status: "Online",
      verified: true,
      bio: "Expert in K.P. system and Numerology. Helping users align names and businesses with auspicious planets.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
    },
    {
      id: "astro-3",
      name: "Yogi Anand",
      specialty: "Tarot, Gemology, Vastu",
      experience: "12 Years",
      languages: ["English", "Hindi"],
      rating: 4.7,
      reviewsCount: 450,
      rate: 12,
      status: "Busy",
      verified: true,
      bio: "Spiritual healer, Vastu expert, and intuitive Tarot cards interpreter with precise guidance.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    }
  ]
};

// HELPER: Call Gemini or return realistic fallback if API key is not present
async function queryGemini(promptText: string, systemInstructionText?: string): Promise<string> {
  try {
    const ai = getGeminiClient();
    const config: any = {};
    if (systemInstructionText) {
      config.systemInstruction = systemInstructionText;
    }
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config
    });
    return response.text || "Unable to retrieve dynamic response.";
  } catch (error: any) {
    console.warn("Gemini query failed or API key not available, using Vedic Astrology heuristics.", error.message);
    
    // Vedic Astrology Heuristic Fallback Generator
    if (promptText.toLowerCase().includes("horoscope")) {
      return `[Jyotish Heuristic Analysis]
The celestial skies reveal auspicious alignments for your sign today.
- Finance: A minor delay in rewards but a powerful long-term asset positioning. Seek yellow flowers to offer.
- Career: Mercury's position increases intellectual clarity. Excellent for concluding contracts.
- Health: Watch your posture and throat. Drink copper-charged water.
- Cosmic Tip: Red or saffron will act as your armor. Meditate towards East.`;
    }
    
    if (promptText.toLowerCase().includes("kundli")) {
      return `[Kundli Astro-Report Summary]
According to classical Vedic calculations:
- Ascendant (Lagna): Leo (Simha) - representing solar vitality, leadership, and high ethics.
- Moon Sign (Rashi): Taurus (Vrishabha) - providing emotional stability, sensory refinement, and steady determination.
- Dominant Yoga: Gaja-Kesari Yoga (Jupiter and Moon in mutual quadrants) indicating wealth, honor, and long-lasting reputation.
- Shani Sade Sati: Neutral phase. Maintain discipline, patience, and donate sesame seeds on Saturdays.
- Recommendation: Wearing an authentic Natural Yellow Sapphire (Pukhraj) under proper Muhurat will expand your Jupiterian abundance.`;
    }

    if (promptText.toLowerCase().includes("matching") || promptText.toLowerCase().includes("guna")) {
      return `[Kundli Matching Astro-Insight]
- Total Guna Match: 26 out of 36 (Auspicious / Bhakoot Shuddhi present).
- Friendship & Mental Compatibility (Maitri): Very high. You share similar value patterns.
- Temperament (Gana Match): Dev & Manushya combination - balanced, allowing gentle compromises.
- Health & Vigor (Yoni Match): Moderate compatibility.
- Manglik Compatibility: Both charts are balanced (Anshik Manglik cancellation exists).
- Overall Verdict: This alliance holds high promise for long-term stability and deep spiritual companionship. Daily chants of 'Om Namah Shivaya' together will multiply your domestic bliss.`;
    }

    if (promptText.toLowerCase().includes("tarot")) {
      return `[Mystic Tarot Guidance]
The cards you pulled convey a deep karmic cycle:
1. Card 1 (Past) - The High Priestess: Indicates you relied on inner instincts and silence to survive a chaotic phase.
2. Card 2 (Present) - The Chariot: Represents willpower, focus, and overcoming friction. You are currently driving hard towards a major victory.
3. Card 3 (Future) - Six of Wands: Direct celebration, public recognition, and the absolute triumph of your personal projects. Maintain your humility!`;
    }

    return `Vedic cosmic configurations indicate a positive transition in your life path. The current planetary Dasha favors intellectual pursuits and relationship resolution. Remain faithful to spiritual discipline and perform daily Surya Namaskar.`;
  }
}

// ================= API ENDPOINTS =================

// Health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 1. Daily Horoscope API
app.post("/api/horoscope", async (req, res) => {
  const { sign, date, language = "English" } = req.body;
  if (!sign) {
    return res.status(400).json({ error: "Zodiac sign is required." });
  }

  const prompt = `Generate a detailed Vedic daily horoscope prediction for zodiac sign "${sign}" for the date "${date || "today"}". 
Include specific details for:
1. Career & Business
2. Wealth & Finance
3. Love & Relationships
4. Health & Wellbeing
5. Lucky Color, Lucky Number, and Lucky Direction of the day
6. A short Sanskrit mantra or daily Vedic remedy.
Please write this prediction in "${language}".`;

  const systemPrompt = "You are Aacharya Shastri, a venerable Vedic Astrologer from Varanasi, India. Speak with spiritual warmth, compassionate authority, and use traditional Jyotish terms elegantly.";
  
  const prediction = await queryGemini(prompt, systemPrompt);
  res.json({ sign, date, language, prediction });
});

// 2. Free Kundli Generator API
app.post("/api/kundli", async (req, res) => {
  const { name, dob, tob, pob, gender, chartType = "North" } = req.body;
  if (!name || !dob || !tob || !pob) {
    return res.status(400).json({ error: "Missing essential birth parameters for Kundli." });
  }

  // Simulated Kundli parameters (Rashi, Nakshatra, Lagna, Yogas, Charts)
  const signs = ["Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)", "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)", "Libra (Tula)", "Scorpio (Vrischika)", "Sagittarius (Dhanu)", "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)"];
  const nakshatras = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Svati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
  
  // Deterministic but realistic mock values based on name length or birth month
  const signIndex = (name.length + dob.charCodeAt(dob.length - 1)) % 12;
  const nakshatraIndex = (name.length + dob.charCodeAt(dob.length - 2)) % 27;
  const lagnaIndex = (name.length + dob.charCodeAt(dob.length - 3)) % 12;

  const mockRashi = signs[signIndex];
  const mockNakshatra = nakshatras[nakshatraIndex];
  const mockLagna = signs[lagnaIndex];

  // Save to database
  const newKundli = {
    id: `k-${Date.now()}`,
    name,
    dob,
    tob,
    pob,
    gender,
    createdAt: new Date().toISOString()
  };
  db.savedKundlis.push(newKundli);

  // Generate dynamic predictions with Gemini
  const prompt = `Generate a comprehensive Vedic Astrology birth report for a person born on ${dob} at ${tob} in ${pob}. 
- Gender: ${gender}
- Moon Sign (Rashi): ${mockRashi}
- Nakshatra: ${mockNakshatra}
- Ascendant Sign (Lagna): ${mockLagna}
Provide:
1. A detailed analysis of their Ascendant and Moon Sign traits.
2. At least two major planetary Yogas present in their birth configurations.
3. Manglik Dosha status analysis and mild classical remedies (if applicable).
4. Sade Sati status (Shani's Saturn cycle) with advice.
5. Lucky Color, Lucky Number, and Lucky Direction.
6. Vedic remedies, prayers (mantras), or gemstones recommended.`;

  const systemPrompt = "You are Aacharya Shastri, an expert in Vedic Kundli calculations and traditional remedial Jyotish. Format your response beautifully with elegant headings and deep spiritual insights.";
  const report = await queryGemini(prompt, systemPrompt);

  res.json({
    name,
    dob,
    tob,
    pob,
    gender,
    rashi: mockRashi,
    nakshatra: mockNakshatra,
    lagna: mockLagna,
    chartData: {
      // 12 houses of Kundli
      houses: [
        { house: 1, sign: mockLagna, planets: ["Lagna", "Sun"] },
        { house: 2, sign: signs[(lagnaIndex + 1) % 12], planets: ["Mercury"] },
        { house: 3, sign: signs[(lagnaIndex + 2) % 12], planets: ["Venus"] },
        { house: 4, sign: signs[(lagnaIndex + 3) % 12], planets: [] },
        { house: 5, sign: signs[(lagnaIndex + 4) % 12], planets: ["Mars"] },
        { house: 6, sign: signs[(lagnaIndex + 5) % 12], planets: ["Rahu"] },
        { house: 7, sign: signs[(lagnaIndex + 6) % 12], planets: ["Jupiter"] },
        { house: 8, sign: signs[(lagnaIndex + 7) % 12], planets: [] },
        { house: 9, sign: signs[(lagnaIndex + 8) % 12], planets: ["Saturn"] },
        { house: 10, sign: signs[(lagnaIndex + 9) % 12], planets: ["Moon"] },
        { house: 11, sign: signs[(lagnaIndex + 10) % 12], planets: [] },
        { house: 12, sign: signs[(lagnaIndex + 11) % 12], planets: ["Ketu"] }
      ]
    },
    report
  });
});

// 3. Kundli Matching API
app.post("/api/matching", async (req, res) => {
  const { male, female } = req.body;
  if (!male || !female || !male.name || !female.name) {
    return res.status(400).json({ error: "Male and female birth details are required." });
  }

  // Calculate Guna Milan out of 36 deterministically
  const sumLength = male.name.length + female.name.length;
  const gunaScore = 18 + (sumLength % 15); // Will be between 18 and 32

  const prompt = `Provide a premium Vedic marriage compatibility matching report between:
1. Male Partner: ${male.name}, DOB: ${male.dob}, TOB: ${male.tob}, POB: ${male.pob}
2. Female Partner: ${female.name}, DOB: ${female.dob}, TOB: ${female.tob}, POB: ${female.pob}
The calculated Guna Milan score is ${gunaScore} out of 36.
Generate structured Vedic insights covering:
- Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, and Nadi aspects.
- Emotional and psychological harmony.
- Wealth, growth, and destiny support.
- Family and progeny compatibility.
- Any major Dosha (like Nadi Dosha or Bhakoot Dosha) and recommended remedies.
- Overall matrimonial recommendation.`;

  const systemPrompt = "You are Aacharya Shastri, a revered Vedic matchmaker from Varanasi. Guide the couple with grace, practical astrological remedies, and deep spiritual validation.";
  const matchInsight = await queryGemini(prompt, systemPrompt);

  res.json({
    gunaScore,
    maxScore: 36,
    maleName: male.name,
    femaleName: female.name,
    gunaAnalysis: {
      varna: { score: 1, max: 1, status: "Compatible" },
      vashya: { score: gunaScore > 24 ? 2 : 1, max: 2, status: gunaScore > 24 ? "Compatible" : "Moderate" },
      tara: { score: gunaScore > 22 ? 3 : 1.5, max: 3, status: gunaScore > 22 ? "Auspicious" : "Neutral" },
      yoni: { score: gunaScore % 3, max: 4, status: "Moderate" },
      maitri: { score: 4, max: 5, status: "Highly Compatible" },
      gana: { score: gunaScore > 25 ? 6 : 1, max: 6, status: gunaScore > 25 ? "Compatible" : "Compromise Needed" },
      bhakoot: { score: gunaScore > 20 ? 7 : 0, max: 7, status: gunaScore > 20 ? "Perfect" : "Dosha Present" },
      nadi: { score: gunaScore % 2 === 0 ? 8 : 0, max: 8, status: gunaScore % 2 === 0 ? "Auspicious" : "Nadi Dosha Remedy Needed" }
    },
    matchInsight
  });
});

// 4. AI Astrology Chat (Interactive chat backend)
app.post("/api/chat", async (req, res) => {
  const { messages, birthDetails } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Chat messages are required." });
  }

  const lastMessage = messages[messages.length - 1]?.content || "";
  let userDetailsStr = "";
  if (birthDetails) {
    userDetailsStr = `(User Birth Details: Name: ${birthDetails.name || "Unknown"}, DOB: ${birthDetails.dob || "N/A"}, TOB: ${birthDetails.tob || "N/A"}, POB: ${birthDetails.pob || "N/A"}, Gender: ${birthDetails.gender || "N/A"})`;
  }

  const systemPrompt = `You are Aacharya Shastri, an elite premium Vedic Astrologer with 25 years of experience based in Varanasi. 
You possess absolute wisdom in Kundli charts, Nakshatras, Saturn cycles (Sade Sati), and gemstone therapy.
Talk with immense spiritual grace, using calm polite terms (e.g., 'Dear seeker', 'Blessings of Shiva be upon you').
Analyze user requests according to traditional Vedic astrological rules. Always suggest simple powerful remedies like chanting mantras, wearing specific natural gemstones, or feeding birds.
${userDetailsStr}`;

  const promptText = `User says: "${lastMessage}"`;
  const responseText = await queryGemini(promptText, systemPrompt);

  res.json({
    role: "assistant",
    content: responseText,
    timestamp: new Date().toISOString()
  });
});

// 5. Tarot Reading API
app.post("/api/tarot", async (req, res) => {
  const { cards, query } = req.body;
  if (!cards || !Array.isArray(cards)) {
    return res.status(400).json({ error: "Cards details are required." });
  }

  const cardNames = cards.map(c => `${c.name} (${c.position === "reversed" ? "Reversed" : "Upright"})`).join(", ");

  const prompt = `Provide a deep, intuitive Tarot Card Reading.
User Query: "${query || "General Life Guidance"}"
Selected Cards: ${cardNames}
Please give a structured reading covering:
- Interpretation of each card in the context of the user's question.
- The overarching thematic message of the cards combined.
- Actionable modern spiritual advice and cosmic warnings.`;

  const systemPrompt = "You are Yogi Anand, a high-frequency intuitive Tarot Master and spiritual healer. Convey deep symbolic meanings, mystic atmospheres, and clear actionable paths.";
  const reading = await queryGemini(prompt, systemPrompt);

  res.json({ cards, query, reading });
});

// 6. Numerology Report API
app.post("/api/numerology", async (req, res) => {
  const { name, dob } = req.body;
  if (!name || !dob) {
    return res.status(400).json({ error: "Name and Date of Birth are required for numerology calculations." });
  }

  // Calculate Life Path Number (Sum of all digits of DOB)
  const dobClean = dob.replace(/[^0-9]/g, "");
  let sum = 0;
  for (let i = 0; i < dobClean.length; i++) {
    sum += parseInt(dobClean[i], 10);
  }
  const reduceNum = (n: number): number => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = n.toString().split("").reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return n;
  };
  const lifePath = reduceNum(sum);

  // Calculate Expression/Destiny Number based on letters in the name (Chaldean or Pythagorean)
  const chaldeanValues: { [key: string]: number } = {
    A: 1, I: 1, J: 1, Q: 1, Y: 1,
    B: 2, K: 2, R: 2,
    C: 3, G: 3, L: 3, S: 3,
    D: 4, M: 4, T: 4,
    E: 5, H: 5, N: 5, X: 5,
    U: 6, V: 6, W: 6,
    F: 8, P: 8,
    O: 7, Z: 7
  };
  let nameSum = 0;
  const nameUpper = name.toUpperCase().replace(/[^A-Z]/g, "");
  for (let i = 0; i < nameUpper.length; i++) {
    nameSum += chaldeanValues[nameUpper[i]] || 1;
  }
  const destinyNumber = reduceNum(nameSum);

  const prompt = `Generate a detailed Numerology Portrait based on:
- Full Name: ${name}
- Date of Birth: ${dob}
- Life Path Number: ${lifePath}
- Expression/Destiny Number: ${destinyNumber}
Include details on:
1. Personal strengths, career suitability, and romance compatibilities of Life Path ${lifePath}.
2. Outer path and spiritual calling of Destiny Number ${destinyNumber}.
3. Planetary ruler of these numbers.
4. Core advice for the coming 12 months.`;

  const systemPrompt = "You are Dr. Radha Iyer, an elite Numerology and Chaldean Astro-Science researcher. Present a clean, structured, highly professional scientific numerology portrait.";
  const portrait = await queryGemini(prompt, systemPrompt);

  res.json({
    name,
    dob,
    lifePath,
    destinyNumber,
    portrait
  });
});

// 7. Panchang and Muhurat API
app.post("/api/panchang", (req, res) => {
  const { date } = req.body;
  const searchDate = date ? new Date(date) : new Date();
  
  // Simulated Panchang data based on dates
  const rithus = ["Vasanta (Spring)", "Grishma (Summer)", "Varsha (Monsoon)", "Sharad (Autumn)", "Hemant (Pre-winter)", "Shishir (Winter)"];
  const tithis = ["Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashti", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Amavasya"];
  const nakshatras = ["Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Hasta", "Chitra", "Svati", "Anuradha", "Jyeshtha"];
  
  const seed = searchDate.getDate();
  const tithi = tithis[seed % tithis.length];
  const nakshatra = nakshatras[seed % nakshatras.length];
  const rithu = rithus[searchDate.getMonth() % rithus.length];

  res.json({
    date: searchDate.toDateString(),
    tithi,
    nakshatra,
    rithu,
    sunrise: "05:42 AM",
    sunset: "07:12 PM",
    moonrise: "04:15 PM",
    moonset: "03:48 AM",
    rahukalam: "10:30 AM to 12:00 PM",
    gulikakalam: "07:30 AM to 09:00 AM",
    yamaganda: "03:00 PM to 04:30 PM",
    abhijitMuhurat: "11:54 AM to 12:46 PM"
  });
});

// 8. Blogs & CMS CMS endpoints
app.get("/api/blogs", (req, res) => {
  res.json(db.blogs);
});

app.post("/api/blogs", (req, res) => {
  const { title, content, author, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Blog title and content are required." });
  }
  const newBlog = {
    id: `blog-${Date.now()}`,
    title,
    content,
    author: author || "Administrator",
    category: category || "Astrology Wisdom",
    readTime: `${Math.ceil(content.length / 500)} min read`,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    likes: 0
  };
  db.blogs.push(newBlog);
  res.json(newBlog);
});

// 9. Astrologers & Consultations endpoints
app.get("/api/astrologers", (req, res) => {
  res.json(db.astrologers);
});

app.post("/api/astrologers/apply", (req, res) => {
  const { name, specialty, experience, languages, bio, rate } = req.body;
  if (!name || !specialty) {
    return res.status(400).json({ error: "Astrologer credentials incomplete." });
  }
  const applicant = {
    id: `astro-${Date.now()}`,
    name,
    specialty,
    experience: `${experience || 5} Years`,
    languages: languages || ["English", "Hindi"],
    rating: 5.0,
    reviewsCount: 0,
    rate: parseInt(rate, 10) || 10,
    status: "Busy",
    verified: false,
    bio: bio || "Newly registered professional Vedic astrologer.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  };
  db.astrologers.push(applicant);
  res.json({ message: "Registration applied successfully. KYC Verification in progress.", applicant });
});

// 10. Saved Kundlis & User management
app.get("/api/kundlis", (req, res) => {
  res.json(db.savedKundlis);
});

app.delete("/api/kundlis/:id", (req, res) => {
  const { id } = req.params;
  const index = db.savedKundlis.findIndex(k => k.id === id);
  if (index !== -1) {
    db.savedKundlis.splice(index, 1);
    return res.json({ success: true, message: "Kundli profile removed." });
  }
  res.status(404).json({ error: "Kundli not found." });
});

// 11. Wallet transactions and Simulator
app.get("/api/wallet", (req, res) => {
  res.json(db.wallet);
});

app.post("/api/wallet/recharge", (req, res) => {
  const { amount, method = "Razorpay" } = req.body;
  const rechargeAmount = parseInt(amount, 10);
  if (isNaN(rechargeAmount) || rechargeAmount <= 0) {
    return res.status(400).json({ error: "Invalid recharge amount." });
  }
  db.wallet.balance += rechargeAmount;
  const transaction = {
    id: `t-${Date.now()}`,
    type: "credit",
    amount: rechargeAmount,
    description: `Wallet Top-up via ${method}`,
    date: new Date().toISOString()
  };
  db.wallet.transactions.unshift(transaction);
  res.json({ success: true, balance: db.wallet.balance, transaction });
});

app.post("/api/bookings", (req, res) => {
  const { astroName, type, time, rate } = req.body;
  if (db.wallet.balance < rate) {
    return res.status(400).json({ error: "Insufficient wallet balance to schedule this consultation. Please top-up." });
  }
  
  db.wallet.balance -= rate;
  const transaction = {
    id: `t-${Date.now()}`,
    type: "debit",
    amount: rate,
    description: `Consultation Booked: ${astroName}`,
    date: new Date().toISOString()
  };
  db.wallet.transactions.unshift(transaction);

  const booking = {
    id: `b-${Date.now()}`,
    astrologerName: astroName,
    type,
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    time: time || "12:00 PM",
    status: "Scheduled",
    rate
  };
  db.bookings.unshift(booking);

  res.json({ success: true, balance: db.wallet.balance, booking });
});

app.get("/api/bookings", (req, res) => {
  res.json(db.bookings);
});


// ================= VITE OR STATIC SERVING =================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[VedicAstrology Server] running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
