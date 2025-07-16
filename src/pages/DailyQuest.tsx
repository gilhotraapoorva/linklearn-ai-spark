import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 pt-20">
        <div className="w-full max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            </div>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
          
          {quest && !loading && (
            <Card className="w-full shadow-lg border-gray-200 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Left Panel: Quest Details */}
                  <div className="col-span-1 bg-white p-8 border-r border-gray-200 flex flex-col">
                    <div className="flex-grow">
                      <div className="flex items-center mb-4">
                        <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                        <h1 className="text-2xl font-bold text-gray-800">Daily AI Quest</h1>
                      </div>
                      <Badge 
                        className={`mb-4 text-sm font-semibold px-3 py-1 rounded-full border-2 ${getDifficultyColor(quest.difficulty)}`}
                      >
                        {quest.difficulty}
                      </Badge>
                      <h2 className="text-xl font-semibold text-gray-700 mb-2">{quest.title}</h2>
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed">{quest.description}</p>
                      
                      <div className="space-y-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Star className="h-5 w-5 mr-3 text-yellow-400" />
                          <span>{quest.xpReward} XP</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 mr-3 text-blue-500" />
                          <span>{quest.estimatedTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Code className="h-5 w-5 mr-3 text-green-500" />
                          <span>Topic: {quest.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
                        onClick={() => {
                          const element = document.getElementById("solution-section");
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        <Lightbulb className="mr-2 h-5 w-5" />
                        Attempt Challenge
                      </Button>
                    </div>
                  </div>

                  {/* Right Panel: Solution Submission */}
                  <div id="solution-section" className="col-span-2 bg-gray-50 p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Solution</h3>
                    <div className="bg-white p-6 rounded-lg shadow-inner border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                          <SelectTrigger className="w-[220px] bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map(lang => (
                              <SelectItem key={lang.value} value={lang.value}>
                                <span className="mr-2">{lang.icon}</span>{lang.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setSolution("")} disabled={isSubmitting}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => setIsRunning(true)} 
                            disabled={isRunning || isSubmitting}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            {isRunning ? "Running..." : "Run Code"}
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        placeholder={getPlaceholder(selectedLanguage)}
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        className="w-full h-64 p-4 border rounded-md bg-gray-900 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                      <Button 
                        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 flex items-center justify-center"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                          <CheckCircle className="mr-2 h-5 w-5" />
                        )}
                        {isSubmitting ? "Submitting..." : "Submit Solution"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestPage;