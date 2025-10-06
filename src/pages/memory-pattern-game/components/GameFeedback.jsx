import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "components/ui/button";

const GameFeedback = ({
  feedbackType,
  message,
  isVisible,
  onClose,
  className = "",
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !show) return null;

  const getFeedbackConfig = () => {
    switch (feedbackType) {
      case "success":
        return {
          icon: "CheckCircle",
          bgColor: "bg-success/10",
          borderColor: "border-success/20",
          textColor: "text-success",
          iconColor: "text-success",
        };
      case "error":
        return {
          icon: "XCircle",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive/20",
          textColor: "text-destructive",
          iconColor: "text-destructive",
        };
      case "info":
        return {
          icon: "Info",
          bgColor: "bg-primary/10",
          borderColor: "border-primary/20",
          textColor: "text-primary",
          iconColor: "text-primary",
        };
      case "warning":
        return {
          icon: "AlertTriangle",
          bgColor: "bg-warning/10",
          borderColor: "border-warning/20",
          textColor: "text-warning",
          iconColor: "text-warning",
        };
      default:
        return {
          icon: "Info",
          bgColor: "bg-muted",
          borderColor: "border-border",
          textColor: "text-text-primary",
          iconColor: "text-text-secondary",
        };
    }
  };

  const config = getFeedbackConfig();

  return (
    <div
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      } ${className}`}
    >
      <div
        className={`flex items-center space-x-3 px-6 py-4 rounded-xl border shadow-soft ${config?.bgColor} ${config?.borderColor}`}
      >
        <Icon name={config?.icon} size={24} className={config?.iconColor} />
        <span className={`font-medium text-lg ${config?.textColor}`}>
          {message}
        </span>
        <Button
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
          className={`ml-2 hover:opacity-70 transition-opacity ${config?.iconColor}`}
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default GameFeedback;
