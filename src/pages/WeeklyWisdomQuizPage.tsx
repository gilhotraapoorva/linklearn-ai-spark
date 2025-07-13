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
			<div className="w-full max-w-xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-white">
				{/* Header */}
				<div className="bg-[#1570EF] px-8 pt-8 pb-4 text-white text-center rounded-t-3xl">
					<div className="flex items-center justify-center gap-2 mb-2">
						<span className="inline-block">
							<svg
								width="28"
								height="28"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 2v2m6.364 1.636l-1.414 1.414M22 12h-2m-1.636 6.364l-1.414-1.414M12 22v-2m-6.364-1.636l1.414-1.414M2 12h2m1.636-6.364l1.414 1.414"
									stroke="#FFD600"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
						</span>
						<span className="text-2xl font-extrabold drop-shadow-lg">
							Weekly Wisdom Quiz
						</span>
					</div>
					<div className="text-lg font-semibold mb-2">
						Topic:{" "}
						<span className="text-[#FFD600] font-bold">
							Building Inclusive Teams
						</span>
					</div>
					<div className="flex justify-center">
						<div className="bg-[#2563EB] bg-opacity-80 text-white text-sm rounded-xl px-4 py-2 font-medium flex items-center gap-2 shadow-inner">
							<span>🪴</span> Grow your soft skills and earn XP every week!
						</div>
					</div>
				</div>
				{/* Quiz Body */}
				<div className="px-8 py-10">
					{/* Question Number */}
					<div className="flex items-center gap-2 mb-4">
						<span className="inline-block w-2 h-2 rounded-full bg-[#1570EF] animate-pulse"></span>
						<span className="text-[#1570EF] font-semibold">
							Question {current + 1} of {questions.length}
						</span>
					</div>
					{/* Question Text */}
					<div className="mb-6 text-2xl font-bold text-[#1D2939]">
						{questions[current].q}
					</div>
					{/* Options */}
					<div className="space-y-4 mb-8">
						{questions[current].options.map((opt, idx) => (
							<button
								key={idx}
								onClick={() => handleOption(idx)}
								className={`w-full text-base py-3 rounded-xl border-2 transition-all duration-200 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1570EF] bg-white text-[#344054] ${
									selected === idx
										? "border-[#1570EF] ring-2 ring-[#1570EF] bg-[#EFF8FF]"
										: "border-[#D1E9FF] hover:border-[#1570EF] hover:bg-[#F0F6FF]"
								} `}
							>
								{opt}
							</button>
						))}
					</div>
					{/* Progress Bar */}
					<div className="w-full h-2 rounded-full bg-[#EFF8FF] mb-4">
						<div
							className="h-2 rounded-full bg-[#1570EF] transition-all duration-500"
							style={{
								width: `${((current + (selected !== null ? 1 : 0)) /
									questions.length) *
									100}%`,
							}}
						/>
					</div>
					{/* XP and Retake Info */}
					<div className="flex items-center justify-between mb-6 text-sm">
						<span className="flex items-center gap-1 text-[#1570EF] font-medium">
							<span>🏆</span> Earn 100 XP for a perfect score!
						</span>
						<span className="flex items-center gap-1 text-[#667085]">
							<svg
								width="16"
								height="16"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									d="M12 4v1m0 15v-1m8-7h-1M5 12H4m13.657-6.343l-.707.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707-.707"
									stroke="#667085"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>{" "}
							Retake anytime
						</span>
					</div>
					{/* Next Button */}
					<button
						onClick={handleNext}
						disabled={selected === null}
						className={`w-full py-4 rounded-xl text-lg font-bold shadow-md transition-all duration-200 ${
							selected === null
								? "bg-[#B2DDFF] text-white cursor-not-allowed"
								: "bg-[#1570EF] text-white hover:bg-[#2563EB]"
						} `}
					>
						{current === questions.length - 1
							? "Finish Quiz"
							: "Next Question"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default WeeklyWisdomQuizPage;
