import Header from "@/components/Header";
import SkillGraph from "@/components/SkillGraph";
import DailyQuest from "@/components/DailyQuest";
import GamificationStats from "@/components/GamificationStats";
import WeeklyHackathon from "@/components/WeeklyHackathon";
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
  Lightbulb
} from "lucide-react";

const Index = () => {
  const upcomingEvents = [
    { type: "Quest", title: "Debug Challenge", time: "Tomorrow" },
    { type: "Hackathon", title: "Mobile App Challenge", time: "This Weekend" },
    { type: "Learning", title: "AI Fundamentals", time: "Next Week" },
  ];

  const insights = [
    "Your React skills improved 15% this week!",
    "You're on track to reach Level 13 by next month",
    "Consider exploring System Design - it's trending in your network"
  ];

  return (
    <div className="min-h-screen bg-background">
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
            {/* Daily Quest */}
            <DailyQuest />
            
            {/* Weekly Hackathon */}
            <WeeklyHackathon />
            
            {/* Skill Graph */}
            <SkillGraph />
          </div>

          {/* Right Column - Stats & Info */}
          <div className="space-y-6">
            {/* Gamification Stats */}
            <div className="space-y-4">
              <GamificationStats />
            </div>

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

            {/* Upcoming Events */}
            <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
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
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Generate New Quest
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Progress Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find Study Buddy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
