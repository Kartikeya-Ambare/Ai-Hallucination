import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TrustScoreRingProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

const TrustScoreRing = ({ 
  score, 
  size = "md", 
  showLabel = true,
  animated = true 
}: TrustScoreRingProps) => {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, animated]);

  const getScoreColor = () => {
    if (displayScore >= 70) return "text-verified";
    if (displayScore >= 40) return "text-warning";
    return "text-danger";
  };

  const getGradient = () => {
    if (displayScore >= 70) return "from-verified to-verified/70";
    if (displayScore >= 40) return "from-warning to-warning/70";
    return "from-danger to-danger/70";
  };

  const getLabel = () => {
    if (displayScore >= 70) return "Safe";
    if (displayScore >= 40) return "Needs Review";
    return "High Risk";
  };

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-44 h-44",
  };

  const fontSizes = {
    sm: "text-xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  const labelSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const strokeWidth = size === "lg" ? 8 : size === "md" ? 6 : 4;
  const radius = size === "lg" ? 80 : size === "md" ? 56 : 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}>
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-border"
          />
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={displayScore >= 70 ? "hsl(142 76% 36%)" : displayScore >= 40 ? "hsl(38 92% 50%)" : "hsl(0 84% 60%)"} />
              <stop offset="100%" stopColor={displayScore >= 70 ? "hsl(142 76% 46%)" : displayScore >= 40 ? "hsl(38 92% 60%)" : "hsl(0 84% 70%)"} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", fontSizes[size], getScoreColor())}>
            {displayScore}
          </span>
          {size !== "sm" && (
            <span className="text-muted-foreground text-xs">/ 100</span>
          )}
        </div>
      </div>
      {showLabel && (
        <div className={cn(
          "px-3 py-1 rounded-full font-medium",
          labelSizes[size],
          displayScore >= 70 ? "bg-verified-muted text-verified" :
          displayScore >= 40 ? "bg-warning-muted text-warning" :
          "bg-danger-muted text-danger"
        )}>
          {getLabel()}
        </div>
      )}
    </div>
  );
};

export default TrustScoreRing;
