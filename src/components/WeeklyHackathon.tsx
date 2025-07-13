import React from "react";
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
  Info,
} from "lucide-react";
import placeholderLogo from "/public/placeholder.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MapPin, Users as UsersIcon, Trophy as TrophyIcon, Calendar as CalendarIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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
}

const weeklyHackathon: Hackathon = {
  id: "hack-001",
  title: "Build a Real-time Chat App",
  description:
    "Create a modern chat application with real-time messaging, user authentication, and a beautiful UI. Build group chats, direct messages, and notifications. Showcase your full-stack skills and deliver a seamless, engaging user experience.",
  theme: "Real-time Applications",
  difficulty: "Intermediate",
  duration: "48 hours",
  participants: 1247,
  prizes: ["500 XP", "Exclusive Badge", "Career Mentorship"],
  skills: ["React", "WebSockets", "Node.js", "Database Design"],
  startsIn: "2 days",
  status: "upcoming",
};

// Mock data for upcoming hackathons
const upcomingHackathons: Hackathon[] = [
  {
    id: "hack-001",
    title: "Build a Real-time Chat App",
    description:
      "Create a modern chat application with real-time messaging, user authentication, and a beautiful UI. Build group chats, direct messages, and notifications. Showcase your full-stack skills and deliver a seamless, engaging user experience.",
    theme: "Real-time Applications",
    difficulty: "Intermediate",
    duration: "48 hours",
    participants: 1247,
    prizes: ["500 XP", "Exclusive Badge", "Career Mentorship"],
    skills: ["React", "WebSockets", "Node.js", "Database Design"],
    startsIn: "2 days",
    status: "upcoming",
  },
  {
    id: "hack-002",
    title: "AI-Powered To-Do App",
    description:
      "Build a smart to-do app that uses AI to suggest tasks and optimize productivity. Integrate natural language processing for voice or text input, and use machine learning to prioritize, categorize, and analyze tasks for better daily management.",
    theme: "AI Productivity",
    difficulty: "Beginner",
    duration: "24 hours",
    participants: 980,
    prizes: ["300 XP", "AI Badge"],
    skills: ["React", "Python", "AI APIs"],
    startsIn: "5 days",
    status: "upcoming",
  },
  {
    id: "hack-003",
    title: "Data Visualization Dashboard",
    description:
      "Create a dashboard to visualize complex datasets interactively. Use charts, graphs, and filters to help users explore data trends and insights. Focus on usability, performance, and beautiful, responsive design for all devices.",
    theme: "Data Science",
    difficulty: "Advanced",
    duration: "72 hours",
    participants: 650,
    prizes: ["700 XP", "Data Badge", "Mentorship"],
    skills: ["React", "D3.js", "Node.js"],
    startsIn: "1 week",
    status: "upcoming",
  },
  {
    id: "hack-004",
    title: "Blockchain Voting System",
    description:
      "Design a secure, transparent voting platform using blockchain technology. Implement smart contracts for vote validation and real-time results. Focus on privacy, scalability, and a user-friendly interface for all participants.",
    theme: "Blockchain",
    difficulty: "Intermediate",
    duration: "36 hours",
    participants: 800,
    prizes: ["400 XP", "Blockchain Badge"],
    skills: ["React", "Solidity", "Web3.js"],
    startsIn: "9 days",
    status: "upcoming",
  },
  {
    id: "hack-005",
    title: "Health Tracker App",
    description:
      "Build a health tracker that monitors daily activity, sleep, and nutrition. Integrate data visualization and personalized recommendations. Ensure privacy and accessibility for users of all ages and backgrounds.",
    theme: "Health & Wellness",
    difficulty: "Beginner",
    duration: "30 hours",
    participants: 1100,
    prizes: ["350 XP", "Health Badge"],
    skills: ["React Native", "Firebase", "Chart.js"],
    startsIn: "12 days",
    status: "upcoming",
  },
  {
    id: "hack-006",
    title: "E-Commerce Recommendation Engine",
    description:
      "Create a recommendation engine for an e-commerce site using collaborative filtering and AI. Display personalized product suggestions and analyze user behavior for improved shopping experiences.",
    theme: "E-Commerce AI",
    difficulty: "Advanced",
    duration: "60 hours",
    participants: 950,
    prizes: ["600 XP", "E-Commerce Badge", "Mentorship"],
    skills: ["React", "Python", "TensorFlow"],
    startsIn: "2 weeks",
    status: "upcoming",
  },
];

// Set the first hackathon as live (active)
if (upcomingHackathons.length > 0) {
  upcomingHackathons[0].status = "active";
}

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
  Adobe:
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/Adobe_Corporate_Logo.png",
  Stripe:
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Stripe_Logo%2C_revised_2016.svg",
};

function getRandomCompany(index: number) {
  // Use index to get a deterministic but varied company name
  return companyNames[index % companyNames.length];
}

const WeeklyHackathon = () => {
  const getDifficultyColor = (difficulty: string) => {
    // All difficulties use blue or gray
    switch (difficulty) {
      case "Beginner":
        return "bg-primary text-primary-foreground";
      case "Intermediate":
        return "bg-primary/80 text-primary-foreground";
      case "Advanced":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
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
    <Card className="bg-white shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Trophy className="h-5 w-5 text-primary" />
          Upcoming Hackathons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 cursor-grab select-none"
          style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth', userSelect: isDragging.current ? 'none' : 'auto' }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {upcomingHackathons.map((hackathon, idx) => {
            const company = getRandomCompany(idx);
            const logo = companyLogos[company] || placeholderLogo;
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
              <div key={hackathon.id} className="w-[270px] h-[320px] flex-shrink-0">
                <div
                  className={`rounded-2xl shadow-2xl border-0 p-6 h-full flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.14)] cursor-pointer ${isForYou ? 'shine-outline-for-you' : ''}`}
                  onClick={() => setSelectedHackathon(hackathon)}
                  style={{ background: isForYou ? 'linear-gradient(135deg, #fff 0%, #f6faff 60%, #f3f6fb 100%)' : '#fff' }}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={logo}
                        alt={`${company} Logo`}
                        className="h-10 w-10 rounded-full border-2 border-primary/30 bg-white object-contain shadow-lg"
                      />
                      <span className="text-base font-bold text-primary/90 tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-lg shadow-inner backdrop-blur-md">
                        {company}
                      </span>
                      {isForYou && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Star className="h-5 w-5 text-green-500 cursor-pointer ml-1 z-[999999]" />
                          </TooltipTrigger>
                          <TooltipContent side="top" align="center" className="w-72 text-left z-[999999] drop-shadow-2xl">
                            <span className="block text-sm font-semibold text-primary mb-1">Recommended for You</span>
                            <span className="text-xs text-muted-foreground">This hackathon is recommended because it matches your skill set.</span>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-5 w-5 text-accent" />
                      <span className="text-lg font-extrabold text-foreground leading-tight drop-shadow-sm">
                        {hackathon.title}
                      </span>
                      <Badge
                        className={
                          getStatusColor(hackathon.status) +
                          " ml-2 px-3 py-1 rounded-full text-xs font-bold shadow"
                        }
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {hackathon.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed min-h-[40px] mb-4 font-medium">
                      {hackathon.description}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <Badge
                        className={
                          getDifficultyColor(hackathon.difficulty) +
                          " px-3 py-1 rounded-full text-xs font-bold"
                        }
                      >
                        {hackathon.difficulty}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        <Clock className="h-3 w-3" />
                        {hackathon.duration}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        <Users className="h-3 w-3" />
                        {hackathon.participants.toLocaleString()} participants
                      </Badge>
                      <Badge
                        variant="secondary"
                        style={{ whiteSpace: "nowrap", alignSelf: "center" }}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent-foreground border-accent/20 border"
                      >
                        {hackathon.theme}
                      </Badge>
                    </div>
                    <div className="text-xs text-primary font-bold flex items-center gap-2 mb-1">
                      <Calendar className="h-3 w-3" />
                      Starts in {hackathon.startsIn}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Register
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
                src={companyLogos[getRandomCompany(upcomingHackathons.findIndex(h => h.id === selectedHackathon.id))] || placeholderLogo}
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
                  {selectedHackathon?.startsIn
                    ? `Starts in ${selectedHackathon.startsIn}`
                    : ""}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                <MapPin className="h-6 w-6 text-blue-500 mb-2" />
                <div className="text-xs text-blue-600">Location</div>
                <div className="font-bold text-base text-blue-600">Delhi, India</div>
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
            <Button size="lg" className={`bg-primary text-primary-foreground px-8 py-3 rounded-full shadow-lg`}>
              {selectedHackathon?.status === 'active' ? 'Enter' : 'Register'}
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