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
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import placeholderLogo from "/public/placeholder.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MapPin, Users as UsersIcon, Trophy as TrophyIcon, Calendar as CalendarIcon } from "lucide-react";

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

const upcomingHackathons: Hackathon[] = [
  {
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
  },
  {
    id: "hack-002",
    title: "AI-Powered Task Manager",
    description: "Develop an intelligent task management app that uses AI to prioritize tasks, suggest optimal schedules, and provide productivity insights.",
    theme: "AI & Productivity",
    difficulty: "Advanced",
    duration: "72 hours",
    participants: 892,
    prizes: ["$500 Cash Prize", "Tech Conference Pass", "AI Workshop Access"],
    skills: ["Python", "Machine Learning", "React", "API Design"],
    startsIn: "5 days",
    status: "upcoming"
  },
  {
    id: "hack-003",
    title: "Sustainable Energy Dashboard",
    description: "Build a comprehensive dashboard for monitoring renewable energy systems with real-time data visualization and predictive analytics.",
    theme: "Green Tech",
    difficulty: "Intermediate",
    duration: "36 hours",
    participants: 1563,
    prizes: ["Solar Panel Kit", "Green Tech Certification", "Industry Mentorship"],
    skills: ["Data Visualization", "IoT", "Python", "React"],
    startsIn: "1 week",
    status: "upcoming"
  }
];

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
  const [currentIndex, setCurrentIndex] = useState(0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-success text-success-foreground";
      case "Intermediate":
        return "bg-warning text-warning-foreground";
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
        return "bg-success text-success-foreground animate-pulse";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);

  const handleArrow = (direction: "left" | "right") => {
    let newIndex = carouselIndex;
    if (direction === "right" && carouselIndex < upcomingHackathons.length - 2) {
      newIndex = carouselIndex + 1;
    } else if (direction === "left" && carouselIndex > 0) {
      newIndex = carouselIndex - 1;
    }
    setCarouselIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: newIndex * 310, behavior: "smooth" });
    }
  };

  // Carousel for upcoming hackathons with 3D/overlapping effect
  const renderCarousel = () => {
    const visibleCards = 5; // Show 5 cards (2 left, center, 2 right)
    const getCardStyle = (idx: number) => {
      const offset = idx - carouselIndex;
      const baseZ = 10;
      // 3D transform logic
      if (offset === 0) {
        // Center card
        return {
          transform: "translateX(0px) scale(1.08) rotateY(0deg)",
          zIndex: baseZ + 5,
          boxShadow:
            "0 12px 48px 0 rgba(31,38,135,0.18), 0 0 0 6px #fff",
          opacity: 1,
        };
      } else if (offset === -1) {
        // Left card
        return {
          transform: "translateX(-160px) scale(0.92) rotateY(18deg)",
          zIndex: baseZ + 3,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
          opacity: 0.85,
        };
      } else if (offset === 1) {
        // Right card
        return {
          transform: "translateX(160px) scale(0.92) rotateY(-18deg)",
          zIndex: baseZ + 3,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
          opacity: 0.85,
        };
      } else if (offset === -2) {
        // Far left
        return {
          transform: "translateX(-320px) scale(0.82) rotateY(28deg)",
          zIndex: baseZ + 1,
          boxShadow: "0 4px 16px 0 rgba(31,38,135,0.08)",
          opacity: 0.5,
        };
      } else if (offset === 2) {
        // Far right (should be hidden, not moved to the rightmost side)
        return {
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.7)",
          pointerEvents: "none",
          zIndex: 0,
        };
      } else {
        // Hide other cards
        return {
          transform: "scale(0.7)",
          zIndex: 0,
          opacity: 0,
          pointerEvents: "none",
        };
      }
    };

    return (
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-3 text-primary drop-shadow-sm">
          <Rocket className="h-7 w-7 text-accent animate-bounce" />
          Upcoming Hackathons
        </h2>
        <div className="flex justify-end gap-3 mb-3">
          <button
            onClick={() => handleArrow("left")}
            disabled={carouselIndex === 0}
            className={`h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 border-2 border-primary/30 ${
              carouselIndex === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:scale-105 hover:bg-primary/90"
            }`}
            aria-label="Scroll left"
            type="button"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 22l-8-8 8-8" />
            </svg>
          </button>
          <button
            onClick={() => handleArrow("right")}
            disabled={carouselIndex >= upcomingHackathons.length - 1}
            className={`h-10 w-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-200 border-2 border-primary/30 ${
              carouselIndex >= upcomingHackathons.length - 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:scale-105 hover:bg-primary/90"
            }`}
            aria-label="Scroll right"
            type="button"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 6l8 8-8 8" />
            </svg>
          </button>
        </div>
        <div className="flex gap-0 justify-center items-center relative h-[520px] select-none">
          {upcomingHackathons.map((hackathon, idx) => {
            const company = getRandomCompany(idx);
            const logo = companyLogos[company] || placeholderLogo;
            // 3D/overlapping effect logic
            const offset = idx - carouselIndex;
            let style: React.CSSProperties = {
              transition:
                "transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.5s",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "",
              zIndex: 10 - Math.abs(offset),
              opacity: 1,
              pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
            };
            if (offset === 0) {
              // Center card
              style.transform = "translate(-50%, -50%) scale(1.08)";
              style.boxShadow =
                "0 12px 48px 0 rgba(31,38,135,0.18), 0 0 0 8px #fff";
            } else if (offset === -1) {
              // Left neighbor
              style.transform = "translate(-120%, -50%) scale(0.92) rotateY(18deg)";
              style.opacity = 0.92;
            } else if (offset === 1) {
              // Right neighbor
              style.transform = "translate(20%, -50%) scale(0.92) rotateY(-18deg)";
              style.opacity = 0.92;
            } else if (offset === -2) {
              // Far left
              style.transform = "translate(-210%, -50%) scale(0.82) rotateY(32deg)";
              style.opacity = 0.5;
              style.zIndex = 8;
            } else if (offset === 2) {
              // Far right (should be hidden, not moved to the rightmost side)
              style.opacity = 0;
              style.transform = "translate(-50%, -50%) scale(0.7)";
              style.pointerEvents = "none";
              style.zIndex = 0;
            } else {
              // Hide other cards
              style.opacity = 0;
              style.transform = "translate(-50%, -50%) scale(0.7)";
              style.pointerEvents = "none";
            }
            return (
              <React.Fragment key={hackathon.id}>
                <div style={style} className="w-[270px] h-[320px] flex-shrink-0">
                  <div
                    className="rounded-2xl bg-white shadow-2xl border-0 p-6 h-full flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.14)] cursor-pointer"
                    onClick={() => setSelectedHackathon(hackathon)}
                  >
                    {/* Rainbow gradient overlay, more vibrant and blurred for depth */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-2xl z-0"
                      style={{
                        background:
                          "conic-gradient(from 180deg at 50% 50%, #ffb6ff 0deg, #b5ffff 90deg, #baffc9 180deg, #ffe29a 270deg, #ffb6ff 360deg)",
                        opacity: 0.22,
                        filter: "blur(2px)",
                      }}
                    />
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
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
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
                    <Badge key={i} className="bg-yellow-100 text-yellow-800 border-yellow-300 border font-semibold px-3 py-1 rounded-full text-xs">
                      <Trophy className="inline-block h-4 w-4 mr-1 text-yellow-500" />
                      {prize}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* Scrollable Info Section */}
              <div className="bg-white px-8 pt-4 pb-24 rounded-b-3xl max-h-[350px] overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
                    <CalendarIcon className="h-6 w-6 text-purple-500 mb-2" />
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="font-bold text-base">
                      {selectedHackathon?.startsIn
                        ? `Starts in ${selectedHackathon.startsIn}`
                        : ""}
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 flex flex-col items-center">
                    <MapPin className="h-6 w-6 text-pink-500 mb-2" />
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-bold text-base">Delhi, India</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                    <UsersIcon className="h-6 w-6 text-blue-500 mb-2" />
                    <div className="text-xs text-muted-foreground">Participants</div>
                    <div className="font-bold text-base">
                      {selectedHackathon?.participants?.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center">
                    <TrophyIcon className="h-6 w-6 text-green-500 mb-2" />
                    <div className="text-xs text-muted-foreground">Prizes</div>
                    <div className="font-bold text-base">
                      {selectedHackathon?.prizes?.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="text-left mb-2 flex items-center gap-2 text-purple-700 font-bold text-lg">
                  <Star className="h-5 w-5 text-yellow-500" />
                  About this Hackathon
                </div>
                <div className="text-muted-foreground text-base mb-2">
                  {selectedHackathon?.description}
                </div>
                {/* Steps as bullet points */}
                <ul className="list-disc pl-6 text-muted-foreground text-base mb-2">
                  <li>Online Assessment</li>
                  <li>Ideathon</li>
                  <li>Project Submission</li>
                </ul>
                <div className="text-muted-foreground text-sm mb-4">
                  Skills: {selectedHackathon?.skills?.join(", ")}
                </div>
              </div>
              {/* Register Button at Center Bottom */}
              <div className="absolute left-0 right-0 bottom-0 flex justify-center pb-6">
                <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 rounded-full shadow-lg">Register</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <div>
      {renderCarousel()}
    </div>
  );
};

export default WeeklyHackathon;