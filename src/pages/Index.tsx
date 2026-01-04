import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnalysisDashboard from "@/components/AnalysisDashboard";
import { Claim } from "@/components/ClaimCard";

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

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [originalText, setOriginalText] = useState("");

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setOriginalText(text);

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock analysis result - in production, this would call the backend
    const mockResult: AnalysisResult = {
      trustScore: 47,
      riskLevel: "review",
      totalClaims: 4,
      verifiedClaims: 1,
      warningClaims: 2,
      dangerClaims: 1,
      summary:
        "This content contains several claims that require verification. While some sources appear credible, others could not be verified or contain potentially fabricated information.",
      recommendations: [
        "Verify the existence of the 'Journal of AI Research' study mentioned and check if the 98.7% accuracy figure is accurate.",
        "Confirm Dr. Sarah Mitchell's affiliation and quote through Stanford University's directory or published works.",
        "Cross-reference the WHO clinical trial data with official WHO publications or databases.",
        "Consider adding direct links to primary sources for all statistical claims.",
      ],
      claims: [
        {
          id: "1",
          text: "According to a 2023 study published in the Journal of AI Research, large language models achieve 98.7% accuracy in factual reasoning tasks.",
          status: "danger",
          confidence: 89,
          reason:
            "No study matching this description was found in the Journal of AI Research archives. The 98.7% accuracy figure appears to be fabricated, as current state-of-the-art models typically achieve 60-75% on factual reasoning benchmarks.",
          source: {
            name: "Journal of AI Research (Claimed)",
            url: "https://www.jair.org",
            credibility: "low",
          },
          suggestion:
            "Remove this claim or replace with verified statistics from peer-reviewed sources like the JAIR archive or ArXiv.",
        },
        {
          id: "2",
          text: "Dr. Sarah Mitchell from Stanford University notes that 'AI systems have surpassed human-level performance in knowledge retrieval.'",
          status: "warning",
          confidence: 65,
          reason:
            "No researcher named 'Dr. Sarah Mitchell' could be found in Stanford's AI or CS faculty directory. This quote may be attributed to a non-existent person.",
          source: {
            name: "Stanford University Directory",
            url: "https://profiles.stanford.edu",
            credibility: "medium",
          },
          suggestion:
            "Verify the researcher's identity through Stanford's official faculty pages or academic publications.",
        },
        {
          id: "3",
          text: "The World Health Organization reported that AI-assisted diagnostics reduced misdiagnosis rates by 45%.",
          status: "warning",
          confidence: 72,
          reason:
            "While WHO has published reports on AI in healthcare, the specific 45% figure could not be verified in official WHO publications. Similar studies exist but with varying results.",
          source: {
            name: "WHO Digital Health Reports",
            url: "https://www.who.int/health-topics/digital-health",
            credibility: "medium",
          },
          suggestion:
            "Link directly to the specific WHO report or use a range of figures from verified meta-analyses.",
        },
        {
          id: "4",
          text: "Clinical trials conducted across 12 countries.",
          status: "verified",
          confidence: 78,
          reason:
            "Multiple multi-country clinical trials on AI diagnostics have been documented in medical literature, making this claim plausible though the exact trial should be specified.",
          source: {
            name: "PubMed Clinical Trials Database",
            url: "https://pubmed.ncbi.nlm.nih.gov",
            credibility: "high",
          },
        },
      ],
    };

    setAnalysisResult(mockResult);
    setIsLoading(false);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setOriginalText("");
  };

  return (
    <>
      <Header />

      {!analysisResult ? (
        <HeroSection onAnalyze={handleAnalyze} isLoading={isLoading} />
      ) : (
        <AnalysisDashboard
          result={analysisResult}
          originalText={originalText}
          onReset={handleReset}
        />
      )}
    </>
  );
};

export default Index;
