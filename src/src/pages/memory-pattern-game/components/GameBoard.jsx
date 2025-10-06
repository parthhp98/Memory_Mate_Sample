import Button from "components/ui/button";
import React, { useState, useEffect } from "react";

const GameBoard = ({
  gameState,
  onButtonPress,
  isShowingSequence,
  currentSequence,
  userSequence,
  className = "",
}) => {
  const [pressedButton, setPressedButton] = useState(null);
  const [showingIndex, setShowingIndex] = useState(-1);

  const colors = [
    {
      id: 0,
      name: "Red",
      bg: "bg-red-500",
      activeBg: "bg-red-400",
      border: "border-red-600",
    },
    {
      id: 1,
      name: "Blue",
      bg: "bg-blue-500",
      activeBg: "bg-blue-400",
      border: "border-blue-600",
    },
    {
      id: 2,
      name: "Green",
      bg: "bg-green-500",
      activeBg: "bg-green-400",
      border: "border-green-600",
    },
    {
      id: 3,
      name: "Yellow",
      bg: "bg-yellow-500",
      activeBg: "bg-yellow-400",
      border: "border-yellow-600",
    },
    {
      id: 4,
      name: "Purple",
      bg: "bg-purple-500",
      activeBg: "bg-purple-400",
      border: "border-purple-600",
    },
    {
      id: 5,
      name: "Orange",
      bg: "bg-orange-500",
      activeBg: "bg-orange-400",
      border: "border-orange-600",
    },
  ];

  useEffect(() => {
    if (isShowingSequence && currentSequence?.length > 0) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < currentSequence?.length) {
          setShowingIndex(index);
          setTimeout(() => setShowingIndex(-1), 400);
          index++;
        } else {
          clearInterval(interval);
          setShowingIndex(-1);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isShowingSequence, currentSequence]);

  const handleButtonPress = (colorId) => {
    if (isShowingSequence) return;

    setPressedButton(colorId);
    setTimeout(() => setPressedButton(null), 200);
    onButtonPress(colorId);
  };

  const getButtonClass = (colorId) => {
    const color = colors?.[colorId];
    let baseClass = `w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-xl border-4 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2 ${color?.border}`;

    if (showingIndex >= 0 && currentSequence?.[showingIndex] === colorId) {
      return `${baseClass} ${color?.activeBg} scale-110 shadow-lg`;
    } else if (pressedButton === colorId) {
      return `${baseClass} ${color?.activeBg} scale-95`;
    } else {
      return `${baseClass} ${color?.bg} shadow-md`;
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-8 ${className}`}>
      {/* Sequence Display */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold text-text-primary">
          {isShowingSequence ? "Watch the Pattern" : "Repeat the Pattern"}
        </h3>

        {/* Current Sequence Indicator */}
        <div className="flex items-center justify-center space-x-2 min-h-[40px]">
          {currentSequence?.map((colorId, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-300 ${
                colors?.[colorId]?.bg
              } ${colors?.[colorId]?.border} ${
                index < userSequence?.length
                  ? userSequence?.[index] === colorId
                    ? "ring-2 ring-success"
                    : "ring-2 ring-destructive"
                  : showingIndex === index
                  ? "ring-2 ring-primary scale-110"
                  : ""
              }`}
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="text-sm text-text-secondary">
          {!isShowingSequence && (
            <span>
              Progress: {userSequence?.length} / {currentSequence?.length}
            </span>
          )}
        </div>
      </div>
      {/* Game Board */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 p-8 bg-surface rounded-2xl border border-border shadow-soft">
        {colors?.map((color) => (
          <Button
            key={color?.id}
            onClick={() => handleButtonPress(color?.id)}
            disabled={isShowingSequence}
            className={getButtonClass(color?.id)}
            aria-label={`${color?.name} button`}
          >
            <span className="sr-only">{color?.name}</span>
          </Button>
        ))}
      </div>
      {/* Instructions */}
      <div className="text-center max-w-md">
        <p className="text-text-secondary">
          {isShowingSequence
            ? "Watch carefully and remember the sequence of colors"
            : "Click the buttons in the same order you saw them light up"}
        </p>
      </div>
    </div>
  );
};

export default GameBoard;
