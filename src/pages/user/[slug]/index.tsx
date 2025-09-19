import { useAuth } from "../../../context/AuthContext";
import StatsGrid from "../../../components/StatsGrid";
import { FiMapPin } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { useProgress } from "../../../context/ProgressContext";
import { algorithms } from "../../../data/algorithms";
import { Link } from "react-router-dom";

function ProfileCard() {
  const { user } = useAuth();

  const profile = {
    college: user?.college,
    location: user?.location,
    github: user?.github,
    linkedin: user?.linkedin,
  };

  return (
    <div className="bg-[#000] border border-gray-700/60 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-3">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 shrink-0 text-lg font-semibold text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center">
            {user?.displayName?.[0]?.toUpperCase() ?? "?"}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-sm md:text-xl text-gray-300 font-semibold">
            {user?.displayName}
          </h3>
          <p className="text-gray-500 text-sm mt-0.5">{user?.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-white border-t border-gray-700/60 pt-4">
        <h5>Personal Information</h5>

        <p className="flex items-center gap-3 text-lg text-gray-400">
          <RiGraduationCapLine />
          <span className="text-sm">{profile.college || "--"}</span>
        </p>

        <p className="flex items-center gap-3 text-lg text-gray-400">
          <FiMapPin />
          <span className="text-sm">{profile.location || "--"}</span>
        </p>
      </div>

      {user && (
        <Link to={`/user/${user.email?.split("@")[0]}/edit`}>
          <button className="mt-6 w-full py-2 rounded-md text-sm font-medium bg-green-600/20 text-green-300 border border-green-600/30 hover:bg-green-600/30 transition">
            Edit Profile
          </button>
        </Link>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { progressMap, loading } = useProgress();

  const topicCounts: Record<string, number> = {};
  Object.entries(progressMap).forEach(([algoId, data]) => {
    if (data.visualizationCompleted && data.quizCompleted) {
      const meta = algorithms[algoId];
      if (!meta) return;
      topicCounts[meta.category] = (topicCounts[meta.category] || 0) + 1;
    }
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-4">
      <aside className="col-span-3 space-y-6">
        <ProfileCard />
      </aside>

      <section className="col-span-9 space-y-4">
        <StatsGrid />

        <div className="rounded-lg bg-[#000] border border-gray-700/60 p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">Topics Covered</h2>

          {loading ? (
            <p className="text-gray-400">Loading progress…</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Object.entries(topicCounts).map(([name, count]) => (
                <span
                  key={name}
                  className="capitalize px-3 py-1.5 rounded-md text-sm bg-[#141414] text-white"
                >
                  {name} <span className="text-gray-400">× {count}</span>
                </span>
              ))}
              {Object.keys(topicCounts).length === 0 && (
                <p className="text-gray-500">No topics covered yet.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
