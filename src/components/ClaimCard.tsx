import { CheckCircle2, AlertTriangle, XCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Claim {
  id: string;
  text: string;
  status: "verified" | "warning" | "danger";
  confidence: number;
  reason: string;
  source?: {
    name: string;
    url: string;
    credibility: "high" | "medium" | "low";
  };
  suggestion?: string;
}

interface ClaimCardProps {
  claim: Claim;
  index: number;
}

const ClaimCard = ({ claim, index }: ClaimCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = () => {
    switch (claim.status) {
      case "verified":
        return <CheckCircle2 className="w-5 h-5 text-verified" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "danger":
        return <XCircle className="w-5 h-5 text-danger" />;
    }
  };

  const getStatusLabel = () => {
    switch (claim.status) {
      case "verified":
        return "Verified";
      case "warning":
        return "Needs Review";
      case "danger":
        return "Unreliable";
    }
  };

  const getStatusStyles = () => {
    switch (claim.status) {
      case "verified":
        return "border-l-verified bg-verified-muted/30";
      case "warning":
        return "border-l-warning bg-warning-muted/30";
      case "danger":
        return "border-l-danger bg-danger-muted/30";
    }
  };

  const getCredibilityBadge = () => {
    if (!claim.source) return null;
    const styles = {
      high: "bg-verified-muted text-verified",
      medium: "bg-warning-muted text-warning",
      low: "bg-danger-muted text-danger",
    };
    return (
      <span className={cn("px-2 py-0.5 rounded text-xs font-medium", styles[claim.source.credibility])}>
        {claim.source.credibility.charAt(0).toUpperCase() + claim.source.credibility.slice(1)} credibility
      </span>
    );
  };

  return (
    <div 
      className={cn(
        "rounded-lg border border-border/50 overflow-hidden transition-all duration-300",
        "hover:shadow-soft",
        getStatusStyles()
      )}
      style={{ 
        animationDelay: `${index * 100}ms`,
        borderLeftWidth: '4px'
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-start gap-3 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="flex-shrink-0 mt-0.5">
          {getStatusIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded",
              claim.status === "verified" ? "bg-verified-muted text-verified" :
              claim.status === "warning" ? "bg-warning-muted text-warning" :
              "bg-danger-muted text-danger"
            )}>
              {getStatusLabel()}
            </span>
            <span className="text-xs text-muted-foreground">
              {claim.confidence}% confidence
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            "{claim.text}"
          </p>
        </div>
        <div className="flex-shrink-0">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-border/30 animate-fade-in-up">
          <div className="pl-8 space-y-3">
            {/* Reason */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Why this was flagged
              </h4>
              <p className="text-sm text-foreground">
                {claim.reason}
              </p>
            </div>

            {/* Source */}
            {claim.source && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Source
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <a 
                    href={claim.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline flex items-center gap-1"
                  >
                    {claim.source.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {getCredibilityBadge()}
                </div>
              </div>
            )}

            {/* Suggestion */}
            {claim.suggestion && (
              <div className="bg-secondary/50 rounded-md p-3 border border-border/30">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Recommendation
                </h4>
                <p className="text-sm text-foreground">
                  {claim.suggestion}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimCard;
