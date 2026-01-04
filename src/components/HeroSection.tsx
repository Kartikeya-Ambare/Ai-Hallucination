import { useState } from "react";
import { ArrowRight, Sparkles, Shield, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface HeroSectionProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const HeroSection = ({ onAnalyze, isLoading }: HeroSectionProps) => {
  const [inputText, setInputText] = useState("");

  const sampleText = `According to a 2023 study published in the Journal of AI Research, large language models achieve 98.7% accuracy in factual reasoning tasks. Dr. Sarah Mitchell from Stanford University notes that "AI systems have surpassed human-level performance in knowledge retrieval." Furthermore, the World Health Organization reported that AI-assisted diagnostics reduced misdiagnosis rates by 45% in clinical trials conducted across 12 countries.`;

  const handleLoadSample = () => {
    setInputText(sampleText);
  };

  const handleClearText = () => {
    setInputText("");
  };

  const handleAnalyze = () => {
    if (inputText.trim()) {
      onAnalyze(inputText);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none" />
      
      <div className="container relative py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Trust Verification
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Trust AI output
            <br />
            <span className="text-primary">before you use it.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Detect hallucinations, verify citations, and understand the reliability 
            of AI-generated content with explainable trust scoring.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-verified-muted">
              <Shield className="w-4 h-4 text-verified" />
              <span className="text-sm font-medium text-verified">Claim Verification</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning-muted">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">Hallucination Detection</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
              <Sparkles className="w-4 h-4 text-foreground" />
              <span className="text-sm font-medium text-foreground">Trust Scoring</span>
            </div>
          </div>
        </div>

        {/* Input Card */}
        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="bg-card rounded-2xl shadow-elevated border border-border/50 overflow-hidden">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-foreground">
                  Paste AI-generated content
                </label>
                <button
                  onClick={handleLoadSample}
                  className="text-xs text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  Load sample text
                </button>
              </div>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste the AI-generated text you want to verify..."
                className="min-h-[180px] resize-none border-border/50 bg-secondary/30 focus:bg-background transition-colors text-base"
              />
            </div>
            
            <div className="px-6 py-4 bg-secondary/30 border-t border-border/30 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {inputText.length > 0 ? (
                  <span>{inputText.split(/\s+/).filter(w => w).length} words • {inputText.length} characters</span>
                ) : (
                  <span>Enter text to analyze</span>
                )}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={handleClearText}
                  disabled={!inputText.trim() || isLoading}
                >
                  Clear text
                </Button>
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || isLoading}
                  className="min-w-[160px]"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Verify Content
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;