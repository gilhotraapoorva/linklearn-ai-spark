import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Sparkles, 
  Clock, 
  Star, 
  CheckCircle, 
  PlayCircle,
  Trophy,
  Flame,
  Calendar,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateDailyQuest } from "@/lib/ollamaService";
import type { DailyQuest as DailyQuestType } from "@/lib/ollamaService";

interface Quest extends DailyQuestType {
  id: string;
  completed: boolean;
  progress: number;
}

const DailyQuest = () => {
  const navigate = useNavigate();
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const localKey = `quest-${today}`;
    // Remove any old quest data (optional: clear all keys that start with 'quest-' except today)
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('quest-') && key !== localKey) {
        localStorage.removeItem(key);
      }
    });

    const cachedQuest = localStorage.getItem(localKey);
    if (cachedQuest) {
      try {
        const quest = JSON.parse(cachedQuest);
        // Check if the quest date matches today
        if (quest.date === today) {
          setCurrentQuest(quest);
          setIsLoading(false);
          return;
        } else {
          // Date mismatch, erase and fetch new
          localStorage.removeItem(localKey);
        }
      } catch (e) {
        // Parsing error, erase and fetch new
        localStorage.removeItem(localKey);
      }
    }
    // If not found or invalid, fetch new
    fetchTodaysQuestAndCache(localKey, today);
  }, []);

  // Helper to fetch and cache today's quest
  const fetchTodaysQuestAndCache = async (localKey: string, today: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const quest = await generateDailyQuest();
      const questWithDate = { ...quest, id: `quest-${today}`, date: today, completed: false, progress: 0 };
      localStorage.setItem(localKey, JSON.stringify(questWithDate));
      setCurrentQuest(questWithDate);
    } catch (err) {
      setError("Failed to load today's quest");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuest = () => {
    if (!currentQuest) return;
    navigate(`/quest/${currentQuest.id}`, { 
      state: { 
        quest: {
          ...currentQuest,
          // Ensure all required fields are passed
          title: currentQuest.title,
          description: currentQuest.description,
          problem: currentQuest.problem,
          difficulty: currentQuest.difficulty,
          estimatedTime: currentQuest.estimatedTime,
          xpReward: currentQuest.xpReward,
          category: currentQuest.category,
          date: currentQuest.date
        }
      } 
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'easy':
        return 'bg-green-500 text-white';
      case 'intermediate':
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'advanced':
      case 'hard':
        return 'bg-red-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
        <CardContent className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading today's quest...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !currentQuest) {
    return (
      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
        <CardContent className="flex items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <p className="text-destructive">Failed to load quest</p>
            <Button onClick={() => fetchTodaysQuestAndCache(`quest-${new Date().toISOString().slice(0, 10)}`, new Date().toISOString().slice(0, 10))} variant="outline" size="sm">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
      {/* CardHeader with heading removed */}
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 mt-2">
            <Calendar className="h-4 w-4" />
            <span>Today's Quest</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">{currentQuest.title}</h2>
          
          <p className="text-muted-foreground">{currentQuest.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <Badge className={`${getDifficultyColor(currentQuest.difficulty || '')} pointer-events-none`}>
              {currentQuest.difficulty}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {currentQuest.estimatedTime}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="h-3 w-3 text-accent" />
              {currentQuest.xpReward} XP
            </Badge>
            <Badge variant="secondary">
              {currentQuest.category}
            </Badge>
          </div>

          {(isStarted || currentQuest.progress > 0) && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {currentQuest.progress}%
                </span>
              </div>
              <div className="relative">
                <Progress value={currentQuest.progress} className="h-3" />
                <div 
                  className="absolute top-0 left-0 h-3 bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${currentQuest.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!isStarted && !currentQuest.completed ? (
            <Button 
              variant="quest" 
              size="quest" 
              onClick={handleStartQuest}
              className="flex-1"
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Start Quest
            </Button>
          ) : currentQuest.completed ? (
            <div className="flex gap-2 w-full">
              <Button variant="success" size="quest" className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Quest Complete!
              </Button>
              <Button variant="gamified" size="default">
                <Flame className="h-4 w-4 mr-1" />
                +{currentQuest.xpReward} XP
              </Button>
            </div>
          ) : (
            <Button variant="secondary" size="quest" className="flex-1" disabled>
              <Clock className="h-4 w-4 mr-2" />
              In Progress...
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyQuest;