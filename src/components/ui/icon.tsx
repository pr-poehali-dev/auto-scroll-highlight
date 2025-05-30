import { icons, LucideIcon } from "lucide-react";

interface IconProps {
  name: keyof typeof icons;
  fallback?: keyof typeof icons;
  size?: number;
  className?: string;
}

const Icon = ({
  name,
  fallback = "CircleAlert",
  size = 24,
  className = "",
}: IconProps) => {
  const IconComponent = icons[name] as LucideIcon;
  const FallbackComponent = icons[fallback] as LucideIcon;

  if (!IconComponent) {
    return <FallbackComponent size={size} className={className} />;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icon;
