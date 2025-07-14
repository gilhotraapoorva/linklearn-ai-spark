import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, User } from "lucide-react";
import React from "react";

const redeemOptions = [
	{
		id: 1,
		title: "1 Month of LinkedIn Premium",
		description: "Unlock all premium features on LinkedIn for a month.",
		xp: 10000,
		icon: (
			<div className="min-w-[96px] h-16 flex items-center justify-center">
				<img
					src="/linkedin-premium.svg"
					alt="LinkedIn Premium"
					className="h-16 w-24 object-contain"
				/>
			</div>
		),
	},
	{
		id: 2,
		title: "Unlock Any LinkedIn Learning Course",
		description: "Access any course of your choice on LinkedIn Learning.",
		xp: 1000,
		icon: (
			<div className="min-w-[96px] h-16 flex items-center justify-center">
				<img
					src="/linkedin-learning-seeklogo.svg"
					alt="LinkedIn Learning"
					className="h-16 max-w-[120px] object-contain"
				/>
			</div>
		),
	},
	{
		id: 3,
		title: "Resume Review by an Expert",
		description: "Get your resume reviewed and improved by a career expert.",
		xp: 5000,
		icon: (
			<div className="min-w-[96px] h-16 flex items-center justify-center">
				<FileText className="h-12 w-12 text-blue-500" />
			</div>
		),
	},
	{
		id: 4,
		title: "1:1 Career Mentorship Session",
		description: "Book a 1:1 video call with a mentor for career guidance.",
		xp: 2500,
		icon: (
			<div className="min-w-[96px] h-16 flex items-center justify-center">
				<User className="h-12 w-12 text-green-600" />
			</div>
		),
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

const RedeemXP = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen w-full flex flex-col items-center py-12 px-2 bg-gradient-to-br from-yellow-50 via-blue-50 to-white relative overflow-x-hidden">
			<DecorativeBg />
			<div className="fixed top-0 left-0 w-full z-30 bg-white border-b border-blue-100 flex items-center px-0 md:px-10 pt-8 pb-4" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
				<div className="max-w-4xl w-full mx-auto flex items-center">
					<Button
						variant="ghost"
						className="flex items-center gap-2"
						onClick={() => navigate(-1)}
					>
						<ArrowLeft className="h-4 w-4" /> Back
					</Button>
					<h1 className="text-2xl font-extrabold text-blue-900 ml-6 tracking-tight">Redeem Your XP</h1>
				</div>
			</div>
			<div className="w-full max-w-4xl rounded-2xl shadow-xl bg-white/80 border border-blue-100 p-10 relative z-10 mt-28">
				<div className="flex flex-col items-center mb-12 mt-2">
					<p className="text-blue-700 mb-2 italic text-lg">
						Turn your hard-earned XP into real rewards.... Make your toil count!
					</p>
				</div>
				<div className="grid gap-8 md:grid-cols-2">
					{redeemOptions.map((option) => (
						<Card
							key={option.id}
							className="flex flex-col items-center justify-between p-8 bg-white border-blue-100 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 rounded-xl min-h-[220px]"
						>
							{option.icon}
							<div className="flex flex-col items-center text-center mt-4 mb-4">
								<CardTitle className="text-xl text-blue-900 mb-1 font-semibold">
									{option.title}
								</CardTitle>
								<div className="text-base text-muted-foreground mb-2">
									{option.description}
								</div>
								<div className="relative flex items-center justify-center">
									<span className="absolute inset-0 flex items-center justify-center pointer-events-none">
									<span className="w-24 h-10 rounded-full bg-blue-200 opacity-60 blur-xl"></span>
									</span>
									<span className="relative font-bold text-lg text-blue-700">{option.xp.toLocaleString()} <span className="font-extrabold">XP</span></span>
								</div>
							</div>
							<CardContent className="flex-shrink-0 w-full flex justify-center mt-auto pt-2">
								<Button variant="default" className="bg-[#1570EF] hover:bg-[#2563EB] text-white font-bold rounded-full px-8 py-3 shadow-lg text-lg w-full max-w-xs">
									Redeem
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
};

export default RedeemXP;