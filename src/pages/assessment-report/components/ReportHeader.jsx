import React from "react";
import Icon from "components/AppIcon";
import Button from "components/ui/button";

const ReportHeader = ({
  patientName = "John Smith",
  assessmentDate = "October 4, 2025",
  overallRiskLevel = "Low-Moderate",
  onExportPDF = () => {},
  onShareReport = () => {},
  onVoiceNarration = () => {},
  isVoiceEnabled = false,
}) => {
  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "text-success";
      case "low-moderate":
        return "text-warning";
      case "moderate":
        return "text-warning";
      case "high":
        return "text-destructive";
      default:
        return "text-text-secondary";
    }
  };

  const getRiskBgColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "bg-success/10 border-success/20";
      case "low-moderate":
        return "bg-warning/10 border-warning/20";
      case "moderate":
        return "bg-warning/10 border-warning/20";
      case "high":
        return "bg-destructive/10 border-destructive/20";
      default:
        return "bg-muted border-border";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-8 mb-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-card-foreground">
                Cognitive Assessment Report
              </h1>
              <p className="text-lg text-text-secondary">
                Comprehensive Analysis & Recommendations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={20} className="text-text-secondary" />
              <span className="font-medium text-card-foreground">
                Patient: {patientName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={20} className="text-text-secondary" />
              <span className="font-medium text-card-foreground">
                Date: {assessmentDate}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onVoiceNarration}
            iconName={isVoiceEnabled ? "VolumeX" : "Volume2"}
            iconPosition="left"
            className="min-w-[140px]"
          >
            {isVoiceEnabled ? "Stop Audio" : "Read Aloud"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onExportPDF}
            iconName="Download"
            iconPosition="left"
            className="min-w-[140px]"
          >
            Export PDF
          </Button>

          <Button
            variant="default"
            size="lg"
            onClick={onShareReport}
            iconName="Share"
            iconPosition="left"
            className="min-w-[140px]"
          >
            Share Report
          </Button>
        </div>
      </div>

      {/* Risk Assessment Summary */}
      <div
        className={`p-6 rounded-lg border-2 ${getRiskBgColor(
          overallRiskLevel
        )}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-card-foreground">
            Overall Risk Assessment
          </h2>
          <div className="flex items-center space-x-2">
            <Icon
              name="Shield"
              size={24}
              className={getRiskColor(overallRiskLevel)}
            />
            <span
              className={`text-2xl font-bold ${getRiskColor(overallRiskLevel)}`}
            >
              {overallRiskLevel} Risk
            </span>
          </div>
        </div>

        <p className="text-lg text-card-foreground leading-relaxed">
          Based on comprehensive analysis of cognitive assessment games,
          response patterns, and age-adjusted metrics, this report provides
          professional insights into cognitive health status and recommended
          next steps.
        </p>
      </div>

      {/* Report Disclaimer */}
      <div className="mt-6 p-4 bg-muted border border-border rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon
            name="AlertCircle"
            size={20}
            className="text-warning mt-1 flex-shrink-0"
          />
          <div>
            <h3 className="font-semibold text-card-foreground mb-2">
              Important Medical Disclaimer
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              This assessment is a screening tool and not a medical diagnosis.
              Results should be discussed with a qualified healthcare provider.
              If you have immediate health concerns, please contact your doctor
              or call emergency services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
