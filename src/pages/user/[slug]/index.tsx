import { useAuth } from "../../../context/AuthContext";
import StatsGrid from "../../../components/StatsGrid";
import { FiMapPin } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";
import { useProgress } from "../../../context/ProgressContext";
import { algorithms } from "../../../data/algorithms";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

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
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 text-lg font-semibold text-emerald-400 border-2 border-emerald-500/40 rounded-full flex items-center justify-center">
            <img
              src="/images/default.jpg"
              alt="profile"
              className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-base md:text-xl text-gray-300 font-semibold">
            {user?.displayName}
          </h3>
          <p className="text-gray-500 text-sm mt-0.5">{user?.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-white border-t border-gray-700/60 pt-4">
        <h5 className="text-sm md:text-base">Personal Information</h5>

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
  const { user } = useAuth();
  const { progressMap, loading } = useProgress();

  const topicCounts: Record<string, number> = {};
  Object.entries(progressMap).forEach(([algoId, data]) => {
    if (data.visualizationCompleted && data.quizCompleted) {
      const meta = algorithms[algoId];
      if (!meta) return;
      topicCounts[meta.category] = (topicCounts[meta.category] || 0) + 1;
    }
  });

  const title = user
    ? `${user.displayName || "User"}'s - Algonaut Profile`
    : "Profile | Algonaut";
  const description =
    "View your algorithm learning progress, topics covered, and quiz completions on Algonaut.";

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <aside className="lg:col-span-3 space-y-6">
        <ProfileCard />
      </aside>

      <section className="lg:col-span-9 space-y-4">
        <StatsGrid />

        <div className="rounded-lg bg-[#000] border border-gray-700/60 p-4 space-y-4">
          <h2 className="text-base sm:text-lg font-semibold text-white">
            Topics Covered
          </h2>

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
