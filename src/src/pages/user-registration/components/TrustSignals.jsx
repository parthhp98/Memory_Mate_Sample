import React from "react";
import Icon from "../../../components/AppIcon";

const TrustSignals = ({ className = "" }) => {
  const trustBadges = [
    {
      icon: "Shield",
      title: "HIPAA Compliant",
      description: "Your health information is protected under federal law",
      color: "text-success",
    },
    {
      icon: "Lock",
      title: "Bank-Level Security",
      description: "256-bit SSL encryption protects all your data",
      color: "text-primary",
    },
    {
      icon: "Award",
      title: "FDA Cleared",
      description: "Clinically validated cognitive assessment tools",
      color: "text-accent",
    },
    {
      icon: "Users",
      title: "Trusted by 10,000+",
      description: "Healthcare providers nationwide use our platform",
      color: "text-secondary",
    },
  ];

  const securityFeatures = [
    "End-to-end encryption",
    "Secure data storage",
    "No data sharing",
    "GDPR compliant",
  ];

  return (
    <div className={`w-full max-w-full space-y-8 ${className}`}>
      {/* Main Trust Badges */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 gap-6">
        {trustBadges?.map((badge, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-6 bg-card border border-border rounded-lg shadow-soft hover:shadow-md transition-shadow duration-200"
          >
            <div
              className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0`}
            >
              <Icon name={badge?.icon} size={24} className={badge?.color} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg text-card-foreground mb-2">
                {badge?.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {badge?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Security Features */}
      <div className="w-full bg-success/5 border border-success/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="ShieldCheck" size={24} className="text-success" />
          <h3 className="font-semibold text-lg text-card-foreground">
            Your Privacy is Protected
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success" />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>

        <p className="text-sm text-text-secondary mt-4 leading-relaxed">
          We follow strict healthcare data protection standards. Your assessment
          data is encrypted, stored securely, and never shared without your
          explicit consent.
        </p>
      </div>
      {/* Medical Disclaimer */}
      <div className="w-full bg-warning/5 border border-warning/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon
            name="AlertCircle"
            size={20}
            className="text-warning flex-shrink-0 mt-1"
          />
          <div className="flex-1">
            <h4 className="font-medium text-warning mb-2">
              Important Medical Notice
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              This cognitive assessment is a screening tool and not a medical
              diagnosis. Results should be discussed with your healthcare
              provider. If you're experiencing a medical emergency, call 911
              immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
