
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 text-primary"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M12 11v6" />
          <path d="M8 11v6" />
          <path d="M16 11v6" />
          <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        </svg>
      </div>
      <h2 className="mt-2 text-xl font-semibold">No surveys found</h2>
      <p className="mt-1 text-muted-foreground">
        Create your first survey to get started.
      </p>
      <Button className="mt-6" asChild>
        <Link to="/create">Create Survey</Link>
      </Button>
    </div>
  );
}
