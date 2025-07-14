import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  // Settings, 
  User, 
  Flame, 
  Trophy,
  Sparkles,
  LinkedinIcon as LinkedIn,
  Clock,
  Target,
  Rocket
} from "lucide-react";
import linkedinLogo from '/linkedin.svg';
import { useUser } from "../lib/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const userStats = {
    name: "Alex Johnson",
    // level: 12,
    // currentStreak: 7,
    notifications: 3
  };

  const notifications = [
    {
      id: 1,
      icon: Clock,
      title: "Daily AI Quest Ending Soon",
      message: "5 hours remaining for today's AI quest",
      time: "5 hours left",
      type: "warning",
      action: () => {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector('[data-section="daily-quest"]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    {
      id: 2,
      icon: Target,
      title: "Weekly Wisdom Quiz",
      message: "1 day remaining for weekly wisdom quiz",
      time: "1 day left",
      type: "info",
      action: () => {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector('[data-section="weekly-wisdom"]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    {
      id: 3,
      icon: Rocket,
      title: "Intuit Hackathon Started!",
      message: "Intuit hackathon has started - join now!",
      time: "Just started",
      type: "success",
      action: () => {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector('[data-section="hackathons"]');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  ];

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-4 border-l-amber-500 bg-amber-50 hover:bg-amber-100';
      case 'success':
        return 'border-l-4 border-l-green-500 bg-green-50 hover:bg-green-100';
      case 'info':
      default:
        return 'border-l-4 border-l-blue-500 bg-blue-50 hover:bg-blue-100';
    }
  };

  const getIconStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'text-amber-600';
      case 'success':
        return 'text-green-600';
      case 'info':
      default:
        return 'text-blue-600';
    }
  };

  const username = user?.email ? user.email.split("@")[0] : "Guest";

  return (
    <header className="bg-white/90 backdrop-blur border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src={linkedinLogo} alt="LinkedIn Logo" className="h-8 w-8" />
              </a>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-foreground">Learning</span>
                <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
                <span className="text-xl font-bold text-primary">Companion</span>
              </div>
            </div>
          </div>

          {/* Center Stats */}
          <div className="hidden md:flex items-center gap-4">
            {/* <div className="flex items-center gap-2 bg-gradient-card px-3 py-2 rounded-lg shadow-card">
              <Trophy className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Level {userStats.level}</span>
            </div> */}
            {/* <div className="flex items-center gap-2 bg-gradient-card px-3 py-2 rounded-lg shadow-card">
              <Flame className="h-4 w-4 text-gamification-streak" />
              <span className="text-sm font-medium">{userStats.currentStreak} day streak</span>
            </div> */}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {userStats.notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                        {userStats.notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-0">
                  <div className="px-4 py-3 border-b border-border">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <p className="text-sm text-muted-foreground">{notifications.length} new notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <DropdownMenuItem
                          key={notification.id}
                          className={`p-4 cursor-pointer transition-colors ${getNotificationStyles(notification.type)}`}
                          onClick={notification.action}
                        >
                          <div className="flex gap-3 w-full">
                            <div className={`flex-shrink-0 ${getIconStyles(notification.type)}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <p className="font-medium text-sm text-foreground">
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                  <div className="px-4 py-3 border-t border-border">
                    <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
                      Mark all as read
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Settings
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button> */}

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium">{username}</div>
                <div className="text-xs text-muted-foreground">Learning Explorer</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 cursor-pointer">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={username} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => alert('Signed out!')} className="text-destructive">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;