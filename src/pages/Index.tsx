import { useState, useEffect, useRef } from "react";
import SongDisplay from "@/components/SongDisplay";
import ControlPanel from "@/components/ControlPanel";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Демо-текст песни с аккордами
  const songText = `Intro:
Am F C G

Куплет 1:
Am                F
В темноте ночной дороги
C                 G
Светят фары впереди
Am                F
Мы с тобой идем к порогу
C                 G
Нового пути

Припев:
F                 C
И пусть весь мир против нас
G                 Am
Мы найдем свой звездный час
F                 C
В сердце музыка звучит
G                 Am
Наша песня говорит

Куплет 2:
Am                F
Струны гитары поют тихо
C                 G
О любви и о мечтах
Am                F
В каждом аккорде есть лихо
C                 G
И печаль в наших сердцах

Припев:
F                 C
И пусть весь мир против нас
G                 Am
Мы найдем свой звездный час
F                 C
В сердце музыка звучит
G                 Am
Наша песня говорит

Bridge:
Dm                G
Время летит как ветер
C                 Am
Не догнать его рукой
Dm                G
Но пока мы вместе
C                 Am
Мир наполнен красотой

Outro:
Am F C G (x2)`;

  const songLines = songText.split("\n").filter((line) => line.trim() !== "");

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(
        () => {
          setActiveLineIndex((prev) => {
            if (prev < songLines.length - 1) {
              return prev + 1;
            }
            return prev;
          });
        },
        (110 - speed) * 50,
      ); // Конвертируем скорость в миллисекунды
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, speed, songLines.length]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveLineIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-400 mb-2">
            🎸 Гитарный Помощник
          </h1>
          <p className="text-gray-400">
            Автоскролл с подсветкой активной строки
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <SongDisplay
              lines={songLines}
              activeLineIndex={activeLineIndex}
              scrollContainerRef={scrollContainerRef}
            />
          </div>

          <div className="lg:col-span-1">
            <ControlPanel
              isPlaying={isPlaying}
              speed={speed}
              onTogglePlay={handleTogglePlay}
              onSpeedChange={handleSpeedChange}
              onReset={handleReset}
              activeLineIndex={activeLineIndex}
              totalLines={songLines.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
