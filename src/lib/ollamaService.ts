// Service to interact with Llama 3 for generating daily quests

export interface DailyQuest {
  title: string;
  description: string;
  problem: string;
  difficulty?: string;
  estimatedTime?: string;
  xpReward?: number;
  category?: string;
}

// Replace this URL with your actual Llama 3 API endpoint
const LLAMA_API_URL = "/api/generate-daily-quest";

export async function generateDailyQuest(): Promise<DailyQuest> {
  try {
    const response = await fetch(LLAMA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // You can add a body if your API expects parameters
      // body: JSON.stringify({ ... })
    });
    if (!response.ok) throw new Error("Failed to fetch daily quest");
    const data = await response.json();
    // Validate and return the expected structure
    return {
      title: data.title || "Untitled Quest",
      description: data.description || "No description provided.",
      problem: data.problem || "// No problem provided.",
      difficulty: data.difficulty,
      estimatedTime: data.estimatedTime,
      xpReward: data.xpReward,
      category: data.category,
    };
  } catch (error) {
    console.error("Error generating daily quest:", error);
    // Fallback to a default quest if needed
    return {
      title: "Error generating quest",
      description: "Could not generate a quest at this time.",
      problem: "// Please try again later.",
    };
  }
}
