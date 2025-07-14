import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Trophy,
  Target,
  Brain,
  AlertTriangle
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

const mcqQuestions: Question[] = [
  {
    id: 1,
    question: "What is the primary benefit of using React's virtual DOM?",
    options: [
      "Faster direct DOM manipulation",
      "Reduced memory usage",
      "Improved performance through efficient diffing",
      "Better browser compatibility"
    ],
    correctAnswer: 2,
    category: "React"
  },
  {
    id: 2,
    question: "Which hook would you use to perform side effects in a functional component?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: 1,
    category: "React Hooks"
  },
  {
    id: 3,
    question: "In TypeScript, what does the 'readonly' modifier do?",
    options: [
      "Makes a property immutable",
      "Makes a property private",
      "Makes a property static",
      "Makes a property optional"
    ],
    correctAnswer: 0,
    category: "TypeScript"
  },
  {
    id: 4,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswer: 1,
    category: "Algorithms"
  },
  {
    id: 5,
    question: "Which HTTP status code indicates a successful POST request that created a resource?",
    options: ["200 OK", "201 Created", "202 Accepted", "204 No Content"],
    correctAnswer: 1,
    category: "Web Development"
  },
  {
    id: 6,
    question: "In Node.js, what is the purpose of the 'package.json' file?",
    options: [
      "Store application data",
      "Configure build settings",
      "Manage dependencies and project metadata",
      "Define database schema"
    ],
    correctAnswer: 2,
    category: "Node.js"
  },
  {
    id: 7,
    question: "What is the main difference between SQL and NoSQL databases?",
    options: [
      "SQL is faster than NoSQL",
      "SQL uses structured tables, NoSQL uses flexible document structures",
      "NoSQL doesn't support queries",
      "SQL is only for web applications"
    ],
    correctAnswer: 1,
    category: "Database"
  },
  {
    id: 8,
    question: "Which CSS property is used to create flexible layouts?",
    options: ["display: block", "display: flex", "display: inline", "display: table"],
    correctAnswer: 1,
    category: "CSS"
  },
  {
    id: 9,
    question: "What does REST stand for in web services?",
    options: [
      "Representational State Transfer",
      "Remote Execution State Transfer",
      "Rapid Exchange State Transfer",
      "Resource Execution State Transfer"
    ],
    correctAnswer: 0,
    category: "Web APIs"
  },
  {
    id: 10,
    question: "In Git, what command is used to create and switch to a new branch?",
    options: ["git branch new-branch", "git checkout -b new-branch", "git switch new-branch", "git create new-branch"],
    correctAnswer: 1,
    category: "Git"
  }
];

const MCQRound = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds (reduced from 30)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  React.useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleClearSelection = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestionData.id];
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < mcqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
    setShowConfirmDialog(false);
  };

  const handleSubmitClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = () => {
    handleSubmit();
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false);
  };

  const calculateScore = () => {
    let correct = 0;
    mcqQuestions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = showResults ? calculateScore() : 0;
  const passed = score >= 7; // Need 70% to pass (7 out of 10)

  const progress = ((currentQuestion + 1) / mcqQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
        <div className="bg-white border-b border-blue-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate(`/hackathon/${id}`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">MCQ Round Results</h1>
                <p className="text-blue-600">First Round Assessment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-white border-blue-100 shadow-sm">
            <CardHeader className="text-center">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
                {passed ? 
                  <CheckCircle className="h-8 w-8 text-green-600" /> : 
                  <AlertCircle className="h-8 w-8 text-red-600" />
                }
              </div>
              <CardTitle className={`text-3xl font-bold ${passed ? 'text-green-700' : 'text-red-700'}`}>
                {passed ? 'Congratulations!' : 'Better Luck Next Time!'}
              </CardTitle>
              <p className="text-gray-600 text-lg">
                You scored {score} out of {mcqQuestions.length} questions
              </p>
              <div className="text-2xl font-bold text-blue-900 mt-2">
                {Math.round((score / mcqQuestions.length) * 100)}%
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Progress value={(score / mcqQuestions.length) * 100} className="h-4 mb-4" />
                <p className="text-gray-600">
                  {passed ? 
                    "You've successfully passed the first round! You can now proceed to the submission phase." :
                    "You need at least 70% (7/10) to proceed to the next round. Unfortunately, you cannot retake this assessment."
                  }
                </p>
              </div>

              {passed && (
                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => navigate(`/hackathon/${id}/submission`)}
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    Proceed to Submission Round
                  </Button>
                </div>
              )}

              {!passed && (
                <div className="flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/hackathon/${id}`)}
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    Back to Hackathon Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestionData = mcqQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button 
          variant="ghost" 
          className="mb-6 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(`/hackathon/${id}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">MCQ Round</h1>
              <p className="text-blue-600">First Round Assessment</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-mono text-blue-900">{formatTime(timeLeft)}</span>
              </div>
              <Badge className="bg-blue-600 text-white">
                {answeredCount}/{mcqQuestions.length} Answered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-blue-600 mb-2">
            <span>Question {currentQuestion + 1} of {mcqQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2 bg-blue-100" />
        </div>

        {/* Question Card */}
        <Card className="bg-white border-blue-100 shadow-sm mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                {currentQuestionData.category}
              </Badge>
              <div className="flex items-center gap-2 text-blue-600">
                <Brain className="h-4 w-4" />
                <span className="text-sm">Question {currentQuestionData.id}</span>
              </div>
            </div>
            <CardTitle className="text-xl text-blue-900 mt-4">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestionData.id]?.toString() || ""} 
              onValueChange={(value) => handleAnswerSelect(currentQuestionData.id, parseInt(value))}
              className="space-y-4"
            >
              {currentQuestionData.options.map((option, index) => (
                <Label 
                  key={index}
                  htmlFor={`option-${index}`} 
                  className="flex items-center space-x-3 p-4 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer w-full block"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="flex-shrink-0" />
                  <span className="text-blue-900 flex-1">{option}</span>
                </Label>
              ))}
            </RadioGroup>
            
            {/* Clear Selection Button */}
            {answers[currentQuestionData.id] !== undefined && (
              <div className="mt-6 pt-4 border-t border-blue-100">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearSelection}
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion === mcqQuestions.length - 1 ? (
              <Button 
                onClick={handleSubmitClick}
                className="bg-blue-600 text-white hover:bg-blue-700"
                disabled={answeredCount < mcqQuestions.length}
              >
                <Target className="h-4 w-4 mr-2" />
                Submit Test
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Question Grid */}
        <Card className="bg-white border-blue-100 shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Question Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {mcqQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : answers[mcqQuestions[index].id] !== undefined
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-blue-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Confirm Submission
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? Once submitted, you cannot make any changes or retake the assessment.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Summary:</strong>
              </p>
              <p className="text-sm text-blue-600 mt-1">
                • Questions answered: {answeredCount} of {mcqQuestions.length}
              </p>
              <p className="text-sm text-blue-600">
                • Time remaining: {formatTime(timeLeft)}
              </p>
              <p className="text-sm text-blue-600">
                • Minimum score required: 70% ({Math.ceil(mcqQuestions.length * 0.7)} questions)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelSubmit}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSubmit} className="bg-blue-600 hover:bg-blue-700">
              Yes, Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MCQRound;
