import type { IntroSection } from "../../data/modules";

export default function IntroSectionRenderer({
  section,
}: {
  section: IntroSection;
}) {
  return (
    <div>
      {section.title && (
        <h2 className="text-2xl font-medium mb-3 text-gray-100">
          {section.title}
        </h2>
      )}
      {section.blocks.map((block, idx) => {
        switch (block.type) {
          case "text":
            return (
              <p
                key={idx}
                className="text-gray-400 text-lg leading-relaxed mb-3"
              >
                {block.content}
              </p>
            );
          case "list":
            return (
              <ul
                key={idx}
                className="list-disc px-2 marker:text-green-500 list-inside space-y-1 text-gray-400 mb-3"
              >
                {block.items?.map((item, i) => (
                  <li key={i} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <div key={idx} className="flex justify-center my-4">
                <img
                  src={block.src}
                  alt={section.title ?? "image"}
                  className="rounded-lg max-h-[400px] object-contain"
                />
              </div>
            );
          case "code":
            return (
              <pre
                key={idx}
                className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-3"
              >
                <code>{block.content}</code>
              </pre>
            );
          case "quote":
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-emerald-500 pl-4 italic text-gray-400 p-2 w-fit bg-[#141414] mb-3"
              >
                {block.content}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
