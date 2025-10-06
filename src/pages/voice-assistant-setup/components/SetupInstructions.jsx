import React from "react";
import Icon from "../../../components/AppIcon";

const SetupInstructions = ({ className = "" }) => {
  const instructions = [
    {
      step: 1,
      title: "Enable Voice Assistant",
      description:
        "Turn on the main voice assistant toggle to activate audio features throughout your assessment.",
      icon: "ToggleRight",
    },
    {
      step: 2,
      title: "Choose Audio Options",
      description:
        "Select which types of messages you'd like to hear - welcome messages, game rules, or completion notifications.",
      icon: "CheckSquare",
    },
    {
      step: 3,
      title: "Adjust Volume",
      description:
        "Set a comfortable volume level using the slider. You can test different audio samples to find your preference.",
      icon: "Volume2",
    },
    {
      step: 4,
      title: "Test Your Settings",
      description:
        "Use the test buttons to preview how voice assistance will sound during your cognitive assessment.",
      icon: "Play",
    },
  ];

  const tips = [
    {
      icon: "Headphones",
      title: "Use Headphones",
      description:
        "For the best experience, consider using headphones or earbuds for clearer audio.",
    },
    {
      icon: "Settings",
      title: "Adjustable Anytime",
      description:
        "You can change these voice settings at any point during your assessment.",
    },
    {
      icon: "Shield",
      title: "Privacy Protected",
      description:
        "Voice features work locally on your device - no audio data is stored or transmitted.",
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Instructions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-card-foreground mb-2">
              Setup Instructions
            </h3>
            <p className="text-lg text-text-secondary">
              Follow these simple steps to configure your voice assistance
            </p>
          </div>

          <div className="space-y-4">
            {instructions?.map((instruction) => (
              <div
                key={instruction?.step}
                className="flex items-start space-x-4 p-4 bg-surface rounded-lg border border-border"
              >
                {/* Step Number */}
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {instruction?.step}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={instruction?.icon}
                    size={24}
                    className="text-primary"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-surface-foreground mb-2">
                    {instruction?.title}
                  </h4>
                  <p className="text-base text-text-secondary leading-relaxed">
                    {instruction?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Helpful Tips */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-card-foreground text-center">
            Helpful Tips
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tips?.map((tip, index) => (
              <div
                key={index}
                className="text-center p-4 bg-surface rounded-lg border border-border"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={tip?.icon} size={24} className="text-accent" />
                </div>
                <h5 className="font-semibold text-surface-foreground mb-2">
                  {tip?.title}
                </h5>
                <p className="text-sm text-text-secondary">
                  {tip?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Browser Compatibility */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon
            name="AlertTriangle"
            size={20}
            className="text-warning flex-shrink-0 mt-0.5"
          />
          <div>
            <h5 className="font-semibold text-warning mb-1">
              Browser Compatibility
            </h5>
            <p className="text-sm text-text-secondary">
              Voice features work best in Chrome, Edge, and Safari browsers. If
              you experience issues, please try switching browsers or contact
              our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupInstructions;
