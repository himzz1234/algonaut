import { useRef, useState } from "react";
import { motion } from "motion/react";

function BillingToggle({
  value = "monthly",
  onChange,
}: {
  value?: "monthly" | "yearly";
  onChange: (value: "monthly" | "yearly") => void;
}) {
  const isMonthly = value === "monthly";
  const ref = useRef<HTMLDivElement | null>(null);

  function toggle() {
    onChange(isMonthly ? "yearly" : "monthly");
  }

  function handleKey(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowLeft") {
      onChange("monthly");
    } else if (e.key === "ArrowRight") {
      onChange("yearly");
    }
  }

  return (
    <div
      ref={ref}
      role="switch"
      aria-checked={!isMonthly}
      tabIndex={0}
      onKeyDown={handleKey}
      onClick={toggle}
      className="inline-flex items-center justify-center focus:outline-none"
    >
      <div
        className="
          relative rounded-full border border-gray-700/60
          w-14 h-6 
          sm:w-16 sm:h-7
          md:w-20 md:h-8
          lg:w-24 lg:h-9
        "
        style={{
          background:
            "linear-gradient(180deg, rgba(6,10,12,0.9), rgba(10,14,16,0.95))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
        aria-hidden
      >
        <motion.div
          initial={false}
          animate={{
            left: isMonthly ? "0.2rem" : "53%",
            width: "calc(50% - 0.4rem)",
          }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            height: "calc(100% - 0.4rem)",
            background: isMonthly
              ? "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12))"
              : "linear-gradient(180deg,#00c77b,#00c77b)",
            boxShadow: isMonthly
              ? "inset 0 1px 0 rgba(255,255,255,0.02)"
              : "0 6px 18px rgba(16,185,129,0.15)",
            border: isMonthly
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid rgba(16,185,129,0.12)",
          }}
        />
      </div>
    </div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const tiers = [
    {
      id: "free",
      name: "Starter",
      subtitle: "Try core features and learn the basics at your own pace.",
      priceMonthly: 0,
      priceYearly: 0,
      cta: "Get started",
      features: [
        "Interactive visualizations",
        "10+ algorithms (fundamentals)",
        "Step-by-step playback",
        "Community support",
      ],
      subtle: true,
    },
    {
      id: "pro",
      name: "Pro",
      subtitle:
        "Faster paths to mastery with advanced content and priority support.",
      priceMonthly: 999,
      priceYearly: 7999,
      cta: "Start Pro",
      features: [
        "All Starter features",
        "100+ advanced algorithms",
        "Export visualizations as MP4/GIF",
        "AI-powered explanations",
        "+ many more exclusive features",
      ],
      recommended: true,
    },
  ];

  const formatPrice = (p: number) =>
    p === 0 ? "Free" : `$${(p / 100).toFixed(2)}`;

  const monthly = tiers.find((t) => t.id === "pro")?.priceMonthly ?? 0;
  const yearly = tiers.find((t) => t.id === "pro")?.priceYearly ?? 0;
  const yearlyEquivalent = (monthly * 12) / 100;
  const yearlyActual = yearly / 100;
  const savingsPercent = Math.round(
    ((yearlyEquivalent - yearlyActual) / yearlyEquivalent) * 100
  );

  return (
    <section className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight 
                     bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 
                     bg-clip-text text-transparent leading-snug"
        >
          Pricing built for{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            learners
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl text-gray-400">
          Flexible plans for individuals and teams.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setBilling("monthly")}
            className={`uppercase text-xs sm:text-sm px-3 py-1 rounded-full transition ${
              billing === "monthly" ? "text-white" : "text-gray-500"
            }`}
          >
            Monthly
          </button>

          <BillingToggle value={billing} onChange={setBilling} />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setBilling("yearly")}
              className={`uppercase text-xs sm:text-sm px-3 py-1 rounded-full transition ${
                billing === "yearly" ? "text-white" : "text-gray-500"
              }`}
            >
              Yearly
            </button>
            {savingsPercent > 0 && (
              <span className="px-3 py-1 text-xs sm:text-sm rounded-full bg-green-600/20 text-green-400">
                Save {savingsPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {tiers.map((tier) => {
            const price =
              billing === "monthly" ? tier.priceMonthly : tier.priceYearly;
            return (
              <article
                key={tier.id}
                className={`relative flex flex-col items-start rounded-xl bg-[#0f1014] 
                            border border-gray-700/60 p-6 sm:p-8 shadow-xl backdrop-blur-md
                            ${
                              tier.recommended ? "border border-green-500" : ""
                            }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 right-4 transform rotate-2">
                    <span className="inline-flex items-center gap-2 bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-[0_8px_30px_rgba(16,185,129,0.12)]">
                      Recommended
                    </span>
                  </div>
                )}

                <header className="pb-4">
                  <h3 className="text-xs sm:text-sm font-medium text-white border border-gray-700/60 rounded-full px-4 py-1.5">
                    {tier.name}
                  </h3>
                </header>

                <div className="flex-1 w-full">
                  <div className="flex flex-col items-start text-left mt-3 sm:mt-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
                        {formatPrice(price)}
                      </span>
                      {tier.id !== "free" && (
                        <span className="text-slate-400 text-sm sm:text-base">
                          per {billing === "monthly" ? "month" : "year"}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base">
                      {tier.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3 mt-4 sm:mt-6 text-white text-sm sm:text-base">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800/40">
                          <svg
                            className="h-3 w-3 text-green-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="mt-6 w-full">
                  <button
                    className={`w-full py-3 rounded-lg font-medium text-sm sm:text-base transition-transform duration-150 ${
                      tier.recommended
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_10px_30px_rgba(16,185,129,0.12)] hover:translate-y-[-2px]"
                        : "bg-gray-800/30 text-slate-100 border border-gray-700/50 hover:brightness-105"
                    }`}
                    aria-label={`${tier.cta} ${tier.name}`}
                  >
                    {tier.cta}
                  </button>

                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500">
                    Cancel anytime. Secure payments. Educational discounts
                    available for teams.
                  </p>
                </footer>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-xs sm:text-sm md:text-base text-slate-500">
          Prices in USD. Taxes may apply. All plans include updates and
          improvements.
        </p>
      </div>
    </section>
  );
}
