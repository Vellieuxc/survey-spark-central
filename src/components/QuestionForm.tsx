
import { useState } from "react";
import { Question, QuestionType, Option } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuestionFormProps {
  question: Question;
  onUpdate: (question: Question) => void;
  onDelete: () => void;
  index: number;
}

export default function QuestionForm({ question, onUpdate, onDelete, index }: QuestionFormProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...question, title: e.target.value });
  };

  const handleTypeChange = (type: QuestionType) => {
    onUpdate({ ...question, type });
  };

  const handleRequiredChange = (checked: boolean) => {
    onUpdate({ ...question, required: checked });
  };

  const addOption = () => {
    const newOption: Option = {
      id: crypto.randomUUID(),
      text: "",
    };
    onUpdate({ ...question, options: [...question.options, newOption] });
  };

  const updateOption = (id: string, text: string) => {
    const updatedOptions = question.options.map((option) =>
      option.id === id ? { ...option, text } : option
    );
    onUpdate({ ...question, options: updatedOptions });
  };

  const removeOption = (id: string) => {
    const updatedOptions = question.options.filter((option) => option.id !== id);
    onUpdate({ ...question, options: updatedOptions });
  };

  return (
    <Card className="mb-6 border-primary/20">
      <CardHeader className="pb-3 flex flex-row items-start justify-between gap-2">
        <div className="space-y-1.5">
          <CardTitle className="text-base">Question {index + 1}</CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`question-${question.id}`}>Question Text</Label>
          <Input
            id={`question-${question.id}`}
            placeholder="Enter your question"
            value={question.title}
            onChange={handleTitleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`question-type-${question.id}`}>Question Type</Label>
          <Select
            value={question.type}
            onValueChange={(value) => handleTypeChange(value as QuestionType)}
          >
            <SelectTrigger id={`question-type-${question.id}`}>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(question.type === "multipleChoice" || question.type === "checkbox") && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Options</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="h-8"
                disabled={question.options.length >= 10}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Option
              </Button>
            </div>

            {question.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Input
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder="Option text"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground"
                  onClick={() => removeOption(option.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Label htmlFor={`required-${question.id}`}>Required</Label>
          <Switch
            id={`required-${question.id}`}
            checked={question.required}
            onCheckedChange={handleRequiredChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
