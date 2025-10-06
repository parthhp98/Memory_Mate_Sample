import React from "react";
import Button from "../../../components/ui/button";
import Icon from "../../../components/AppIcon";

const GameControls = ({
  gameState,
  onStartGame,
  onNextLevel,
  onReplaySequence,
  isShowingSequence,
  canReplay,
  className = "",
}) => {
  const getControlButtons = () => {
    switch (gameState) {
      case "waiting":
        return (
          <Button
            variant="default"
            size="lg"
            onClick={onStartGame}
            iconName="Play"
            iconPosition="left"
            className="min-w-[200px]"
          >
            Start Game
          </Button>
        );

      case "playing":
        return (
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={onReplaySequence}
              disabled={!canReplay || isShowingSequence}
              iconName="RotateCcw"
              iconPosition="left"
              className="min-w-[160px]"
            >
              Replay Sequence
            </Button>
          </div>
        );

      case "levelComplete":
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={24} />
              <span className="text-lg font-semibold">Level Complete!</span>
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={onNextLevel}
              iconName="ArrowRight"
              iconPosition="right"
              className="min-w-[200px]"
            >
              Continue to Next Level
            </Button>
          </div>
        );

      case "gameComplete":
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="Trophy" size={24} />
              <span className="text-lg font-semibold">
                Memory Game Complete!
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col items-center space-y-6 p-6 bg-surface rounded-xl border border-border ${className}`}
    >
      {getControlButtons()}
    </div>
  );
};

export default GameControls;
