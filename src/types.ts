export interface Astrologer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  languages: string[];
  rating: number;
  reviewsCount: number;
  rate: number;
  status: "Online" | "Busy" | "Offline";
  verified: boolean;
  bio: string;
  avatar: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  readTime: string;
  date: string;
  likes: number;
}

export interface SavedKundli {
  id: string;
  name: string;
  dob: string;
  tob: string;
  pob: string;
  gender: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  astrologerName: string;
  type: string;
  date: string;
  time: string;
  status: string;
  rate: number;
}

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  date: string;
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
}

export interface PanchangInfo {
  date: string;
  tithi: string;
  nakshatra: string;
  rithu: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  rahukalam: string;
  gulikakalam: string;
  yamaganda: string;
  abhijitMuhurat: string;
}

export interface ZodiacSign {
  name: string;
  sanskritName: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  ruler: string;
  symbol: string;
  description: string;
}

export interface TarotCard {
  id: string;
  name: string;
  image: string;
  arcana: "Major" | "Minor";
  meaningUpright: string;
  meaningReversed: string;
}
