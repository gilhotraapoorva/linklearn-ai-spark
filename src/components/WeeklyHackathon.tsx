import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  GitBranch,
} from "lucide-react";
// Use '/placeholder.svg' directly as the image src
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MapPin, Users as UsersIcon, Trophy as TrophyIcon, Calendar as CalendarIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { hackathonEvents } from "./LlamaBot";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  theme: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  participants: number;
  prizes: string[];
  skills: string[];
  startsIn: string;
  status: "upcoming" | "active" | "completed";
  company: string;
  location: string;
}

const upcomingHackathons: Hackathon[] = [
  {
    id: "hack-001",
    title: "Build a Real-time Chat App",
    description: "Create modern messaging solutions with cutting-edge technology",
    theme: "Real-time Applications",
    difficulty: "Intermediate",
    duration: "48 hours",
    participants: 1247,
    prizes: ["LinkedIn Premium (1 month)", "Exclusive Badge", "Career Mentorship"],
    skills: ["React", "TypeScript", "WebSockets", "Data Structures"],
    startsIn: "1 day ago",
    status: "upcoming",
    company: "Intuit",
    location: "Mountain View, CA"
  },
  {
    id: "hack-002",
    title: "AI-Powered Task Manager",
    description: "Build intelligent productivity solutions with machine learning",
    theme: "AI & Productivity",
    difficulty: "Advanced",
    duration: "72 hours",
    participants: 892,
    prizes: ["$500 Cash Prize", "Tech Conference Pass", "AI Workshop Access"],
    skills: ["React", "TypeScript", "Data Structures", "Machine Learning"],
    startsIn: "5 days",
    status: "upcoming",
    company: "Google",
    location: "Sunnyvale, CA"
  },
  {
    id: "hack-003",
    title: "Apple Innovation Challenge",
    description: "Design next-gen apps for the Apple ecosystem",
    theme: "Apple Ecosystem",
    difficulty: "Intermediate",
    duration: "36 hours",
    participants: 1563,
    prizes: ["MacBook Air M3", "App Store Feature", "Apple Developer Program"],
    skills: ["Swift", "SwiftUI", "iOS", "UI/UX"],
    startsIn: "1 week",
    status: "upcoming",
    company: "Apple",
    location: "Cupertino, CA"
  },
  {
    id: "hack-004",
    title: "Adobe Creative Hack",
    description: "Design innovative creative tools and solutions",
    theme: "Design & Creativity",
    difficulty: "Beginner",
    duration: "24 hours",
    participants: 2100,
    prizes: ["Adobe CC License (1 year)", "Adobe Design Mentorship", "Featured in Adobe Gallery"],
    skills: ["UI/UX", "Photoshop", "Illustrator", "JavaScript"],
    startsIn: "3 days",
    status: "upcoming",
    company: "Adobe",
    location: "San Jose, CA"
  },
  {
    id: "hack-005",
    title: "Tesla Mobility Challenge",
    description: "Develop next-generation mobility and transportation solutions",
    theme: "Mobility & AI",
    difficulty: "Advanced",
    duration: "60 hours",
    participants: 980,
    prizes: ["$1000 + Tesla Internship", "Tesla Campus Visit", "Engineering Mentorship"],
    skills: ["AI", "Python", "Computer Vision", "Embedded Systems"],
    startsIn: "4 days",
    status: "upcoming",
    company: "Tesla",
    location: "Austin, TX"
  },
  {
    id: "hack-006",
    title: "Xiaomi IoT Sprint",
    description: "Build smart device integrations and IoT solutions",
    theme: "Smart Devices",
    difficulty: "Intermediate",
    duration: "30 hours",
    participants: 1500,
    prizes: ["Xiaomi Flagship Phone + $300", "Xiaomi IoT Starter Kit", "Internship Opportunity"],
    skills: ["IoT", "Android", "Java", "Cloud APIs"],
    startsIn: "6 days",
    status: "upcoming",
    company: "Xiaomi",
    location: "Beijing, China"
  }
];

// Function to parse time string and return numeric value for sorting
const parseTimeToMinutes = (timeStr: string): number => {
  if (timeStr === "Active now") return 0;
  
  const timeMatch = timeStr.match(/(\d+)\s*(day|days|week|weeks|hour|hours)/i);
  if (!timeMatch) return 999999; // Put unparseable times at the end
  
  const [, value, unit] = timeMatch;
  const numValue = parseInt(value);
  
  switch (unit.toLowerCase()) {
    case 'hour':
    case 'hours':
      return numValue * 60;
    case 'day':
    case 'days':
      return numValue * 24 * 60;
    case 'week':
    case 'weeks':
      return numValue * 7 * 24 * 60;
    default:
      return 999999;
  }
};

// Sort hackathons by time remaining (soonest first)
const sortedHackathons = [...upcomingHackathons].sort((a, b) => {
  return parseTimeToMinutes(a.startsIn) - parseTimeToMinutes(b.startsIn);
});

// Set the first hackathon (soonest) as live (active)
if (sortedHackathons.length > 0) {
  sortedHackathons[0].status = "active";
}

// Mock data for upcoming hackathons
const companyNames = [
  "Intuit",
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Tesla",
  "Spotify",
  "Adobe",
  "Stripe",
];

const companyLogos: Record<string, string> = {
  Intuit: "/intuit.svg",
  Google:
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  Microsoft:
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  Amazon:
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  Netflix:
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  Tesla: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  Spotify:
    "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  Adobe: "/adobe.svg",
  Stripe:
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Stripe_Logo%2C_revised_2016.svg",
  Xiaomi: "/xiaomi.svg",
  Apple: "/apple.svg",
};

function getRandomCompany(index: number) {
  // Use index to get a deterministic but varied company name
  return companyNames[index % companyNames.length];
}

const WeeklyHackathon = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Listen for chatbot state changes
  useEffect(() => {
    const unsubscribe = hackathonEvents.listen((data) => {
      if (data.type === 'chatbotStateChange') {
        setIsChatbotOpen(data.isOpen);
      }
    });

    // Set initial state
    setIsChatbotOpen(hackathonEvents.isChatbotOpen());

    return unsubscribe;
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    // Make all difficulties colorless
    return "bg-transparent text-foreground border border-border";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-primary text-primary-foreground";
      case "active":
        return "bg-destructive text-destructive-foreground animate-pulse";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const [selectedHackathon, setSelectedHackathon] = React.useState<Hackathon | null>(null);

  const handleHackathonClick = (hackathon: Hackathon) => {
    // Navigate to hackathon details page
    navigate(`/hackathon/${hackathon.id}`);
  };

  // Drag-to-scroll logic
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
    document.body.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = '';
  };
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = x - startX.current;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  // Render horizontally scrollable cards
  const renderCarousel = () => (
    <Card className="bg-gradient-card shadow-lg p-2 mb-2 border border-border rounded-xl w-full max-w-full min-w-0 overflow-x-auto overflow-y-visible">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-neutral-900">
          <Trophy className="h-5 w-5 text-primary" />
          Upcoming Hackathons
        </CardTitle>
        {/* Active indicator when chatbot is open */}
        {isChatbotOpen && (
          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600 font-medium">Pixie Analysis Active</span>
            <span className="text-muted-foreground">- Hover over hackathons for instant insights</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0 pb-1 px-6 overflow-visible">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto overflow-y-visible pb-2 pt-4 px-2 cursor-grab select-none min-h-[280px] w-full"
          style={{ 
            WebkitOverflowScrolling: 'touch', 
            scrollBehavior: 'smooth', 
            userSelect: isDragging.current ? 'none' : 'auto',
            margin: '-16px',
            padding: '16px 16px 8px 16px'
          }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {sortedHackathons.map((hackathon, idx) => {
            const logo = companyLogos[hackathon.company] || '/placeholder.svg';
            // User skills for matching
            const userSkills = [
              "React Development",
              "TypeScript",
              "System Design",
              "AI/ML Basics",
              "DevOps",
              "Data Structures",
            ];
            // Normalize for matching
            const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
            const normalizedHackathonSkills = hackathon.skills.map(s => s.toLowerCase());
            // For the third hackathon (idx === 2), check for skill match
            const isForYou = idx === 2 && normalizedHackathonSkills.some(skill => normalizedUserSkills.some(userSkill => skill.includes(userSkill.split(" ")[0])));
            return (
              <div key={hackathon.id} className="w-[340px] h-[240px] flex-shrink-0 p-2">
                <div
                  className={`rounded-2xl shadow-2xl border-0 p-4 h-full flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:border-primary/60 hover:border-2 hover:ring-4 hover:ring-primary/10 cursor-pointer ${isForYou ? 'shine-outline-for-you' : ''}`}
                  onClick={() => setSelectedHackathon(hackathon)}
                  onMouseEnter={() => {
                    // Only emit hover event if chatbot is open
                    if (isChatbotOpen) {
                      hackathonEvents.emit({
                        type: 'hover',
                        hackathon: hackathon
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    // Only emit hover end event if chatbot is open
                    if (isChatbotOpen) {
                      hackathonEvents.emit({
                        type: 'hoverEnd'
                      });
                    }
                  }}
                  style={{ background: isForYou ? 'linear-gradient(135deg, #fff 0%, #f6faff 60%, #f3f6fb 100%)' : '#fff' }}
                >
                  <div className="relative z-10 flex flex-col flex-1 min-h-0">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={logo}
                        alt={`${hackathon.company} Logo`}
                        className="h-8 w-8 rounded-full border-2 border-primary/30 bg-white object-contain shadow-lg"
                      />
                      <span className="text-xs font-bold text-primary/90 tracking-widest uppercase bg-primary/10 px-2 py-0.5 rounded-lg shadow-inner backdrop-blur-md">
                        {hackathon.company}
                      </span>
                      {hackathon.company === 'Apple' ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Star className="h-5 w-5 text-green-500 cursor-pointer ml-1 z-[999999]" />
                          </TooltipTrigger>
                          <TooltipContent 
                            side="bottom" 
                            align="center" 
                            className="w-48 text-left z-[99999] drop-shadow-2xl"
                          >
                            <span className="block text-xs font-semibold text-primary mb-1">This hackathon matches your skillset.</span>
                          </TooltipContent>
                        </Tooltip>
                      ) : isForYou && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Star className="h-4 w-4 text-green-500 cursor-pointer ml-1 z-[999999]" />
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            align="center" 
                            className="w-48 text-left z-[99999] drop-shadow-2xl"
                          >
                            <span className="block text-xs font-semibold text-primary mb-1">Recommended for You</span>
                            <span className="text-xs text-muted-foreground">This hackathon is recommended because it matches your skill set.</span>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <Code className="h-4 w-4 text-accent" />
                      <span className="text-sm font-extrabold text-neutral-900 leading-tight drop-shadow-sm truncate">
                        {hackathon.title}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 items-center mb-2">
                      {hackathon.status === "active" && (
                        <Badge className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white animate-pulse">
                          LIVE
                        </Badge>
                      )}
                      <Badge
                        className={
                          getDifficultyColor(hackathon.difficulty) +
                          " px-2 py-0.5 rounded-full text-[10px] font-bold"
                        }
                      >
                        {hackathon.difficulty}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      >
                        <Clock className="h-3 w-3" />
                        {hackathon.duration}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      >
                        <Users className="h-3 w-3" />
                        {hackathon.participants.toLocaleString()}
                      </Badge>
                      <Badge
                        variant="secondary"
                        style={{ whiteSpace: "nowrap", alignSelf: "center" }}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary text-white border-primary border"
                      >
                        {hackathon.theme}
                      </Badge>
                    </div>
                    <div className="text-[10px] text-primary font-bold flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3" />
                      {hackathon.status === "active" ? `Started ${hackathon.startsIn}` : hackathon.startsIn}
                    </div>
                    <Button
                      variant={hackathon.status === "active" ? "success" : "outline"}
                      size="sm"
                      className={
                        hackathon.status === "active"
                          ? "w-full mt-1 flex-shrink-0 text-xs py-1 px-2 h-7 font-semibold bg-green-600 text-white hover:bg-green-700"
                          : "w-full mt-1 flex-shrink-0 text-xs py-1 px-2 h-7 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                      }
                    >
                      {hackathon.status === "active" ? "Join" : "Register"}
                    </Button>
                  </div>
                  {/* Subtle animated rainbow border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow:
                        "0 0 0 4px #fff, 0 0 0 8px #ffb6ff, 0 0 0 12px #b5ffff, 0 0 0 16px #baffc9, 0 0 0 20px #ffe29a",
                    }}
                  />
                  {isForYou && (
                    <div className="fixed left-1/2" style={{top: 'calc(100% + 16px)', transform: 'translateX(-50%)'}}>
                      <div className="bg-white/95 text-primary text-xs rounded-lg shadow-xl p-4 border border-primary font-medium text-left w-72 z-[9999]">
                        <span className="block text-sm font-semibold text-primary mb-1">Recommended for You</span>
                        <span className="text-xs text-muted-foreground">This hackathon aligns with your skill set, increasing your chances of success and learning impact.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      {/* Modal Popup for Hackathon Details */}
      <Dialog
        open={!!selectedHackathon}
        onOpenChange={(open) => !open && setSelectedHackathon(null)}
      >
        <DialogContent className="max-w-2xl p-0 bg-transparent shadow-none border-none">
          <div
            className="rounded-3xl overflow-hidden p-0 pb-0 text-center relative bg-white"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
            }}
          >
            {/* Company logo in the background, top-left */}
            {selectedHackathon && (
              <img
                src={companyLogos[selectedHackathon.company] || '/placeholder.svg'}
                alt="Company Logo"
                className="absolute left-6 top-6 h-12 w-12 rounded-full bg-white/80 shadow-lg border-2 border-white z-10"
                style={{objectFit: 'contain'}}
              />
            )}
            {/* HEADER: Make this blue */}
            <div className="bg-blue-600 px-8 pt-12 pb-6 text-center">
              <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg">
                {selectedHackathon?.title}
              </h2>
              <div className="text-lg font-medium text-white/80 mb-2">
                {selectedHackathon?.theme}
              </div>
              {/* Prizes */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {selectedHackathon?.prizes?.map((prize, i) => (
                  <Badge key={i} className="bg-white text-blue-600 border-blue-200 border font-semibold px-3 py-1 rounded-full text-xs">
                    <Trophy className="inline-block h-4 w-4 mr-1 text-blue-500" />
                    {prize}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {/* Scrollable Info Section */}
          <div className="bg-white px-8 pt-4 pb-24 rounded-b-3xl max-h-[350px] overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <CalendarIcon className="h-6 w-6 text-blue-500 mb-2" />
                <div className="text-xs text-blue-600">Date</div>
                <div className="font-bold text-base text-blue-600">
                  {selectedHackathon?.status === "active" 
                    ? `Started ${selectedHackathon.startsIn}`
                    : selectedHackathon?.startsIn
                      ? `Starts in ${selectedHackathon.startsIn}`
                      : ""}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <MapPin className="h-6 w-6 text-blue-500 mb-2" />
                <div className="text-xs text-blue-600">Location</div>
                <div className="font-bold text-base text-blue-600">{selectedHackathon?.location}</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <UsersIcon className="h-6 w-6 text-blue-500 mb-2" />
                <div className="text-xs text-blue-600">Participants</div>
                <div className="font-bold text-base text-blue-600">
                  {selectedHackathon?.participants?.toLocaleString()}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <TrophyIcon className="h-6 w-6 text-blue-500 mb-2" />
                <div className="text-xs text-blue-600">Prizes</div>
                <div className="font-bold text-base text-blue-600">
                  {selectedHackathon?.prizes?.join(", ")}
                </div>
              </div>
            </div>
            <div className="text-left mb-2 flex items-center gap-2 text-blue-700 font-bold text-lg">
              <Star className="h-5 w-5 text-blue-500" />
              About this Hackathon
            </div>
            <div className="text-blue-700 text-base mb-2">
              {selectedHackathon?.description}
            </div>
            {/* Steps as bullet points */}
            <ul className="list-disc pl-6 text-blue-700 text-base mb-2">
              <li>Online Assessment</li>
              <li>Ideathon</li>
              <li>Project Submission</li>
            </ul>
            <div className="text-blue-700 text-sm mb-4">
              Skills: {selectedHackathon?.skills?.join(", ")}
            </div>
          </div>
          {/* Register/Enter Button at Center Bottom */}
          <div className="absolute left-0 right-0 bottom-0 flex justify-center pb-6">
            <Button 
              size="lg" 
              className={`bg-primary text-primary-foreground px-8 py-3 rounded-full shadow-lg`}
              onClick={() => selectedHackathon && handleHackathonClick(selectedHackathon)}
            >
              View Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );

  return (
    <div>
      {renderCarousel()}
    </div>
  );
};

export default WeeklyHackathon;