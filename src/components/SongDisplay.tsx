import { useEffect } from "react";

interface SongDisplayProps {
  lines: string[];
  activeLineIndex: number;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const SongDisplay = ({
  lines,
  activeLineIndex,
  scrollContainerRef,
}: SongDisplayProps) => {
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(
        `[data-line-index="${activeLineIndex}"]`,
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [activeLineIndex, scrollContainerRef]);

  const isChordLine = (line: string) => {
    // Простая проверка на аккорды - если строка содержит заглавные буквы и не содержит строчных русских букв
    return /^[A-G#b\s\d\/]+$/.test(line.trim()) && line.trim().length > 0;
  };

  const isSectionHeader = (line: string) => {
    const headers = [
      "куплет",
      "припев",
      "intro",
      "outro",
      "bridge",
      "verse",
      "chorus",
    ];
    return headers.some((header) => line.toLowerCase().includes(header));
  };

  return (
    <div
      ref={scrollContainerRef}
      className="rounded-lg p-6 h-[70vh] overflow-y-auto scroll-smooth bg-red-900"
    >
      <div className="space-y-1">
        {lines.map((line, index) => (
          <div
            key={index}
            data-line-index={index}
            className={`
              py-2 px-3 rounded transition-all duration-300 text-lg leading-relaxed
              ${
                index === activeLineIndex
                  ? "bg-purple-600/30 border-l-4 border-purple-400 shadow-lg transform scale-[1.02]"
                  : "hover:bg-gray-700/30"
              }
              ${isChordLine(line) ? "text-yellow-400 font-semibold" : ""}
              ${isSectionHeader(line) ? "text-purple-300 font-bold text-xl mt-4" : ""}
            `}
          >
            {line || "\u00A0"} {/* Non-breaking space для пустых строк */}
          </div>
        ))}
      </div>

      {/* Padding в конце для удобства скролла */}
      <div className="h-64"></div>
    </div>
  );
};

export default SongDisplay;
