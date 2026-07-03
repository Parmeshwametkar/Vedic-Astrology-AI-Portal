import { ZodiacSign, TarotCard } from "./types";

export const zodiacSigns: ZodiacSign[] = [
  { name: "Aries", sanskritName: "Mesha", element: "Fire", ruler: "Mars (Mangal)", symbol: "♈", description: "Dynamic, courageous, pioneering, and energetic trailblazers of the zodiac." },
  { name: "Taurus", sanskritName: "Vrishabha", element: "Earth", ruler: "Venus (Shukra)", symbol: "♉", description: "Steady, loyal, sensory, determined, and lovers of organic comfort and beauty." },
  { name: "Gemini", sanskritName: "Mithuna", element: "Air", ruler: "Mercury (Budha)", symbol: "♊", description: "Expressive, witty, multi-faceted, curious, and fast intellectual communicators." },
  { name: "Cancer", sanskritName: "Karka", element: "Water", ruler: "Moon (Chandra)", symbol: "♋", description: "Nurturing, intuitive, deeply emotional, protective, and spiritually sensitive." },
  { name: "Leo", sanskritName: "Simha", element: "Fire", ruler: "Sun (Surya)", symbol: "♌", description: "Radiant, dignified, magnanimous, protective, and born to lead with solar light." },
  { name: "Virgo", sanskritName: "Kanya", element: "Earth", ruler: "Mercury (Budha)", symbol: "♍", description: "Analytical, pure, precise, dedicated, and master orchestrators of detail and wellness." },
  { name: "Libra", sanskritName: "Tula", element: "Air", ruler: "Venus (Shukra)", symbol: "♎", description: "Harmonious, artistic, diplomatic, relationship-focused, and seekers of absolute balance." },
  { name: "Scorpio", sanskritName: "Vrischika", element: "Water", ruler: "Mars/Ketu", symbol: "♏", description: "Intense, magnetic, investigative, powerful, and experts of psychological transformation." },
  { name: "Sagittarius", sanskritName: "Dhanu", element: "Fire", ruler: "Jupiter (Guru)", symbol: "♐", description: "Philosophical, adventurous, truth-seeking, optimistic, and lovers of cosmic wisdom." },
  { name: "Capricorn", sanskritName: "Makara", element: "Earth", ruler: "Saturn (Shani)", symbol: "♑", description: "Ambitious, structural, disciplined, timeless, and natural climbing architects of success." },
  { name: "Aquarius", sanskritName: "Kumbha", element: "Air", ruler: "Saturn (Shani)", symbol: "♒", description: "Humanitarian, innovative, eccentric, network-builders, and revolutionary dreamers." },
  { name: "Pisces", sanskritName: "Meena", element: "Water", ruler: "Jupiter (Guru)", symbol: "♓", description: "Dreamy, highly spiritual, artistic, compassionate, and merging with the infinite cosmic ocean." }
];

export const tarotCards: TarotCard[] = [
  { id: "fool", name: "The Fool", image: "🃏", arcana: "Major", meaningUpright: "New beginnings, absolute faith, pure innocence, and spontaneous adventures.", meaningReversed: "Recklessness, fear of taking a leap of faith, holding back, or bad timing." },
  { id: "magician", name: "The Magician", image: "🧙‍♂️", arcana: "Major", meaningUpright: "Manifestation, alignment of forces, resourcefulness, willpower, and skill mastery.", meaningReversed: "Illusions, wasted talent, deception, or manipulation of intentions." },
  { id: "priestess", name: "The High Priestess", image: "🧝‍♀️", arcana: "Major", meaningUpright: "Intuition, hidden wisdom, spiritual guidance, subconscious knowledge, and stillness.", meaningReversed: "Secret motives, ignored instincts, surface-level focus, or superficial insights." },
  { id: "empress", name: "The Empress", image: "👑", arcana: "Major", meaningUpright: "Abundance, supreme fertility, nature, luxury, creation, and motherly protection.", meaningReversed: "Creative block, dependency, stagnation, or disharmony in family cycles." },
  { id: "emperor", name: "The Emperor", image: "🏰", arcana: "Major", meaningUpright: "Authority, solid structure, stability, protective father-figure, and systemic control.", meaningReversed: "Rigidity, tyrannical behavior, powerlessness, or ineffective discipline." },
  { id: "hierophant", name: "The Hierophant", image: "📿", arcana: "Major", meaningUpright: "Traditional values, spiritual mentors, conformity, institutional learning, and ethics.", meaningReversed: "Rebellion, custom paths, unconventional spirituality, or dogmatic views." },
  { id: "lovers", name: "The Lovers", image: "💑", arcana: "Major", meaningUpright: "Harmonious relationships, deep alignment, choices, mutual attraction, and self-worth.", meaningReversed: "Inner friction, misaligned priorities, broken ties, or poor decisions." },
  { id: "chariot", name: "The Chariot", image: "🛒", arcana: "Major", meaningUpright: "Willpower, focus, sudden speed, conquest, determination, and overcoming barriers.", meaningReversed: "Loss of control, directionless pacing, inner anger, or blocks." },
  { id: "strength", name: "Strength", image: "🦁", arcana: "Major", meaningUpright: "Gentle courage, patience, taming impulses, inner stamina, and spiritual composure.", meaningReversed: "Self-doubt, raw animal impulses, weakness of spirit, or pride." },
  { id: "hermit", name: "The Hermit", image: "🕯️", arcana: "Major", meaningUpright: "Solitude, searching within, spiritual reflection, finding your path, and wise advisors.", meaningReversed: "Isolation, loneliness, refusing counsel, or paranoia." },
  { id: "wheel", name: "Wheel of Fortune", image: "🎡", arcana: "Major", meaningUpright: "Good luck, destiny shifts, cycles, positive karmic flow, and sudden breakthroughs.", meaningReversed: "Bad luck, bad karma, repeating negative loops, or fighting changes." },
  { id: "justice", name: "Justice", image: "⚖️", arcana: "Major", meaningUpright: "Karmic balance, truth, absolute fairness, legal resolutions, and high integrity.", meaningReversed: "Injustice, refusal of truth, bias, or unresolved arguments." }
];

export const festivalCalendar = [
  { name: "Makar Sankranti", date: "Jan 14, 2026", significance: "Sun enters Capricorn, marking the harvest festival and longer solar days." },
  { name: "Maha Shivratri", date: "Feb 15, 2026", significance: "The great night of Lord Shiva. Ideal for fasting and deep meditative chanting." },
  { name: "Holi", date: "Mar 03, 2026", significance: "The festival of vibrant colors, triumph of truth, and spring renewal." },
  { name: "Rama Navami", date: "Mar 27, 2026", significance: "Celebrates the birth of Lord Rama, the embodiment of righteousness." },
  { name: "Hanuman Jayanti", date: "Apr 11, 2026", significance: "Birth anniversary of Lord Hanuman, the symbol of absolute devotion and cosmic strength." },
  { name: "Guru Purnima", date: "Jul 29, 2026", significance: "Day dedicated to express gratitude to spiritual mentors and teachers." },
  { name: "Raksha Bandhan", date: "Aug 27, 2026", significance: "Celebrating the sacred bond of love and protection between siblings." },
  { name: "Ganesh Chaturthi", date: "Sep 15, 2026", significance: "Welcoming the Lord of auspicious beginnings and remover of obstacles." },
  { name: "Navratri & Dussehra", date: "Oct 10-20, 2026", significance: "Nine nights of Goddess Durga's power, culminating in Vijayadashami victory." },
  { name: "Diwali (Deepavali)", date: "Nov 08, 2026", significance: "Festival of Lights. Return of Lord Rama and welcoming of Goddess Lakshmi." }
];

export const muhurats = [
  { purpose: "Vivah (Marriage)", dates: "Nov 12, Nov 18, Dec 02, Dec 14", planetaryAlignment: "Jupiter-Venus favorable positions" },
  { purpose: "Griha Pravesh (Housewarming)", dates: "Jul 15, Aug 05, Oct 12, Oct 28", planetaryAlignment: "Auspicious fourth-house aspects" },
  { purpose: "Vyaapaar Arambh (Business Launch)", dates: "Jul 11, Jul 20, Sep 08, Nov 11", planetaryAlignment: "Mercury strong in its own sign or exaltation" },
  { purpose: "Vahan Kharidi (Vehicle Purchase)", dates: "Jul 09, Jul 18, Aug 22, Sep 19", planetaryAlignment: "Venus in mutual quadrant with Moon" }
];

export const gemstones = [
  { name: "Yellow Sapphire (Pukhraj)", planet: "Jupiter (Guru)", benefits: "Wisdom, financial luck, higher education, marital bliss.", rules: "Wear in gold on the index finger of the right hand on Thursday morning." },
  { name: "Blue Sapphire (Neelam)", planet: "Saturn (Shani)", benefits: "Sudden fortune, career protection, strong focus, clarity.", rules: "Wear in silver or white gold on the middle finger on Saturday evening after testing." },
  { name: "Ruby (Manik)", planet: "Sun (Surya)", benefits: "Vitality, administrative power, fame, parental harmony.", rules: "Wear in copper or gold on the ring finger on Sunday morning." },
  { name: "Emerald (Panna)", planet: "Mercury (Budha)", benefits: "Intellectual sharpness, business success, vocal clarity.", rules: "Wear in gold or silver on the little finger on Wednesday morning." },
  { name: "Red Coral (Moonga)", planet: "Mars (Mangal)", benefits: "Courage, physical stamina, leadership, resolving debt.", rules: "Wear in copper or gold on the ring finger on Tuesday morning." },
  { name: "Diamond (Heera) / White Sapphire", planet: "Venus (Shukra)", benefits: "Artistic expression, luxury, charm, satisfying romance.", rules: "Wear in platinum or silver on the middle/ring finger on Friday morning." }
];

export const faqs = [
  { question: "What is Vedic Astrology (Jyotish)?", answer: "Vedic Astrology is an ancient Indian system of stellar observation. Unlike Western tropical astrology which is aligned with seasons, Jyotish uses the Sidereal zodiac, calculating the actual current coordinates of planets relative to the constellations." },
  { question: "How does Guna Milan matching work?", answer: "We evaluate 8 dimensional grids (Ashtakoota) between birth star profiles of both partners. A matching score of 18 is required for marriage, while 25-32 indicates excellent compatibility." },
  { question: "Are the gemstones recommended here authentic?", answer: "Our recommendations are strictly based on classical Vedic texts, considering planetary strength (Shadbala). Always purchase natural unheated gemstones with reliable laboratory certificates." },
  { question: "How does the AI Astrology Consultation operate?", answer: "Our system combines traditional mathematical alignments of houses and Dashas with the Google Gemini model. It acts as an elite certified Vedic Master, offering immediate, deeply empathetic personal remedies." }
];
