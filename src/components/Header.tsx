
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary-foreground"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="m9 14 2 2 4-4" />
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">SurveyForge</h1>
        </Link>
        <div className="ml-auto flex gap-2">
          <Button asChild variant="default" size="sm">
            <Link to="/create">
              <Plus className="mr-2 h-4 w-4" /> Create Survey
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
