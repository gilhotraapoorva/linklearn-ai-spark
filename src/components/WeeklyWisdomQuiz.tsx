import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, Medal, RefreshCcw } from "lucide-react";
import React from "react";

const topics = [
	"Diversity & Inclusion",
	"Mental Well-being at Work",
	"Ethical AI Use",
	"Growth Mindset",
	"Effective Communication",
	"Psychological Safety",
	"Sustainability in Tech",
	"Conflict Resolution",
];

const WeeklyWisdomQuiz = () => {
	return (
		<Card className="bg-gradient-card shadow-lg p-2 mb-2 border border-border rounded-none w-full max-w-full min-w-0">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-neutral-900">
					<Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
					Weekly Wisdom Quiz
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0 pb-2">
				<div className="mb-2 text-base font-semibold text-primary">
					Learn something new beyond code—every week!
				</div>
				<div className="text-sm text-muted-foreground mb-2">
					Take a short AI-generated quiz to explore topics like:
				</div>
				<ul className="list-disc pl-6 text-sm text-foreground mb-3">
					{topics.map((topic, i) => (
						<li key={i}>{topic}</li>
					))}
				</ul>
				<div className="flex flex-wrap gap-4 items-center mb-2 mt-4">
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<Clock className="h-4 w-4" /> 5 questions
					</div>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<Medal className="h-4 w-4" /> 100 XP
					</div>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<RefreshCcw className="h-4 w-4" /> Retake anytime
					</div>
				</div>
				<div className="text-base font-bold mt-2 mb-2">
					This week’s topic:{" "}
					<span className="font-normal italic">
						Building Inclusive Teams
					</span>
				</div>
				<Button
					variant="quest"
					size="quest"
					className="w-full font-semibold"
				>
					Take Quiz Now
				</Button>
			</CardContent>
		</Card>
	);
};

export default WeeklyWisdomQuiz;
