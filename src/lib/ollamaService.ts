<<<<<<< HEAD
import { auth } from './firebase';

// Define types for the quest generation
export interface QuestGenerationParams {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  skills?: string[];
  timeLimit?: string;
}

export interface GeneratedQuest {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  xpReward: number;
  category: string;
  sampleCode?: string;
  hints?: string[];
}

// Base URL for Ollama API - change this if your Ollama instance is running elsewhere
const OLLAMA_API_URL = 'http://localhost:11434';
const MODEL = 'llama3:latest'; // Using llama3 model with tag

/**
 * Generate a quest using Ollama's Llama 3 model
 */
export const generateQuest = async (params: QuestGenerationParams): Promise<GeneratedQuest> => {
  try {
    const user = auth.currentUser;
    const userId = user?.uid || 'anonymous';
    
    // Construct the prompt for the LLM
    const prompt = `
    Generate a coding quest for a developer learning platform with the following requirements:
    - Difficulty level: ${params.difficulty}
    - Category: ${params.category}
    ${params.skills ? `- Skills to focus on: ${params.skills.join(', ')}` : ''}
    ${params.timeLimit ? `- Should be completable within ${params.timeLimit}` : ''}
    
    The quest should be educational, engaging, and have a clear objective. Include a title, detailed description, 
    and optionally some starter code or hints if relevant.
    
    FORMAT YOUR RESPONSE AS JSON with the following structure:
    {
      "title": "Quest title",
      "description": "Detailed description of the quest",
      "difficulty": "${params.difficulty}",
      "estimatedTime": "Estimated time to complete (e.g., '15 min')",
      "xpReward": [number between 50-500 based on difficulty],
      "category": "${params.category}",
      "sampleCode": "Optional code snippet if relevant",
      "hints": ["Optional array of hints"]
    }
    `;

    console.log(`Generating quest with model: ${MODEL}...`);
    console.log(`Quest parameters: difficulty=${params.difficulty}, category=${params.category}`);
    
    // Add a timeout for the API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    let response;
    try {
      // Make API request to Ollama
      response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 1024,
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Ollama API error: ${error}`);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Request to Ollama API timed out after 30 seconds');
      }
      console.error('API request to Ollama failed:', error);
      throw new Error(`Failed to connect to Ollama: ${error.message}`);
    }

    console.log('Got response from Ollama');
    
    let data;
    try {
      data = await response.json();
      console.log('Parsed JSON response from Ollama');
    } catch (error) {
      console.error('Failed to parse Ollama response as JSON:', error);
      throw new Error('Invalid JSON response from Ollama');
    }
    
    // Parse the LLM response to extract the JSON
    let questData: GeneratedQuest;
    try {
      // Extract JSON from the LLM response - it might be wrapped in markdown code blocks
      const jsonMatch = data.response.match(/```json\n([\s\S]*?)\n```/) || 
                        data.response.match(/{[\s\S]*?}/);
      
      if (!jsonMatch) {
        console.error('No JSON found in response:', data.response);
        throw new Error('No valid JSON in response');
      }
                        
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      console.log('Extracted JSON string:', jsonStr);
      
      questData = JSON.parse(jsonStr);
      console.log('Successfully parsed quest data:', questData);
      
      // Ensure all required fields are present
      questData = {
        title: questData.title || `${params.category} Challenge`,
        description: questData.description || "Complete this coding challenge to improve your skills!",
        difficulty: questData.difficulty || params.difficulty,
        estimatedTime: questData.estimatedTime || "30 min",
        xpReward: questData.xpReward || (params.difficulty === 'Beginner' ? 100 : params.difficulty === 'Intermediate' ? 250 : 400),
        category: questData.category || params.category,
        sampleCode: questData.sampleCode,
        hints: questData.hints
      };
      
      return questData;
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
      console.log('Raw response:', data.response);
      
      // Return a fallback quest if parsing fails
      return {
        title: `${params.category} Challenge`,
        description: "Complete this coding challenge to improve your skills! (Note: Our AI had trouble generating a specific challenge. Please try again later.)",
        difficulty: params.difficulty,
        estimatedTime: "30 min",
        xpReward: params.difficulty === 'Beginner' ? 100 : params.difficulty === 'Intermediate' ? 250 : 400,
        category: params.category
      };
    }
  } catch (error: any) {
    console.error('Error generating quest with Ollama:', error);
    throw new Error(`Failed to generate quest: ${error.message}`);
  }
};

/**
 * Function to check if Ollama is available
 */
export const checkOllamaAvailability = async (): Promise<boolean> => {
  try {
    console.log('Checking Ollama availability...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for availability check

    const response = await fetch(`${OLLAMA_API_URL}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.log('Ollama API returned error status:', response.status);
      return false;
    }
    
    const data = await response.json();
    
    // Log all available models for debugging
    console.log('Available models:', data.models?.map((m: any) => m.name).join(', '));
    
    // Check if llama3 model is available
    const modelAvailable = data.models?.some((model: any) => model.name === MODEL) || false;
    console.log(`Llama3 model ${modelAvailable ? 'is' : 'is NOT'} available`);
    
    // If model isn't available, try checking without the tag
    if (!modelAvailable && MODEL.includes(':')) {
      const modelNameWithoutTag = MODEL.split(':')[0];
      const modelAvailableWithoutTag = data.models?.some((model: any) => 
        model.name.startsWith(modelNameWithoutTag)
      );
      console.log(`Checking for model without specific tag: ${modelNameWithoutTag} - ${modelAvailableWithoutTag ? 'found' : 'not found'}`);
      
      if (modelAvailableWithoutTag) {
        // If we find a model with the same name but different tag, use it
        const availableModel = data.models.find((model: any) => model.name.startsWith(modelNameWithoutTag));
        console.log(`Using available model: ${availableModel.name} instead of ${MODEL}`);
        // Note: We're not actually changing the MODEL constant, but letting the code know a compatible model exists
        return true;
      }
    }
    
    return modelAvailable;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('Ollama availability check timed out');
    } else {
      console.error('Error checking Ollama availability:', error);
    }
    return false;
  }
};

/**
 * Get feedback on a quest submission
 */
export const getQuestFeedback = async (
  questDetails: GeneratedQuest, 
  userSubmission: string
): Promise<string> => {
  try {
    const prompt = `
    You are evaluating a user's submission for a coding quest. 
    
    The quest details are:
    - Title: ${questDetails.title}
    - Description: ${questDetails.description}
    - Difficulty: ${questDetails.difficulty}
    - Category: ${questDetails.category}
    
    The user's submission is:
    \`\`\`
    ${userSubmission}
    \`\`\`
    
    Please provide constructive feedback on the submission. Consider:
    1. Does it fulfill the requirements?
    2. Code quality and best practices
    3. Efficiency and performance
    4. Potential improvements
    
    Provide your feedback in a friendly, encouraging tone.
    `;
    
    console.log(`Requesting feedback using model: ${MODEL}`);
    
    // Add a timeout for the API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        stream: false,
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to get feedback from Ollama');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error: any) {
    console.error('Error getting quest feedback:', error);
    return `Sorry, we couldn't generate feedback at this time: ${error.message}. Please try again later.`;
  }
};
=======
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
>>>>>>> d65057c55b34228cd9b22f828cc3fb167a48840f
