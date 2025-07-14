import { db } from './firebase';
import { doc, getDoc, setDoc, collection, Timestamp } from 'firebase/firestore';

export interface DailyQuest {
  title: string;
  description: string;
  problem: string;
  difficulty?: string;
  estimatedTime?: string;
  xpReward?: number;
  category?: string;
  date?: string;
}

// Replace this URL with your actual Llama 3 API endpoint
const LLAMA_API_URL = "/api/generate-daily-quest";

export async function generateDailyQuest(): Promise<DailyQuest> {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already have a quest for today
    const questRef = doc(db, 'dailyQuests', today);
    const questDoc = await getDoc(questRef);
    
    if (questDoc.exists()) {
      // Return existing quest for today
      return {
        ...questDoc.data() as DailyQuest,
        date: today
      };
    }

    // If no quest exists for today, generate a new one
    const response = await fetch(LLAMA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: today }) // Pass date to server for consistency
    });

    if (!response.ok) throw new Error("Failed to fetch daily quest");
    const data = await response.json();
    
    // Create the quest object
    const quest: DailyQuest = {
      title: data.title || "Untitled Quest",
      description: data.description || "No description provided.",
      problem: data.problem || "// No problem provided.",
      difficulty: data.difficulty,
      estimatedTime: data.estimatedTime,
      xpReward: data.xpReward,
      category: data.category,
      date: today
    };

    // Store the quest in Firestore
    await setDoc(questRef, {
      ...quest,
      createdAt: Timestamp.now()
    });

    return quest;
  } catch (error) {
    console.error("Error generating daily quest:", error);
    // Fallback to a default quest if needed
    return {
      title: "Error generating quest",
      description: "Could not generate a quest at this time.",
      problem: "// Please try again later.",
      date: new Date().toISOString().split('T')[0]
    };
  }
}
