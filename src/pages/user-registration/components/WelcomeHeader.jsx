import React from "react";
import Icon from "../../../components/AppIcon";

const WelcomeHeader = ({ className = "" }) => {
  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Logo and Brand */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-soft">
          <Icon name="Brain" size={32} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-4xl font-bold text-text-primary">CogniCare</h1>
          <p className="text-lg text-text-secondary">
            Cognitive Assessment Platform
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-text-primary">
          Welcome to Your Cognitive Health Journey
        </h2>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Create your secure account to begin a comprehensive cognitive
          assessment designed specifically for seniors. Our AI-powered platform
          provides personalized insights to support your cognitive health.
        </p>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="flex flex-col items-center space-y-3 p-4">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={24} className="text-success" />
          </div>
          <h3 className="font-semibold text-lg text-text-primary">
            15-20 Minutes
          </h3>
          <p className="text-sm text-text-secondary text-center">
            Complete assessment at your own pace
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Gamepad2" size={24} className="text-primary" />
          </div>
          <h3 className="font-semibold text-lg text-text-primary">
            Fun & Interactive
          </h3>
          <p className="text-sm text-text-secondary text-center">
            Engaging games make testing enjoyable
          </p>
        </div>

        <div className="flex flex-col items-center space-y-3 p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-accent" />
          </div>
          <h3 className="font-semibold text-lg text-text-primary">
            Detailed Report
          </h3>
          <p className="text-sm text-text-secondary text-center">
            Comprehensive analysis with recommendations
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-muted rounded-lg p-6 mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-primary">
            Assessment Progress
          </span>
          <span className="text-sm text-text-secondary">Step 1 of 5</span>
        </div>
        <div className="w-full bg-background rounded-full h-3">
          <div className="bg-primary h-3 rounded-full w-1/5 transition-all duration-300" />
        </div>
        <div className="flex justify-between mt-2 text-xs text-text-secondary">
          <span className="font-medium text-primary">Registration</span>
          <span>Voice Setup</span>
          <span>Memory Game</span>
          <span>Word Game</span>
          <span>Results</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
