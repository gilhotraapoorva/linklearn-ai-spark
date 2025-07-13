import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  const [carouselApi, setCarouselApi] = useState(null);

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
      { name: "React", emoji: "⚛️" },
      { name: "Node.js", emoji: "🟢" },
      { name: "Python", emoji: "🐍" },
      { name: "Machine Learning", emoji: "🤖" },
      { name: "UI/UX Design", emoji: "🎨" },
      { name: "Mobile Development", emoji: "📱" },
      { name: "Blockchain", emoji: "⛓️" },
      { name: "IoT", emoji: "🌐" },
      { name: "Data Science", emoji: "📊" },
      { name: "Cloud Computing", emoji: "☁️" }
    ],
    
    // Prizes and Rewards
    totalPrizePool: "₹50,000",
    prizes: [
      { position: "1st Place", amount: "₹25,000", perks: ["15,000 XP Points", "Internship Opportunities", "Mentorship Program", "Trophy + Certificate"] },
      { position: "2nd Place", amount: "₹15,000", perks: ["10,000 XP Points", "Mentorship Program", "Trophy + Certificate"] },
      { position: "3rd Place", amount: "₹10,000", perks: ["5,000 XP Points", "Trophy + Certificate"] },
    ],
    
    // Perks and Benefits
    perks: [
      "Free T-shirts and Swag Kit",
      "Certificate of Participation + 100 XP Points",
      "Networking with Industry Experts",
      "Workshop Access"
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

  // Handle scroll wheel for carousel
  const handleCarouselWheel = (event) => {
    event.preventDefault();
    if (carouselApi) {
      if (event.deltaY > 0) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollPrev();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>

        {/* Hero Section with Diagonal Design */}
        <div className="relative mb-12">
          {/* Background decorative elements */}
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-2xl opacity-30 rotate-12"></div>
          
          <div className="bg-gradient-card shadow-card rounded-3xl border border-border overflow-hidden relative">
            {/* Diagonal Top Section with enhanced styling */}
            <div className="relative h-80 bg-gradient-to-br from-primary via-blue-600 to-blue-700">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-blue-600/80 to-blue-700/90"></div>
              
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-24 h-24 border-2 border-blue-300 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-blue-200 rounded-xl rotate-45 animate-bounce"></div>
                <div className="absolute top-1/2 right-10 w-12 h-12 border border-blue-300 rounded-lg rotate-12"></div>
              </div>
              
              {/* Diagonal overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-blue-600/30 to-transparent transform skew-y-1"></div>
              
              {/* Floating Status Badge with glow */}
              <div className="absolute top-6 right-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-30"></div>
                  <Badge className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-bold border border-blue-300 shadow-lg">
                    {hackathon.status} ⚡
                  </Badge>
                </div>
              </div>

              {/* Main Content Overlay */}
              <div className="relative z-10 h-full flex items-end p-8">
                <div className="text-primary-foreground max-w-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-md opacity-40"></div>
                      <div className="relative w-20 h-20 bg-background/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-blue-300/50">
                        <Building className="h-10 w-10 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <p className="text-primary-foreground text-lg font-semibold">{hackathon.organizer}</p>
                      <p className="text-blue-200 text-sm flex items-center gap-1">
                        <span>📍</span> {hackathon.location}
                      </p>
                    </div>
                  </div>
                  <h1 className="text-6xl font-black mb-4 text-primary-foreground leading-tight">
                    {hackathon.title}
                  </h1>
                  <p className="text-xl text-blue-100 font-medium leading-relaxed">
                    {hackathon.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Section with enhanced design */}
            <div className="relative p-8 bg-gradient-to-r from-gradient-card to-blue-50/30">
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-blue-200 via-primary to-blue-300"></div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-12">
                  <div className="text-center group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="relative bg-background border border-blue-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                          {hackathon.participantCount.toLocaleString()}
                        </div>
                        <div className="text-muted-foreground text-sm font-medium">Participants</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="relative bg-background border border-blue-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                          {hackathon.duration}
                        </div>
                        <div className="text-muted-foreground text-sm font-medium">Duration</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                      <div className="relative bg-background border border-blue-200 rounded-2xl p-4 shadow-sm">
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                          {hackathon.totalPrizePool}
                        </div>
                        <div className="text-muted-foreground text-sm font-medium">Prize Pool</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl blur-lg opacity-30"></div>
                    <Button
                      onClick={isActive ? handleJoin : handleRegister}
                      className="relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-5 text-lg font-bold rounded-3xl border border-green-300 shadow-xl transform hover:scale-105 transition-all"
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
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={handleBookmark}
                    className="p-4 rounded-2xl border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current text-blue-600" : "text-blue-600"}`} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleLike}
                    className="p-4 rounded-2xl border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current text-red-500" : "text-blue-600"}`} />
                    <span className="ml-2 text-blue-600 font-medium">{likes}</span>
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
            
            {/* About Section with creative layout */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-200 rounded-full opacity-60"></div>
              <div className="bg-gradient-card shadow-card rounded-3xl border border-border p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-3xl opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-200 rounded-2xl blur-sm opacity-50"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                        <Lightbulb className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">About the Challenge</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {hackathon.description}
                  </p>
                  <div className="relative bg-gradient-to-r from-blue-50 to-primary/5 border-l-4 border-l-blue-500 rounded-r-2xl p-6 shadow-inner">
                    <div className="absolute top-2 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <p className="text-foreground leading-relaxed font-medium">
                      {hackathon.longDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracks Section with straight layout */}
            <div className="relative">
              <div className="absolute -top-3 right-10 w-6 h-6 bg-blue-300 rounded-lg rotate-45 opacity-40"></div>
              <div className="bg-gradient-card shadow-card rounded-3xl border border-border p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-200 rounded-2xl blur-sm opacity-50"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Challenge Tracks</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hackathon.tracks.map((track, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="relative bg-background border-2 border-blue-100 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground mb-3 text-blue-800">{track.name}</h3>
                            <p className="text-muted-foreground">{track.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Section with enhanced design */}
            <div className="relative">
              <div className="bg-gradient-card shadow-card rounded-3xl border border-border p-8 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-3xl opacity-40"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-transparent rounded-tr-3xl opacity-60"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-200 rounded-2xl blur-sm opacity-50"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Code className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">Preferred Technologies</h2>
                      <p className="text-muted-foreground">Technologies that will give you an edge</p>
                    </div>
                  </div>
                  
                  {/* Skills Carousel */}
                  <div className="px-4 py-2" onWheel={handleCarouselWheel}>
                    <Carousel
                      opts={{
                        align: "start",
                        loop: false,
                        slidesToScroll: 1,
                        containScroll: "trimSnaps",
                      }}
                      className="w-full"
                      setApi={setCarouselApi}
                    >
                      <CarouselContent className="-ml-1 md:-ml-2">
                        {hackathon.preferredSkills.map((skill, index) => (
                          <CarouselItem key={index} className="pl-1 md:pl-2 basis-1/4 md:basis-1/5 lg:basis-1/6">
                            <div className="group relative h-full p-1">
                              {/* Simplified smaller card with equal height and proper hover space */}
                              <div className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3 hover:border-blue-400 transition-all duration-300 cursor-pointer transform group-hover:scale-105 group-hover:shadow-md h-20 flex flex-col items-center justify-center group-hover:z-10">
                                {/* Content */}
                                <div className="text-center">
                                  <div className="text-2xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
                                    {skill.emoji}
                                  </div>
                                  <div className="text-gray-900 font-semibold text-xs leading-tight">
                                    {skill.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-0 bg-white/80 hover:bg-white shadow-md" />
                      <CarouselNext className="right-0 bg-white/80 hover:bg-white shadow-md" />
                    </Carousel>
                  </div>
                  
                  {/* Additional info */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl">
                    <div className="flex items-center gap-2 text-blue-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Pro tip: Projects using these technologies often score higher in judging!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prizes Section with card stack effect */}
            <div className="relative">
              <div className="absolute -top-2 right-5 w-5 h-5 bg-blue-300 rounded-full opacity-50"></div>
              <div className="bg-gradient-card shadow-card rounded-3xl border border-border p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-200 rounded-2xl blur-sm opacity-50"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Prizes & Rewards</h2>
                </div>
                <div className="space-y-6">
                  {hackathon.prizes.map((prize, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-yellow-100 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className={`relative bg-background border-2 border-blue-200 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 ${
                        index === 0 ? 'border-yellow-300 shadow-yellow-200 shadow-lg' : 
                        index === 1 ? 'border-blue-300 shadow-blue-200 shadow-md' : 
                        'border-blue-200 shadow-blue-100 shadow-sm'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-blue-500' : 
                              'bg-blue-400'
                            }`}>
                              {index + 1}
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">{prize.position}</h3>
                          </div>
                          <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                            {prize.amount}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {prize.perks.map((perk, perkIndex) => (
                            <div key={perkIndex} className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
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
          </div>

          {/* Sidebar with enhanced design */}
          <div className="space-y-6">
            {/* Quick Info Card with floating design */}
            <div className="relative">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
              <div className="bg-gradient-card shadow-card rounded-3xl border border-blue-200 p-6 sticky top-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-60"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Event Details</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-background rounded-xl border-l-4 border-l-blue-400 shadow-sm">
                      <span className="text-muted-foreground font-medium">Mode</span>
                      <span className="text-blue-700 font-semibold">{hackathon.mode}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-background rounded-xl border-l-4 border-l-blue-400 shadow-sm">
                      <span className="text-muted-foreground font-medium">Duration</span>
                      <span className="text-blue-700 font-semibold">{hackathon.duration}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-background rounded-xl border-l-4 border-l-blue-400 shadow-sm">
                      <span className="text-muted-foreground font-medium">Team Size</span>
                      <span className="text-blue-700 font-semibold">{hackathon.teamSize}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-background rounded-xl border-l-4 border-l-blue-400 shadow-sm">
                      <span className="text-muted-foreground font-medium">Difficulty</span>
                      <span className="text-blue-700 font-semibold">{hackathon.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-background rounded-xl border-l-4 border-l-green-400 shadow-sm">
                      <span className="text-muted-foreground font-medium">Registration</span>
                      <span className="text-green-700 font-semibold">{hackathon.registrationStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Participation Progress with animated design */}
            <div className="relative">
              <div className="absolute top-3 left-3 w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="bg-gradient-card shadow-card rounded-3xl border border-blue-200 p-6 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-blue-100 to-transparent rounded-tl-full opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Participation</h3>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{hackathon.participantCount.toLocaleString()} registered</span>
                      <span className="font-medium">{hackathon.maxParticipants.toLocaleString()} max</span>
                    </div>
                    <div className="relative w-full bg-blue-100 rounded-full h-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
                        style={{ width: `${(hackathon.participantCount / hackathon.maxParticipants) * 100}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        <div className="absolute top-0 right-0 w-2 h-4 bg-blue-300 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                    <p className="text-blue-700 font-bold text-lg">
                      {Math.round((hackathon.participantCount / hackathon.maxParticipants) * 100)}% Full
                    </p>
                    <p className="text-blue-600 text-sm">Spots filling fast!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perks with compact layout */}
            <div className="relative">
              <div className="absolute -top-2 right-8 w-4 h-4 bg-blue-300 rounded-full opacity-30"></div>
              <div className="bg-gradient-card shadow-card rounded-3xl border border-blue-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Event Perks</h3>
                </div>
                <div className="space-y-2">
                  {hackathon.perks.map((perk, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-3 p-2 bg-gradient-to-r from-blue-50 to-background rounded-lg border border-blue-100 hover:shadow-sm transition-all"
                    >
                      <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-muted-foreground text-sm">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Organizer with profile card design */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-transparent rounded-3xl opacity-20 transform rotate-1"></div>
              <div className="relative bg-gradient-card shadow-card rounded-3xl border border-blue-200 p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-200 to-transparent rounded-bl-3xl opacity-40"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Organizer</h3>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-blue-200 rounded-3xl blur-md opacity-50"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto flex items-center justify-center border-4 border-blue-300 shadow-lg">
                        <Building className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <h4 className="text-foreground font-bold text-xl mb-2 text-blue-800">{hackathon.organizer}</h4>
                    <p className="text-blue-600 text-sm mb-6 font-medium">Event Organizer</p>
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" size="sm" className="rounded-xl border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl border-blue-200 hover:bg-blue-50 hover:border-blue-300">
                        <Globe className="h-4 w-4 text-blue-600" />
                      </Button>
                    </div>
                  </div>
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
