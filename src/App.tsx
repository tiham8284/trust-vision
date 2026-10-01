import React, { useState } from 'react';
import { ViewTab, DemoScenarioId, AnalysisResult } from './types';
import { DEMO_SCENARIOS, analyzeCustomImage } from './services/trustVisionEngine';
import { saveAnalysisToHistory } from './services/historyStorage';

// Layout & Common
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Overview
import { HeroSection } from './components/overview/HeroSection';
import { WhyTrustVision } from './components/overview/WhyTrustVision';
import { ArchitectureDiagram } from './components/overview/ArchitectureDiagram';
import { UseCasesSection } from './components/overview/UseCasesSection';

// Live Analysis
import { ImageDropzone } from './components/live-analysis/ImageDropzone';
import { PipelineAnimation } from './components/live-analysis/PipelineAnimation';
import { AnalysisResultView } from './components/live-analysis/AnalysisResultView';

// Pipeline Monitor
import { PipelineFlow } from './components/pipeline-monitor/PipelineFlow';
import { SystemTelemetryCharts } from './components/pipeline-monitor/SystemTelemetryCharts';
import { LiveLogStream } from './components/pipeline-monitor/LiveLogStream';

// Threat Analysis
import { AdversarialLab } from './components/threat-analysis/AdversarialLab';

// Explainability
import { ScoringFormulaExplainer } from './components/explainability/ScoringFormulaExplainer';
import { DecisionPolicyMatrix } from './components/explainability/DecisionPolicyMatrix';

// History
import { HistoryTable } from './components/history/HistoryTable';

// Presentation & Modals
import { PresentationMode } from './components/presentation/PresentationMode';
import { SettingsModal } from './components/modals/SettingsModal';
import { AboutModal } from './components/modals/AboutModal';

export function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('overview');
  const [presentationModeOpen, setPresentationModeOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  // Live Analysis States
  const [selectedScenario, setSelectedScenario] = useState<DemoScenarioId | 'custom'>('normal');
  const [customImage, setCustomImage] = useState<{
    name: string;
    url: string;
    width: number;
    height: number;
    sizeKb: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);

  // Trigger analysis flow
  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentResult(null);
  };

  // Pipeline animation completed -> synthesize result & save to history
  const handlePipelineComplete = () => {
    setIsAnalyzing(false);

    let result: AnalysisResult;

    if (selectedScenario === 'custom' && customImage) {
      result = analyzeCustomImage(
        customImage.name,
        customImage.url,
        customImage.width,
        customImage.height,
        customImage.sizeKb
      );
    } else {
      const scenario = DEMO_SCENARIOS[selectedScenario as DemoScenarioId] || DEMO_SCENARIOS.normal;
      result = {
        id: `TV-${1049 + Math.floor(Math.random() * 50)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        imageName: `${scenario.title}.svg`,
        imageUrl: scenario.imageUrl,
        scenarioId: scenario.id,
        metrics: scenario.metrics,
        detections: scenario.detections,
        riskFactors: scenario.riskFactors,
        keyFindings: scenario.keyFindings,
        recommendation: scenario.recommendation,
        processingTimeMs: 138 + Math.floor(Math.random() * 25)
      };
    }

    saveAnalysisToHistory(result);
    setCurrentResult(result);
  };

  const handleSelectScenario = (id: DemoScenarioId) => {
    setSelectedScenario(id);
    setCustomImage(null);
    setCurrentResult(null);
  };

  const handleCustomImageUpload = (img: {
    name: string;
    url: string;
    width: number;
    height: number;
    sizeKb: number;
  }) => {
    setSelectedScenario('custom');
    setCustomImage(img);
    setCurrentResult(null);
  };

  const handleResetAnalysis = () => {
    setCurrentResult(null);
    setIsAnalyzing(false);
  };

  const handleLoadScenarioFromHistory = (scenarioId: DemoScenarioId) => {
    setSelectedScenario(scenarioId);
    setCustomImage(null);
    setCurrentResult(null);
    setCurrentTab('analysis');
    // Start live analysis
    setTimeout(() => {
      setIsAnalyzing(true);
    }, 100);
  };

  const currentImageName = selectedScenario === 'custom' && customImage
    ? customImage.name
    : `${DEMO_SCENARIOS[selectedScenario as DemoScenarioId]?.title}.svg`;

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col justify-between relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPresentation={() => setPresentationModeOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        
        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div className="space-y-12 animate-fadeIn">
            <HeroSection
              onStartAnalysis={() => {
                setCurrentTab('analysis');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewPipeline={() => {
                setCurrentTab('pipeline');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <WhyTrustVision />

            <ArchitectureDiagram />

            <UseCasesSection />
          </div>
        )}

        {/* TAB 2: LIVE ANALYSIS (THE FLAGSHIP DEMO) */}
        {currentTab === 'analysis' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  LIVE VISION INTEGRITY PIPELINE
                </div>
                <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">
                  Live Vision Analysis
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  "Upload an image and run it through the TrustVision integrity pipeline."
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                  DEMO ENGINE: 100% OFFLINE READY
                </span>
              </div>
            </div>

            {/* Dropzone & Preview (Visible when not showing result) */}
            {!currentResult && !isAnalyzing && (
              <ImageDropzone
                selectedScenario={selectedScenario}
                customImage={customImage}
                onSelectScenario={handleSelectScenario}
                onCustomImageUpload={handleCustomImageUpload}
                onStartAnalysis={handleStartAnalysis}
                isAnalyzing={isAnalyzing}
              />
            )}

            {/* Animated Sequential Pipeline (Runs for 3-5 seconds) */}
            {isAnalyzing && (
              <PipelineAnimation
                targetImageName={currentImageName}
                onComplete={handlePipelineComplete}
              />
            )}

            {/* Full Analysis Result Screen */}
            {currentResult && !isAnalyzing && (
              <AnalysisResultView
                result={currentResult}
                onReset={handleResetAnalysis}
                onNavigateTab={(tab) => {
                  setCurrentTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

          </div>
        )}

        {/* TAB 3: PIPELINE MONITOR */}
        {currentTab === 'pipeline' && (
          <div className="space-y-10 animate-fadeIn">
            <PipelineFlow />
            <SystemTelemetryCharts />
            <LiveLogStream />
          </div>
        )}

        {/* TAB 4: THREAT ANALYSIS (ADVERSARIAL LAB) */}
        {currentTab === 'threats' && (
          <AdversarialLab />
        )}

        {/* TAB 5: EXPLAINABILITY */}
        {currentTab === 'explainability' && (
          <div className="space-y-10 animate-fadeIn">
            <ScoringFormulaExplainer />
            <DecisionPolicyMatrix />
          </div>
        )}

        {/* TAB 6: HISTORY */}
        {currentTab === 'history' && (
          <HistoryTable onLoadScenario={handleLoadScenarioFromHistory} />
        )}

      </main>

      {/* Footer */}
      <Footer
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAbout={() => setAboutModalOpen(true)}
      />

      {/* Presentation Mode (Fullscreen Overlay) */}
      {presentationModeOpen && (
        <PresentationMode onExit={() => setPresentationModeOpen(false)} />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />

      {/* About & Team BOOM BOOM Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />

    </div>
  );
}

export default App;
