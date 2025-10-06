import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import ChatbotSidebar from "../../components/ui/ChatbotSidebar";
import TrustSignalFooter from "../../components/ui/TrustSignalFooter";
import ReportHeader from "./components/ReportHeader";
import GamePerformanceChart from "./components/GamePerformanceChart";
import RiskAssessmentPanel from "./components/RiskAssessmentPanel";
import RecommendationsPanel from "./components/RecommendationsPanel";
import ShareReportModal from "./components/ShareReportModal";
import Icon from "../../components/AppIcon";
import Button from "components/ui/button";

const AssessmentReport = () => {
  const navigate = useNavigate();
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVoiceNarrating, setIsVoiceNarrating] = useState(false);
  const [currentSection, setCurrentSection] = useState("overview");
  const [userData, setUserData] = useState(null);

  // Function to get user data from localStorage
  const getUserData = () => {
    try {
      const storedUser = localStorage.getItem("Memory Mate_user");
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  };

  // Function to calculate age from age range
  const calculateAgeFromRange = (ageRange) => {
    if (!ageRange) return 70;
    const ranges = {
      "65-70": 68,
      "71-75": 73,
      "76-80": 78,
      "81-85": 83,
      "86+": 88,
    };
    return ranges?.[ageRange] || 70;
  };

  // Generate report ID based on user data and current date
  const generateReportId = (userData) => {
    const date = new Date();
    const dateString = date?.toISOString()?.split("T")?.[0];
    const userInitials =
      userData?.preferredName?.slice(0, 2)?.toUpperCase() || "CR";
    return `${userInitials}-${dateString}-${String(
      userData?.id || Date.now()
    )?.slice(-3)}`;
  };

  // Create patient data from registration data
  const createPatientData = (registrationData) => {
    if (!registrationData) {
      return {
        name: "User",
        age: 70,
        gender: "Not specified",
        assessmentDate: new Date()?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        reportId: `CR-${new Date()?.toISOString()?.split("T")?.[0]}-001`,
        overallRisk: "Low-Moderate",
        cognitiveScore: 78,
        ageGroup: "70-75",
      };
    }

    const age = calculateAgeFromRange(registrationData?.ageRange);
    const gender =
      registrationData?.gender === "male"
        ? "Male"
        : registrationData?.gender === "female"
        ? "Female"
        : registrationData?.gender === "other"
        ? "Other"
        : "Not specified";

    return {
      name: registrationData?.preferredName || "User",
      age: age,
      gender: gender,
      assessmentDate: new Date()?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      reportId: generateReportId(registrationData),
      overallRisk: "Low-Moderate",
      cognitiveScore: 78,
      ageGroup: registrationData?.ageRange || "70-75",
    };
  };

  // Get actual patient data
  const patientData = createPatientData(userData);

  // Mock assessment results
  const assessmentResults = {
    memoryGame: {
      overallScore: 75,
      averageResponseTime: 3.2,
      totalErrors: 8,
      completionRate: 100,
      levelsPassed: 5,
    },
    wordGame: {
      overallScore: 82,
      averageResponseTime: 2.1,
      totalErrors: 6,
      completionRate: 100,
      levelsPassed: 4,
    },
    cognitiveMetrics: {
      memoryPerformance: 75,
      wordRecognition: 82,
      responseTime: 68,
      consistency: 85,
    },
  };

  useEffect(() => {
    // Load user data from localStorage
    const user = getUserData();
    setUserData(user);

    // Check for voice preference in localStorage
    const savedVoicePreference = localStorage.getItem("voiceEnabled");
    if (savedVoicePreference) {
      setIsVoiceEnabled(JSON.parse(savedVoicePreference));
    }

    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleVoiceToggle = (enabled) => {
    setIsVoiceEnabled(enabled);
    localStorage.setItem("voiceEnabled", JSON.stringify(enabled));

    if (enabled) {
      speakText(
        "Voice assistance is now enabled. I can read the assessment report aloud for you."
      );
    }
  };

  const handleVoiceNarration = () => {
    if (isVoiceNarrating) {
      // Stop narration
      if ("speechSynthesis" in window) {
        window.speechSynthesis?.cancel();
      }
      setIsVoiceNarrating(false);
    } else {
      // Start narration
      setIsVoiceNarrating(true);
      const reportText = generateReportNarration();
      speakText(reportText, () => setIsVoiceNarrating(false));
    }
  };

  const speakText = (text, onEnd = null) => {
    if ("speechSynthesis" in window && isVoiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      if (onEnd) {
        utterance.onend = onEnd;
      }

      window.speechSynthesis?.speak(utterance);
    }
  };

  const generateReportNarration = () => {
    return `Cognitive Assessment Report for ${patientData?.name}. 
    Assessment completed on ${patientData?.assessmentDate}. 
    Overall risk level is ${patientData?.overallRisk}. 
    Your cognitive score is ${patientData?.cognitiveScore} out of 100, which is good performance for your age group. 
    Memory game performance shows 75% accuracy with an average response time of 3.2 seconds. 
    Word recognition game shows 82% accuracy with faster response times. 
    Based on these results, we recommend scheduling a follow-up with your primary care physician within 2 to 4 weeks to discuss these findings. 
    Continue with regular physical exercise, maintain social engagement, and consider cognitive training activities. 
    This assessment indicates cognitive performance within normal range for adults aged ${patientData?.ageGroup}.`;
  };

  const handleExportPDF = () => {
    // Simulate PDF export
    if (isVoiceEnabled) {
      speakText(
        "Preparing your assessment report for download. The PDF will include all charts and recommendations."
      );
    }

    // In a real implementation, this would generate and download a PDF
    setTimeout(() => {
      alert(
        "PDF export functionality would be implemented here. Report saved to Downloads folder."
      );
    }, 1000);
  };

  const handleShareReport = () => {
    setIsShareModalOpen(true);
    if (isVoiceEnabled) {
      speakText(
        "Opening share options. You can send your report to healthcare providers or family members."
      );
    }
  };

  const handleScheduleAppointment = () => {
    if (isVoiceEnabled) {
      speakText(
        "Redirecting to appointment scheduling. You can book a follow-up with your healthcare provider."
      );
    }
    // In a real implementation, this would integrate with scheduling systems
    alert(
      "Appointment scheduling would integrate with healthcare provider systems."
    );
  };

  const handleDownloadResources = () => {
    if (isVoiceEnabled) {
      speakText(
        "Downloading educational resources about cognitive health and brain wellness."
      );
    }
    alert("Educational resource pack download would be implemented here.");
  };

  const handleNavigateToGame = (gameType) => {
    if (gameType === "memory") {
      navigate("/memory-pattern-game");
    } else if (gameType === "word") {
      navigate("/word-recognition-game");
    }
  };

  const handleReturnToDashboard = () => {
    navigate("/user-registration");
    if (isVoiceEnabled) {
      speakText("Returning to the main dashboard.");
    }
  };

  const sectionNavigation = [
    { id: "overview", label: "Overview", icon: "FileText" },
    { id: "memory-performance", label: "Memory Game", icon: "Grid3X3" },
    { id: "word-performance", label: "Word Game", icon: "Type" },
    { id: "risk-assessment", label: "Risk Analysis", icon: "Activity" },
    { id: "recommendations", label: "Recommendations", icon: "Clipboard" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        currentStage="report"
        voiceEnabled={isVoiceEnabled}
        onVoiceToggle={handleVoiceToggle}
        onStageChange={(path) => navigate(path)}
      />
      {/* Main Content */}
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Quick Navigation */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg">
              {sectionNavigation?.map((section) => (
                <Button
                  key={section?.id}
                  onClick={() => setCurrentSection(section?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentSection === section?.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground hover:bg-card/80"
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span className="text-sm font-medium">{section?.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Report Header */}
          <ReportHeader
            patientName={patientData?.name}
            assessmentDate={patientData?.assessmentDate}
            overallRiskLevel={patientData?.overallRisk}
            onExportPDF={handleExportPDF}
            onShareReport={handleShareReport}
            onVoiceNarration={handleVoiceNarration}
            isVoiceEnabled={isVoiceNarrating}
          />

          {/* Performance Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <GamePerformanceChart gameType="memory" />
            <GamePerformanceChart gameType="word" />
          </div>

          {/* Risk Assessment */}
          <RiskAssessmentPanel
            overallRisk={patientData?.overallRisk}
            cognitiveScore={patientData?.cognitiveScore}
            ageGroup={patientData?.ageGroup}
          />

          {/* Recommendations */}
          <RecommendationsPanel
            riskLevel={patientData?.overallRisk}
            onScheduleAppointment={handleScheduleAppointment}
            onDownloadResources={handleDownloadResources}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={handleReturnToDashboard}
              iconName="ArrowLeft"
              iconPosition="left"
              className="min-w-[200px]"
            >
              Return to Dashboard
            </Button>

            <Button
              variant="default"
              size="lg"
              onClick={() => handleNavigateToGame("memory")}
              iconName="RotateCcw"
              iconPosition="left"
              className="min-w-[200px]"
            >
              Retake Assessment
            </Button>
          </div>

          {/* Print-Friendly Summary */}
          <div className="print:block hidden">
            <div className="p-8 bg-card border border-border rounded-lg">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">
                Assessment Summary
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Patient:</strong> {patientData?.name}
                </div>
                <div>
                  <strong>Date:</strong> {patientData?.assessmentDate}
                </div>
                <div>
                  <strong>Overall Risk:</strong> {patientData?.overallRisk}
                </div>
                <div>
                  <strong>Cognitive Score:</strong>{" "}
                  {patientData?.cognitiveScore}/100
                </div>
              </div>
              <div className="mt-4">
                <strong>Key Recommendations:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    Schedule follow-up with primary care physician within 2-4
                    weeks
                  </li>
                  <li>
                    Continue regular physical exercise and social engagement
                  </li>
                  <li>Consider cognitive training activities</li>
                  <li>Maintain healthy lifestyle habits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Share Report Modal */}
      <ShareReportModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        patientName={patientData?.name}
        reportId={patientData?.reportId}
      />
      {/* Chatbot Sidebar */}
      <ChatbotSidebar
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
        currentStage="report"
      />
      {/* Footer */}
      <TrustSignalFooter />
    </div>
  );
};

export default AssessmentReport;
