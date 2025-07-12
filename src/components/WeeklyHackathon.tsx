import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Calendar, 
  Users, 
  Trophy, 
  Clock,
  Star,
  Rocket,
  GitBranch
} from "lucide-react";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  theme: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  participants: number;
  prizes: string[];
  skills: string[];
  startsIn: string;
  status: 'upcoming' | 'active' | 'completed';
}

const weeklyHackathon: Hackathon = {
  id: "hack-001",
  title: "Build a Real-time Chat App",
  description: "Create a modern chat application with real-time messaging, user authentication, and a beautiful UI. Perfect for showcasing your full-stack skills!",
  theme: "Real-time Applications",
  difficulty: "Intermediate",
  duration: "48 hours",
  participants: 1247,
  prizes: ["LinkedIn Premium (1 month)", "Exclusive Badge", "Career Mentorship"],
  skills: ["React", "WebSockets", "Node.js", "Database Design"],
  startsIn: "2 days",
  status: "upcoming"
};

const WeeklyHackathon = () => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-primary text-primary-foreground';
      case 'active':
        return 'bg-success text-success-foreground animate-pulse';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Weekly AI Hackathon
          <Badge className={getStatusColor(weeklyHackathon.status)}>
            {weeklyHackathon.status === 'upcoming' && <Calendar className="h-3 w-3 mr-1" />}
            {weeklyHackathon.status === 'active' && <Rocket className="h-3 w-3 mr-1" />}
            {weeklyHackathon.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold">{weeklyHackathon.title}</h3>
            <p className="text-muted-foreground">{weeklyHackathon.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge className={getDifficultyColor(weeklyHackathon.difficulty)}>
              {weeklyHackathon.difficulty}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {weeklyHackathon.duration}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {weeklyHackathon.participants.toLocaleString()} participants
            </Badge>
            <Badge variant="secondary">
              {weeklyHackathon.theme}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Skills You'll Practice
            </h4>
            <div className="flex flex-wrap gap-1">
              {weeklyHackathon.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent" />
              Rewards
            </h4>
            <div className="space-y-1">
              {weeklyHackathon.prizes.map((prize, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Star className="h-3 w-3 text-accent" />
                  {prize}
                </div>
              ))}
            </div>
          </div>

          {weeklyHackathon.status === 'upcoming' && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Starts in {weeklyHackathon.startsIn}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {weeklyHackathon.status === 'upcoming' ? (
            <Button variant="quest" size="quest" className="flex-1">
              <Rocket className="h-4 w-4 mr-2" />
              Register Now
            </Button>
          ) : weeklyHackathon.status === 'active' ? (
            <Button variant="success" size="quest" className="flex-1">
              <Code className="h-4 w-4 mr-2" />
              Join Hackathon
            </Button>
          ) : (
            <Button variant="secondary" size="quest" className="flex-1" disabled>
              <Trophy className="h-4 w-4 mr-2" />
              Completed
            </Button>
          )}
          <Button variant="outline" size="default">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyHackathon;