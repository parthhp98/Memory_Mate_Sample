import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MemoryPatternGame from "./pages/memory-pattern-game";
import WordRecognitionGame from "./pages/word-recognition-game";
import VoiceAssistantSetup from "./pages/voice-assistant-setup";
import UserRegistration from "./pages/user-registration";
import AssessmentReport from "./pages/assessment-report";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<UserRegistration />} />
          <Route path="/memory-pattern-game" element={<MemoryPatternGame />} />
          <Route
            path="/word-recognition-game"
            element={<WordRecognitionGame />}
          />
          <Route
            path="/voice-assistant-setup"
            element={<VoiceAssistantSetup />}
          />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/assessment-report" element={<AssessmentReport />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
    
  );
};

export default Routes;
