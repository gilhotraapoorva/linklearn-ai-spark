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

// Hackathon data that matches the cards from WeeklyHackathon component
const hackathonData = {
  "hack-001": {
    id: "hack-001",
    title: "Build a Real-time Chat App",
    subtitle: "Create modern messaging solutions with cutting-edge technology",
    organizer: "Intuit",
    logo: "/intuit.svg",
    banner: "/public/placeholder.svg",
    description: "Join Intuit's premier hackathon focused on building real-time chat applications. Create modern messaging solutions that can handle thousands of concurrent users with seamless performance.",
    longDescription: `Intuit's Real-time Chat App Challenge is designed to push the boundaries of modern communication technology. Over 48 intensive hours, you'll build scalable chat applications using the latest web technologies including WebSockets, real-time databases, and modern UI frameworks.

This challenge focuses on creating chat applications that solve real business problems - from customer support systems to team collaboration tools. You'll work with industry-standard technologies and receive mentorship from Intuit's engineering teams.`,
    
    // Basic Info
    mode: "Hybrid",
    location: "Intuit Campus, Mountain View & Online",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    registrationDeadline: "2024-03-10",
    duration: "48 hours",
    teamSize: "2-4 members",
    participantCount: 1247,
    maxParticipants: 2000,
    
    // Status and Registration
    status: "Active",
    registrationStatus: "Active",
    difficulty: "Intermediate",
    
    // Tracks and Themes
    tracks: [
      { name: "Real-time Messaging", description: "Build scalable chat systems with WebSocket technology" },
      { name: "Customer Support Chat", description: "Create AI-powered customer service chat solutions" },
      { name: "Team Collaboration", description: "Build workplace communication tools" },
      { name: "Mobile Chat Apps", description: "Develop cross-platform mobile messaging apps" },
      { name: "Voice & Video Integration", description: "Add multimedia communication features" },
      { name: "Security & Privacy", description: "Implement end-to-end encryption solutions" }
    ],
    
    // Skills and Technologies
    preferredSkills: [
      { name: "React", emoji: "⚛️" },
      { name: "WebSockets", emoji: "🔗" },
      { name: "Node.js", emoji: "🟢" },
      { name: "Database Design", emoji: "🗄️" },
      { name: "UI/UX Design", emoji: "🎨" },
      { name: "Real-time APIs", emoji: "⚡" },
      { name: "JavaScript", emoji: "📜" },
      { name: "MongoDB", emoji: "🍃" },
      { name: "Redis", emoji: "🔴" },
      { name: "Socket.io", emoji: "🔌" }
    ],
    
    // Prizes and Rewards
    totalPrizePool: "LinkedIn Premium & Mentorship",
    prizes: [
      { position: "1st Place", amount: "LinkedIn Premium (1 year)", perks: ["20,000 XP Points", "Intuit Internship Fast-track", "1-on-1 Mentorship", "Winner Certificate"] },
      { position: "2nd Place", amount: "LinkedIn Premium (6 months)", perks: ["15,000 XP Points", "Career Guidance Session", "Certificate"] },
      { position: "3rd Place", amount: "LinkedIn Premium (3 months)", perks: ["10,000 XP Points", "Certificate"] },
    ],
    
    // Perks and Benefits
    perks: [
      "Intuit Swag Kit & T-shirts",
      "Certificate of Participation + 500 XP Points",
      "Networking with Intuit Engineers",
      "WebSocket & Real-time Development Workshop"
    ]
  },

  "hack-002": {
    id: "hack-002",
    title: "AI-Powered Task Manager",
    subtitle: "Build intelligent productivity solutions with machine learning",
    organizer: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    banner: "/public/placeholder.svg",
    description: "Join Google's AI hackathon to build next-generation task management systems powered by artificial intelligence and machine learning.",
    longDescription: `Google's AI-Powered Task Manager Challenge brings together the best minds to create intelligent productivity solutions. Over 72 hours, you'll leverage Google's AI tools and APIs to build task managers that understand user behavior, predict priorities, and automate workflow optimization.

This advanced challenge focuses on practical AI applications in productivity software. You'll work with Google Cloud AI services, TensorFlow, and modern web frameworks to create solutions that genuinely improve how people manage their work and personal tasks.`,
    
    mode: "Online",
    location: "Google Campus, Sunnyvale & Virtual",
    startDate: "2024-03-20",
    endDate: "2024-03-23",
    registrationDeadline: "2024-03-15",
    duration: "72 hours",
    teamSize: "2-5 members",
    participantCount: 892,
    maxParticipants: 1500,
    
    status: "Upcoming",
    registrationStatus: "Open",
    difficulty: "Advanced",
    
    tracks: [
      { name: "Smart Task Prioritization", description: "AI algorithms for intelligent task ranking" },
      { name: "Natural Language Processing", description: "Voice and text-based task input systems" },
      { name: "Predictive Analytics", description: "ML models for deadline and workload prediction" },
      { name: "Workflow Automation", description: "AI-driven task automation and suggestions" },
      { name: "Team Collaboration AI", description: "Intelligent team task distribution systems" },
      { name: "Personal Productivity AI", description: "Personalized productivity enhancement tools" }
    ],
    
    preferredSkills: [
      { name: "Python", emoji: "🐍" },
      { name: "Machine Learning", emoji: "🤖" },
      { name: "TensorFlow", emoji: "🧠" },
      { name: "React", emoji: "⚛️" },
      { name: "API Design", emoji: "🔌" },
      { name: "Google Cloud", emoji: "☁️" },
      { name: "NLP", emoji: "💬" },
      { name: "Data Science", emoji: "📊" },
      { name: "Flask/Django", emoji: "🐍" },
      { name: "JavaScript", emoji: "📜" }
    ],
    
    totalPrizePool: "$500 + Tech Benefits",
    prizes: [
      { position: "1st Place", amount: "$500 Cash Prize", perks: ["25,000 XP Points", "Google Internship Interview", "AI Conference Pass", "Winner Trophy"] },
      { position: "2nd Place", amount: "Tech Conference Pass", perks: ["20,000 XP Points", "Google Cloud Credits", "Certificate"] },
      { position: "3rd Place", amount: "AI Workshop Access", perks: ["15,000 XP Points", "Google AI Course Access", "Certificate"] },
    ],
    
    perks: [
      "Google Swag Package",
      "Certificate of Participation + 750 XP Points",
      "Access to Google AI Workshops",
      "Networking with Google AI Engineers"
    ]
  },

  "hack-003": {
    id: "hack-003",
    title: "Apple Innovation Challenge",
    subtitle: "Design next-gen apps for the Apple ecosystem",
    organizer: "Apple",
    logo: "/apple.svg",
    banner: "/public/placeholder.svg",
    description: "Design and build next-generation apps or solutions for the Apple ecosystem. Create innovative experiences across iOS, macOS, watchOS, and more.",
    longDescription: `Apple's Innovation Challenge invites developers to push the boundaries of what's possible within the Apple ecosystem. Over 36 intensive hours, you'll create applications that showcase the power of Swift, SwiftUI, and Apple's latest frameworks.

This challenge focuses on creating user experiences that are uniquely Apple - intuitive, beautiful, and powerful. Whether you're building for iPhone, iPad, Mac, Apple Watch, or Apple TV, your solution should demonstrate innovative use of Apple technologies and design principles.`,
    
    mode: "Hybrid",
    location: "Apple Park, Cupertino & Online",
    startDate: "2024-03-25",
    endDate: "2024-03-27",
    registrationDeadline: "2024-03-20",
    duration: "36 hours",
    teamSize: "1-4 members",
    participantCount: 1563,
    maxParticipants: 2500,
    
    status: "Upcoming",
    registrationStatus: "Open",
    difficulty: "Intermediate",
    
    tracks: [
      { name: "iOS Excellence", description: "Outstanding iPhone and iPad applications" },
      { name: "macOS Innovation", description: "Next-generation Mac applications" },
      { name: "watchOS Health & Fitness", description: "Apple Watch health and wellness apps" },
      { name: "AR/VR Experiences", description: "Immersive experiences with ARKit and Vision Pro" },
      { name: "Cross-Platform Magic", description: "Seamless experiences across Apple devices" },
      { name: "Accessibility Champions", description: "Apps that showcase inclusive design" }
    ],
    
    preferredSkills: [
      { name: "Swift", emoji: "🦉" },
      { name: "SwiftUI", emoji: "🎨" },
      { name: "iOS", emoji: "📱" },
      { name: "Xcode", emoji: "🔨" },
      { name: "UI/UX", emoji: "✨" },
      { name: "Core Data", emoji: "💾" },
      { name: "ARKit", emoji: "🥽" },
      { name: "HealthKit", emoji: "❤️" },
      { name: "CloudKit", emoji: "☁️" },
      { name: "React", emoji: "⚛️" }
    ],
    
    totalPrizePool: "MacBook + App Store Feature",
    prizes: [
      { position: "1st Place", amount: "MacBook Air M3", perks: ["30,000 XP Points", "App Store Feature", "Apple Developer Program", "WWDC Invitation"] },
      { position: "2nd Place", amount: "iPad Pro + Apple Pencil", perks: ["25,000 XP Points", "App Store Promotion", "Apple Swag Package"] },
      { position: "3rd Place", amount: "Apple Watch Ultra", perks: ["20,000 XP Points", "Apple Developer Swag", "Certificate"] },
    ],
    
    perks: [
      "Apple Developer Kit",
      "Certificate of Participation + 1000 XP Points",
      "Exclusive Apple Swag",
      "Access to Apple Engineering Sessions"
    ]
  },

  "hack-004": {
    id: "hack-004",
    title: "Adobe Creative Hack",
    subtitle: "Design innovative creative tools and solutions",
    organizer: "Adobe",
    logo: "/adobe.svg",
    banner: "/public/placeholder.svg",
    description: "Design innovative creative tools and solutions that empower creators worldwide. Build applications that enhance the creative workflow.",
    longDescription: `Adobe's Creative Hack challenges designers and developers to reimagine the future of creativity. Over 24 hours, you'll build tools, plugins, or applications that enhance the creative process using Adobe's APIs, SDKs, and cutting-edge design technologies.

This beginner-friendly challenge welcomes all skill levels and focuses on innovation in design and creativity. Whether you're building Photoshop plugins, Illustrator extensions, or completely new creative applications, your solution should inspire and empower creators.`,
    
    mode: "Online",
    location: "Adobe Headquarters, San Jose & Virtual",
    startDate: "2024-03-18",
    endDate: "2024-03-19",
    registrationDeadline: "2024-03-13",
    duration: "24 hours",
    teamSize: "1-3 members",
    participantCount: 2100,
    maxParticipants: 3000,
    
    status: "Upcoming",
    registrationStatus: "Open",
    difficulty: "Beginner",
    
    tracks: [
      { name: "Creative Plugins", description: "Enhance Adobe Creative Suite with custom plugins" },
      { name: "Design Automation", description: "Tools that automate repetitive design tasks" },
      { name: "AI-Powered Creativity", description: "Integrate Adobe Sensei for intelligent design" },
      { name: "Collaborative Design", description: "Tools for team-based creative workflows" },
      { name: "Mobile Creativity", description: "Creative apps for tablets and smartphones" },
      { name: "Accessibility in Design", description: "Make creative tools more inclusive" }
    ],
    
    preferredSkills: [
      { name: "UI/UX", emoji: "🎨" },
      { name: "Photoshop", emoji: "🖼️" },
      { name: "Illustrator", emoji: "✏️" },
      { name: "JavaScript", emoji: "📜" },
      { name: "CSS", emoji: "🎭" },
      { name: "HTML", emoji: "🌐" },
      { name: "React", emoji: "⚛️" },
      { name: "Adobe APIs", emoji: "🔌" },
      { name: "Design Systems", emoji: "📐" },
      { name: "Figma", emoji: "🎯" }
    ],
    
    totalPrizePool: "Adobe CC + Mentorship",
    prizes: [
      { position: "1st Place", amount: "Adobe CC License (1 year)", perks: ["15,000 XP Points", "Adobe Design Mentorship", "Featured in Adobe Gallery", "Winner Certificate"] },
      { position: "2nd Place", amount: "Adobe CC License (6 months)", perks: ["12,000 XP Points", "Adobe Workshop Access", "Certificate"] },
      { position: "3rd Place", amount: "Adobe Stock Credits", perks: ["8,000 XP Points", "Adobe Creative Swag", "Certificate"] },
    ],
    
    perks: [
      "Adobe Creative Cloud Trial",
      "Certificate of Participation + 300 XP Points",
      "Adobe Design Resources",
      "Creative Community Access"
    ]
  },

  "hack-005": {
    id: "hack-005",
    title: "Tesla Mobility Challenge",
    subtitle: "Develop next-generation mobility and transportation solutions",
    organizer: "Tesla",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    banner: "/public/placeholder.svg",
    description: "Develop next-generation mobility and transportation solutions that shape the future of sustainable transport and autonomous systems.",
    longDescription: `Tesla's Mobility Challenge brings together innovators to solve the future of transportation. Over 60 hours, you'll develop solutions for autonomous driving, sustainable mobility, energy management, and smart transportation systems.

This advanced challenge focuses on cutting-edge technologies including AI for autonomous systems, energy optimization, and sustainable transportation solutions. You'll work with Tesla's engineering principles to create solutions that could genuinely impact the future of mobility.`,
    
    mode: "Hybrid",
    location: "Tesla Gigafactory, Austin & Online",
    startDate: "2024-03-22",
    endDate: "2024-03-25",
    registrationDeadline: "2024-03-17",
    duration: "60 hours",
    teamSize: "2-4 members",
    participantCount: 980,
    maxParticipants: 1200,
    
    status: "Upcoming",
    registrationStatus: "Open",
    difficulty: "Advanced",
    
    tracks: [
      { name: "Autonomous Driving AI", description: "Machine learning for self-driving capabilities" },
      { name: "Energy Optimization", description: "Battery and energy management systems" },
      { name: "Smart Charging Networks", description: "Intelligent EV charging infrastructure" },
      { name: "Sustainable Mobility", description: "Eco-friendly transportation solutions" },
      { name: "Fleet Management", description: "AI-powered vehicle fleet optimization" },
      { name: "Safety & Security", description: "Advanced safety systems for vehicles" }
    ],
    
    preferredSkills: [
      { name: "AI", emoji: "🤖" },
      { name: "Python", emoji: "🐍" },
      { name: "Computer Vision", emoji: "👁️" },
      { name: "Embedded Systems", emoji: "🔧" },
      { name: "C++", emoji: "⚡" },
      { name: "Machine Learning", emoji: "🧠" },
      { name: "IoT", emoji: "🌐" },
      { name: "Data Analytics", emoji: "📊" },
      { name: "Simulation", emoji: "🎮" },
      { name: "Hardware", emoji: "🔩" }
    ],
    
    totalPrizePool: "$1000 + Tesla Opportunities",
    prizes: [
      { position: "1st Place", amount: "$1000 + Tesla Internship", perks: ["35,000 XP Points", "Tesla Campus Visit", "Engineering Mentorship", "Tesla Merchandise"] },
      { position: "2nd Place", amount: "$500", perks: ["25,000 XP Points", "Tesla Engineering Session", "Certificate"] },
      { position: "3rd Place", amount: "Tesla Swag Package", perks: ["20,000 XP Points", "Tesla Innovation Workshop", "Certificate"] },
    ],
    
    perks: [
      "Tesla Innovation Kit",
      "Certificate of Participation + 1000 XP Points",
      "Access to Tesla Engineers",
      "Sustainable Tech Workshop"
    ]
  },

  "hack-006": {
    id: "hack-006",
    title: "Xiaomi IoT Sprint",
    subtitle: "Build smart device integrations and IoT solutions",
    organizer: "Xiaomi",
    logo: "/xiaomi.svg",
    banner: "/public/placeholder.svg",
    description: "Build smart device integrations and IoT solutions that connect seamlessly with Xiaomi's ecosystem of smart devices and services.",
    longDescription: `Xiaomi's IoT Sprint challenges developers to create innovative Internet of Things solutions using Xiaomi's smart device ecosystem. Over 30 hours, you'll build applications that integrate with smart homes, wearables, and IoT devices.

This intermediate-level challenge focuses on practical IoT implementations, device connectivity, and smart home automation. You'll work with Xiaomi's IoT platform and APIs to create solutions that enhance daily life through connected technology.`,
    
    mode: "Hybrid",
    location: "Xiaomi Campus, Beijing & Online",
    startDate: "2024-03-28",
    endDate: "2024-03-30",
    registrationDeadline: "2024-03-23",
    duration: "30 hours",
    teamSize: "2-4 members",
    participantCount: 1500,
    maxParticipants: 2000,
    
    status: "Upcoming",
    registrationStatus: "Open",
    difficulty: "Intermediate",
    
    tracks: [
      { name: "Smart Home Automation", description: "Intelligent home device orchestration" },
      { name: "Wearable Technology", description: "Health and fitness device applications" },
      { name: "IoT Security", description: "Secure device communication protocols" },
      { name: "Voice Assistant Integration", description: "Smart speaker and voice control systems" },
      { name: "Environmental Monitoring", description: "Smart sensors for air quality and environment" },
      { name: "Mobile IoT Apps", description: "Mobile applications for device control" }
    ],
    
    preferredSkills: [
      { name: "IoT", emoji: "�" },
      { name: "Android", emoji: "🤖" },
      { name: "Java", emoji: "☕" },
      { name: "Cloud APIs", emoji: "☁️" },
      { name: "MQTT", emoji: "📡" },
      { name: "React Native", emoji: "📱" },
      { name: "Python", emoji: "�" },
      { name: "Bluetooth", emoji: "📶" },
      { name: "WiFi Protocols", emoji: "📡" },
      { name: "Sensor Integration", emoji: "🔍" }
    ],
    
    totalPrizePool: "Xiaomi Gadgets + Cash",
    prizes: [
      { position: "1st Place", amount: "Xiaomi Flagship Phone + $300", perks: ["18,000 XP Points", "Xiaomi IoT Starter Kit", "Internship Opportunity", "Winner Certificate"] },
      { position: "2nd Place", amount: "Xiaomi Laptop + $200", perks: ["15,000 XP Points", "Xiaomi Smart Home Kit", "Certificate"] },
      { position: "3rd Place", amount: "Xiaomi Wearables Bundle", perks: ["12,000 XP Points", "Xiaomi Gadget Package", "Certificate"] },
    ],
    
    perks: [
      "Xiaomi Smart Device Kit",
      "Certificate of Participation + 600 XP Points",
      "IoT Development Resources",
      "Smart Home Workshop Access"
    ]
  }
};

const HackathonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [carouselApi, setCarouselApi] = useState(null);

  // Get hackathon data based on ID, fallback to default if not found
  const hackathon = hackathonData[id] || hackathonData["hack-001"];
  
  // Set initial likes based on participant count
  React.useEffect(() => {
    setLikes(hackathon.participantCount);
  }, [hackathon.participantCount]);

  // Check if this hackathon is active
  const isActive = hackathon.status === "Active";

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
          Back
        </Button>

        {/* Hero Section with Diagonal Design */}
        <div className="relative mb-12">
          <div className="bg-gradient-card shadow-card rounded-3xl border border-border overflow-hidden relative">
            {/* Diagonal Top Section with enhanced styling */}
            <div className="relative h-96 bg-gradient-to-br from-primary via-blue-600 to-blue-700">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-blue-600/80 to-blue-700/90"></div>
              
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
              <div className="relative z-10 h-full flex items-end p-8 pb-12">
                <div className="text-primary-foreground max-w-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="relative w-20 h-20 bg-background/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-blue-300/50">
                        <Building className="h-10 w-10 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-primary-foreground text-lg font-semibold mb-1">{hackathon.organizer}</p>
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
                  <div className="text-center">
                    <div className="relative bg-background border border-blue-200 rounded-2xl p-4 shadow-sm">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                        {hackathon.participantCount.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground text-sm font-medium">Participants</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative bg-background border border-blue-200 rounded-2xl p-4 shadow-sm">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                        {hackathon.duration}
                      </div>
                      <div className="text-muted-foreground text-sm font-medium">Duration</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative bg-background border border-blue-200 rounded-2xl p-4 shadow-sm">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
                        {hackathon.totalPrizePool}
                      </div>
                      <div className="text-muted-foreground text-sm font-medium">Prize Pool</div>
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
              <div className="bg-gradient-card shadow-card rounded-3xl border border-border p-8 relative overflow-hidden">
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
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
                    <p className="text-foreground leading-relaxed font-medium">
                      {hackathon.longDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracks Section with straight layout */}
            <div className="relative">
              <div className="bg-gradient-card shadow-card rounded-3xl border border-border p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Challenge Tracks</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hackathon.tracks.map((track, index) => (
                    <div key={index} className="relative">
                      <div className="relative bg-background border-2 border-blue-100 rounded-2xl p-6">
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
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative">
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
                            <div className="h-full p-1">
                              {/* Simplified smaller card with equal height */}
                              <div className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3 transition-all duration-300 h-20 flex flex-col items-center justify-center">
                                {/* Content */}
                                <div className="text-center">
                                  <div className="text-2xl mb-1">
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
              <div className="bg-gradient-card shadow-card rounded-3xl border border-border p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="relative w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Prizes & Rewards</h2>
                </div>
                <div className="space-y-6">
                  {hackathon.prizes.map((prize, index) => (
                    <div key={index} className="relative">
                      <div className={`relative bg-background border-2 border-blue-200 rounded-2xl p-6 ${
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
              <div className="bg-gradient-card shadow-card rounded-3xl border border-blue-200 p-6 sticky top-6 overflow-hidden">
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
              <div className="bg-gradient-card shadow-card rounded-3xl border border-blue-200 p-6 overflow-hidden">
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
                      className="flex items-center gap-3 p-2 bg-gradient-to-r from-blue-50 to-background rounded-lg border border-blue-100"
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
              <div className="bg-gradient-card shadow-card rounded-3xl border border-blue-200 p-6 overflow-hidden">
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Organizer</h3>
                  </div>
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
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
