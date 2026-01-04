import { FileText, AlertCircle, CheckCircle, Info, Lightbulb, ArrowLeft } from "lucide-react";
import TrustScoreRing from "./TrustScoreRing";
import ClaimCard, { Claim } from "./ClaimCard";
import { Button } from "./ui/button";

interface AnalysisResult {
  trustScore: number;
  riskLevel: "safe" | "review" | "high";
  totalClaims: number;
  verifiedClaims: number;
  warningClaims: number;
  dangerClaims: number;
  claims: Claim[];
  summary: string;
  recommendations: string[];
}

interface AnalysisDashboardProps {
  result: AnalysisResult;
  originalText: string;
  onReset: () => void;
}

const AnalysisDashboard = ({ result, originalText, onReset }: AnalysisDashboardProps) => {
  const getRiskBadge = () => {
    switch (result.riskLevel) {
      case "safe":
        return (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-verified-muted border border-verified/20">
            <CheckCircle className="w-5 h-5 text-verified" />
            <span className="font-semibold text-verified">Safe to Use</span>
          </div>
        );
      case "review":
        return (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-warning-muted border border-warning/20">
            <AlertCircle className="w-5 h-5 text-warning" />
            <span className="font-semibold text-warning">Needs Review</span>
          </div>
        );
      case "high":
        return (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-danger-muted border border-danger/20">
            <AlertCircle className="w-5 h-5 text-danger" />
            <span className="font-semibold text-danger">High Risk</span>
          </div>
        );
    }
  };

  // Highlight claims in the original text
  const getHighlightedText = () => {
    let highlightedText = originalText;
    const segments: { text: string; status?: "verified" | "warning" | "danger" }[] = [];
    
    // For demo, we'll just show the original text without inline highlighting
    // In a real app, you'd parse and highlight each claim
    return originalText;
  };

  return (
    <section className="container py-12">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={onReset}
        className="mb-8 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Analyze New Content
      </Button>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Panel - Original Text */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            <div className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
              <div className="px-6 py-4 border-b border-border/30 bg-secondary/30">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground">Original Content</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {getHighlightedText()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Analysis Results */}
        <div className="lg:col-span-3 space-y-6">
          {/* Trust Score Card */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-soft p-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <TrustScoreRing score={result.trustScore} size="lg" />
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-foreground mb-2">Trust Analysis Complete</h2>
                <p className="text-muted-foreground mb-4">{result.summary}</p>
                {getRiskBadge()}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-card rounded-xl border border-border/50 p-4 text-center shadow-soft">
              <div className="text-3xl font-bold text-verified mb-1">{result.verifiedClaims}</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4 text-center shadow-soft">
              <div className="text-3xl font-bold text-warning mb-1">{result.warningClaims}</div>
              <div className="text-sm text-muted-foreground">Need Review</div>
            </div>
            <div className="bg-card rounded-xl border border-border/50 p-4 text-center shadow-soft">
              <div className="text-3xl font-bold text-danger mb-1">{result.dangerClaims}</div>
              <div className="text-sm text-muted-foreground">Unreliable</div>
            </div>
          </div>

          {/* Claims Breakdown */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="px-6 py-4 border-b border-border/30 bg-secondary/30">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-muted-foreground" />
                <h2 className="font-semibold text-foreground">Claim Analysis</h2>
                <span className="text-sm text-muted-foreground ml-auto">
                  {result.totalClaims} claims detected
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {result.claims.map((claim, index) => (
                <ClaimCard key={claim.id} claim={claim} index={index} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="px-6 py-4 border-b border-border/30 bg-secondary/30">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                <h2 className="font-semibold text-foreground">Recommendations</h2>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisDashboard;
