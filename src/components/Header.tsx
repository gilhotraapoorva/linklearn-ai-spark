import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Settings, 
  User, 
  Flame, 
  Trophy,
  Sparkles,
  LinkedinIcon as LinkedIn
} from "lucide-react";

const Header = () => {
  const userStats = {
    name: "Alex Johnson",
    level: 12,
    currentStreak: 7,
    notifications: 3
  };

  return (
    <header className="bg-background border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <LinkedIn className="h-8 w-8 text-primary" />
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-foreground">Learning</span>
                <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
                <span className="text-xl font-bold text-primary">Companion</span>
              </div>
            </div>
          </div>

          {/* Center Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gradient-card px-3 py-2 rounded-lg shadow-card">
              <Trophy className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Level {userStats.level}</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-card px-3 py-2 rounded-lg shadow-card">
              <Flame className="h-4 w-4 text-gamification-streak" />
              <span className="text-sm font-medium">{userStats.currentStreak} day streak</span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {userStats.notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                    {userStats.notifications}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium">{userStats.name}</div>
                <div className="text-xs text-muted-foreground">Learning Explorer</div>
              </div>
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={userStats.name} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;