import React from "react";
import Icon from "components/AppIcon";
import Button from "components/ui/button";

const RecommendationsPanel = ({
  riskLevel = "Low-Moderate",
  onScheduleAppointment = () => {},
  onDownloadResources = () => {},
}) => {
  const getRecommendations = (risk) => {
    const baseRecommendations = [
      {
        category: "Healthcare Consultation",
        priority: "high",
        icon: "Stethoscope",
        title: "Schedule Follow-up with Primary Care Physician",
        description:
          "Discuss assessment results and establish baseline cognitive monitoring",
        timeline: "Within 2-4 weeks",
        actions: [
          "Share this report with your doctor",
          "Request cognitive health discussion",
          "Consider annual assessments",
        ],
      },
      {
        category: "Lifestyle Modifications",
        priority: "medium",
        icon: "Heart",
        title: "Cognitive Health Lifestyle Plan",
        description:
          "Evidence-based activities to support brain health and cognitive function",
        timeline: "Start immediately",
        actions: [
          "Regular physical exercise (30 min, 5x/week)",
          "Mediterranean-style diet",
          "Social engagement activities",
          "Quality sleep (7-8 hours nightly)",
        ],
      },
      {
        category: "Cognitive Training",
        priority: "medium",
        icon: "Brain",
        title: "Structured Cognitive Exercises",
        description:
          "Targeted activities to maintain and improve cognitive abilities",
        timeline: "Daily practice",
        actions: [
          "Memory training exercises",
          "Problem-solving puzzles",
          "Reading and learning new skills",
          "Mindfulness and meditation",
        ],
      },
    ];

    if (
      risk?.toLowerCase()?.includes("moderate") ||
      risk?.toLowerCase()?.includes("high")
    ) {
      baseRecommendations?.push({
        category: "Specialist Referral",
        priority: "high",
        icon: "UserCheck",
        title: "Neurological Evaluation",
        description: "Comprehensive assessment by cognitive health specialist",
        timeline: "Within 4-6 weeks",
        actions: [
          "Request referral to neurologist",
          "Consider neuropsychological testing",
          "Discuss family history",
          "Review medications",
        ],
      });
    }

    return baseRecommendations;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      case "low":
        return "text-success";
      default:
        return "text-text-secondary";
    }
  };

  const getPriorityBgColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 border-destructive/20";
      case "medium":
        return "bg-warning/10 border-warning/20";
      case "low":
        return "bg-success/10 border-success/20";
      default:
        return "bg-muted border-border";
    }
  };

  const recommendations = getRecommendations(riskLevel);

  const monitoringSchedule = [
    {
      timeframe: "1 Month",
      activity: "Follow-up with primary care physician",
      status: "pending",
    },
    {
      timeframe: "3 Months",
      activity: "Lifestyle modification review",
      status: "pending",
    },
    {
      timeframe: "6 Months",
      activity: "Repeat cognitive assessment",
      status: "pending",
    },
    {
      timeframe: "12 Months",
      activity: "Annual comprehensive evaluation",
      status: "pending",
    },
  ];

  const emergencyWarnings = [
    "Sudden confusion or disorientation",
    "Significant memory loss affecting daily activities",
    "Difficulty recognizing familiar people or places",
    "Problems with language or communication",
    "Changes in personality or behavior",
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6 mb-8">
      {/* Panel Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Clipboard" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-card-foreground">
            Professional Recommendations
          </h3>
          <p className="text-text-secondary">
            Personalized action plan based on assessment results
          </p>
        </div>
      </div>
      {/* Priority Recommendations */}
      <div className="space-y-6 mb-8">
        {recommendations?.map((rec, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-2 ${getPriorityBgColor(
              rec?.priority
            )}`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon
                  name={rec?.icon}
                  size={24}
                  className={getPriorityColor(rec?.priority)}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground">
                      {rec?.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`text-sm font-medium capitalize ${getPriorityColor(
                          rec?.priority
                        )}`}
                      >
                        {rec?.priority} Priority
                      </span>
                      <span className="text-sm text-text-secondary">
                        • {rec?.timeline}
                      </span>
                    </div>
                  </div>

                  {rec?.category === "Healthcare Consultation" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onScheduleAppointment}
                      iconName="Calendar"
                      iconPosition="left"
                    >
                      Schedule
                    </Button>
                  )}
                </div>

                <p className="text-card-foreground mb-4">{rec?.description}</p>

                <div>
                  <h5 className="font-medium text-card-foreground mb-2">
                    Recommended Actions:
                  </h5>
                  <ul className="space-y-1">
                    {rec?.actions?.map((action, actionIndex) => (
                      <li
                        key={actionIndex}
                        className="flex items-start space-x-2"
                      >
                        <Icon
                          name="CheckCircle"
                          size={16}
                          className="text-success mt-0.5 flex-shrink-0"
                        />
                        <span className="text-sm text-card-foreground">
                          {action}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Monitoring Schedule */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-card-foreground mb-4">
          Recommended Monitoring Schedule
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {monitoringSchedule?.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-muted border border-border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-card-foreground">
                  {item?.timeframe}
                </span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-warning rounded-full" />
                  <span className="text-xs text-text-secondary capitalize">
                    {item?.status}
                  </span>
                </div>
              </div>
              <p className="text-sm text-card-foreground">{item?.activity}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Warning Signs */}
      <div className="mb-8 p-6 bg-destructive/10 border-2 border-destructive/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon
            name="AlertTriangle"
            size={24}
            className="text-destructive mt-1 flex-shrink-0"
          />
          <div>
            <h4 className="text-lg font-semibold text-destructive mb-3">
              When to Seek Immediate Medical Attention
            </h4>
            <p className="text-card-foreground mb-4">
              Contact your healthcare provider immediately if you experience any
              of these symptoms:
            </p>
            <ul className="space-y-2">
              {emergencyWarnings?.map((warning, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon
                    name="AlertCircle"
                    size={16}
                    className="text-destructive mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-card-foreground">
                    {warning}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-card rounded border border-destructive/30">
              <p className="text-sm text-card-foreground font-medium">
                Emergency Contact: Call 911 or go to the nearest emergency room
                for severe symptoms
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Resources and Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Educational Resources */}
        <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="BookOpen" size={20} className="text-primary" />
            <h4 className="font-semibold text-card-foreground">
              Educational Resources
            </h4>
          </div>
          <ul className="space-y-2 mb-4">
            <li className="text-sm text-card-foreground">
              • Alzheimer's Association cognitive health guide
            </li>
            <li className="text-sm text-card-foreground">
              • Brain health nutrition recommendations
            </li>
            <li className="text-sm text-card-foreground">
              • Cognitive exercise programs
            </li>
            <li className="text-sm text-card-foreground">
              • Family caregiver support resources
            </li>
          </ul>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownloadResources}
            iconName="Download"
            iconPosition="left"
            fullWidth
          >
            Download Resource Pack
          </Button>
        </div>

        {/* Support Services */}
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Users" size={20} className="text-success" />
            <h4 className="font-semibold text-card-foreground">
              Support Services
            </h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-success" />
              <span className="text-sm text-card-foreground">
                24/7 Helpline: 1-800-COGNI-CARE
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} className="text-success" />
              <span className="text-sm text-card-foreground">
                Online support groups
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-success" />
              <span className="text-sm text-card-foreground">
                Local healthcare provider directory
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-success" />
              <span className="text-sm text-card-foreground">
                Assessment reminder service
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPanel;
