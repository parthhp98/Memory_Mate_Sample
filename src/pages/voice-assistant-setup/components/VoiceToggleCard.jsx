import React from "react";
import Icon from "../../../components/AppIcon";

const VoiceToggleCard = ({ isEnabled, onToggle, className = "" }) => {
  return (
    <div
      className={`bg-card border-2 border-border rounded-xl p-8 shadow-soft ${className}`}
    >
      <div className="text-center space-y-6">
        {/* Icon and Title */}
        <div className="space-y-4">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
              isEnabled ? "bg-success" : "bg-muted"
            }`}
          >
            <Icon
              name={isEnabled ? "Mic" : "MicOff"}
              size={40}
              color={isEnabled ? "white" : "var(--color-text-secondary)"}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-card-foreground mb-2">
              Voice Assistant
            </h2>
            <p className="text-lg text-text-secondary">
              {isEnabled
                ? "Voice assistance is currently enabled"
                : "Enable voice assistance for better accessibility"}
            </p>
          </div>
        </div>

        {/* Main Toggle Switch */}
        <div className="flex items-center justify-center space-x-6">
          <span
            className={`text-xl font-semibold transition-colors duration-200 ${
              !isEnabled ? "text-card-foreground" : "text-text-secondary"
            }`}
          >
            OFF
          </span>

          <Button
            onClick={onToggle}
            className={`relative w-24 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 ${
              isEnabled ? "bg-success" : "bg-muted"
            }`}
            aria-label={`Turn voice assistant ${isEnabled ? "off" : "on"}`}
          >
            <div
              className={`absolute top-1 w-10 h-10 bg-white rounded-full shadow-md transition-transform duration-300 ${
                isEnabled ? "translate-x-12" : "translate-x-1"
              }`}
            />
          </Button>

          <span
            className={`text-xl font-semibold transition-colors duration-200 ${
              isEnabled ? "text-card-foreground" : "text-text-secondary"
            }`}
          >
            ON
          </span>
        </div>

        {/* Status Message */}
        <div
          className={`p-4 rounded-lg border-2 ${
            isEnabled
              ? "bg-success/10 border-success/20 text-success"
              : "bg-muted border-border text-text-secondary"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name={isEnabled ? "CheckCircle" : "AlertCircle"} size={20} />
            <span className="text-lg font-medium">
              {isEnabled
                ? "Voice assistant is ready to help you"
                : "Voice assistant is currently disabled"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceToggleCard;
