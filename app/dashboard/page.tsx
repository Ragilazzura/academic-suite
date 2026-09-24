import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EducatorWorkspace from "./EducatorWorkspace";
import ResearcherWorkspace from "./ResearcherWorkspace";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const role = user.publicMetadata?.role as string;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Academic Suite</h1>

        {/* Render Educator Tools */}
        {role === "educator" && <EducatorWorkspace />}

        {/* Render Researcher Tools */}
        {role === "researcher" && <ResearcherWorkspace />}

        {/* Render Fallback for Unassigned Users */}
        {!role && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-2">
              Account Pending Validation
            </h2>
            <p className="text-gray-700">
              Your identity has not been assigned yet. Please contact the administration team to unlock your specific tools.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}