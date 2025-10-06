import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const GameTimer = ({
  isActive = false,
  onTimeUpdate = () => {},
  onTimeout = () => {},
  timeLimit = null, // null for no limit, number for seconds
  className = "",
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      if (!startTime) {
        setStartTime(Date.now());
      }

      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - (startTime || now)) / 1000);
        setTimeElapsed(elapsed);
        onTimeUpdate(elapsed);

        if (timeLimit && elapsed >= timeLimit) {
          onTimeout();
        }
      }, 100);
    } else {
      setStartTime(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, timeLimit, onTimeUpdate, onTimeout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    if (!timeLimit) return "text-text-secondary";

    const remaining = timeLimit - timeElapsed;
    if (remaining <= 10) return "text-destructive";
    if (remaining <= 30) return "text-warning";
    return "text-text-secondary";
  };

  const getProgressPercentage = () => {
    if (!timeLimit) return 0;
    return Math.min((timeElapsed / timeLimit) * 100, 100);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm font-medium text-card-foreground">
            {timeLimit ? "Time Remaining" : "Time Elapsed"}
          </span>
        </div>

        <div className={`text-lg font-bold ${getTimeColor()}`}>
          {timeLimit
            ? formatTime(Math.max(0, timeLimit - timeElapsed))
            : formatTime(timeElapsed)}
        </div>
      </div>

      {timeLimit && (
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ease-out ${
                getProgressPercentage() > 80
                  ? "bg-destructive"
                  : getProgressPercentage() > 60
                  ? "bg-warning"
                  : "bg-primary"
              }`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>

          {timeElapsed >= timeLimit - 10 && timeElapsed < timeLimit && (
            <div className="text-xs text-destructive font-medium animate-pulse">
              Time running out!
            </div>
          )}
        </div>
      )}

      {!isActive && timeElapsed > 0 && (
        <div className="mt-2 text-xs text-text-secondary">
          Response time: {formatTime(timeElapsed)}
        </div>
      )}
    </div>
  );
};

export default GameTimer;
