import React from "react";
import Icon from "components/AppIcon";

const RiskAssessmentPanel = ({
  overallRisk = "Low-Moderate",
  cognitiveScore = 78,
  ageGroup = "65-75",
  riskFactors = [],
}) => {
  const mockRiskFactors = [
    {
      category: "Memory Performance",
      level: "moderate",
      description:
        "Slight decline in complex pattern recall, consistent with normal aging",
      impact: "Low impact on daily activities",
    },
    {
      category: "Response Time",
      level: "low",
      description: "Processing speed within expected range for age group",
      impact: "No significant concerns",
    },
    {
      category: "Error Patterns",
      level: "moderate",
      description:
        "Increased errors in later game levels suggest attention challenges",
      impact: "Monitor for progression",
    },
    {
      category: "Consistency",
      level: "low",
      description: "Stable performance across assessment sessions",
      impact: "Positive indicator",
    },
  ];

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "text-success";
      case "moderate":
        return "text-warning";
      case "high":
        return "text-destructive";
      default:
        return "text-text-secondary";
    }
  };

  const getRiskBgColor = (level) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "bg-success/10 border-success/20";
      case "moderate":
        return "bg-warning/10 border-warning/20";
      case "high":
        return "bg-destructive/10 border-destructive/20";
      default:
        return "bg-muted border-border";
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case "low":
        return "CheckCircle";
      case "moderate":
        return "AlertTriangle";
      case "high":
        return "AlertCircle";
      default:
        return "Info";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return "Excellent cognitive performance";
    if (score >= 70) return "Good cognitive performance";
    if (score >= 60) return "Fair cognitive performance";
    return "Cognitive performance needs attention";
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6 mb-8">
      {/* Panel Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-card-foreground">
            Risk Assessment Analysis
          </h3>
          <p className="text-text-secondary">
            Age-adjusted cognitive health evaluation
          </p>
        </div>
      </div>
      {/* Overall Risk Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Risk Level Card */}
        <div
          className={`p-6 rounded-lg border-2 ${getRiskBgColor(overallRisk)}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-card-foreground">
              Overall Risk Level
            </h4>
            <Icon
              name={getRiskIcon(overallRisk)}
              size={24}
              className={getRiskColor(overallRisk)}
            />
          </div>

          <div className="text-center mb-4">
            <span className={`text-4xl font-bold ${getRiskColor(overallRisk)}`}>
              {overallRisk}
            </span>
            <p className="text-sm text-text-secondary mt-2">
              Based on comprehensive cognitive assessment
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-card-foreground">Age Group:</span>
              <span className="font-medium text-card-foreground">
                {ageGroup} years
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-card-foreground">Assessment Date:</span>
              <span className="font-medium text-card-foreground">
                October 4, 2025
              </span>
            </div>
          </div>
        </div>

        {/* Cognitive Score Card */}
        <div className="p-6 bg-muted border border-border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-card-foreground">
              Cognitive Score
            </h4>
            <Icon name="Brain" size={24} className="text-primary" />
          </div>

          <div className="text-center mb-4">
            <span
              className={`text-4xl font-bold ${getScoreColor(cognitiveScore)}`}
            >
              {cognitiveScore}/100
            </span>
            <p className="text-sm text-text-secondary mt-2">
              {getScoreDescription(cognitiveScore)}
            </p>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-card-foreground">
                Memory Performance
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-3/4 h-2 bg-success rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-card-foreground">
                  75%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-card-foreground">
                Word Recognition
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-4/5 h-2 bg-success rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-card-foreground">
                  82%
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-card-foreground">
                Response Time
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-3/5 h-2 bg-warning rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-card-foreground">
                  68%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Risk Factors Analysis */}
      <div>
        <h4 className="text-lg font-semibold text-card-foreground mb-4">
          Detailed Risk Factors
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockRiskFactors?.map((factor, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getRiskBgColor(
                factor?.level
              )}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-semibold text-card-foreground">
                  {factor?.category}
                </h5>
                <div className="flex items-center space-x-1">
                  <Icon
                    name={getRiskIcon(factor?.level)}
                    size={16}
                    className={getRiskColor(factor?.level)}
                  />
                  <span
                    className={`text-sm font-medium capitalize ${getRiskColor(
                      factor?.level
                    )}`}
                  >
                    {factor?.level}
                  </span>
                </div>
              </div>

              <p className="text-sm text-card-foreground mb-2">
                {factor?.description}
              </p>
              <p className="text-xs text-text-secondary italic">
                {factor?.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Age-Adjusted Interpretation */}
      <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon
            name="Info"
            size={20}
            className="text-primary mt-1 flex-shrink-0"
          />
          <div>
            <h4 className="font-semibold text-card-foreground mb-2">
              Age-Adjusted Interpretation
            </h4>
            <p className="text-sm text-card-foreground leading-relaxed mb-3">
              Your cognitive performance has been evaluated against established
              norms for adults in the {ageGroup} age range. The assessment
              considers natural age-related changes in cognitive function.
            </p>
            <ul className="text-sm text-card-foreground space-y-1">
              <li>• Slight memory changes are normal with aging</li>
              <li>• Processing speed naturally decreases after age 60</li>
              <li>• Complex task performance may show mild decline</li>
              <li>• Overall cognitive reserve remains strong</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentPanel;
