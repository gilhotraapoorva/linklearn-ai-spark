import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { 
  Clock, 
  Star, 
  CheckCircle, 
  Code, 
  Lightbulb, 
  Trophy,
  ArrowLeft,
  Play,
  RotateCcw,
  ChevronDown,
  Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { generateDailyQuest, DailyQuest } from "../lib/ollamaService";
import { useUser } from "@/lib/UserContext";
import { submitQuestSolution } from "@/lib/questActions";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
    case 'easy':
      return 'bg-green-500 text-white border-green-600';
    case 'intermediate':
    case 'medium':
      return 'bg-yellow-500 text-white border-yellow-600';
    case 'advanced':
    case 'hard':
      return 'bg-red-500 text-white border-red-600';
    default:
      return 'bg-muted text-muted-foreground border-muted';
  }
};

const QuestPage = () => {
  const [solution, setSolution] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [quest, setQuest] = useState<DailyQuest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { questId } = useParams();
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    if (location.state?.quest) {
      // Use the quest data passed from the DailyQuest component
      setQuest(location.state.quest);
      setLoading(false);
    } else {
      // If no quest data in state, fetch it
      fetchQuest();
    }
  }, [location.state]);

  const fetchQuest = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateDailyQuest();
      setQuest(data);
    } catch (err) {
      setError("Failed to load quest.");
    } finally {
      setLoading(false);
    }
  };

  const languages = [
    { value: "javascript", label: "JavaScript (React)", icon: "⚛️" },
    { value: "typescript", label: "TypeScript (React)", icon: "📘" },
    { value: "python", label: "Python", icon: "🐍" },
    { value: "java", label: "Java", icon: "☕" },
    { value: "cpp", label: "C++", icon: "⚡" },
    { value: "csharp", label: "C#", icon: "🎯" },
    { value: "go", label: "Go", icon: "🐹" },
    { value: "rust", label: "Rust", icon: "🦀" }
  ];

  const getPlaceholder = (language: string) => {
    switch (language) {
      case "javascript":
        return `// Write your optimized solution here...
import React, { memo, useMemo, useCallback } from 'react';

const UserList = ({ users, onEdit, onDelete, searchTerm }) => {
  // Your optimized code here
};`;
      case "typescript":
        return `// Write your optimized solution here...
import React, { memo, useMemo, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
}

const UserList: React.FC<{
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
}> = ({ users, onEdit, onDelete, searchTerm }) => {
  // Your optimized code here
};`;
      case "python":
        return `# Write your optimized solution here...

class UserList:
    def __init__(self, users, on_edit, on_delete, search_term):
        self.users = users
        self.on_edit = on_edit
        self.on_delete = on_delete
        self.search_term = search_term
    
    def render(self):
        # Your optimized code here
        pass`;
      case "java":
        return `// Write your optimized solution here...

public class UserList {
    private List<User> users;
    private Consumer<User> onEdit;
    private Consumer<String> onDelete;
    private String searchTerm;
    
    public UserList(List<User> users, Consumer<User> onEdit, 
                   Consumer<String> onDelete, String searchTerm) {
        this.users = users;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
        this.searchTerm = searchTerm;
    }
    
    public void render() {
        // Your optimized code here
    }
}`;
      case "cpp":
        return `// Write your optimized solution here...

#include <vector>
#include <string>
#include <functional>

class UserList {
private:
    std::vector<User> users;
    std::function<void(User)> onEdit;
    std::function<void(std::string)> onDelete;
    std::string searchTerm;

public:
    UserList(std::vector<User> users, 
             std::function<void(User)> onEdit,
             std::function<void(std::string)> onDelete,
             std::string searchTerm) 
        : users(users), onEdit(onEdit), onDelete(onDelete), searchTerm(searchTerm) {}
    
    void render() {
        // Your optimized code here
    }
};`;
      case "csharp":
        return `// Write your optimized solution here...

public class UserList
{
    private List<User> users;
    private Action<User> onEdit;
    private Action<string> onDelete;
    private string searchTerm;
    
    public UserList(List<User> users, Action<User> onEdit, 
                   Action<string> onDelete, string searchTerm)
    {
        this.users = users;
        this.onEdit = onEdit;
        this.onDelete = onDelete;
        this.searchTerm = searchTerm;
    }
    
    public void Render()
    {
        // Your optimized code here
    }
}`;
      case "go":
        return `// Write your optimized solution here...

package main

type User struct {
    ID       string
    Name     string
    Email    string
    JoinDate string
}

type UserList struct {
    users      []User
    onEdit     func(User)
    onDelete   func(string)
    searchTerm string
}

func NewUserList(users []User, onEdit func(User), 
                onDelete func(string), searchTerm string) *UserList {
    return &UserList{
        users:      users,
        onEdit:     onEdit,
        onDelete:   onDelete,
        searchTerm: searchTerm,
    }
}

func (ul *UserList) Render() {
    // Your optimized code here
}`;
      case "rust":
        return `// Write your optimized solution here...

use std::collections::HashMap;

struct User {
    id: String,
    name: String,
    email: String,
    join_date: String,
}

struct UserList {
    users: Vec<User>,
    on_edit: Box<dyn Fn(&User)>,
    on_delete: Box<dyn Fn(String)>,
    search_term: String,
}

impl UserList {
    fn new(users: Vec<User>, 
           on_edit: Box<dyn Fn(&User)>, 
           on_delete: Box<dyn Fn(String)>, 
           search_term: String) -> Self {
        UserList {
            users,
            on_edit,
            on_delete,
            search_term,
        }
    }
    
    fn render(&self) {
        // Your optimized code here
    }
}`;
      default:
        return `// Write your solution here...`;
    }
  };

  const handleSubmit = async () => {
    if (!questId || !solution.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await submitQuestSolution(user.uid, questId, solution);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to submit quest:', error);
      // Toast is already handled in submitQuestSolution
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const handleReset = () => {
    setSolution("");
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden pt-16">
        {/* Header with Back Button */}
        <div className="h-16 bg-card/80 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>

        {/* Main Content - Fixed Height */}
        <div className="h-[calc(100vh-8rem)] flex">{/* Adjusted height to account for navbar and header */}
        {/* Problem Statement Card - Left Side */}
        <div className="w-1/2 h-full border-r border-border/50">
          <Card className="h-full rounded-none border-0 shadow-none bg-gradient-to-br from-card to-card/95 backdrop-blur-sm">
            <CardContent className="h-full overflow-y-auto p-6 space-y-6">
              {loading ? (
                <div className="flex items-center justify-center h-full text-lg">Loading quest...</div>
              ) : error ? (
                <div className="flex items-center justify-center h-full text-destructive">{error}</div>
              ) : quest ? (
                <div className="space-y-4 animate-in slide-in-from-left-4 duration-500">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        {quest.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${getDifficultyColor(quest.difficulty || "Intermediate")} shadow-md pointer-events-none`}>
                          {quest.difficulty || "Intermediate"}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30 shadow-md">
                          <Clock className="h-3 w-3 text-primary" />
                          {quest.estimatedTime || "15 min"}
                        </Badge>
                        <Badge className="flex items-center gap-1 bg-white text-foreground border border-border shadow-md">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          {quest.xpReward || 150} XP
                        </Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {quest.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      Component
                    </h3>
                    <div className="bg-gradient-to-br from-muted/40 to-muted/20 p-6 rounded-xl border border-border/50 shadow-inner">
                      <pre className="text-sm overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed text-foreground/90">
                        <code>{quest.problem}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Code Editor Card - Right Side */}
        <div className="w-1/2 h-full">
          <Card className="h-full rounded-none border-0 shadow-none bg-gradient-to-br from-card to-card/95 backdrop-blur-sm">
            <CardContent className="h-full flex flex-col p-6">
              <div className="flex-1 flex flex-col space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Solution</h3>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRunCode}
                      disabled={isRunning || !solution.trim()}
                      className=""
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleReset}
                      className=""
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-48 bg-gradient-to-r from-muted/30 to-muted/10 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          <div className="flex items-center gap-2">
                            <span>{language.icon}</span>
                            <span>{language.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border border-border/50 shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-50"></div>
                  <Textarea
                    placeholder={getPlaceholder(selectedLanguage)}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    className="w-full h-full border-0 bg-transparent font-mono text-sm resize-none focus:ring-0 rounded-none leading-6 p-4 relative z-10"
                    disabled={isSubmitted}
                  />
                </div>

                <div className="space-y-3">
                  {!isSubmitted ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={!solution.trim() || isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Solution"
                      )}
                    </Button>
                  ) : (
                    <Button variant="success" className="w-full shadow-lg" disabled size="lg">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Submitted!
                    </Button>
                  )}

                  {isSubmitted && (
                    <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-xl shadow-sm animate-in slide-in-from-bottom-4 duration-500">
                      <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        Great job!
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Your solution has been submitted successfully!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
};

export default QuestPage; 