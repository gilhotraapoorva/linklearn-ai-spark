import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Users, 
  MessageSquare, 
  Bell, 
  Search,
  PlusSquare,
  Briefcase,
  GraduationCap,
  ThumbsUp,
  MessageCircle,
  Share,
  Send,
  MoreHorizontal,
  BookOpen,
  Brain
} from "lucide-react";
import { useUser } from "@/lib/UserContext";

const LinkedInHome = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [postText, setPostText] = useState("");

  // Mock data for posts
  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      role: "Senior Software Engineer at Google",
      time: "2h",
      content: "Just completed an amazing coding challenge! The problem-solving skills I learned through daily practice really paid off. Anyone else working on algorithm challenges?",
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      author: "Alex Rodriguez",
      role: "Product Manager at Microsoft",
      time: "4h",
      content: "Excited to share that our team just launched a new feature that improves user experience by 40%! Grateful for the collaborative effort from engineering, design, and data science teams.",
      likes: 156,
      comments: 23,
      shares: 12
    },
    {
      id: 3,
      author: "LinkLearn",
      role: "Official LinkLearn",
      time: "6h",
      content: "🚀 New course alert! 'Advanced React Patterns' is now available. Perfect for developers looking to level up their React skills with modern patterns and best practices.",
      likes: 89,
      comments: 15,
      shares: 34
    }
  ];

  const handleCreatePost = () => {
    if (postText.trim()) {
      // Here you would typically save the post
      setPostText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* LinkedIn Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left side - Logo and Search */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-sm">
                  in
                </div>
                <span className="hidden sm:block font-semibold text-gray-900">LinkedIn</span>
              </div>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search" 
                  className="pl-10 w-64 bg-gray-100 border-none"
                />
              </div>
            </div>

            {/* Right side - Navigation */}
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto py-2">
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto py-2">
                <Users className="h-5 w-5" />
                <span className="text-xs">Network</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto py-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-xs">Jobs</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto py-2">
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs">Messaging</span>
              </Button>
              <Button variant="ghost" className="flex flex-col items-center space-y-1 h-auto py-2">
                <Bell className="h-5 w-5" />
                <span className="text-xs">Notifications</span>
              </Button>
              
              {/* LinkLearn - Special Button */}
              <Button 
                onClick={() => navigate('/learning-companion')}
                className="flex flex-col items-center space-y-1 h-auto py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                <Brain className="h-5 w-5" />
                <span className="text-xs">LinkLearn</span>
              </Button>

              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs hidden lg:block">Me</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarFallback className="text-lg">{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-900">Welcome back, {user?.email?.split('@')[0]}!</h3>
                  <p className="text-sm text-gray-600 mb-4">Software Developer</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profile viewers</span>
                      <span className="text-blue-600 font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Post impressions</span>
                      <span className="text-blue-600 font-semibold">156</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkLearn Card */}
            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">LinkLearn AI</h3>
                  <p className="text-sm text-gray-600 mb-4">Your personal AI-powered learning platform for skill development</p>
                  <Button 
                    onClick={() => navigate('/learning-companion')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      className="border-gray-300 resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-4">
                        <Button variant="ghost" size="sm">
                          <PlusSquare className="h-4 w-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Job
                        </Button>
                      </div>
                      <Button onClick={handleCreatePost} disabled={!postText.trim()}>
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{post.author}</h4>
                            <p className="text-sm text-gray-600">{post.role}</p>
                            <p className="text-xs text-gray-500">{post.time}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="mt-3 text-gray-900">{post.content}</p>
                        
                        {/* Post Actions */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                          <div className="flex space-x-6">
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                              <Share className="h-4 w-4 mr-1" />
                              {post.shares}
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">LinkedIn News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">AI transforms job market</h4>
                  <p className="text-xs text-gray-600">2 hours ago • 1,234 readers</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Remote work trends 2025</h4>
                  <p className="text-xs text-gray-600">4 hours ago • 856 readers</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900">Tech skills in demand</h4>
                  <p className="text-xs text-gray-600">6 hours ago • 2,103 readers</p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">People you may know</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">John Doe</h4>
                    <p className="text-xs text-gray-600">Frontend Developer</p>
                  </div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">Jane Smith</h4>
                    <p className="text-xs text-gray-600">UX Designer</p>
                  </div>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInHome;
