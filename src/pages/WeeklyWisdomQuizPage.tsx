import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

// Multiple question sets for variety
const questionSets = [
	// Set 1: Building Inclusive Teams
	{
		topic: "Building Inclusive Teams",
		questions: [
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
		],
	},
	// Set 2: Mental Well-being at Work
	{
		topic: "Mental Well-being at Work",
		questions: [
			{
				q: "What is a healthy way to manage work stress?",
				options: [
					"Working longer hours to get everything done",
					"Taking regular breaks and setting boundaries",
					"Ignoring stress until it goes away",
					"Working through lunch every day",
				],
				answer: 1,
			},
			{
				q: "Which practice helps prevent burnout?",
				options: [
					"Always saying yes to every request",
					"Setting realistic expectations and priorities",
					"Working weekends regularly",
					"Checking emails 24/7",
				],
				answer: 1,
			},
			{
				q: "What is the benefit of work-life balance?",
				options: [
					"It reduces productivity",
					"It improves mental health and job satisfaction",
					"It makes you work less",
					"It's only important for managers",
				],
				answer: 1,
			},
			{
				q: "How can you support a colleague's mental health?",
				options: [
					"Tell them to toughen up",
					"Listen without judgment and offer support",
					"Ignore their struggles",
					"Share their problems with others",
				],
				answer: 1,
			},
		],
	},
	// Set 3: Effective Communication
	{
		topic: "Effective Communication",
		questions: [
			{
				q: "What is active listening?",
				options: [
					"Waiting for your turn to speak",
					"Fully concentrating on what someone is saying",
					"Interrupting to share your opinion",
					"Checking your phone while they talk",
				],
				answer: 1,
			},
			{
				q: "Which communication style is most effective in teams?",
				options: [
					"Always being direct and blunt",
					"Being clear, respectful, and open to feedback",
					"Avoiding difficult conversations",
					"Using technical jargon only",
				],
				answer: 1,
			},
			{
				q: "What is the purpose of giving constructive feedback?",
				options: [
					"To criticize and find faults",
					"To help others improve and grow",
					"To show you're smarter",
					"To avoid difficult conversations",
				],
				answer: 1,
			},
			{
				q: "How can you improve written communication?",
				options: [
					"Use as many technical terms as possible",
					"Be clear, concise, and consider your audience",
					"Write long, detailed emails",
					"Use only abbreviations",
				],
				answer: 1,
			},
		],
	},
	// Set 4: Growth Mindset
	{
		topic: "Growth Mindset",
		questions: [
			{
				q: "What characterizes a growth mindset?",
				options: [
					"Believing abilities are fixed and unchangeable",
					"Seeing challenges as opportunities to learn",
					"Avoiding difficult tasks",
					"Only doing what you're already good at",
				],
				answer: 1,
			},
			{
				q: "How should you respond to failure?",
				options: [
					"Give up and try something easier",
					"Learn from it and try again",
					"Blame others for your mistakes",
					"Hide your failures from others",
				],
				answer: 1,
			},
			{
				q: "What is the value of seeking feedback?",
				options: [
					"It shows weakness",
					"It helps you identify areas for improvement",
					"It's only for beginners",
					"It makes you look unsure",
				],
				answer: 1,
			},
			{
				q: "How can you develop new skills effectively?",
				options: [
					"Practice consistently and embrace challenges",
					"Only learn what comes easily",
					"Avoid difficult subjects",
					"Wait until you're naturally talented",
				],
				answer: 0,
			},
		],
	},
	// Set 5: Ethical AI Use
	{
		topic: "Ethical AI Use",
		questions: [
			{
				q: "What is a key principle of ethical AI development?",
				options: [
					"Maximizing profit at any cost",
					"Ensuring fairness and avoiding bias",
					"Keeping algorithms secret",
					"Using any data available",
				],
				answer: 1,
			},
			{
				q: "Why is transparency important in AI systems?",
				options: [
					"It makes systems more complex",
					"It builds trust and allows for accountability",
					"It reduces system performance",
					"It's not important for AI",
				],
				answer: 1,
			},
			{
				q: "What should you consider when using AI tools?",
				options: [
					"Only the speed of results",
					"Privacy, accuracy, and potential biases",
					"Just the cost of the tool",
					"Whether it's the latest technology",
				],
				answer: 1,
			},
			{
				q: "How can you ensure responsible AI use in your work?",
				options: [
					"Use AI for everything without question",
					"Validate outputs and consider ethical implications",
					"Hide AI usage from stakeholders",
					"Replace human judgment entirely",
				],
				answer: 1,
			},
		],
	},
	// Set 6: Leadership Skills
	{
		topic: "Leadership Skills",
		questions: [
			{
				q: "What is the most important trait of a good leader?",
				options: [
					"Always being the smartest person in the room",
					"Empowering and developing team members",
					"Making all decisions alone",
					"Being friends with everyone",
				],
				answer: 1,
			},
			{
				q: "How should a leader handle team conflicts?",
				options: [
					"Ignore them and hope they resolve themselves",
					"Address them promptly and facilitate resolution",
					"Take sides immediately",
					"Fire the people involved",
				],
				answer: 1,
			},
			{
				q: "What is servant leadership?",
				options: [
					"Being subservient to your team",
					"Prioritizing team needs and growth over personal power",
					"Letting the team make all decisions",
					"Working as a servant in the company",
				],
				answer: 1,
			},
			{
				q: "How can you build trust as a leader?",
				options: [
					"Always agree with your team",
					"Be consistent, honest, and follow through on commitments",
					"Give everyone raises",
					"Never give feedback",
				],
				answer: 1,
			},
		],
	},
	// Set 7: Time Management
	{
		topic: "Time Management",
		questions: [
			{
				q: "What is the most effective time management technique?",
				options: [
					"Working longer hours",
					"Prioritizing tasks and focusing on what matters most",
					"Multitasking on everything",
					"Procrastinating until the last minute",
				],
				answer: 1,
			},
			{
				q: "How should you handle interruptions at work?",
				options: [
					"Always respond immediately",
					"Set boundaries and schedule focused work time",
					"Ignore all interruptions",
					"Work only when no one is around",
				],
				answer: 1,
			},
			{
				q: "What is the benefit of time blocking?",
				options: [
					"It makes your calendar look busy",
					"It helps you focus and complete tasks efficiently",
					"It prevents others from scheduling meetings",
					"It's just a trendy technique",
				],
				answer: 1,
			},
			{
				q: "How can you avoid procrastination?",
				options: [
					"Wait for motivation to strike",
					"Break tasks into smaller, manageable steps",
					"Set unrealistic deadlines",
					"Work only under pressure",
				],
				answer: 1,
			},
		],
	},
	// Set 8: Problem Solving
	{
		topic: "Problem Solving",
		questions: [
			{
				q: "What is the first step in effective problem solving?",
				options: [
					"Jumping to solutions immediately",
					"Clearly defining and understanding the problem",
					"Assigning blame",
					"Ignoring the problem",
				],
				answer: 1,
			},
			{
				q: "How should you approach complex problems?",
				options: [
					"Solve them all at once",
					"Break them down into smaller, manageable parts",
					"Delegate them to others",
					"Avoid them entirely",
				],
				answer: 1,
			},
			{
				q: "What is the value of brainstorming multiple solutions?",
				options: [
					"It wastes time",
					"It increases the chance of finding the best solution",
					"It confuses the team",
					"It's only for creative problems",
				],
				answer: 1,
			},
			{
				q: "How can you improve your problem-solving skills?",
				options: [
					"Only solve easy problems",
					"Practice regularly and learn from different approaches",
					"Avoid difficult problems",
					"Copy solutions from others",
				],
				answer: 1,
			},
		],
	},
	// Set 9: Innovation & Creativity
	{
		topic: "Innovation & Creativity",
		questions: [
			{
				q: "What fosters creativity in a team?",
				options: [
					"Strict rules and procedures",
					"Encouraging diverse perspectives and experimentation",
					"Following only proven methods",
					"Working in isolation",
				],
				answer: 1,
			},
			{
				q: "How can you encourage innovation?",
				options: [
					"Always stick to what works",
					"Create a safe space for new ideas and calculated risks",
					"Criticize new approaches",
					"Only hire experienced people",
				],
				answer: 1,
			},
			{
				q: "What is the role of failure in innovation?",
				options: [
					"It should be avoided at all costs",
					"It's a valuable learning opportunity",
					"It means the idea was bad",
					"It reflects poorly on the team",
				],
				answer: 1,
			},
			{
				q: "How can you stay innovative in your work?",
				options: [
					"Always do things the same way",
					"Continuously learn, experiment, and challenge assumptions",
					"Only work on proven projects",
					"Follow industry standards strictly",
				],
				answer: 1,
			},
		],
	},
	// Set 10: Remote Work Best Practices
	{
		topic: "Remote Work Best Practices",
		questions: [
			{
				q: "What is essential for effective remote communication?",
				options: [
					"Using only email",
					"Clear expectations, regular check-ins, and multiple communication channels",
					"Having long meetings",
					"Working in different time zones",
				],
				answer: 1,
			},
			{
				q: "How can you maintain work-life balance while working remotely?",
				options: [
					"Working 24/7 since you're at home",
					"Setting clear boundaries and maintaining a routine",
					"Never taking breaks",
					"Working from bed",
				],
				answer: 1,
			},
			{
				q: "What helps build team cohesion in remote settings?",
				options: [
					"Only discussing work",
					"Regular virtual team building and informal interactions",
					"Having no personal conversations",
					"Working in complete isolation",
				],
				answer: 1,
			},
			{
				q: "How should you handle distractions when working remotely?",
				options: [
					"Embrace all distractions",
					"Create a dedicated workspace and establish routines",
					"Work with the TV on",
					"Take calls from anywhere",
				],
				answer: 1,
			},
		],
	},
];

const DecorativeBg = () => (
  <>
    <div className="hidden md:block absolute left-0 top-0 h-full w-1/4 z-0">
      <div className="absolute left-0 top-1/4 w-40 h-40 bg-blue-100 rounded-full opacity-40 blur-2xl" />
      <div className="absolute left-10 top-2/3 w-32 h-32 bg-yellow-100 rounded-full opacity-30 blur-2xl" />
    </div>
    <div className="hidden md:block absolute right-0 top-0 h-full w-1/4 z-0">
      <div className="absolute right-0 top-1/3 w-40 h-40 bg-yellow-100 rounded-full opacity-40 blur-2xl" />
      <div className="absolute right-10 top-2/3 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-2xl" />
    </div>
  </>
);

const WeeklyWisdomQuizPage = () => {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [currentQuestionSet, setCurrentQuestionSet] = useState<any>(null);
	const navigate = useNavigate();

	// Randomly select a question set when component mounts
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * questionSets.length);
		setCurrentQuestionSet(questionSets[randomIndex]);
	}, []);

	const handleOption = (idx: number) => {
		setSelected(idx);
	};

	const handleNext = () => {
		if (!currentQuestionSet) return;
		
		if (selected === currentQuestionSet.questions[current].answer) setScore(score + 1);
		if (current < currentQuestionSet.questions.length - 1) {
			setCurrent(current + 1);
			setSelected(null);
		} else {
			setShowResult(true);
		}
	};

	const handleRetake = () => {
		// Select a new random question set for retake
		const randomIndex = Math.floor(Math.random() * questionSets.length);
		setCurrentQuestionSet(questionSets[randomIndex]);
		setCurrent(0);
		setSelected(null);
		setScore(0);
		setShowResult(false);
	};

	// Show loading while question set is being selected
	if (!currentQuestionSet) {
		return (
			<div className="flex justify-center items-center min-h-[90vh] bg-background">
				<div className="text-center">
					<Sparkles className="h-12 w-12 text-[#1570EF] mb-4 animate-pulse-glow" />
					<div className="text-xl font-semibold text-[#1D2939]">Loading your quiz...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center min-h-[90vh] bg-background relative overflow-x-hidden">
      <DecorativeBg />
			<div className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-white relative z-10 p-2 md:p-8">
        {/* Header */}
				<div className="bg-[#1570EF] px-8 pt-8 pb-4 text-white text-center rounded-t-3xl relative">
					{/* Back Button */}
					<button
						onClick={() => navigate(-1)}
						className="absolute left-6 top-8 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 text-white"
						aria-label="Go back"
					>
						<ArrowLeft className="h-5 w-5" />
					</button>
					
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
						Topic: {" "}
						<span className="text-[#FFD600] font-bold">
							{currentQuestionSet.topic}
						</span>
					</div>
					<div className="flex justify-center">
						<div className="bg-[#2563EB] bg-opacity-80 text-white text-sm rounded-xl px-4 py-2 font-medium flex items-center gap-2 shadow-inner">
							<span role="img" aria-label="plant">🪴</span> Grow your soft skills and earn XP every week!
						</div>
					</div>
				</div>
        {/* Quiz Body or Result */}
        {!showResult ? (
				<div className="px-8 py-10">
					{/* Question Number */}
					<div className="flex items-center gap-2 mb-4">
						<span className="inline-block w-2 h-2 rounded-full bg-[#1570EF] animate-pulse"></span>
						<span className="text-[#1570EF] font-semibold">
							Question {current + 1} of {currentQuestionSet.questions.length}
						</span>
					</div>
					{/* Question Text */}
					<div className="mb-6 text-2xl font-bold text-[#1D2939]">
						{currentQuestionSet.questions[current].q}
					</div>
					{/* Options */}
					<div className="space-y-4 mb-8">
						{currentQuestionSet.questions[current].options.map((opt: string, idx: number) => (
							<button
								key={idx}
								onClick={() => handleOption(idx)}
								className={`w-full text-base py-3 rounded-xl border-2 transition-all duration-200 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1570EF] bg-white text-[#344054] ${
									selected === idx
										? "border-[#1570EF] ring-2 ring-[#1570EF] bg-[#EFF8FF]"
										: "border-[#D1E9FF] hover:border-[#1570EF] hover:bg-[#F0F6FF]"
								}
							`}
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
									currentQuestionSet.questions.length) *
									100}%`,
							}}
						/>
					</div>
					{/* XP and Retake Info */}
					<div className="flex items-center justify-between mb-6 text-sm">
						<span className="flex items-center gap-1 text-[#1570EF] font-medium">
							<span role="img" aria-label="trophy">🏆</span> Earn 100 XP for a perfect score!
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
						}`}
					>
						{current === currentQuestionSet.questions.length - 1
							? "Finish Quiz"
							: "Next Question"}
					</button>
				</div>
        ) : (
          <div className="flex flex-col items-center justify-center px-8 py-16 min-h-[400px]">
            <Sparkles className="h-12 w-12 text-[#FFD600] mb-4 animate-pulse-glow" />
            <div className="text-3xl font-extrabold text-[#1570EF] mb-2">Quiz Complete!</div>
            <div className="text-lg font-semibold text-[#1D2939] mb-4">You scored {score} out of {currentQuestionSet.questions.length}!</div>
            <div className="mb-6 text-blue-700 text-center text-lg">
              {score === currentQuestionSet.questions.length ? (
                <span>🌟 Perfect score! You're a true wisdom champion. Keep it up!</span>
              ) : score >= currentQuestionSet.questions.length - 1 ? (
                <span>👏 Great job! Just a little more for perfection. Try again for a perfect score!</span>
              ) : (
                <span>💡 Keep learning! Every attempt makes you wiser. Give it another shot!</span>
              )}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleRetake}
                className="bg-[#1570EF] hover:bg-[#2563EB] text-white font-bold py-3 px-8 rounded-xl shadow-md text-lg transition-all duration-200"
              >
                Retake Quiz
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-[#F9A51A] hover:bg-[#FFD600] text-white font-bold py-3 px-8 rounded-xl shadow-md text-lg transition-all duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
			</div>
		</div>
	);
};

export default WeeklyWisdomQuizPage;
