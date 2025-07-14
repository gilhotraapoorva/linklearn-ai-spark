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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Level & XP Card */}
      <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
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
            <div className="text-center p-3 bg-background rounded-lg">
              <Target className="h-6 w-6 text-primary mx-auto mb-1" />
              <div className="text-2xl font-bold">{stats.questsCompleted}</div>
              <div className="text-xs text-muted-foreground">Quests</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg flex flex-col items-start justify-center">
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
            <Flame className="h-5 w-5 text-gamification-streak" />
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
              {stats.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 h-full min-h-[110px] min-w-0 overflow-hidden ${
                    badge.unlocked
                      ? 'border-primary bg-primary/5 hover:bg-primary/10'
                      : 'border-muted bg-muted/20 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium break-words text-center w-full">{badge.name}</div>
                  {(badge.rarity === 'epic' || badge.rarity === 'legendary') && (
                    <Badge 
                      className={`text-xs mt-1 ${getRarityColor(badge.rarity)} flex items-center justify-center w-full max-w-[80px] mx-auto truncate`}
                      variant="secondary"
                    >
                      {badge.rarity}
                    </Badge>
                  )}
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