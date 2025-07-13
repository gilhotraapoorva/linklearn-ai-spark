import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Calendar,
  Star,
  Flame,
  Zap,
  BookOpen,
  Code,
  Brain,
  Clock,
  ChevronUp,
  ChevronDown,
  Award,
  ArrowLeft,
  Download,
  Share2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SkillProgress {
  name: string;
  current: number;
  previous: number;
  change: number;
  category: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  date: string;
  xpEarned: number;
}

interface WeeklyStats {
  questsCompleted: number;
  hackathonsEntered: number;
  skillImprovements: number;
  xpEarned: number;
  streakDays: number;
}

const skillsProgress: SkillProgress[] = [
  { name: "React Development", current: 85, previous: 78, change: 7, category: "Frontend" },
  { name: "TypeScript", current: 70, previous: 65, change: 5, category: "Programming" },
  { name: "System Design", current: 45, previous: 40, change: 5, category: "Architecture" },
  { name: "AI/ML Basics", current: 25, previous: 18, change: 7, category: "Emerging Tech" },
  { name: "DevOps", current: 60, previous: 60, change: 0, category: "Infrastructure" },
  { name: "Data Structures", current: 80, previous: 75, change: 5, category: "Programming" },
];

const recentAchievements: Achievement[] = [
  {
    id: "quest-streak",
    name: "Week Warrior",
    description: "Completed 7-day quest streak",
    icon: "🔥",
    date: "2 days ago",
    xpEarned: 200
  },
  {
    id: "react-master",
    name: "React Rookie",
    description: "Completed 10 React challenges",
    icon: "⚛️",
    date: "5 days ago",
    xpEarned: 150
  },
  {
    id: "hackathon-participant",
    name: "Code Gladiator",
    description: "Participated in first hackathon",
    icon: "🏆",
    date: "1 week ago",
    xpEarned: 300
  }
];

const weeklyStats: WeeklyStats = {
  questsCompleted: 12,
  hackathonsEntered: 2,
  skillImprovements: 5,
  xpEarned: 890,
  streakDays: 7
};

const ProgressReport = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ChevronUp className="h-4 w-4 text-blue-500" />;
    if (change < 0) return <ChevronDown className="h-4 w-4 text-red-500" />;
    return <div className="h-4 w-4" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-blue-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Progress Report</h1>
                <p className="text-blue-600">Track your learning journey and achievements</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Frame Selector */}
        <div className="mb-8">
          <div className="flex gap-2">
            {(['week', 'month', 'quarter'] as const).map((timeframe) => (
              <Button
                key={timeframe}
                variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe)}
                className={selectedTimeframe === timeframe ? 'bg-blue-600 text-white' : 'border-blue-200 text-blue-700 hover:bg-blue-50'}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Quests Completed</p>
                  <p className="text-3xl font-bold text-blue-900">{weeklyStats.questsCompleted}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">XP Earned</p>
                  <p className="text-3xl font-bold text-blue-900">{weeklyStats.xpEarned.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Streak Days</p>
                  <p className="text-3xl font-bold text-blue-900">{weeklyStats.streakDays}</p>
                </div>
                <Flame className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Hackathons</p>
                  <p className="text-3xl font-bold text-blue-900">{weeklyStats.hackathonsEntered}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Skills Improved</p>
                  <p className="text-3xl font-bold text-blue-900">{weeklyStats.skillImprovements}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skills Progress */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Brain className="h-5 w-5 text-blue-600" />
                Skills Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsProgress.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-blue-900">{skill.name}</span>
                      <Badge variant="outline" className="border-blue-200 text-blue-700 text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600">{skill.current}%</span>
                      <div className={`flex items-center gap-1 ${getChangeColor(skill.change)}`}>
                        {getChangeIcon(skill.change)}
                        <span className="text-sm font-medium">
                          {skill.change > 0 ? '+' : ''}{skill.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Progress value={skill.current} className="h-2 bg-blue-100" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Award className="h-5 w-5 text-blue-600" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900">{achievement.name}</h4>
                    <p className="text-sm text-blue-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-500">{achievement.date}</span>
                      <Badge className="bg-blue-600 text-white">
                        <Zap className="h-3 w-3 mr-1" />
                        +{achievement.xpEarned} XP
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity Chart */}
        <Card className="bg-white border-blue-100 shadow-sm mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Calendar className="h-5 w-5 text-blue-600" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-blue-600 mb-2">{day}</div>
                    <div 
                      className="h-16 bg-blue-100 rounded-lg flex items-end justify-center relative overflow-hidden"
                    >
                      <div 
                        className="w-full bg-blue-500 rounded-lg transition-all duration-500"
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      />
                      <span className="absolute bottom-1 text-xs text-white font-medium">
                        {Math.floor(Math.random() * 150 + 50)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-sm text-blue-600">
                Daily XP earned this week
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">🚀 Strong Momentum</h4>
                <p className="text-sm opacity-90">
                  Your React skills improved by 7% this week! You're excelling in component optimization challenges.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">🎯 Focus Area</h4>
                <p className="text-sm opacity-90">
                  Consider diving deeper into System Design. It's trending in your network and complements your frontend skills.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">🏆 Next Milestone</h4>
                <p className="text-sm opacity-90">
                  You're 110 XP away from Level 13. Complete 2 more quests to reach your next level!
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">🔥 Streak Power</h4>
                <p className="text-sm opacity-90">
                  Amazing 7-day streak! Keep it going for 3 more days to unlock the "Dedication Master" badge.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressReport;
