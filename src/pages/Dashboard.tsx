
import Header from "@/components/Header";
import EmptyState from "@/components/EmptyState";
import SurveyCard from "@/components/SurveyCard";
import useStore from "@/store/surveyStore";

export default function Dashboard() {
  const { surveys } = useStore();

  return (
    <>
      <Header />
      <div className="container py-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Your Surveys</h2>
          {surveys.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {surveys.map((survey) => (
                <SurveyCard key={survey.id} survey={survey} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </>
  );
}
