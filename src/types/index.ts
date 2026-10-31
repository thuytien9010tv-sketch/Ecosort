export type Language = 'vi' | 'en' | 'zh' | 'ko';
export type Theme = 'light' | 'dark';

export type BinColor = 'green' | 'yellow' | 'red' | 'black-orange';

export type WasteCategory = 'organic' | 'recyclable' | 'inorganic' | 'hazardous';

export type MaterialType =
  | 'nhua' // Plastics
  | 'giay' // Paper
  | 'nilon' // Plastic film
  | 'thuy-tinh' // Glass
  | 'kim-loai' // Metal
  | 'pin' // Batteries
  | 'vai' // Fabric
  | 'thuc-an' // Food
  | 'dien-tu' // E-waste
  | 'hoa-chat' // Chemicals
  | 'y-te' // Medical
  | 'cay-co'; // Garden

export interface WasteItem {
  id: string;
  name: Record<Language, string>;
  category: WasteCategory;
  material: MaterialType;
  binColor: BinColor;
  binName: Record<Language, string>;
  preparationGuide: Record<Language, string>;
  icon: string;
  image: string;
  tips?: Record<Language, string>;
  isMistakeProne?: boolean;
}

export interface UserRank {
  level: number;
  minPoints: number;
  title: Record<Language, string>;
  badge: string;
  description: Record<Language, string>;
}

export interface ClassificationRecord {
  id: string;
  itemId: string;
  itemName: string;
  category: WasteCategory;
  binColor: BinColor;
  pointsEarned: number;
  timestamp: number;
  note?: string;
}

export interface RecycleIdea {
  id: string;
  title: Record<Language, string>;
  material: MaterialType;
  description: Record<Language, string>;
  steps: Record<Language, string[]>;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface CommonMistake {
  id: string;
  item: Record<Language, string>;
  wrongBin: Record<Language, string>;
  correctBin: Record<Language, string>;
  reason: Record<Language, string>;
  solution: Record<Language, string>;
  image: string;
}

export interface EcoTip {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  tag: string;
}

export interface CollectionLocation {
  id: string;
  name: string;
  type: 'supermarket' | 'ewaste' | 'scrap' | 'school' | 'community';
  typeName: Record<Language, string>;
  address: string;
  city: string;
  acceptedItems: Record<Language, string>;
  notes: Record<Language, string>;
  phone?: string;
  workingHours?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  points: number;
  level: number;
  history: ClassificationRecord[];
  dailyStreak: number;
  lastActiveDate: string;
}
