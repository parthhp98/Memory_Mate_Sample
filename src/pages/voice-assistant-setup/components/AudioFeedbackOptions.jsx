import React from "react";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";

const AudioFeedbackOptions = ({
  options,
  onOptionChange,
  disabled = false,
  className = "",
}) => {
  const feedbackOptions = [
    {
      id: "welcome",
      label: "Welcome Messages",
      description: "Hear spoken greetings and introductions",
      icon: "MessageSquare",
    },
    {
      id: "gameRules",
      label: "Game Instructions",
      description: "Listen to game rules and explanations",
      icon: "BookOpen",
    },
    {
      id: "completion",
      label: "Completion Notifications",
      description: "Get audio feedback when tasks are finished",
      icon: "CheckCircle",
    },
    {
      id: "encouragement",
      label: "Encouragement Messages",
      description: "Receive positive reinforcement during games",
      icon: "Heart",
    },
  ];

  return (
    <div className={`bg-card border border-border rounded-xl p-6 ${className}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-card-foreground">
            Audio Feedback Options
          </h3>
          <p className="text-lg text-text-secondary">
            Choose which types of messages you'd like to hear
          </p>
        </div>

        {/* Options Grid */}
        <div className="space-y-4">
          {feedbackOptions?.map((option) => (
            <div
              key={option?.id}
              className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                options?.[option?.id]
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-primary/50"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    options?.[option?.id]
                      ? "bg-primary text-white"
                      : "bg-muted text-text-secondary"
                  }`}
                >
                  <Icon name={option?.icon} size={24} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Checkbox
                    label={option?.label}
                    description={option?.description}
                    checked={options?.[option?.id] || false}
                    onChange={(e) =>
                      onOptionChange(option?.id, e?.target?.checked)
                    }
                    disabled={disabled}
                    size="lg"
                    className="text-left"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Message */}
        <div className="p-4 bg-surface border border-border rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon
              name="Info"
              size={20}
              className="text-primary flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="text-base text-surface-foreground font-medium mb-1">
                Personalize Your Experience
              </p>
              <p className="text-sm text-text-secondary">
                You can change these settings at any time during your
                assessment. All audio features are designed to be clear and easy
                to understand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioFeedbackOptions;
