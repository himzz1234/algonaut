import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { FiEdit2 } from "react-icons/fi";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { Helmet } from "react-helmet";

export default function EditProfilePage() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    location: "",
    profilePic: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      name: user?.displayName || "",
      email: user?.email || "",
      college: user?.college || "",
      location: user?.location || "",
      profilePic: user?.photoURL || "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFormData({
        ...formData,
        profilePic: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      let photoURL = formData.profilePic;

      if (file) {
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 125,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const storage = getStorage();
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, compressedFile);
        photoURL = await getDownloadURL(storageRef);
      }

      const auth = getAuth();
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        await updateProfile(firebaseUser, {
          displayName: formData.name,
          photoURL,
        });
      }

      await setDoc(
        doc(db, "users", user.uid),
        {
          college: formData.college,
          location: formData.location,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      setUser({
        ...user,
        displayName: formData.name,
        photoURL,
        college: formData.college,
        location: formData.location,
      });
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Helmet>
        <title>Edit Profile - Algonaut</title>
        <meta name="description" content="Edit your Algonaut profile" />
        <meta property="og:title" content="Edit Profile - Algonaut" />
        <meta property="og:description" content="Edit your Algonaut profile" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#000] border border-gray-700/60 rounded-lg p-6 sm:p-10"
      >
        <div className="flex flex-col items-center justify-start">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden group relative">
            <img
              src={formData.profilePic || "/images/default.jpg"}
              alt="profile"
              className="w-full h-full object-cover"
            />

            <label
              htmlFor="profile"
              className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
            >
              <FiEdit2 className="text-white text-xl" />
            </label>
          </div>
          <input
            id="profile"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="mt-2.5 text-center space-y-1">
            <p className="block text-sm text-gray-400">Profile Photo</p>
            <p className="text-xs text-gray-500">PNG, JPG (Max 1MB)</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <label className="block text-sm mb-2 text-gray-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-[#0f1014] border border-gray-700/60 text-white px-3 py-2.5 focus:outline-none focus:border-green-400 transition"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-2 text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full rounded-lg bg-[#0f1014] border border-gray-700/60 text-gray-400 px-3 py-2.5 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Enter your college"
              className="w-full rounded-lg bg-[#0f1014] border border-gray-700/60 text-white px-3 py-2.5 focus:outline-none focus:border-green-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-400">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full rounded-lg bg-[#0f1014] border border-gray-700/60 text-white px-3 py-2.5 focus:outline-none focus:border-green-400 transition"
            />
          </div>
        </div>
      </form>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full sm:w-auto px-4 py-2 rounded-md hover:bg-[#141414] border border-gray-700/60"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-2 rounded-md font-medium text-white transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
