import React, { useState } from "react";
import Icon from "components/AppIcon";
import Button from "components/ui/button";
import Input from "components/ui/input";

const ShareReportModal = ({
  isOpen = false,
  onClose = () => { },
  patientName = "John Smith",
  reportId = "CR-2025-10-04-001",
}) => {
  const [shareMethod, setShareMethod] = useState("email");
  const [emailAddress, setEmailAddress] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);

    // Simulate sharing process
    setTimeout(() => {
      setIsSharing(false);
      setShareSuccess(true);

      // Auto close after success
      setTimeout(() => {
        setShareSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  const shareOptions = [
    {
      id: "email",
      label: "Email to Healthcare Provider",
      icon: "Mail",
      description: "Send secure link to your doctor or specialist",
    },
    {
      id: "family",
      label: "Share with Family",
      icon: "Users",
      description: "Send report summary to family members",
    },
    {
      id: "download",
      label: "Download PDF",
      icon: "Download",
      description: "Save report for your records",
    },
    {
      id: "print",
      label: "Print Report",
      icon: "Printer",
      description: "Print physical copy for appointment",
    },
  ];

  const quickEmailTemplates = [
    {
      recipient: "Primary Care Doctor",
      subject: `Cognitive Assessment Report - ${patientName}`,
      message: `Dear Doctor,\n\nI have completed a cognitive assessment through CogniCare and would like to share the results with you for review during my next appointment.\n\nThe assessment was conducted on October 4, 2025, and includes detailed analysis of memory and cognitive function.\n\nPlease let me know if you need any additional information.\n\nBest regards,\n${patientName}`,
    },
    {
      recipient: "Neurologist",
      subject: `Cognitive Assessment Results - ${patientName}`,
      message: `Dear Dr. [Name],\n\nAs requested, I have completed a comprehensive cognitive assessment. The report includes detailed performance metrics and risk analysis that may be relevant to my ongoing care.\n\nI would appreciate your professional review of these results.\n\nThank you,\n${patientName}`,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-soft max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Share" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-card-foreground">
                Share Assessment Report
              </h2>
              <p className="text-text-secondary">Report ID: {reportId}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="w-8 h-8"
          />
        </div>

        {shareSuccess ? (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              Report Shared Successfully!
            </h3>
            <p className="text-text-secondary">
              Your cognitive assessment report has been securely shared. The
              recipient will receive access within a few minutes.
            </p>
          </div>
        ) : (
          /* Main Content */
          <div className="p-6">
            {/* Share Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Choose Sharing Method
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shareOptions?.map((option) => (
                  <Button
                    key={option?.id}
                    onClick={() => setShareMethod(option?.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors duration-200 ${shareMethod === option?.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon
                        name={option?.icon}
                        size={20}
                        className={
                          shareMethod === option?.id
                            ? "text-primary"
                            : "text-text-secondary"
                        }
                      />
                      <div>
                        <h4 className="font-medium text-card-foreground">
                          {option?.label}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {option?.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            {/* Email Sharing Form */}
            {shareMethod === "email" && (
              <div className="space-y-4 mb-6">
                <Input
                  label="Healthcare Provider Email"
                  type="email"
                  placeholder="doctor@example.com"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e?.target?.value)}
                  required
                  description="Enter your healthcare provider's email address"
                />

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Message Template
                  </label>
                  <div className="grid grid-cols-1 gap-2 mb-3">
                    {quickEmailTemplates?.map((template, index) => (
                      <Button
                        key={index}
                        onClick={() => setMessage(template?.message)}
                        className="p-3 text-left bg-muted hover:bg-muted/80 rounded-lg border border-border transition-colors duration-200"
                      >
                        <span className="text-sm font-medium text-card-foreground">
                          {template?.recipient}
                        </span>
                      </Button>
                    ))}
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e?.target?.value)}
                    placeholder="Add a personal message..."
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-card-foreground bg-input resize-none"
                  />
                </div>
              </div>
            )}
            {/* Family Sharing Form */}
            {shareMethod === "family" && (
              <div className="space-y-4 mb-6">
                <Input
                  label="Family Member Email"
                  type="email"
                  placeholder="family@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e?.target?.value)}
                  required
                  description="Report summary will be shared (detailed medical information excluded)"
                />

                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon
                      name="Info"
                      size={16}
                      className="text-warning mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-medium text-card-foreground mb-1">
                        Family Sharing Notice
                      </h4>
                      <p className="text-sm text-text-secondary">
                        Family members will receive a summary report with
                        general findings and recommendations. Detailed medical
                        information remains private.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Security Notice */}
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg mb-6">
              <div className="flex items-start space-x-2">
                <Icon
                  name="Shield"
                  size={16}
                  className="text-success mt-0.5 flex-shrink-0"
                />
                <div>
                  <h4 className="font-medium text-card-foreground mb-1">
                    Secure Sharing
                  </h4>
                  <p className="text-sm text-text-secondary">
                    All reports are shared through encrypted, HIPAA-compliant
                    channels. Recipients receive secure access links that expire
                    after 30 days.
                  </p>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={onClose}
                fullWidth
                className="sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                variant="default"
                size="lg"
                onClick={handleShare}
                loading={isSharing}
                disabled={
                  (shareMethod === "email" && !doctorEmail) ||
                  (shareMethod === "family" && !emailAddress)
                }
                iconName={
                  shareMethod === "download"
                    ? "Download"
                    : shareMethod === "print"
                      ? "Printer"
                      : "Send"
                }
                iconPosition="left"
                fullWidth
                className="sm:w-auto"
              >
                {isSharing
                  ? "Sharing..."
                  : shareMethod === "download"
                    ? "Download PDF"
                    : shareMethod === "print"
                      ? "Print Report"
                      : "Share Report"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareReportModal;
