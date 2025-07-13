import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const questions = [
	{
		q: "Which of the following best describes an inclusive team?",
		options: [
			"A team where everyone has the same background",
			"A team that values and leverages diverse perspectives",
			"A team that avoids conflict by discouraging differences",
			"A team that only hires from top universities",
		],
		answer: 1,
	},
	{
		q: "What is a simple way to make meetings more inclusive?",
		options: [
			"Let only managers speak",
			"Rotate who leads the meeting and encourage all voices",
			"Keep meetings as short as possible",
			"Share notes only with leadership",
		],
		answer: 1,
	},
	{
		q: "Why is psychological safety important for teams?",
		options: [
			"It helps people feel safe to share ideas and take risks",
			"It ensures everyone agrees all the time",
			"It reduces the need for feedback",
			"It makes meetings longer",
		],
		answer: 0,
	},
	{
		q: "Which action supports diversity and inclusion at work?",
		options: [
			"Interrupting others to share your point",
			"Listening actively and respecting different viewpoints",
			"Hiring only people you know",
			"Ignoring cultural holidays",
		],
		answer: 1,
	},
];

const WeeklyWisdomQuizPage = () => {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const navigate = useNavigate();

	const handleOption = (idx: number) => {
		setSelected(idx);
	};

	const handleNext = () => {
		if (selected === questions[current].answer) setScore(score + 1);
		if (current < questions.length - 1) {
			setCurrent(current + 1);
			setSelected(null);
		} else {
			setShowResult(true);
		}
	};

	const handleRetake = () => {
		setCurrent(0);
		setSelected(null);
		setScore(0);
		setShowResult(false);
	};

	return (
		<div className="flex justify-center items-center min-h-[80vh] bg-background">
			<Card className="w-full max-w-xl mx-auto bg-primary shadow-2xl border-0 rounded-3xl overflow-hidden">
				<CardHeader className="pb-4 pt-8 flex flex-col items-center bg-primary text-white relative">
					<CardTitle className="flex items-center gap-3 text-2xl font-extrabold drop-shadow-lg">
						<Sparkles className="h-7 w-7 text-yellow-300 animate-pulse-glow" />
						Weekly Wisdom Quiz
					</CardTitle>
					<div className="text-base mt-2 font-semibold tracking-wide">
						Topic:{" "}
						<span className="font-bold text-yellow-200">
							Building Inclusive Teams
						</span>
					</div>
					<div className="mt-3 text-sm bg-white/20 text-white rounded-lg px-5 py-2 font-medium flex items-center gap-2 shadow-inner">
						🌱{" "}
						<span>Grow your soft skills and earn XP every week!</span>
					</div>
				</CardHeader>
				<CardContent className="px-8 py-8">
					{!showResult ? (
						<>
							<div className="mb-4 text-base font-semibold text-blue-700 flex items-center gap-2">
								<span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
								Question {current + 1} of {questions.length}
							</div>
							<div className="mb-4 text-xl font-bold text-blue-900 drop-shadow-sm">
								{questions[current].q}
							</div>
							<div className="space-y-3 mb-8">
								{questions[current].options.map((opt, idx) => (
									<Button
										key={idx}
										variant={selected === idx ? "quest" : "outline"}
										size="sm"
										className={`w-full text-left text-base rounded-xl border-2 transition-all duration-200 ${
											selected === idx
												? "ring-2 ring-primary scale-[1.03] bg-gradient-to-r from-blue-200 to-blue-100"
												: "hover:bg-blue-50"
										}`}
										onClick={() => handleOption(idx)}
									>
										{opt}
									</Button>
								))}
							</div>
							<Progress
								value={
									((current + (selected !== null ? 1 : 0)) /
										questions.length) *
									100
								}
								className="mb-6 h-3 bg-blue-100"
							/>
							<div className="flex items-center justify-between mb-6 text-xs text-blue-700">
								<span className="flex items-center gap-1">
									🏆{" "}
									<span>Earn 100 XP for a perfect score!</span>
								</span>
								<span className="flex items-center gap-1">
									🔄{" "}
									<span>Retake anytime</span>
								</span>
							</div>
							<Button
								variant="quest"
								size="quest"
								className="w-full text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
								onClick={handleNext}
								disabled={selected === null}
							>
								{current === questions.length - 1
									? "Finish Quiz"
									: "Next Question"}
							</Button>
						</>
					) : (
						<div className="text-center space-y-6">
							<div className="text-3xl font-extrabold text-blue-700 drop-shadow-lg flex items-center justify-center gap-2">
								🎉 Quiz Complete!
							</div>
							<div className="text-lg font-semibold text-blue-900">
								Your Score:{" "}
								<span className="font-bold text-green-600">
									{score} / {questions.length}
								</span>
							</div>
							<div className="text-base text-green-800 bg-green-100 rounded-xl px-6 py-3 font-medium flex items-center gap-2 justify-center shadow-inner">
								{"🥇 "}
								<span>Great job! Keep building your wisdom streak.</span>
							</div>
							<Button
								variant="quest"
								size="quest"
								className="w-full text-lg rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500"
								onClick={handleRetake}
							>
								Retake Quiz
							</Button>
							<Button
								variant="outline"
								size="sm"
								className="w-full rounded-xl border-blue-300 text-blue-700 font-semibold"
								onClick={() => navigate("/")}
							>
								Back to Dashboard
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default WeeklyWisdomQuizPage;
