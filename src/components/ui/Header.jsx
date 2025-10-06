import React, { useState, useContext } from "react";
import Icon from "../AppIcon";
import Button from "./button";
import logo from "assets/images/logo.jpg"
import Image from "../AppImage";
const AssessmentContext = React.createContext();

const Header = ({
  currentStage = "registration",
  voiceEnabled = false,
  onVoiceToggle = () => {},
  onStageChange = () => {},
  className = "",
}) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const stages = [
    {
      id: "registration",
      label: "Registration",
      path: "/user-registration",
      step: 1,
    },
    {
      id: "voice-setup",
      label: "Voice Setup",
      path: "/voice-assistant-setup",
      step: 2,
    },
    {
      id: "memory-game",
      label: "Memory Game",
      path: "/memory-pattern-game",
      step: 3,
    },
    {
      id: "word-game",
      label: "Word Game",
      path: "/word-recognition-game",
      step: 4,
    },
    { id: "report", label: "Results", path: "/assessment-report", step: 5 },
  ];

  const currentStageIndex = stages?.findIndex(
    (stage) => stage?.id === currentStage
  );
  const progressPercentage =
    currentStageIndex >= 0
      ? ((currentStageIndex + 1) / stages?.length) * 100
      : 0;

  const handleVoiceToggle = () => {
    const newVoiceState = !voiceEnabled;
    setIsVoiceActive(newVoiceState);
    onVoiceToggle(newVoiceState);
  };

  const handleStageNavigation = (stageId) => {
    const stage = stages?.find((s) => s?.id === stageId);
    if (stage) {
      onStageChange(stage?.path, stageId);
    }
  };

  const moreMenuItems = [
    {
      label: "Settings",
      icon: "Settings",
      action: () => console.log("Settings"),
    },
    { label: "Help", icon: "HelpCircle", action: () => console.log("Help") },
    {
      label: "Support",
      icon: "MessageCircle",
      action: () => console.log("Support"),
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-soft ${className}`}
    >
      <div className="flex items-center justify-between h-28 px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-lg flex items-center justify-center">
         <Image src={logo} alt="logo" className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-text-primary">Memory Mate</h1>
              <span className="text-sm text-text-secondary">
                Cognitive Assessment
              </span>
            </div>
          </div>
        </div>

        {/* Progress Indicator - Desktop */}
        <div className="hidden lg:flex items-center space-x-8 flex-1 max-w-2xl mx-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">
                Assessment Progress
              </span>
              <span className="text-sm text-text-secondary">
                Step {currentStageIndex + 1} of {stages?.length}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {stages?.map((stage, index) => (
                <Button
                  key={stage?.id}
                  onClick={() => handleStageNavigation(stage?.id)}
                  className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                    index <= currentStageIndex
                      ? "text-primary font-medium"
                      : "text-text-secondary"
                  } hover:bg-muted text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  disabled={index > currentStageIndex + 1}
                >
                  {stage?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Assistant & Actions */}
        <div className="flex items-center space-x-4">
          {/* Voice Assistant Control */}
          <div className="flex items-center space-x-2">
            <Button
              variant={voiceEnabled ? "default" : "outline"}
              size="default"
              onClick={handleVoiceToggle}
              iconName={isVoiceActive ? "MicOff" : "Mic"}
              iconPosition="left"
              className="min-w-[120px]"
            >
              {voiceEnabled ? "Voice On" : "Voice Off"}
            </Button>

            {voiceEnabled && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-success font-medium">Active</span>
              </div>
            )}
          </div>

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="default"
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              iconName="MoreVertical"
              className="w-12 h-12"
            />

            {showMoreMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-soft z-50">
                <div className="py-2">
                  {moreMenuItems?.map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => {
                        item?.action();
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-popover-foreground hover:bg-muted flex items-center space-x-3 transition-colors duration-200"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Progress Indicator */}
      <div className="lg:hidden px-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Step {currentStageIndex + 1} of {stages?.length}
          </span>
          <span className="text-sm text-text-secondary">
            {stages?.[currentStageIndex]?.label}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Click outside handler for more menu */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMoreMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
