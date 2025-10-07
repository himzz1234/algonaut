import { useState } from "react";
import { FiMail } from "react-icons/fi";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-xl bg-[#141414] border border-gray-700/60 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      <div className="p-6 space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-white text-xl md:text-3xl font-semibold">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed text-balance">
            and get notified when we release new algorithms and features.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="grid gap-3 mt-4">
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-[#0f1014] border border-gray-700/60 text-white placeholder-gray-400 
                         focus:outline-none focus:border-green-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg py-2.5 font-medium
              bg-green-600 hover:bg-green-500
                shadow-[0_0_0_0_rgba(16,185,129,0.0)]
                active:scale-[0.99]
                disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-400 text-sm text-center mt-2">
            You’re subscribed! Check your inbox for updates.
          </p>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm text-center mt-2">
            Something went wrong. Try again later.
          </p>
        )}

        <p className="text-center text-xs md:text-sm text-gray-500 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
