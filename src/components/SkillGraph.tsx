import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, Brain } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  trend: 'up' | 'stable' | 'down';
}

const skillsData: Skill[] = [
  { name: "React Development", level: 85, category: "Frontend", trend: 'up' },
  { name: "TypeScript", level: 70, category: "Programming", trend: 'up' },
  { name: "System Design", level: 45, category: "Architecture", trend: 'stable' },
  { name: "AI/ML Basics", level: 25, category: "Emerging Tech", trend: 'up' },
  { name: "DevOps", level: 60, category: "Infrastructure", trend: 'stable' },
  { name: "Data Structures", level: 80, category: "Programming", trend: 'stable' },
];

const SkillGraph = () => {
  const getSkillColor = (level: number) => {
    if (level >= 80) return "bg-gradient-success";
    if (level >= 60) return "bg-gradient-primary";
    if (level >= 40) return "bg-gradient-accent";
    return "bg-muted";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-success" />;
      case 'down':
        return <TrendingUp className="h-3 w-3 text-destructive rotate-180" />;
      default:
        return <Target className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const categoryIcons = {
    "Frontend": <Zap className="h-4 w-4" />,
    "Programming": <Brain className="h-4 w-4" />,
    "Architecture": <Target className="h-4 w-4" />,
    "Emerging Tech": <TrendingUp className="h-4 w-4" />,
    "Infrastructure": <Target className="h-4 w-4" />,
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Your Skill Graph
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skillsData.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {categoryIcons[skill.category as keyof typeof categoryIcons]}
                <span className="font-medium">{skill.name}</span>
                {getTrendIcon(skill.trend)}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {skill.category}
                </Badge>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
            </div>
            <div className="relative">
              <Progress 
                value={skill.level} 
                className="h-2" 
              />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getSkillColor(skill.level)}`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillGraph;