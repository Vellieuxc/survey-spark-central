
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import QuestionForm from "@/components/QuestionForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Plus } from "lucide-react";
import { Survey, Question } from "@/types";
import useStore from "@/store/surveyStore";

export default function CreateSurvey() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addSurvey } = useStore();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = () => {
    if (questions.length >= 10) {
      toast({
        variant: "destructive",
        title: "Maximum questions reached",
        description: "You can only add up to 10 questions per survey.",
      });
      return;
    }

    const newQuestion: Question = {
      id: crypto.randomUUID(),
      title: "",
      type: "text",
      required: false,
      options: [],
    };

    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please provide a title for your survey.",
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        variant: "destructive",
        title: "Questions required",
        description: "Please add at least one question to your survey.",
      });
      return;
    }

    const incompleteQuestion = questions.find(
      (q) => !q.title || ((q.type === "multipleChoice" || q.type === "checkbox") && q.options.length < 2)
    );

    if (incompleteQuestion) {
      toast({
        variant: "destructive",
        title: "Incomplete questions",
        description: "Please ensure all questions have titles and choice questions have at least 2 options.",
      });
      return;
    }

    const newSurvey: Survey = {
      id: crypto.randomUUID(),
      title,
      description,
      questions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addSurvey(newSurvey);
    
    toast({
      title: "Survey created",
      description: "Your survey has been created successfully.",
    });
    
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="container py-6">
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            className="mr-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Create New Survey</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Survey Title</Label>
              <Input
                id="title"
                placeholder="Enter survey title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="max-w-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Provide additional information about your survey"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="max-w-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Questions</h2>
              <Button
                type="button"
                onClick={addQuestion}
                disabled={questions.length >= 10}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </div>

            {questions.length > 0 ? (
              <div className="space-y-6 max-w-2xl">
                {questions.map((question, index) => (
                  <QuestionForm
                    key={question.id}
                    question={question}
                    onUpdate={updateQuestion}
                    onDelete={() => deleteQuestion(question.id)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed p-6 text-center">
                <h3 className="font-medium">No questions yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Add questions to your survey using the button above.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit">Create Survey</Button>
          </div>
        </form>
      </div>
    </>
  );
}
