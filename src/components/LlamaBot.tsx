import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, MessageCircle, Users, Target, Zap, Brain } from "lucide-react";
import llamaBotImage from "/Users/apoorva/LinkedOut/linklearn-ai-spark/src/components/LlamaBot.tsx";

interface Skill {
  name: string;
  level: number;
  category: string;
  trend: 'up' | 'stable' | 'down';
}

interface Hackathon {
  title: string;
  description: string;
  requiredSkills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prize: string;
  deadline: string;
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
    title: "AI-Powered Health Assistant",
    description: "Build an AI assistant that helps users track and improve their health habits",
    requiredSkills: ["AI/ML Basics", "React Development", "Data Structures"],
    difficulty: "Intermediate",
    prize: "$5,000",
    deadline: "2 weeks"
  },
  {
    title: "Smart Financial Dashboard",
    description: "Create a React dashboard with TypeScript that visualizes financial data",
    requiredSkills: ["React Development", "TypeScript", "Data Structures"],
    difficulty: "Beginner",
    prize: "$2,500",
    deadline: "1 week"
  },
  {
    title: "Cloud Infrastructure Monitor",
    description: "Build a system design solution for monitoring cloud infrastructure",
    requiredSkills: ["System Design", "DevOps", "TypeScript"],
    difficulty: "Advanced",
    prize: "$10,000",
    deadline: "3 weeks"
  }
];

const potentialPartners: TeamMember[] = [
  {
    name: "Sarah Chen",
    skills: ["Python", "Machine Learning", "Data Science"],
    level: 88,
    avatar: "🧑‍💻"
  },
  {
    name: "Marcus Rodriguez",
    skills: ["Backend Development", "System Design", "DevOps"],
    level: 92,
    avatar: "👨‍💻"
  },
  {
    name: "Emily Watson",
    skills: ["UI/UX Design", "Frontend", "Product Management"],
    level: 85,
    avatar: "👩‍🎨"
  }
];

const LlamaBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'partners'>('recommendations');
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [botMessage, setBotMessage] = useState("Hey there! 👋 I'm Pixie, your friendly AI assistant. I've analyzed your skill profile and found some exciting opportunities for you!");
  const [selectedPartner, setSelectedPartner] = useState<TeamMember | null>(null);

  const getRecommendedHackathons = () => {
    return hackathons.map(hackathon => {
      const matchingSkills = hackathon.requiredSkills.filter(reqSkill =>
        skillsData.some(userSkill => 
          userSkill.name.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(userSkill.name.toLowerCase())
        )
      );
      
      const matchScore = matchingSkills.length / hackathon.requiredSkills.length;
      
      return {
        ...hackathon,
        matchingSkills,
        matchScore: Math.round(matchScore * 100)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  const getRecommendedPartners = (hackathon: Hackathon) => {
    const userWeakSkills = skillsData
      .filter(skill => skill.level < 60)
      .map(skill => skill.name);
    
    return potentialPartners.filter(partner =>
      partner.skills.some(skill =>
        hackathon.requiredSkills.some(reqSkill =>
          skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(skill.toLowerCase())
        ) || userWeakSkills.some(weakSkill =>
          skill.toLowerCase().includes(weakSkill.toLowerCase()) ||
          weakSkill.toLowerCase().includes(skill.toLowerCase())
        )
      )
    );
  };

  const recommendations = getRecommendedHackathons();

  const handleHackathonClick = (hackathon: any) => {
    setSelectedHackathon(hackathon);
    const yourSkills = hackathon.matchingSkills?.join(", ") || "some skills";
    const missingSkills = hackathon.requiredSkills.filter((skill: string) => 
      !hackathon.matchingSkills?.includes(skill)
    ).join(", ") || "none";
    
    let message = `🎯 Great choice! This ${hackathon.difficulty.toLowerCase()} hackathon has a ${hackathon.matchScore}% match with your skills. `;
    message += `You're already strong in: ${yourSkills}. `;
    if (missingSkills !== "none") {
      message += `You might want to find teammates who excel in: ${missingSkills}. `;
    }
    message += `With ${hackathon.deadline} left and a ${hackathon.prize} prize, this could be perfect for you! 🚀`;
    
    setBotMessage(message);
    setActiveTab('partners');
  };

  const handlePartnerClick = (partner: TeamMember) => {
    setSelectedPartner(partner);
    const complementarySkills = partner.skills.filter(skill =>
      selectedHackathon?.requiredSkills.some(reqSkill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    let message = `👋 ${partner.name} could be an amazing teammate! `;
    message += `With a ${partner.level}% skill level, they bring expertise in ${partner.skills.join(", ")}. `;
    if (complementarySkills.length > 0) {
      message += `They specifically excel in ${complementarySkills.join(" and ")} which are crucial for this hackathon. `;
    }
    message += `Together, you could make a winning team! 💪`;
    
    setBotMessage(message);
  };

  const handleHackathonHover = (hackathon: any) => {
    const yourSkills = hackathon.matchingSkills?.join(", ") || "some skills";
    const missingSkills = hackathon.requiredSkills.filter((skill: string) => 
      !hackathon.matchingSkills?.includes(skill)
    ).join(", ") || "none";
    
    let message = `🔍 Looking at "${hackathon.title}" - this ${hackathon.difficulty.toLowerCase()} challenge is ${hackathon.matchScore}% compatible with your skills! `;
    message += `You're strong in ${yourSkills}. `;
    if (missingSkills !== "none") {
      message += `You'd benefit from a teammate with ${missingSkills} expertise. `;
    }
    message += `${hackathon.prize} prize with ${hackathon.deadline} remaining! Click to see potential partners! 🎯`;
    
    setBotMessage(message);
  };

  const handlePartnerHover = (partner: TeamMember) => {
    const complementarySkills = partner.skills.filter(skill =>
      selectedHackathon?.requiredSkills.some(reqSkill =>
        skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
        reqSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
    
    let message = `👤 Meet ${partner.name}! They have a ${partner.level}% skill rating and specialize in ${partner.skills.join(", ")}. `;
    if (complementarySkills.length > 0) {
      message += `Perfect match! They have the ${complementarySkills.join(" and ")} skills this hackathon needs. `;
    }
    message += `Click to learn more about this potential teammate! 🤝`;
    
    setBotMessage(message);
  };

  return (
    <>
      {/* Floating Bot Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={() => setIsOpen(true)}
              className="h-16 w-16 rounded-full bg-gradient-primary shadow-glow hover:shadow-hover transition-all duration-300 border-2 border-primary/20 p-2"
              size="lg"
            >
              <div className="relative">
                <img 
                  src={llamaBotImage} 
                  alt="Pixie Bot" 
                  className="h-12 w-12 object-contain"
                />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-success rounded-full animate-pulse-glow" />
              </div>
            </Button>
          <div className="absolute bottom-full right-0 mb-2 bg-background/95 backdrop-blur-sm border rounded-lg p-2 shadow-card text-xs max-w-32 animate-fade-in">
            🦙 Hi! I'm Pixie, your AI hackathon helper!
          </div>
        </div>
      )}

      {/* Bot Dialog */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 animate-scale-in">
          <Card className="bg-gradient-card shadow-hover border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src={llamaBotImage} 
                    alt="Pixie" 
                    className="h-8 w-8 object-contain"
                  />
                  <CardTitle className="text-lg">Pixie</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={activeTab === 'recommendations' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveTab('recommendations');
                    setBotMessage("Hey there! 👋 I'm Pixie, your friendly AI assistant. I've analyzed your skill profile and found some exciting opportunities for you!");
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
                    if (selectedHackathon) {
                      setBotMessage(`Let's find you the perfect teammate for "${selectedHackathon.title}"! Click on any partner to learn more about them. 🤝`);
                    } else {
                      setBotMessage("First, select a hackathon from the recommendations tab so I can find you compatible teammates! 🎯");
                    }
                  }}
                  className="flex-1"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Partners
                </Button>
              </div>
            </CardHeader>

            <CardContent className="max-h-96 overflow-y-auto">
              {/* Bot Message Area */}
              <div className="mb-4 p-3 bg-gradient-subtle rounded-lg border border-primary/10">
                <div className="flex items-start gap-2">
                  <img 
                    src={llamaBotImage} 
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
                      className="p-3 bg-background rounded-lg border hover:border-primary/40 transition-colors cursor-pointer"
                      onClick={() => handleHackathonClick(hackathon)}
                      onMouseEnter={() => handleHackathonHover(hackathon)}
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
                        <span className="text-success">{hackathon.prize}</span>
                        <span className="text-muted-foreground">• {hackathon.deadline}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {hackathon.requiredSkills.map((skill, idx) => (
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
                          onMouseEnter={() => handlePartnerHover(partner)}
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
      )}
    </>
  );
};

export default LlamaBot;
