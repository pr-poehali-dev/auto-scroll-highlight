import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
  activeLineIndex: number;
  totalLines: number;
}

const ControlPanel = ({
  isPlaying,
  speed,
  onTogglePlay,
  onSpeedChange,
  onReset,
  activeLineIndex,
  totalLines,
}: ControlPanelProps) => {
  const progress =
    totalLines > 0 ? ((activeLineIndex + 1) / totalLines) * 100 : 0;

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Icon name="Settings" size={20} />
            Управление
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Кнопки управления */}
          <div className="flex gap-2">
            <Button
              onClick={onTogglePlay}
              className={`flex-1 ${isPlaying ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
              {isPlaying ? "Пауза" : "Старт"}
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="border-gray-600"
            >
              <Icon name="RotateCcw" size={16} />
            </Button>
          </div>

          {/* Контроль скорости */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Скорость: {speed}%</label>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSpeedChange(Math.max(10, speed - 10))}
                className="border-gray-600"
              >
                <Icon name="Minus" size={14} />
              </Button>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-200"
                  style={{ width: `${speed}%` }}
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSpeedChange(Math.min(100, speed + 10))}
                className="border-gray-600"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
          </div>

          {/* Прогресс */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Прогресс</span>
              <span>
                {activeLineIndex + 1} / {totalLines}
              </span>
            </div>
            <div className="bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Индикатор статуса */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
            />
            <span className="text-sm text-gray-400">
              {isPlaying ? "Воспроизводится" : "Остановлено"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlPanel;
