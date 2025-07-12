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
  Flame
} from "lucide-react";
import { useState } from "react";

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  xpReward: number;
  category: string;
  completed: boolean;
  progress: number;
}

const todaysQuest: Quest = {
  id: "quest-001",
  title: "Refactor React Component for Performance",
  description: "Take this React component and optimize it by implementing React.memo, useMemo, and useCallback where appropriate. Focus on preventing unnecessary re-renders.",
  difficulty: "Intermediate",
  estimatedTime: "15 min",
  xpReward: 150,
  category: "React Optimization",
  completed: false,
  progress: 0
};

const DailyQuest = () => {
  const [currentQuest, setCurrentQuest] = useState(todaysQuest);
  const [isStarted, setIsStarted] = useState(false);

  const handleStartQuest = () => {
    setIsStarted(true);
    // Simulate progress for demo
    setTimeout(() => {
      setCurrentQuest(prev => ({ ...prev, progress: 33 }));
    }, 1000);
    setTimeout(() => {
      setCurrentQuest(prev => ({ ...prev, progress: 66 }));
    }, 2000);
    setTimeout(() => {
      setCurrentQuest(prev => ({ ...prev, progress: 100, completed: true }));
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success text-success-foreground';
      case 'Intermediate':
        return 'bg-warning text-warning-foreground';
      case 'Advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
          Today's AI Quest
          {currentQuest.completed && (
            <Badge className="bg-gradient-success text-success-foreground">
              <Trophy className="h-3 w-3 mr-1" />
              Completed!
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{currentQuest.title}</h3>
          <p className="text-muted-foreground">{currentQuest.description}</p>
          
          <div className="flex flex-wrap gap-2">
            <Badge className={getDifficultyColor(currentQuest.difficulty)}>
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