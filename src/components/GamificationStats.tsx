import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Flame, 
  Target, 
  Zap, 
  Star,
  Award,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/UserContext";
import { useXP } from "@/lib/XPContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface UserStats {
  currentStreak: number;
  longestStreak: number;
  questsCompleted: number;
  hackathonsCompleted: number;
  badges: Badge[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
}

const defaultStats: UserStats = {
  currentStreak: 0,
  longestStreak: 0,
  questsCompleted: 0,
  hackathonsCompleted: 0,
  badges: []
};

const GamificationStats = () => {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const { user } = useUser();
  const { xp, level, xpToNextLevel } = useXP();
  
  useEffect(() => {
    if (!user?.uid) return;

    // Subscribe to user stats updates
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        
        setStats({
          currentStreak: data.streak || 0,
          longestStreak: data.longestStreak || 0,
          questsCompleted: Object.keys(data.completedQuests || {}).length,
          hackathonsCompleted: data.hackathonsCompleted || 0,
          badges: data.badges || []
        });
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  const xpProgress = (xp / xpToNextLevel) * 100;
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'rook':
        return 'bg-primary text-primary-foreground';
      case 'rare':
        return 'bg-primary text-primary-foreground';
      case 'epic':
        return 'bg-primary/80 text-primary-foreground';
      case 'legendary':
        return 'bg-primary/60 text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Add hardcoded recent badges from ProgressReport week
  const staticRecentBadges = [
    {
      id: "quest-streak",
      name: "Week Warrior",
      description: "Completed 7-day quest streak",
      icon: "🔥",
      rarity: "epic",
      unlocked: true
    },
    {
      id: "react-master",
      name: "React Rookie",
      description: "Completed 10 React challenges",
      icon: "⚛️",
      rarity: "rare",
      unlocked: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Level & XP Card */}
      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            Level & Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">Level {level}</div>
            <div className="text-muted-foreground">
              {xp} / {xpToNextLevel} XP
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {level + 1}</span>
              <span>{Math.round(xpProgress)}%</span>
            </div>
            <div className="relative">
              <Progress value={xpProgress} className="h-3" />
              <div 
                className="absolute top-0 left-0 h-3 bg-gradient-accent rounded-full transition-all duration-1000"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="flex flex-col items-center justify-center p-1 rounded-lg border border-gray-200 bg-white min-h-[70px] mt-3">
              <Target className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold">{stats.questsCompleted}</div>
              <div className="text-xs text-muted-foreground">Quests</div>
            </div>
            <div className="flex flex-col items-center justify-center p-1 rounded-lg border border-gray-200 bg-white min-h-[70px] mt-3">
              <Zap className="h-6 w-6 text-accent mb-1" />
              <div className="text-2xl font-bold">{stats.hackathonsCompleted}</div>
              <div className="text-xs text-muted-foreground">Hacks</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streaks & Achievements */}
      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Streaks & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background rounded-lg">
              <Flame className="h-6 w-6 text-gamification-streak mx-auto mb-1" />
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <TrendingUp className="h-6 w-6 text-success mx-auto mb-1" />
              <div className="text-2xl font-bold">{stats.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Award className="h-4 w-4" />
              Recent Badges
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {/* Show static recent badges first, then user badges */}
              {staticRecentBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center justify-center p-1 rounded-lg border transition-all duration-200 h-full min-h-[70px] min-w-0 overflow-hidden border-gray-200 bg-white`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-center w-full break-normal whitespace-normal">{badge.name}</div>
                </div>
              ))}
              {stats.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center justify-center p-1 rounded-lg border transition-all duration-200 h-full min-h-[70px] min-w-0 overflow-hidden ${
                    badge.unlocked
                      ? 'border-gray-200 bg-white'
                      : 'border-muted bg-muted/20 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-center w-full break-normal whitespace-normal">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationStats;