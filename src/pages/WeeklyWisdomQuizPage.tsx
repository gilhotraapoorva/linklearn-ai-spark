import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const questions = [
  {
    q: "Which of the following best describes an inclusive team?",
    options: [
      "A team where everyone has the same background",
      "A team that values and leverages diverse perspectives",
      "A team that avoids conflict by discouraging differences",
      "A team that only hires from top universities"
    ],
    answer: 1
  },
  {
    q: "What is a simple way to make meetings more inclusive?",
    options: [
      "Let only managers speak",
      "Rotate who leads the meeting and encourage all voices",
      "Keep meetings as short as possible",
      "Share notes only with leadership"
    ],
    answer: 1
  },
  {
    q: "Why is psychological safety important for teams?",
    options: [
      "It helps people feel safe to share ideas and take risks",
      "It ensures everyone agrees all the time",
      "It reduces the need for feedback",
      "It makes meetings longer"
    ],
    answer: 0
  },
  {
    q: "Which action supports diversity and inclusion at work?",
    options: [
      "Interrupting others to share your point",
      "Listening actively and respecting different viewpoints",
      "Hiring only people you know",
      "Ignoring cultural holidays"
    ],
    answer: 1
  }
];

const WeeklyWisdomQuizPage = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleOption = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === questions[current].answer) setScore(score + 1);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-background">
      <Card className="w-full max-w-xl mx-auto bg-gradient-card shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary animate-pulse-glow" />
            Weekly Wisdom Quiz
          </CardTitle>
          <div className="text-base text-muted-foreground mt-1">
            Topic: <span className="font-semibold text-primary">Building Inclusive Teams</span>
          </div>
        </CardHeader>
        <CardContent>
          {showResult ? (
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-primary">Quiz Complete!</div>
              <div className="text-lg">Your Score: <span className="font-bold">{score} / {questions.length}</span></div>
              <Button variant="quest" size="quest" className="w-full" onClick={handleRetake}>
                Retake Quiz
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/")}>Back to Dashboard</Button>
            </div>
          ) : (
            <div>
              <div className="mb-4 text-base font-semibold text-primary">
                Question {current + 1} of {questions.length}
              </div>
              <div className="mb-4 text-lg font-medium">{questions[current].q}</div>
              <div className="space-y-3 mb-6">
                {questions[current].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    variant={selected === idx ? "quest" : "outline"}
                    size="sm"
                    className={`w-full text-left ${selected === idx ? "ring-2 ring-primary" : ""}`}
                    onClick={() => handleOption(idx)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Progress value={((current + (selected !== null ? 1 : 0)) / questions.length) * 100} className="mb-4" />
              <Button
                variant="quest"
                size="quest"
                className="w-full"
                onClick={handleNext}
                disabled={selected === null}
              >
                {current === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyWisdomQuizPage;
