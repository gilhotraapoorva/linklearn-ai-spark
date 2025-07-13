import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  MapPin,
  ExternalLink,
  Star,
  Share2,
  Bookmark,
  Code,
  Target,
  Award,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Globe,
  Mail,
  Phone,
  Building,
  Lightbulb,
  Zap,
  ArrowLeft,
  Heart,
  MessageSquare,
  Download
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

This year's theme focuses on creating impactful solutions that can make a real difference in society. Whether you're a seasoned developer, a creative designer, or a passionate problem-solver, BuildIT provides the perfect environment to showcase your skills and learn from industry experts.

Participants will have access to mentorship from industry professionals, workshops on cutting-edge technologies, and networking opportunities with potential employers and investors. The event promises to be an enriching experience that goes beyond just coding.`,
    
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
    
    // Schedule
    schedule: [
      {
        day: "Day 1 - March 15",
        events: [
          { time: "09:00 AM", event: "Registration & Check-in", type: "registration" },
          { time: "10:00 AM", event: "Opening Ceremony", type: "ceremony" },
          { time: "11:00 AM", event: "Problem Statement Release", type: "important" },
          { time: "12:00 PM", event: "Team Formation & Networking", type: "networking" },
          { time: "01:00 PM", event: "Lunch Break", type: "break" },
          { time: "02:00 PM", event: "Hacking Begins!", type: "important" },
          { time: "04:00 PM", event: "Tech Workshop: AI/ML Basics", type: "workshop" },
          { time: "08:00 PM", event: "Dinner Break", type: "break" }
        ]
      },
      {
        day: "Day 2 - March 16",
        events: [
          { time: "08:00 AM", event: "Breakfast", type: "break" },
          { time: "10:00 AM", event: "Mentor Sessions", type: "mentoring" },
          { time: "01:00 PM", event: "Lunch Break", type: "break" },
          { time: "03:00 PM", event: "Progress Check & Feedback", type: "evaluation" },
          { time: "06:00 PM", event: "Workshop: Pitch Preparation", type: "workshop" },
          { time: "08:00 PM", event: "Dinner & Entertainment", type: "break" }
        ]
      },
      {
        day: "Day 3 - March 17",
        events: [
          { time: "08:00 AM", event: "Breakfast", type: "break" },
          { time: "10:00 AM", event: "Final Sprint", type: "important" },
          { time: "12:00 PM", event: "Submission Deadline", type: "deadline" },
          { time: "01:00 PM", event: "Lunch Break", type: "break" },
          { time: "02:00 PM", event: "Project Presentations", type: "presentation" },
          { time: "05:00 PM", event: "Judging & Deliberation", type: "evaluation" },
          { time: "06:30 PM", event: "Closing Ceremony & Awards", type: "ceremony" }
        ]
      }
    ],
    
    // Judges and Mentors
    judges: [
      { name: "Dr. Priya Sharma", role: "CTO, TechCorp", company: "TechCorp", image: "/public/placeholder.svg" },
      { name: "Rahul Gupta", role: "VP Engineering", company: "Innovate Labs", image: "/public/placeholder.svg" },
      { name: "Sarah Chen", role: "Lead Designer", company: "Design Studio", image: "/public/placeholder.svg" },
      { name: "Amit Patel", role: "Startup Founder", company: "NextGen Solutions", image: "/public/placeholder.svg" }
    ],
    
    // Requirements and Eligibility
    eligibility: [
      "Open to all students and professionals",
      "Age limit: 18-35 years",
      "Valid ID proof required",
      "Teams of 2-4 members preferred",
      "Individual participation allowed"
    ],
    
    requirements: [
      "Laptop/Computer with development environment",
      "Stable internet connection",
      "Github account for code submission",
      "Presentation materials (PPT/Demo)",
      "Original ideas and implementations only"
    ],
    
    // Contact and Support
    contact: {
      email: "support@collegecrave.com",
      phone: "+91 98765 43210",
      website: "https://collegecrave.com",
      socialMedia: {
        twitter: "@collegecrave",
        linkedin: "college-crave",
        instagram: "@collegecrave_official"
      }
    },
    
    // Perks and Benefits
    perks: [
      "Industry mentorship throughout the event",
      "Free meals and accommodation",
      "Networking with 100+ professionals",
      "Workshops by industry experts",
      "Job and internship opportunities",
      "Swag kit for all participants",
      "Certificate of participation",
      "Access to premium development tools"
    ]
  };

  const handleRegister = () => {
    setIsRegistered(true);
    // Here you would typically make an API call to register the user
  };

  const handleJoin = () => {
    // Navigate to MCQ round for active hackathons
    navigate(`/hackathon/${id}/mcq`);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'important': return 'text-primary';
      case 'deadline': return 'text-destructive';
      case 'ceremony': return 'text-accent';
      case 'workshop': return 'text-success';
      case 'break': return 'text-muted-foreground';
      case 'evaluation': return 'text-warning';
      default: return 'text-foreground';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'important': return <Zap className="h-4 w-4" />;
      case 'deadline': return <AlertCircle className="h-4 w-4" />;
      case 'ceremony': return <Award className="h-4 w-4" />;
      case 'workshop': return <Lightbulb className="h-4 w-4" />;
      case 'presentation': return <FileText className="h-4 w-4" />;
      case 'evaluation': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Card */}
            <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 mb-6">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={hackathon.logo} 
                    alt="Organizer Logo" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-success text-success-foreground">
                        {hackathon.status}
                      </Badge>
                      <Badge variant="outline">{hackathon.difficulty}</Badge>
                      <Badge variant="outline">{hackathon.mode}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {hackathon.title}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-3">
                      {hackathon.subtitle}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {hackathon.organizer}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {hackathon.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        March 15-17, 2024
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-4">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={isActive ? handleJoin : handleRegister}
                    disabled={!isActive && isRegistered}
                  >
                    {isActive ? (
                      "Join Hackathon"
                    ) : isRegistered ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Registered
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleBookmark}
                    className={isBookmarked ? "text-primary border-primary" : ""}
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleLike}
                    className={isLiked ? "text-destructive border-destructive" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-background rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{hackathon.participantCount}</div>
                    <div className="text-sm text-muted-foreground">Registered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{hackathon.totalPrizePool}</div>
                    <div className="text-sm text-muted-foreground">Prize Pool</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{hackathon.duration}</div>
                    <div className="text-sm text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{likes}</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tracks">Tracks</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="prizes">Prizes</TabsTrigger>
                <TabsTrigger value="judges">Judges</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      About This Hackathon
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {hackathon.description}
                    </p>
                    <Separator />
                    <div className="prose prose-sm max-w-none">
                      {hackathon.longDescription.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Required Skills & Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {hackathon.preferredSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Perks & Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hackathon.perks.map((perk, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span className="text-sm">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tracks Tab */}
              <TabsContent value="tracks" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hackathon.tracks.map((track, index) => (
                    <Card key={index} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-primary" />
                          {track.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{track.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                {hackathon.schedule.map((day, dayIndex) => (
                  <Card key={dayIndex} className="bg-gradient-card shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {day.day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {day.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                            <div className={`flex items-center gap-2 ${getEventTypeColor(event.type)}`}>
                              {getEventTypeIcon(event.type)}
                              <span className="font-medium text-sm min-w-[80px]">
                                {event.time}
                              </span>
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                            <span className="text-sm flex-1">{event.event}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Prizes Tab */}
              <TabsContent value="prizes" className="space-y-6">
                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Prize Pool: {hackathon.totalPrizePool}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {hackathon.prizes.map((prize, index) => (
                        <div key={index} className="p-4 bg-background rounded-lg border-l-4 border-primary">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">{prize.position}</h3>
                            <Badge variant="outline" className="text-lg font-bold">
                              {prize.amount}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {prize.perks.map((perk, perkIndex) => (
                              <Badge key={perkIndex} variant="secondary" className="text-xs">
                                {perk}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Judges Tab */}
              <TabsContent value="judges" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hackathon.judges.map((judge, index) => (
                    <Card key={index} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={judge.image} alt={judge.name} />
                            <AvatarFallback>{judge.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{judge.name}</h3>
                            <p className="text-muted-foreground">{judge.role}</p>
                            <p className="text-sm text-primary">{judge.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Rules Tab */}
              <TabsContent value="rules" className="space-y-6">
                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Eligibility Criteria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {hackathon.eligibility.map((criteria, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span className="text-sm">{criteria}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {hackathon.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-warning flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="bg-gradient-card shadow-card sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Registration</span>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      {hackathon.registrationStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Team Size</span>
                    <span className="text-sm font-medium">{hackathon.teamSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium">{hackathon.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mode</span>
                    <span className="text-sm font-medium">{hackathon.mode}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Registration Progress</span>
                    <span className="text-sm font-medium">
                      {hackathon.participantCount}/{hackathon.maxParticipants}
                    </span>
                  </div>
                  <Progress 
                    value={(hackathon.participantCount / hackathon.maxParticipants) * 100} 
                    className="h-2"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Starts:</span>
                    <span className="font-medium">March 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium text-destructive">March 10, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Contact & Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${hackathon.contact.email}`} className="text-primary hover:underline">
                    {hackathon.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{hackathon.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={hackathon.contact.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1 inline" />
                  </a>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Organizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={hackathon.logo} 
                    alt="Organizer Logo" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{hackathon.organizer}</h3>
                    <p className="text-sm text-muted-foreground">Event Organizer</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HackathonDetails;
