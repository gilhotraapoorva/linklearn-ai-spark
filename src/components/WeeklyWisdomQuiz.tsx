import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Clock, Medal, RefreshCcw, Cpu, Bot, Loader2 } from "lucide-react";
import React, { useState } from "react";

const topics = [
	"Diversity & Inclusion",
	"Mental Well-being at Work",
	"Ethical AI Use",
	"Growth Mindset",
	"Effective Communication",
	"Leadership Skills",
	"Time Management",
	"Problem Solving",
	"Innovation & Creativity",
	"Remote Work Best Practices",
];

const WeeklyWisdomQuiz = ({ attempted = false }: { attempted?: boolean }) => {
	const navigate = useNavigate();
	const [isGenerating, setIsGenerating] = useState(false);

	const handleStartQuiz = () => {
		setIsGenerating(true);
		// Simulate AI generation time
		setTimeout(() => {
			navigate("/weekly-wisdom-quiz");
		}, 2000); // 2 second delay to show the loading state
	};

	return (
		<div className="relative group">
			{/* Glowing neon border effect */}
			<div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
			<div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
			
			<Card className="bg-gradient-card shadow-lg p-2 mb-2 border-2 border-primary/50 rounded-lg w-full max-w-full min-w-0 relative overflow-hidden backdrop-blur-sm bg-white/95">
				{/* AI Icon overlay */}
				<div className="absolute top-4 right-4 z-20">
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-lg opacity-50"></div>
						<div className="relative bg-gradient-to-r from-primary to-purple-600 p-3 rounded-full shadow-lg">
							<Cpu className="h-8 w-8 text-white" />
						</div>
					</div>
				</div>
				
				{/* Subtle glow effect */}
				<div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
				
				<CardHeader className="pb-2 relative z-10">
					<CardTitle className="flex items-center gap-2 text-neutral-900">
						<Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
						Weekly Wisdom Quiz
						<Bot className="h-5 w-5 text-primary ml-1" />
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0 pb-2 relative z-10">
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
					</div>
					<div className="text-base font-bold mt-2 mb-2">
						This week's topic:{" "}
						<span className="font-normal italic">
							Randomly selected from our wisdom collection!
						</span>
					</div>
					<Button
						variant="quest"
						size="quest"
						className="w-full font-semibold relative overflow-hidden group/btn"
						onClick={handleStartQuiz}
						disabled={isGenerating || attempted}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
						<span className="relative z-10 flex items-center gap-2">
							{isGenerating ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									Generating AI Quiz...
								</>
							) : attempted ? (
								"Quiz Already Attempted"
							) : (
								"Take Quiz Now"
							)}
						</span>
					</Button>
				</CardContent>
			</Card>

			{/* AI Generation Loading Overlay */}
			{isGenerating && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
					<div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center">
						<div className="relative mb-6">
							<div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-lg opacity-30"></div>
							<div className="relative bg-gradient-to-r from-primary to-purple-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
								<Cpu className="h-8 w-8 text-white" />
							</div>
						</div>
						
						<h3 className="text-2xl font-bold text-gray-800 mb-2">AI Generating Your Quiz</h3>
						<p className="text-gray-600 mb-6">Creating personalized wisdom questions just for you...</p>
						
						<div className="flex items-center justify-center gap-3 mb-6">
							<div className="flex space-x-1">
								<div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
								<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
								<div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
							</div>
						</div>
						
						<div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-4 border border-primary/20">
							<div className="flex items-center gap-2 text-primary font-semibold">
								<Bot className="h-4 w-4" />
								AI Generated Content
							</div>
							<p className="text-sm text-gray-600 mt-1">
								Each quiz is uniquely crafted by our AI to provide relevant insights
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WeeklyWisdomQuiz;
