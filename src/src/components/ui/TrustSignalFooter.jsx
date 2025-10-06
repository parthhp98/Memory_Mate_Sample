import React from "react";
import Icon from "../AppIcon";

const TrustSignalFooter = ({ className = "" }) => {
  const currentYear = new Date()?.getFullYear();

  const trustSignals = [
    {
      icon: "Shield",
      title: "HIPAA Compliant",
      description: "Your health data is protected",
    },
    {
      icon: "Lock",
      title: "SSL Encrypted",
      description: "End-to-end security",
    },
    {
      icon: "Award",
      title: "FDA Cleared",
      description: "Clinically validated assessments",
    },
    {
      icon: "Users",
      title: "Trusted by 10K+",
      description: "Healthcare providers nationwide",
    },
  ];

  const supportLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Support Center", href: "/support" },
    { label: "Contact Us", href: "/contact" },
  ];

  const certifications = [
    { name: "HIPAA", logo: "Shield" },
    { name: "SOC 2", logo: "Award" },
    { name: "ISO 27001", logo: "CheckCircle" },
  ];

  return (
    <footer
      className={`bg-surface border-t border-border mt-auto ${className}`}
    >
      {/* Trust Signals Section */}
      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustSignals?.map((signal, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon
                    name={signal?.icon}
                    size={20}
                    className="text-primary"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm text-card-foreground">
                    {signal?.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {signal?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="px-6 lg:px-8 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={18} color="white" />
                </div>
                <div>
                  <h3 className="font-bold text-surface-foreground">
                    CogniCare
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Cognitive Assessment Platform
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Providing trusted cognitive assessments with advanced AI
                assistance, designed specifically for seniors and their
                healthcare providers.
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  24/7 Support: 1-800-COGNI-CARE
                </span>
              </div>
            </div>

            {/* Support Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-surface-foreground">
                Support & Legal
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {supportLinks?.map((link, index) => (
                  <a
                    key={index}
                    href={link?.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors duration-200 py-1"
                  >
                    {link?.label}
                  </a>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <h5 className="font-medium text-sm text-warning">
                    Medical Emergency
                  </h5>
                </div>
                <p className="text-xs text-text-secondary">
                  If you're experiencing a medical emergency, call 911
                  immediately. This assessment is not a substitute for
                  professional medical care.
                </p>
              </div>
            </div>

            {/* Certifications & Security */}
            <div className="space-y-4">
              <h4 className="font-semibold text-surface-foreground">
                Security & Compliance
              </h4>

              <div className="space-y-3">
                {certifications?.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-card rounded border border-border"
                  >
                    <Icon
                      name={cert?.logo}
                      size={16}
                      className="text-success"
                    />
                    <span className="text-sm font-medium text-card-foreground">
                      {cert?.name} Certified
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="ShieldCheck" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">
                    Your data is secure
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  All assessments are encrypted and stored according to HIPAA
                  standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="px-6 lg:px-8 py-4 border-t border-border bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span>© {currentYear} CogniCare. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Version 2.1.0</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-xs text-text-secondary">
                  All systems operational
                </span>
              </div>
              <span className="text-xs text-text-secondary">
                Last updated: Oct 4, 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrustSignalFooter;
