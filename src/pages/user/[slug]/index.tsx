import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useAuth } from "../../../context/AuthContext";
import StatsGrid from "../../../components/StatsGrid";
import { FiMapPin } from "react-icons/fi";
import { RiGraduationCapLine } from "react-icons/ri";

const topics = [
  { name: "Arrays", count: 93 },
  { name: "Hashing", count: 29 },
  { name: "Linked List", count: 25 },
  { name: "Graph", count: 22 },
  { name: "Binary Search", count: 20 },
  { name: "String", count: 20 },
  { name: "Maths", count: 18 },
  { name: "Sorting", count: 16 },
  { name: "Stack", count: 13 },
  { name: "Two Pointer", count: 12 },
  { name: "Greedy", count: 9 },
  { name: "Recursion", count: 8 },
  { name: "Bit Manipulation", count: 5 },
  { name: "Dynamic Programming", count: 5 },
  { name: "Queue", count: 2 },
  { name: "Heap", count: 1 },
  { name: "Binary Search Tree", count: 0 },
  { name: "Binary Tree", count: 0 },
  { name: "Python", count: 0 },
  { name: "Sliding Window", count: 0 },
];

function ProfileCard() {
  const { user } = useAuth();

  const profile = {
    college: user?.college,
    location: user?.location,
    github: user?.github,
    linkedin: user?.linkedin,
  };

  return (
    <div className="bg-[#0f1014] border border-gray-700/60 rounded-lg p-4 shadow-md">
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

      <div className="mt-4 space-y-2 text-white border-t border-gray-700/60 pt-4">
        <h5>Personal Information</h5>

        <p className="flex items-center gap-3 text-lg text-gray-400">
          <RiGraduationCapLine />
          <span>{profile.college || "--"}</span>
        </p>

        <p className="flex items-center gap-3 text-lg text-gray-400">
          <FiMapPin />
          <span>{profile.location || "--"}</span>
        </p>
      </div>

      <button className="mt-6 w-full py-2 rounded-md text-sm font-medium bg-green-600/20 text-green-300 border border-green-600/30 hover:bg-green-600/30 transition">
        Edit Profile
      </button>
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-12 gap-4">
        <aside className="col-span-3 space-y-6">
          <ProfileCard />
        </aside>

        <section className="col-span-9 space-y-4">
          <StatsGrid />

          <div className="rounded-lg bg-[#0f1014] border border-gray-700/60 p-4 space-y-4">
            <h2 className="text-lg font-semibold text-white">Topics Covered</h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <span
                  key={t.name}
                  className="px-3 py-1.5 rounded-md text-sm bg-gray-700/20 text-gray-300"
                >
                  {t.name} <span className="text-gray-400">× {t.count}</span>
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
