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

interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
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

const userStats: UserStats = {
  level: 12,
  xp: 2380,
  xpToNextLevel: 2500,
  currentStreak: 7,
  longestStreak: 21,
  questsCompleted: 47,
  hackathonsCompleted: 8,
  badges: [
    {
      id: "first-quest",
      name: "First Steps",
      description: "Complete your first quest",
      icon: "🎯",
      rarity: "common",
      unlocked: true
    },
    {
      id: "week-warrior",
      name: "Week Warrior",
      description: "7-day quest streak",
      icon: "🔥",
      rarity: "rare",
      unlocked: true
    },
    {
      id: "code-ninja",
      name: "Code Ninja",
      description: "Complete 50 coding quests",
      icon: "🥷",
      rarity: "epic",
      unlocked: false
    },
    {
      id: "hackathon-hero",
      name: "Hackathon Hero",
      description: "Win 10 hackathons",
      icon: "👑",
      rarity: "legendary",
      unlocked: false
    }
  ]
};

const GamificationStats = () => {
  const xpProgress = (userStats.xp / userStats.xpToNextLevel) * 100;
  
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-muted text-muted-foreground';
      case 'rare':
        return 'bg-primary text-primary-foreground';
      case 'epic':
        return 'bg-gradient-accent text-accent-foreground';
      case 'legendary':
        return 'bg-gradient-success text-success-foreground';
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
            <div className="text-3xl font-bold text-primary">Level {userStats.level}</div>
            <div className="text-muted-foreground">
              {userStats.xp} / {userStats.xpToNextLevel} XP
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userStats.level + 1}</span>
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
              <div className="text-2xl font-bold">{userStats.questsCompleted}</div>
              <div className="text-xs text-muted-foreground">Quests</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <Zap className="h-6 w-6 text-accent mx-auto mb-1" />
              <div className="text-2xl font-bold">{userStats.hackathonsCompleted}</div>
              <div className="text-xs text-muted-foreground">Hackathons</div>
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
              <div className="text-2xl font-bold">{userStats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Current Streak</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <TrendingUp className="h-6 w-6 text-success mx-auto mb-1" />
              <div className="text-2xl font-bold">{userStats.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Award className="h-4 w-4" />
              Recent Badges
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {userStats.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    badge.unlocked
                      ? 'border-primary bg-primary/5 hover:bg-primary/10'
                      : 'border-muted bg-muted/20 opacity-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium">{badge.name}</div>
                    <Badge 
                      className={`text-xs mt-1 ${getRarityColor(badge.rarity)}`}
                      variant="secondary"
                    >
                      {badge.rarity}
                    </Badge>
                  </div>
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