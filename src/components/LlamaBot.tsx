import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, MessageCircle, Users, Target, Zap, Brain } from "lucide-react";
import linkedinLlamaBot from "../assets/linkedin-llama-bot.svg";

// Global event system for hackathon interactions
const hackathonEvents = {
  listeners: [] as Array<(data: any) => void>,
  chatbotOpen: false,
  emit: (data: any) => {
    hackathonEvents.listeners.forEach(listener => listener(data));
  },
  listen: (callback: (data: any) => void) => {
    hackathonEvents.listeners.push(callback);
    return () => {
      const index = hackathonEvents.listeners.indexOf(callback);
      if (index > -1) hackathonEvents.listeners.splice(index, 1);
    };
  },
  setChatbotOpen: (isOpen: boolean) => {
    hackathonEvents.chatbotOpen = isOpen;
    hackathonEvents.emit({ type: 'chatbotStateChange', isOpen });
  },
  isChatbotOpen: () => hackathonEvents.chatbotOpen
};

interface Skill {
  name: string;
  level: number;
  category: string;
  trend: 'up' | 'stable' | 'down';
}

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
  status: "upcoming" | "active" | "completed";
  company: string;
}

interface TeamMember {
  name: string;
  skills: string[];
  level: number;
  avatar: string;
}

const skillsData: Skill[] = [
  { name: "React Development", level: 85, category: "Frontend", trend: 'up' },
  { name: "TypeScript", level: 70, category: "Programming", trend: 'up' },
  { name: "System Design", level: 45, category: "Architecture", trend: 'stable' },
  { name: "AI/ML Basics", level: 25, category: "Emerging Tech", trend: 'up' },
  { name: "DevOps", level: 60, category: "Infrastructure", trend: 'stable' },
  { name: "Data Structures", level: 80, category: "Programming", trend: 'stable' },
];

const hackathons: Hackathon[] = [
  {
    id: "hack-001",
    title: "Build a Real-time Chat App",
    description: "Create a modern chat application with real-time messaging capabilities",
    theme: "Real-time Applications",
    difficulty: "Intermediate",
    duration: "48 hours",
    participants: 1247,
    prizes: ["LinkedIn Premium (1 month)", "Exclusive Badge", "Career Mentorship"],
    skills: ["React", "TypeScript", "WebSockets", "Data Structures"],
    startsIn: "1 day ago",
    status: "active",
    company: "Intuit"
  },
  {
    id: "hack-002",
    title: "AI-Powered Task Manager",
    description: "Build an intelligent task management system using AI",
    theme: "AI & Productivity",
    difficulty: "Advanced",
    duration: "72 hours",
    participants: 892,
    prizes: ["$500 Cash Prize", "Tech Conference Pass", "AI Workshop Access"],
    skills: ["React", "TypeScript", "Data Structures", "Machine Learning"],
    startsIn: "5 days",
    status: "upcoming",
    company: "Google"
  },
  {
    id: "hack-003",
    title: "Apple Innovation Challenge",
    description: "Design and build next-gen apps or solutions for the Apple ecosystem.",
    theme: "Apple Ecosystem",
    difficulty: "Intermediate",
    duration: "36 hours",
    participants: 1563,
    prizes: ["MacBook Air", "App Store Feature", "Apple Developer Swag"],
    skills: ["Swift", "iOS", "UI/UX", "React"],
    startsIn: "1 week",
    status: "upcoming",
    company: "Apple"
  },
  {
    id: "hack-005",
    title: "Tesla Mobility Challenge",
    description: "Develop next-generation mobility and transportation solutions",
    theme: "Mobility & AI",
    difficulty: "Advanced",
    duration: "60 hours",
    participants: 980,
    prizes: ["Tesla Internship", "$1000", "Tesla Swag"],
    skills: ["AI", "Python", "Embedded"],
    startsIn: "4 days",
    status: "upcoming",
    company: "Tesla"
  },
  {
    id: "hack-006",
    title: "Microservices Architecture Challenge",
    description: "Build scalable backend systems using modern microservices architecture",
    theme: "Backend & DevOps",
    difficulty: "Advanced",
    duration: "48 hours",
    participants: 756,
    prizes: ["AWS Credits $2000", "Backend Certification", "Cloud Workshop Access"],
    skills: ["Node.js", "Backend Development", "System Design", "DevOps"],
    startsIn: "6 days",
    status: "upcoming",
    company: "Amazon"
  }
];

const potentialPartners: TeamMember[] = [
  // Your LinkedIn Profile
  {
    name: "Sakshi Priya",
    skills: ["React", "TypeScript", "Frontend Development", "Full Stack", "System Design"],
    level: 82,
    avatar: "🚀"
  },
  
  // Another LinkedIn Profile
  {
    name: "Anupam Gaurav",
    skills: ["Backend Development", "Node.js", "Python", "System Design", "DevOps"],
    level: 86,
    avatar: "💻"
  },
  
  // AI/ML Specialists
  {
    name: "Sarah Chen",
    skills: ["Python", "Machine Learning", "Data Science", "AI"],
    level: 88,
    avatar: "🧑‍💻"
  },
  {
    name: "Dr. Raj Patel",
    skills: ["AI", "Python", "TensorFlow", "Deep Learning"],
    level: 94,
    avatar: "👨‍🔬"
  },
  
  // Backend/System Design Experts
  {
    name: "Marcus Rodriguez",
    skills: ["Backend Development", "System Design", "DevOps", "Node.js"],
    level: 92,
    avatar: "👨‍💻"
  },
  {
    name: "Anupam",
    skills: ["System Design", "Cloud", "Microservices", "AWS"],
    level: 87,
    avatar: "👩‍💻"
  },
  
  // Frontend/UI/UX Designers
  {
    name: "Emily Watson",
    skills: ["UI/UX", "React", "Frontend", "Product Management"],
    level: 85,
    avatar: "👩‍🎨"
  },
  {
    name: "Jessica Liu",
    skills: ["UI/UX", "Photoshop", "Illustrator", "Design Systems"],
    level: 91,
    avatar: "🎨"
  },
  
  // Mobile/iOS Developers
  {
    name: "David Park",
    skills: ["Swift", "iOS", "Mobile Development", "UI/UX"],
    level: 89,
    avatar: "📱"
  },
  {
    name: "Maya Singh",
    skills: ["Swift", "iOS", "React Native", "Mobile Design"],
    level: 86,
    avatar: "👩‍💻"
  },
  
  // WebSocket/Real-time Specialists
  {
    name: "Chris Thompson",
    skills: ["WebSockets", "Node.js", "Real-time", "Database Design"],
    level: 83,
    avatar: "⚡"
  },
  {
    name: "Sofia Martinez",
    skills: ["WebSockets", "React", "Socket.io", "Backend Development"],
    level: 88,
    avatar: "👩‍💻"
  },
  
  // IoT/Hardware Specialists
  {
    name: "Ahmed Hassan",
    skills: ["IoT", "Android", "Embedded Systems", "Hardware"],
    level: 90,
    avatar: "🔧"
  },
  {
    name: "Lisa Chang",
    skills: ["IoT", "Cloud", "Sensors", "Edge Computing"],
    level: 87,
    avatar: "🌐"
  },
  
  // Full-Stack Versatile Developers
  {
    name: "Jordan Taylor",
    skills: ["React", "Node.js", "Full-Stack", "API Design"],
    level: 84,
    avatar: "💻"
  },
  {
    name: "Robin Patel",
    skills: ["Python", "React", "DevOps", "Database Design"],
    level: 82,
    avatar: "👨‍💻"
  },
  
  // Creative/Design Specialists
  {
    name: "Oliver Green",
    skills: ["Creative Direction", "Photoshop", "Illustrator", "Branding"],
    level: 93,
    avatar: "🎭"
  },
  {
    name: "Zoe Williams",
    skills: ["UI/UX", "Animation", "Creative Tools", "Design"],
    level: 88,
    avatar: "✨"
  }
];

const LlamaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'partners'>('recommendations');
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [botMessage, setBotMessage] = useState("Hey there! 👋 I'm Pixie, your friendly AI assistant. I've analyzed your skill profile and found some exciting opportunities for you! Click the 'Hackathons' tab below to see personalized recommendations, or hover over any hackathon on the page to get instant compatibility analysis! 🚀");
  const [defaultTabMessage, setDefaultTabMessage] = useState("🎯 Perfect! Here are hackathon recommendations perfectly matched to your skills! Each recommendation shows your compatibility percentage. Hover over any hackathon below to see detailed analysis of why it's perfect for you, including which skills give you an advantage and which ones you might need teammates for! 🚀");
  const [selectedPartner, setSelectedPartner] = useState<TeamMember | null>(null);
  const [messageHighlighted, setMessageHighlighted] = useState(false);
  const [hoverMessage, setHoverMessage] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Ref for the scrollable content area
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Ref for the chatbot dialog container
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Update global chatbot state when isOpen changes
  useEffect(() => {
    hackathonEvents.setChatbotOpen(isOpen);
  }, [isOpen]);

  // Function to show hover popup
  const showHoverPopup = (message: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoverMessage(message);
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  // Function to hide hover popup
  const hideHoverPopup = () => {
    setHoverMessage(null);
  };

  // Function to update message with optional scroll and highlight
  const updateBotMessage = (message: string, shouldScroll: boolean = false) => {
    setBotMessage(message);
    
    // Add gentle highlight effect for all updates
    setMessageHighlighted(true);
    setTimeout(() => setMessageHighlighted(false), 600);
    
    // Only scroll when explicitly requested (tab changes, clicks)
    if (shouldScroll) {
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // Function to scroll to top of message area with highlight effect
  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Add brief highlight effect
      setMessageHighlighted(true);
      setTimeout(() => setMessageHighlighted(false), 800);
    }
  };

  // Listen for external hackathon hover events from WeeklyHackathon component
  useEffect(() => {
    const unsubscribe = hackathonEvents.listen((data: any) => {
      if (data.type === 'hover' && data.hackathon) {
        handleExternalHackathonHover(data.hackathon);
        // Auto-open the bot if it's not open
        if (!isOpen) {
          setIsOpen(true);
        }
      } else if (data.type === 'hoverEnd') {
        // Restore default message when hover ends
        if (activeTab === 'recommendations') {
          updateBotMessage(defaultTabMessage, false);
        }
      }
    });

    return unsubscribe;
  }, [isOpen, activeTab, defaultTabMessage]);

  // Unified function to calculate skill matching for consistency
  const calculateSkillMatch = (hackathon: any) => {
    const hackathonSkills = hackathon.skills || [];
    const matchingSkills = hackathonSkills.filter((skill: string) =>
      skillsData.some(userSkill => 
        userSkill.name.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.name.toLowerCase())
      )
    );
    
    const matchScore = hackathonSkills.length > 0 
      ? Math.round((matchingSkills.length / hackathonSkills.length) * 100) 
      : 0;
    
    return {
      matchingSkills,
      matchScore,
      hackathonSkills
    };
  };

  // Handle external hackathon hover from WeeklyHackathon component
  const handleExternalHackathonHover = (hackathon: any) => {
    // Use unified calculation for consistency
    const { matchingSkills, matchScore, hackathonSkills } = calculateSkillMatch(hackathon);
    
    // Update the main chat message with hover analysis
    let message = `🔍 Looking at "${hackathon.title}" - this ${hackathon.difficulty.toLowerCase()} hackathon is a ${matchScore}% match with your skills! `;
    
    if (matchScore > 0) {
      message += `You're strong in ${matchingSkills.join(", ")}. `;
      
      const missingSkills = hackathonSkills.filter((skill: string) => 
        !matchingSkills.includes(skill)
      );
      
      if (missingSkills.length > 0) {
        message += `You might want to brush up on ${missingSkills.join(", ")} or find teammates with these skills. `;
      }
    } else {
      message += `This hackathon requires skills like ${hackathonSkills.join(", ")} which don't align with your current skillset. `;
      message += `Consider focusing on hackathons that better match your React, TypeScript, and Data Structures expertise! `;
    }
    
    const prize = hackathon.prizes?.[0] || "Great prizes";
    message += `${prize} awaits! `;
    
    if (matchScore < 25) {
      message += `This hackathon isn't in your recommendations due to low skill match, but you can still participate if you're interested in learning new skills! 🎯`;
    } else {
      message += `Click to see more details! 🎯`;
    }
    
    // Update the main chat message area (not scroll to top)
    updateBotMessage(message, false);
  };

  const getRecommendedHackathons = () => {
    return hackathons.map(hackathon => {
      const { matchingSkills, matchScore } = calculateSkillMatch(hackathon);
      
      return {
        ...hackathon,
        matchingSkills,
        matchScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const getRecommendedPartners = (hackathon: Hackathon) => {
    const userWeakSkills = skillsData
      .filter(skill => skill.level < 60)
      .map(skill => skill.name);
    
    // Get partners with scoring based on relevance
    const partnersWithScore = potentialPartners.map(partner => {
      let score = 0;
      let matchedSkills: string[] = [];
      
      // Check for direct hackathon skill matches (higher weight)
      partner.skills.forEach(skill => {
        hackathon.skills.forEach(reqSkill => {
          if (skill.toLowerCase().includes(reqSkill.toLowerCase()) || 
              reqSkill.toLowerCase().includes(skill.toLowerCase())) {
            score += 10;
            if (!matchedSkills.includes(skill)) {
              matchedSkills.push(skill);
            }
          }
        });
      });
      
      // Check for user weak skill coverage (medium weight)
      partner.skills.forEach(skill => {
        userWeakSkills.forEach(weakSkill => {
          if (skill.toLowerCase().includes(weakSkill.toLowerCase()) || 
              weakSkill.toLowerCase().includes(skill.toLowerCase())) {
            score += 5;
            if (!matchedSkills.includes(skill)) {
              matchedSkills.push(skill);
            }
          }
        });
      });
      
      // Bonus for high skill level
      if (partner.level > 85) score += 2;
      
      return { ...partner, score, matchedSkills };
    });
    
    // Filter partners with score > 0 and sort by score descending
    return partnersWithScore
      .filter(partner => partner.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Show top 6 matches
  };

  const recommendations = getRecommendedHackathons();

  const handleHackathonClick = (hackathon: any) => {
    setSelectedHackathon(hackathon);
    const yourSkills = hackathon.matchingSkills?.join(", ") || "some skills";
    const missingSkills = hackathon.skills.filter((skill: string) => 
      !hackathon.matchingSkills?.includes(skill)
    ).join(", ") || "none";
    
    let message = `🎯 Great choice! This ${hackathon.difficulty.toLowerCase()} hackathon has a ${hackathon.matchScore}% match with your skills. `;
    message += `You're already strong in: ${yourSkills}. `;
    if (missingSkills !== "none") {
      message += `You might want to find teammates who excel in: ${missingSkills}. `;
    }
    message += `With ${hackathon.duration} duration and prizes including ${hackathon.prizes[0]}, this could be perfect for you! 🚀`;
    
    updateBotMessage(message, true);
    setActiveTab('partners');
  };

  const handlePartnerClick = (partner: any) => {
    // Special handling for Sakshi Priya - redirect to LinkedIn
    if (partner.name === "Sakshi Priya") {
      window.open("https://www.linkedin.com/in/sakshi-priya-675817258/", "_blank");
      return;
    }
    
    // Special handling for Anupam Gaurav - redirect to LinkedIn
    if (partner.name === "Anupam Gaurav") {
      window.open("https://www.linkedin.com/in/anupam-gaurav-49718122b/?originalSubdomain=in", "_blank");
      return;
    }
    
    setSelectedPartner(partner);
    const complementarySkills = partner.matchedSkills || [];
    
    let message;
    if (partner.name.includes("You")) {
      message = `� This is your profile! Your skills in ${partner.skills.join(", ")} make you a strong candidate for this hackathon. `;
      if (complementarySkills.length > 0) {
        message += `You particularly excel in ${complementarySkills.join(" and ")} which are key requirements. `;
      }
      message += `Your match score: ${partner.score} points. Consider teaming up with others who complement your skills! 💪`;
    } else {
      message = `�👋 ${partner.name} could be an amazing teammate! `;
      message += `With a ${partner.level}% skill level, they bring expertise in ${partner.skills.join(", ")}. `;
      if (complementarySkills.length > 0) {
        message += `They specifically excel in ${complementarySkills.join(" and ")} which are crucial for this hackathon. `;
      }
      message += `Match score: ${partner.score} points. Together, you could make a winning team! 💪`;
    }
    
    updateBotMessage(message, true);
  };

  const handleHackathonHover = (hackathon: any, event: React.MouseEvent) => {
    const yourSkills = hackathon.matchingSkills?.join(", ") || "some skills";
    const missingSkills = hackathon.skills.filter((skill: string) => 
      !hackathon.matchingSkills?.includes(skill)
    ).join(", ") || "none";
    
    let message = `🔍 "${hackathon.title}" - ${hackathon.matchScore}% compatible!\n`;
    message += `✅ Your skills: ${yourSkills}\n`;
    if (missingSkills !== "none") {
      message += `🔶 Need help with: ${missingSkills}\n`;
    }
    message += `💰 ${hackathon.prizes[0]} • ⏰ ${hackathon.duration}`;
    
    showHoverPopup(message, event);
  };

  const handlePartnerHover = (partner: any, event: React.MouseEvent) => {
    const complementarySkills = partner.matchedSkills || [];
    
    let message = `👤 ${partner.name} - ${partner.level}% skill level\n`;
    message += `🛠️ Skills: ${partner.skills.join(", ")}\n`;
    if (complementarySkills.length > 0) {
      message += `🎯 Perfect match for: ${complementarySkills.join(", ")}\n`;
    }
    message += `⭐ Match Score: ${partner.score || 'N/A'} points`;
    
    showHoverPopup(message, event);
  };

  return (
    <>
      {/* Floating Bot Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={() => setIsOpen(true)}
              onMouseEnter={() => setIsIconHovered(true)}
              onMouseLeave={() => setIsIconHovered(false)}
              className="h-20 w-20 rounded-full bg-gradient-primary shadow-glow hover:shadow-hover transition-all duration-300 border-2 border-primary/20 p-2"
              size="lg"
            >
              <div className="relative">
                <img 
                  src={linkedinLlamaBot} 
                  alt="Pixie Bot" 
                  className="h-16 w-16 object-contain"
                />
              </div>
            </Button>
          {isIconHovered && (
            <div className="absolute bottom-full right-0 mb-2 bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-card text-sm max-w-48 animate-fade-in">
              🦙 Hi! I'm Pixie, your AI hackathon helper!
            </div>
          )}
        </div>
      )}

      {/* Bot Dialog */}
      {isOpen && (
        <div ref={chatbotRef} className="fixed bottom-6 right-6 z-50 w-[480px] animate-scale-in">
          <div className="relative">
            {/* Glowing neon border effect - same as Weekly Wisdom Quiz */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-xl blur opacity-75"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-xl opacity-30"></div>
            
            <Card className="relative bg-gradient-card shadow-lg border-2 border-primary/50 rounded-xl backdrop-blur-sm bg-white/95 overflow-hidden">
              {/* Subtle glow effect - always visible */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-600/5 opacity-60 pointer-events-none"></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={linkedinLlamaBot} 
                    alt="Pixie" 
                    className="h-8 w-8 object-contain"
                  />
                  <CardTitle className="text-lg">Pixie</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10 p-0"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={activeTab === 'recommendations' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveTab('recommendations');
                    const message = "🎯 Perfect! Here are hackathon recommendations perfectly matched to your skills! Each recommendation shows your compatibility percentage. Hover over any hackathon below to see detailed analysis of why it's perfect for you, including which skills give you an advantage and which ones you might need teammates for! 🚀";
                    setDefaultTabMessage(message);
                    updateBotMessage(message, true);
                  }}
                  className="flex-1"
                >
                  <Target className="h-3 w-3 mr-1" />
                  Hackathons
                </Button>
                <Button
                  variant={activeTab === 'partners' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveTab('partners');
                    let message;
                    if (selectedHackathon) {
                      message = `Let's find you the perfect teammate for "${selectedHackathon.title}"! Click on any partner to learn more about them. 🤝`;
                    } else {
                      message = "First, select a hackathon from the recommendations tab so I can find you compatible teammates! 🎯";
                    }
                    setDefaultTabMessage(message);
                    updateBotMessage(message, true);
                  }}
                  className="flex-1"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Partners
                </Button>
              </div>
            </CardHeader>

            <CardContent className="max-h-[520px] overflow-y-auto p-5" ref={contentRef}>
              {/* Bot Message Area */}
              <div className={`mb-4 p-3 rounded-lg border transition-all duration-300 ${
                messageHighlighted 
                  ? 'bg-primary/8 border-primary/40 shadow-sm scale-[1.01]' 
                  : 'bg-gradient-subtle border-primary/10'
              }`}>
                <div className="flex items-start gap-2">
                  <img 
                    src={linkedinLlamaBot} 
                    alt="Llama" 
                    className="h-6 w-6 rounded-full object-cover mt-0.5"
                  />
                  <div className="text-sm text-foreground leading-relaxed">
                    {botMessage}
                  </div>
                </div>
              </div>

              {activeTab === 'recommendations' && (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground mb-3">
                    Based on your skills, here are my recommendations:
                  </div>
                  {recommendations.map((hackathon, index) => (
                    <div
                      key={index}
                      className="p-3 bg-background rounded-lg border hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 cursor-pointer hover:shadow-sm"
                      onClick={() => handleHackathonClick(hackathon)}
                      onMouseEnter={(e) => handleHackathonHover(hackathon, e)}
                      onMouseLeave={hideHoverPopup}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{hackathon.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {hackathon.matchScore}% match
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {hackathon.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline">{hackathon.difficulty}</Badge>
                        <span className="text-success">{hackathon.prizes[0]}</span>
                        <span className="text-muted-foreground">• {hackathon.duration}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {hackathon.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant={hackathon.matchingSkills?.includes(skill) ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-muted-foreground text-center mt-4 opacity-75">
                    💡 Hover over any hackathon to see a detailed popup with compatibility analysis
                  </div>
                </div>
              )}

              {activeTab === 'partners' && (
                <div className="space-y-3">
                  {selectedHackathon ? (
                    <>
                      <div className="text-sm text-muted-foreground mb-3">
                        Recommended partners for <span className="font-medium text-foreground">{selectedHackathon.title}</span>:
                      </div>
                      {getRecommendedPartners(selectedHackathon).map((partner, index) => (
                        <div
                          key={index}
                          className="p-3 bg-background rounded-lg border hover:border-primary/40 transition-colors cursor-pointer"
                          onClick={() => handlePartnerClick(partner)}
                          onMouseEnter={(e) => handlePartnerHover(partner, e)}
                          onMouseLeave={hideHoverPopup}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{partner.avatar}</span>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{partner.name}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Brain className="h-3 w-3" />
                                Skill Level: {partner.level}%
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Connect
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {partner.skills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="text-center text-sm text-muted-foreground py-8">
                      Select a hackathon to see recommended partners
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          </div>
          
          {/* Hover Popup - moved outside Card to prevent clipping */}
          {hoverMessage && (
            <div 
              className="fixed z-[60] max-w-md p-4 bg-background border border-primary/20 rounded-lg shadow-lg text-sm leading-relaxed pointer-events-none animate-in fade-in duration-200"
              style={{
                left: hoverPosition.x,
                top: hoverPosition.y,
                transform: 'translate(-50%, -100%)'
              }}
            >
              <div className="whitespace-pre-line text-foreground">
                {hoverMessage}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LlamaBot;

// Export the event system for other components to use
export { hackathonEvents };
