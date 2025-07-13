import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  MapPin,
  Star,
  Bookmark,
  Code,
  Target,
  Award,
  Lightbulb,
  ArrowLeft,
  Heart,
  Building,
  Globe,
  Mail,
  CheckCircle
} from "lucide-react";

const HackathonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(1247);
  const [isLiked, setIsLiked] = useState(false);

  // Check if this hackathon is active (for demo, we'll make hack-001 active)
  const isActive = id === "hack-001";

  const hackathon = {
    id: "buildit-2024",
    title: "BuildIT: Innovation Challenge 2024",
    subtitle: "Build Tomorrow's Solutions Today",
    organizer: "College Crave Pvt Ltd",
    logo: "/public/placeholder.svg",
    banner: "/public/placeholder.svg",
    description: "Join the ultimate innovation challenge where creativity meets technology! BuildIT 2024 is a premier hackathon designed to bring together brilliant minds to solve real-world problems through cutting-edge technology solutions.",
    longDescription: `BuildIT 2024 is more than just a hackathon - it's a platform where innovation thrives and future leaders emerge. Over 48 intensive hours, participants will collaborate, innovate, and build solutions that address pressing challenges in various domains including sustainability, healthcare, education, and fintech.

This year's theme focuses on creating impactful solutions that can make a real difference in society. Whether you're a seasoned developer, a creative designer, or a passionate problem-solver, BuildIT provides the perfect environment to showcase your skills and learn from industry experts.`,
    
    // Basic Info
    mode: "Hybrid",
    location: "IIT Delhi & Online",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    registrationDeadline: "2024-03-10",
    duration: "48 hours",
    teamSize: "2-4 members",
    participantCount: 2847,
    maxParticipants: 5000,
    
    // Status and Registration
    status: isActive ? "Active" : "Live",
    registrationStatus: isActive ? "Active" : "Open",
    difficulty: "All Levels",
    
    // Tracks and Themes
    tracks: [
      { name: "Healthcare Innovation", description: "Digital health solutions for better patient care" },
      { name: "Sustainable Technology", description: "Green tech solutions for environmental challenges" },
      { name: "FinTech Revolution", description: "Financial technology for inclusive banking" },
      { name: "Education Technology", description: "Innovative learning solutions for all ages" },
      { name: "Smart Cities", description: "IoT and AI solutions for urban development" },
      { name: "Open Innovation", description: "Creative solutions to any real-world problem" }
    ],
    
    // Skills and Technologies
    preferredSkills: [
      "React", "Node.js", "Python", "Machine Learning", "UI/UX Design", 
      "Mobile Development", "Blockchain", "IoT", "Data Science", "Cloud Computing"
    ],
    
    // Prizes and Rewards
    totalPrizePool: "₹5,00,000",
    prizes: [
      { position: "1st Place", amount: "₹2,00,000", perks: ["Internship Opportunities", "Mentorship Program", "Trophy + Certificate"] },
      { position: "2nd Place", amount: "₹1,50,000", perks: ["Mentorship Program", "Trophy + Certificate"] },
      { position: "3rd Place", amount: "₹1,00,000", perks: ["Trophy + Certificate"] },
      { position: "Best Innovation", amount: "₹30,000", perks: ["Special Recognition Award"] },
      { position: "Best Design", amount: "₹20,000", perks: ["Design Tools Subscription"] }
    ],
    
    // Perks and Benefits
    perks: [
      "Free T-shirts and Swag Kit",
      "Certificate of Participation",
      "Networking with Industry Experts",
      "Workshop Access",
      "Career Guidance Sessions",
      "Free Food and Refreshments",
      "24/7 Mentorship Support",
      "Job Interview Opportunities"
    ]
  };

  const handleRegister = () => {
    setIsRegistered(true);
  };

  const handleJoin = () => {
    navigate(`/hackathon/${id}/mcq`);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>

        {/* Hero Section with Diagonal Design */}
        <div className="relative mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden">
            {/* Diagonal Top Section */}
            <div className="relative h-80 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
              
              {/* Floating Status Badge */}
              <div className="absolute top-6 right-6">
                <Badge className="bg-green-500 text-white px-4 py-2 text-lg font-bold animate-bounce">
                  {hackathon.status} ⚡
                </Badge>
              </div>

              {/* Main Content Overlay */}
              <div className="relative z-10 h-full flex items-end p-8">
                <div className="text-white max-w-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium">{hackathon.organizer}</p>
                      <p className="text-white/60 text-xs">{hackathon.location}</p>
                    </div>
                  </div>
                  <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {hackathon.title}
                  </h1>
                  <p className="text-xl text-white/90 font-medium">
                    {hackathon.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="p-8 bg-white/5">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{hackathon.participantCount.toLocaleString()}</div>
                    <div className="text-white/60 text-sm">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{hackathon.duration}</div>
                    <div className="text-white/60 text-sm">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{hackathon.totalPrizePool}</div>
                    <div className="text-white/60 text-sm">Prize Pool</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    onClick={isActive ? handleJoin : handleRegister}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-bold rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-xl"
                    disabled={!isActive && isRegistered}
                  >
                    {isActive ? (
                      <>🚀 Join Challenge</>
                    ) : isRegistered ? (
                      <>✅ Registered</>
                    ) : (
                      <>📝 Register Now</>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleBookmark}
                    className="border-white/30 text-white hover:bg-white/10 p-4 rounded-2xl"
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleLike}
                    className="border-white/30 text-white hover:bg-white/10 p-4 rounded-2xl"
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current text-red-400" : ""}`} />
                    <span className="ml-2">{likes}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Lightbulb className="h-8 w-8 text-yellow-400" />
                About the Challenge
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                {hackathon.description}
              </p>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-white/10">
                <p className="text-white/90 leading-relaxed">
                  {hackathon.longDescription}
                </p>
              </div>
            </div>

            {/* Tracks Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Target className="h-8 w-8 text-green-400" />
                Challenge Tracks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hackathon.tracks.map((track, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1">
                      <h3 className="text-xl font-bold text-white mb-3">{track.name}</h3>
                      <p className="text-white/70">{track.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Code className="h-8 w-8 text-blue-400" />
                Preferred Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {hackathon.preferredSkills.map((skill, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 text-white/90 hover:scale-105 transition-transform cursor-pointer">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Prizes Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-400" />
                Prizes & Rewards
              </h2>
              <div className="space-y-6">
                {hackathon.prizes.map((prize, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white">{prize.position}</h3>
                        <div className="text-3xl font-black text-yellow-400">{prize.amount}</div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {prize.perks.map((perk, perkIndex) => (
                          <div key={perkIndex} className="bg-yellow-500/20 text-yellow-100 px-3 py-1 rounded-full text-sm">
                            {perk}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-400" />
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Mode</span>
                  <span className="text-white font-semibold">{hackathon.mode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Duration</span>
                  <span className="text-white font-semibold">{hackathon.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Team Size</span>
                  <span className="text-white font-semibold">{hackathon.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Difficulty</span>
                  <span className="text-white font-semibold">{hackathon.difficulty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Registration</span>
                  <span className="text-green-400 font-semibold">{hackathon.registrationStatus}</span>
                </div>
              </div>
            </div>

            {/* Participation Progress */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="h-6 w-6 text-green-400" />
                Participation
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>{hackathon.participantCount.toLocaleString()} registered</span>
                  <span>{hackathon.maxParticipants.toLocaleString()} max</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(hackathon.participantCount / hackathon.maxParticipants) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                {Math.round((hackathon.participantCount / hackathon.maxParticipants) * 100)}% spots filled
              </p>
            </div>

            {/* Perks & Benefits */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 text-yellow-400" />
                Event Perks
              </h3>
              <div className="space-y-3">
                {hackathon.perks.map((perk, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Building className="h-6 w-6 text-purple-400" />
                Organizer
              </h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{hackathon.organizer}</h4>
                <p className="text-white/70 text-sm mb-4">Event Organizer</p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HackathonDetails;
