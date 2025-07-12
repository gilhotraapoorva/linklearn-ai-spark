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
  GitBranch
} from "lucide-react";
import placeholderLogo from '/public/placeholder.svg';

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
  description: "Create a modern chat application with real-time messaging, user authentication, and a beautiful UI. Build group chats, direct messages, and notifications. Showcase your full-stack skills and deliver a seamless, engaging user experience.",
  theme: "Real-time Applications",
  difficulty: "Intermediate",
  duration: "48 hours",
  participants: 1247,
  prizes: ["500 XP", "Exclusive Badge", "Career Mentorship"],
  skills: ["React", "WebSockets", "Node.js", "Database Design"],
  startsIn: "2 days",
  status: "upcoming"
};

// Mock data for upcoming hackathons
const upcomingHackathons: Hackathon[] = [
  {
    id: "hack-001",
    title: "Build a Real-time Chat App",
    description: "Create a modern chat application with real-time messaging, user authentication, and a beautiful UI. Build group chats, direct messages, and notifications. Showcase your full-stack skills and deliver a seamless, engaging user experience.",
    theme: "Real-time Applications",
    difficulty: "Intermediate",
    duration: "48 hours",
    participants: 1247,
    prizes: ["500 XP", "Exclusive Badge", "Career Mentorship"],
    skills: ["React", "WebSockets", "Node.js", "Database Design"],
    startsIn: "2 days",
    status: "upcoming"
  },
  {
    id: "hack-002",
    title: "AI-Powered To-Do App",
    description: "Build a smart to-do app that uses AI to suggest tasks and optimize productivity. Integrate natural language processing for voice or text input, and use machine learning to prioritize, categorize, and analyze tasks for better daily management.",
    theme: "AI Productivity",
    difficulty: "Beginner",
    duration: "24 hours",
    participants: 980,
    prizes: ["300 XP", "AI Badge"],
    skills: ["React", "Python", "AI APIs"],
    startsIn: "5 days",
    status: "upcoming"
  },
  {
    id: "hack-003",
    title: "Data Visualization Dashboard",
    description: "Create a dashboard to visualize complex datasets interactively. Use charts, graphs, and filters to help users explore data trends and insights. Focus on usability, performance, and beautiful, responsive design for all devices.",
    theme: "Data Science",
    difficulty: "Advanced",
    duration: "72 hours",
    participants: 650,
    prizes: ["700 XP", "Data Badge", "Mentorship"],
    skills: ["React", "D3.js", "Node.js"],
    startsIn: "1 week",
    status: "upcoming"
  },
  {
    id: "hack-004",
    title: "Blockchain Voting System",
    description: "Design a secure, transparent voting platform using blockchain technology. Implement smart contracts for vote validation and real-time results. Focus on privacy, scalability, and a user-friendly interface for all participants.",
    theme: "Blockchain",
    difficulty: "Intermediate",
    duration: "36 hours",
    participants: 800,
    prizes: ["400 XP", "Blockchain Badge"],
    skills: ["React", "Solidity", "Web3.js"],
    startsIn: "9 days",
    status: "upcoming"
  },
  {
    id: "hack-005",
    title: "Health Tracker App",
    description: "Build a health tracker that monitors daily activity, sleep, and nutrition. Integrate data visualization and personalized recommendations. Ensure privacy and accessibility for users of all ages and backgrounds.",
    theme: "Health & Wellness",
    difficulty: "Beginner",
    duration: "30 hours",
    participants: 1100,
    prizes: ["350 XP", "Health Badge"],
    skills: ["React Native", "Firebase", "Chart.js"],
    startsIn: "12 days",
    status: "upcoming"
  },
  {
    id: "hack-006",
    title: "E-Commerce Recommendation Engine",
    description: "Create a recommendation engine for an e-commerce site using collaborative filtering and AI. Display personalized product suggestions and analyze user behavior for improved shopping experiences.",
    theme: "E-Commerce AI",
    difficulty: "Advanced",
    duration: "60 hours",
    participants: 950,
    prizes: ["600 XP", "E-Commerce Badge", "Mentorship"],
    skills: ["React", "Python", "TensorFlow"],
    startsIn: "2 weeks",
    status: "upcoming"
  }
];

const companyNames = [
  "Intuit",
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Tesla",
  "Spotify",
  "Adobe",
  "Stripe"
];

const companyLogos: Record<string, string> = {
  Intuit: "/intuit.svg",
  Google: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  Microsoft: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  Amazon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  Netflix: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  Tesla: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  Spotify: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  Adobe: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Adobe_Corporate_Logo.png",
  Stripe: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Stripe_Logo%2C_revised_2016.svg"
};

function getRandomCompany(index: number) {
  // Use index to get a deterministic but varied company name
  return companyNames[index % companyNames.length];
}

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

  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const handleArrow = (direction: 'left' | 'right') => {
    let newIndex = carouselIndex;
    if (direction === 'right' && carouselIndex < upcomingHackathons.length - 2) {
      newIndex = carouselIndex + 1;
    } else if (direction === 'left' && carouselIndex > 0) {
      newIndex = carouselIndex - 1;
    }
    setCarouselIndex(newIndex);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: newIndex * 310, behavior: 'smooth' });
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
          transform: 'translateX(0px) scale(1.08) rotateY(0deg)',
          zIndex: baseZ + 5,
          boxShadow: '0 12px 48px 0 rgba(31,38,135,0.18), 0 0 0 6px #fff',
          opacity: 1,
        };
      } else if (offset === -1) {
        // Left card
        return {
          transform: 'translateX(-160px) scale(0.92) rotateY(18deg)',
          zIndex: baseZ + 3,
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
          opacity: 0.85,
        };
      } else if (offset === 1) {
        // Right card
        return {
          transform: 'translateX(160px) scale(0.92) rotateY(-18deg)',
          zIndex: baseZ + 3,
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.10)',
          opacity: 0.85,
        };
      } else if (offset === -2) {
        // Far left
        return {
          transform: 'translateX(-320px) scale(0.82) rotateY(28deg)',
          zIndex: baseZ + 1,
          boxShadow: '0 4px 16px 0 rgba(31,38,135,0.08)',
          opacity: 0.5,
        };
      } else if (offset === 2) {
        // Far right (should be hidden, not moved to the rightmost side)
        return {
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.7)',
          pointerEvents: 'none',
          zIndex: 0,
        };
      } else {
        // Hide other cards
        return {
          transform: 'scale(0.7)',
          zIndex: 0,
          opacity: 0,
          pointerEvents: 'none',
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
            onClick={() => handleArrow('left')}
            disabled={carouselIndex === 0}
            className={`h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg transition-all duration-200 border-2 border-primary/30 ${carouselIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 hover:from-accent hover:to-primary'}`}
            aria-label="Scroll left"
            type="button"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 22l-8-8 8-8"/></svg>
          </button>
          <button
            onClick={() => handleArrow('right')}
            disabled={carouselIndex >= upcomingHackathons.length - 1}
            className={`h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg transition-all duration-200 border-2 border-primary/30 ${carouselIndex >= upcomingHackathons.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 hover:from-accent hover:to-primary'}`}
            aria-label="Scroll right"
            type="button"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 6l8 8-8 8"/></svg>
          </button>
        </div>
        <div className="flex gap-0 justify-center items-center relative h-[520px] select-none">
          {upcomingHackathons.map((hackathon, idx) => {
            const company = getRandomCompany(idx);
            const logo = companyLogos[company] || placeholderLogo;
            // 3D/overlapping effect logic
            const offset = idx - carouselIndex;
            let style: React.CSSProperties = {
              transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), opacity 0.5s',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: '',
              zIndex: 10 - Math.abs(offset),
              opacity: 1,
              pointerEvents: Math.abs(offset) > 2 ? 'none' : 'auto',
            };
            if (offset === 0) {
              // Center card
              style.transform = 'translate(-50%, -50%) scale(1.08)';
              style.boxShadow = '0 12px 48px 0 rgba(31,38,135,0.18), 0 0 0 8px #fff';
            } else if (offset === -1) {
              // Left neighbor
              style.transform = 'translate(-120%, -50%) scale(0.92) rotateY(18deg)';
              style.opacity = 0.92;
            } else if (offset === 1) {
              // Right neighbor
              style.transform = 'translate(20%, -50%) scale(0.92) rotateY(-18deg)';
              style.opacity = 0.92;
            } else if (offset === -2) {
              // Far left
              style.transform = 'translate(-210%, -50%) scale(0.82) rotateY(32deg)';
              style.opacity = 0.5;
              style.zIndex = 8;
            } else if (offset === 2) {
              // Far right (should be hidden, not moved to the rightmost side)
              style.opacity = 0;
              style.transform = 'translate(-50%, -50%) scale(0.7)';
              style.pointerEvents = 'none';
              style.zIndex = 0;
            } else {
              // Hide other cards
              style.opacity = 0;
              style.transform = 'translate(-50%, -50%) scale(0.7)';
              style.pointerEvents = 'none';
            }
            return (
              <React.Fragment key={hackathon.id}>
                <div style={style} className="w-[300px] h-[340px] flex-shrink-0">
                  <div className="rounded-2xl bg-white shadow-2xl border-0 p-6 h-full flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.14)]">
                    {/* Rainbow gradient overlay, more vibrant and blurred for depth */}
                    <div className="absolute inset-0 pointer-events-none rounded-2xl z-0" style={{background: 'conic-gradient(from 180deg at 50% 50%, #ffb6ff 0deg, #b5ffff 90deg, #baffc9 180deg, #ffe29a 270deg, #ffb6ff 360deg)', opacity: 0.22, filter: 'blur(2px)'}} />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={logo} alt={`${company} Logo`} className="h-10 w-10 rounded-full border-2 border-primary/30 bg-white object-contain shadow-lg" />
                        <span className="text-base font-bold text-primary/90 tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-lg shadow-inner backdrop-blur-md">{company}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-5 w-5 text-accent" />
                        <span className="text-lg font-extrabold text-foreground leading-tight drop-shadow-sm">{hackathon.title}</span>
                        <Badge className={getStatusColor(hackathon.status) + ' ml-2 px-3 py-1 rounded-full text-xs font-bold shadow'}>
                          <Calendar className="h-3 w-3 mr-1" />
                          {hackathon.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed min-h-[40px] mb-4 font-medium">{hackathon.description}</p>
                      <div className="flex flex-wrap gap-2 items-center mb-4">
                        <Badge className={getDifficultyColor(hackathon.difficulty) + ' px-3 py-1 rounded-full text-xs font-bold'}>{hackathon.difficulty}</Badge>
                        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold">
                          <Clock className="h-3 w-3" />
                          {hackathon.duration}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold">
                          <Users className="h-3 w-3" />
                          {hackathon.participants.toLocaleString()} participants
                        </Badge>
                        <Badge variant="secondary" style={{ whiteSpace: 'nowrap', alignSelf: 'center' }} className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent-foreground border-accent/20 border">
                          {hackathon.theme}
                        </Badge>
                      </div>
                      <div className="text-xs text-primary font-bold flex items-center gap-2 mb-1">
                        <Calendar className="h-3 w-3" />
                        Starts in {hackathon.startsIn}
                      </div>
                    </div>
                    {/* Subtle animated rainbow border on hover */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{boxShadow: '0 0 0 4px #fff, 0 0 0 8px #ffb6ff, 0 0 0 12px #b5ffff, 0 0 0 16px #baffc9, 0 0 0 20px #ffe29a'}} />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
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