import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Heart, MessageCircle, Lightbulb } from "lucide-react";
import React from "react";

const questions = [
  "How is your workspace setup today?",
  "What blockers are you facing this week?",
  "What would make your week better as a developer?",
  "Is there a tool or resource you wish you had right now?",
  "How are you feeling about your current project?",
  "Any wins or learnings you'd like to share?",
];

const WeeklyDeveloperDigest = () => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
          Weekly Developer Digest
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {questions.map((q, i) => (
            <div key={i} className="flex items-start gap-2 text-base text-muted-foreground">
              <MessageCircle className="h-5 w-5 text-accent mt-0.5" />
              <span>{q}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Heart className="h-4 w-4 text-pink-500" />
          We care about your developer journey. Share your thoughts!
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyDeveloperDigest;
