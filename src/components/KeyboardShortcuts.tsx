export default function KeyboardShortcuts() {
  const VISUALIZER_SHORTCUTS = [
    { keys: ["Space", "K"], label: "Toggle play / pause" },
    { keys: ["←"], label: "Previous step" },
    { keys: ["→"], label: "Next step" },
    { keys: ["Shift + ←"], label: "Jump to first step" },
    { keys: ["Shift + →"], label: "Jump to last step" },
    { keys: ["F"], label: "Toggle fullscreen" },
    { keys: [","], label: "Previous frame (while paused)" },
    { keys: ["."], label: "Next frame (while paused)" },
  ];

  return (
    <div className="rounded-2xl bg-black/70 border-2 border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      <div className="p-5 sm:p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Keyboard Shortcuts
        </h1>

        <div className="space-y-4">
          <ul className="space-y-2">
            {VISUALIZER_SHORTCUTS.map((s, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-base text-white border-b border-gray-700 pb-2 last:border-0"
              >
                <span className="font-mono text-green-500">
                  {s.keys.join(" / ")}
                </span>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
