import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the purpose of React hooks?",
    options: [
      "To add state and lifecycle features to functional components",
      "To create class components",
      "To style components",
      "To handle routing"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which of the following is NOT a valid TypeScript type?",
    options: ["string", "number", "boolean", "float"],
    correctAnswer: 3
  },
  {
    id: 3,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which HTTP method is used to update existing data?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "In React, what is the virtual DOM?",
    options: [
      "A physical representation of the DOM",
      "A lightweight copy of the real DOM kept in memory",
      "A database for storing component data",
      "A styling framework"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Which of these is a NoSQL database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What is the purpose of package.json in a Node.js project?",
    options: [
      "To store component styles",
      "To manage project dependencies and metadata",
      "To define database schemas",
      "To configure the web server"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Which Git command is used to create a new branch?",
    options: ["git new branch", "git create branch", "git branch", "git make branch"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "What is the difference between '==' and '===' in JavaScript?",
    options: [
      "No difference",
      "'==' checks type and value, '===' checks only value",
      "'==' checks only value, '===' checks type and value",
      "'==' is for numbers, '===' is for strings"
    ],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "Which CSS property is used to make text bold?",
    options: ["text-weight", "font-weight", "text-bold", "font-bold"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "What is REST API?",
    options: [
      "A type of database",
      "A programming language",
      "An architectural style for web services",
      "A JavaScript framework"
    ],
    correctAnswer: 2
  },
  {
    id: 13,
    question: "Which React hook is used for managing component state?",
    options: ["useEffect", "useState", "useContext", "useCallback"],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Automated Program Integration",
      "Advanced Programming Instructions",
      "Application Process Integration"
    ],
    correctAnswer: 0
  },
  {
    id: 15,
    question: "Which of the following is a CSS framework?",
    options: ["React", "Angular", "Bootstrap", "Express"],
    correctAnswer: 2
  },
  {
    id: 16,
    question: "What is the purpose of useEffect hook in React?",
    options: [
      "To manage component state",
      "To handle side effects and lifecycle events",
      "To create new components",
      "To style components"
    ],
    correctAnswer: 1
  },
  {
    id: 17,
    question: "Which SQL command is used to retrieve data?",
    options: ["INSERT", "UPDATE", "DELETE", "SELECT"],
    correctAnswer: 3
  },
  {
    id: 18,
    question: "What is the default port for HTTP?",
    options: ["443", "8080", "80", "3000"],
    correctAnswer: 2
  },
  {
    id: 19,
    question: "Which of these is NOT a JavaScript data type?",
    options: ["undefined", "null", "boolean", "integer"],
    correctAnswer: 3
  },
  {
    id: 20,
    question: "What is the purpose of CORS in web development?",
    options: [
      "To compress files",
      "To enable cross-origin resource sharing",
      "To encrypt data",
      "To cache responses"
    ],
    correctAnswer: 1
  }
];

export default function MCQRound() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const isPassed = score >= 2; // 10% of 20 questions

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-200">
            <CardHeader className="text-center bg-blue-50">
              <CardTitle className="text-2xl font-bold text-blue-900">
                MCQ Round Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className={`inline-flex items-center gap-3 p-4 rounded-lg ${isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isPassed ? (
                    <CheckCircle className="h-8 w-8" />
                  ) : (
                    <XCircle className="h-8 w-8" />
                  )}
                  <span className="text-xl font-semibold">
                    {isPassed ? 'Congratulations! You Passed!' : 'Unfortunately, You Did Not Pass'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">{score}</div>
                      <div className="text-sm text-gray-600">Score</div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">{Math.round((score / 20) * 100)}%</div>
                      <div className="text-sm text-gray-600">Percentage</div>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-blue-600">20</div>
                      <div className="text-sm text-gray-600">Total Questions</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {isPassed ? (
                    <>
                      <p className="text-lg text-gray-700">
                        Excellent! You've passed the MCQ round with a score of {score}/20 ({Math.round((score / 20) * 100)}%).
                        You can now proceed to the submission round.
                      </p>
                      <Button 
                        onClick={() => navigate(`/hackathon/${id}/submission`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                      >
                        Proceed to Submission Round
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-700">
                        You scored {score}/20 ({Math.round((score / 20) * 100)}%). 
                        You need at least 2/20 (10%) to pass this round.
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button 
                          onClick={() => navigate(`/hackathon/${id}`)}
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          Back to Hackathon
                        </Button>
                        <Button 
                          onClick={() => window.location.reload()}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Retake Quiz
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-blue-900">
                MCQ Round - Question {currentQuestion + 1} of {questions.length}
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <Clock className="h-5 w-5" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
                <div className="text-sm text-blue-600">
                  Answered: {getAnsweredCount()}/{questions.length}
                </div>
              </div>
            </div>
            <Progress 
              value={(currentQuestion + 1) / questions.length * 100} 
              className="mt-2"
            />
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <Card className="lg:col-span-1 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-blue-900">Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={currentQuestion === index ? "default" : "outline"}
                    size="sm"
                    className={`
                      h-10 w-10 p-0 text-sm
                      ${currentQuestion === index 
                        ? "bg-blue-600 text-white" 
                        : answers[questions[index].id] !== undefined
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-blue-300 text-blue-600 hover:bg-blue-50"
                      }
                    `}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-blue-300 rounded"></div>
                  <span>Not Answered</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Question Area */}
          <Card className="lg:col-span-3 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl text-blue-900">
                Question {currentQuestion + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {questions[currentQuestion].question}
                </h3>

                <RadioGroup
                  key={questions[currentQuestion].id}
                  value={answers[questions[currentQuestion].id] !== undefined ? answers[questions[currentQuestion].id].toString() : undefined}
                  onValueChange={(value) => 
                    handleAnswerChange(questions[currentQuestion].id, parseInt(value))
                  }
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={`${questions[currentQuestion].id}-${index}`} className="flex items-center space-x-3 p-3 rounded-lg border border-blue-100 hover:bg-blue-50">
                      <RadioGroupItem value={index.toString()} id={`option-${questions[currentQuestion].id}-${index}`} />
                      <Label 
                        htmlFor={`option-${questions[currentQuestion].id}-${index}`} 
                        className="flex-1 cursor-pointer text-gray-700"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between items-center pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex gap-3">
                    {currentQuestion === questions.length - 1 ? (
                      <Button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                      >
                        Submit Quiz
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Submit Section */}
        <Card className="mt-6 border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Progress: {getAnsweredCount()}/{questions.length} questions answered
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/hackathon/${id}`)}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Back to Hackathon
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={getAnsweredCount() === 0}
                >
                  Submit Quiz ({getAnsweredCount()}/{questions.length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
