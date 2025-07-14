import Header from "@/components/Header";
import SkillGraph from "@/components/SkillGraph";
import DailyQuest from "@/components/DailyQuest";
import GamificationStats from "@/components/GamificationStats";
import WeeklyHackathon from "@/components/WeeklyHackathon";
import WeeklyWisdomQuiz from "@/components/WeeklyWisdomQuiz";
import LlamaBot from "@/components/LlamaBot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Sparkles,
  Calendar,
  BookOpen,
  Users,
  Lightbulb,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

const xpDataPreview = [
  { day: 'Mon', xp: 63 },
  { day: 'Tue', xp: 156 },
  { day: 'Wed', xp: 189 },
  { day: 'Thu', xp: 136 },
  { day: 'Fri', xp: 145 },
  { day: 'Sat', xp: 144 },
  { day: 'Sun', xp: 170 },
];
const barColors = [
  '#2563EB', // Mon - blue
  '#22C55E', // Tue - green
  '#F59E42', // Wed - orange
  '#F43F5E', // Thu - red
  '#A21CAF', // Fri - purple
  '#FACC15', // Sat - yellow
  '#06B6D4', // Sun - teal
];

const Index = () => {
  const navigate = useNavigate();
  
  const upcomingEvents = [
    // { type: "Quest", title: "Debug Challenge", time: "Tomorrow" },
    // { type: "Hackathon", title: "Mobile App Challenge", time: "This Weekend" },
    // { type: "Learning", title: "AI Fundamentals", time: "Next Week" },
  ];

  const insights = [
    "Your React skills improved 15% this week!",
    "You're on track to reach Level 13 by next month",
    "Consider exploring System Design - it's trending in your network"
  ];

  const handleViewProgressReport = () => {
    navigate('/progress');
  };

  const handleRedeemXP = () => {
    navigate('/redeem-xp');
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, Alex! 
            <Sparkles className="inline-block ml-2 h-6 w-6 text-primary animate-pulse-glow" />
          </h1>
          <p className="text-muted-foreground">
            Ready to level up your skills today? Your learning journey continues!
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Weekly Wisdom Quiz (now first) */}
            <div data-section="weekly-quiz">
              <WeeklyWisdomQuiz />
            </div>

            {/* Daily Quest */}
            <div data-section="daily-quest">
              <DailyQuest />
            </div>
            
            {/* Weekly Hackathon */}
            <div data-section="weekly-hackathon">
              <WeeklyHackathon />
            </div>
            
            {/* Skill Graph */}
            <SkillGraph />
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Gamification Stats */}
            <div className="space-y-4">
              <GamificationStats />
            </div>
                   {/* Quick Actions */}
            <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Progress Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* XP Bar Chart Preview */}
                <div className="w-full flex flex-col items-center mb-2 pt-6">
                  <div className="w-full" style={{ height: 90 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={xpDataPreview} barCategoryGap={18}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#2563EB' }} />
                        <Bar dataKey="xp" radius={[10, 10, 0, 0]} >
                          {xpDataPreview.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={barColors[index]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-primary font-medium mt-1">Daily XP earned this week</div>
                </div>
                <Button 
                  variant="quest" 
                  size="quest" 
                  className="w-full justify-start"
                  onClick={handleViewProgressReport}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Detailed Progress Report
                </Button>
                {/* <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find Study Buddy
                </Button> */}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-background rounded-lg">
                    <Lightbulb className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{insight}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* XP Wallet */}
            <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  XP Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-3">
                <div className="text-2xl font-bold text-blue-900">You have <span className="text-yellow-500">achieved</span> <span className="text-yellow-500">2,380 XP!</span></div>
                <div className="italic text-blue-700 text-sm mb-2">Make your toil count!</div>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-full px-8 py-2 mt-2 shadow-lg"
                  onClick={handleRedeemXP}
                >
                  REDEEM XP
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            {/* <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300"> */}
              {/* <CardHeader> */}
                {/* <CardTitle className="flex items-center gap-2"> */}
                  {/* <Calendar className="h-5 w-5 text-primary" /> */}
                  {/* Upcoming */}
                {/* </CardTitle> */}
              {/* </CardHeader> */}
              {/* <CardContent className="space-y-3"> */}
                {/* {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-2">
                      {event.type === 'Quest' && <Target className="h-4 w-4 text-primary" />}
                      {event.type === 'Hackathon' && <Users className="h-4 w-4 text-accent" />}
                      {event.type === 'Learning' && <BookOpen className="h-4 w-4 text-success" />}
                      <div>
                        <div className="text-sm font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))} */}
              {/* </CardContent> */}
            {/* </Card> */}

     
          </div>
        </div>
      </main>
      <LlamaBot/>
    </div>
  );
};

export default Index;
