import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Icon from "components/AppIcon";

const GamePerformanceChart = ({ gameType = "memory" }) => {
  // Mock performance data for Memory Pattern Game
  const memoryGameData = [
    { level: "Level 1", accuracy: 95, responseTime: 2.1, errors: 0 },
    { level: "Level 2", accuracy: 88, responseTime: 2.8, errors: 1 },
    { level: "Level 3", accuracy: 82, responseTime: 3.2, errors: 2 },
    { level: "Level 4", accuracy: 75, responseTime: 4.1, errors: 3 },
    { level: "Level 5", accuracy: 68, responseTime: 5.2, errors: 4 },
  ];

  // Mock performance data for Word Recognition Game
  const wordGameData = [
    { level: "Level 1", accuracy: 92, responseTime: 1.8, errors: 1 },
    { level: "Level 2", accuracy: 85, responseTime: 2.3, errors: 2 },
    { level: "Level 3", accuracy: 78, responseTime: 2.9, errors: 3 },
    { level: "Level 4", accuracy: 71, responseTime: 3.4, errors: 4 },
  ];

  // Error pattern distribution
  const errorPatternData = [
    { name: "Sequence Errors", value: 35, color: "#DC2626" },
    { name: "Timing Issues", value: 28, color: "#F59E0B" },
    { name: "Pattern Recognition", value: 22, color: "#2563EB" },
    { name: "Memory Lapses", value: 15, color: "#059669" },
  ];

  const currentData = gameType === "memory" ? memoryGameData : wordGameData;
  const gameTitle =
    gameType === "memory" ? "Memory Pattern Game" : "Word Recognition Game";
  const gameIcon = gameType === "memory" ? "Grid3X3" : "Type";

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-soft p-4">
          <p className="font-semibold text-card-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.dataKey === "responseTime"
                ? `${entry?.name}: ${entry?.value}s`
                : `${entry?.name}: ${entry?.value}${
                    entry?.dataKey === "accuracy" ? "%" : ""
                  }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft p-6 mb-8">
      {/* Chart Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={gameIcon} size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-card-foreground">
            {gameTitle} Performance
          </h3>
          <p className="text-text-secondary">
            Detailed analysis across difficulty levels
          </p>
        </div>
      </div>
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Accuracy Chart */}
        <div>
          <h4 className="text-lg font-semibold text-card-foreground mb-4">
            Accuracy by Level
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={currentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="level"
                  stroke="var(--color-text-secondary)"
                  fontSize={14}
                />
                <YAxis
                  stroke="var(--color-text-secondary)"
                  fontSize={14}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="accuracy"
                  fill="var(--color-success)"
                  radius={[4, 4, 0, 0]}
                  name="Accuracy"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Time Chart */}
        <div>
          <h4 className="text-lg font-semibold text-card-foreground mb-4">
            Response Time Trends
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={currentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis
                  dataKey="level"
                  stroke="var(--color-text-secondary)"
                  fontSize={14}
                />
                <YAxis stroke="var(--color-text-secondary)" fontSize={14} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 6 }}
                  name="Response Time"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Error Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Error Pattern Distribution */}
        <div>
          <h4 className="text-lg font-semibold text-card-foreground mb-4">
            Error Pattern Analysis
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errorPatternData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {errorPatternData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Percentage"]}
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {errorPatternData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-card-foreground">
                  {item?.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div>
          <h4 className="text-lg font-semibold text-card-foreground mb-4">
            Performance Summary
          </h4>
          <div className="space-y-4">
            {/* Overall Score */}
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-card-foreground">
                  Overall Score
                </span>
                <span className="text-2xl font-bold text-success">78%</span>
              </div>
              <p className="text-sm text-text-secondary">
                Above average for age group (65-75)
              </p>
            </div>

            {/* Key Metrics */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-card-foreground">
                  Average Response Time
                </span>
                <span className="font-semibold text-card-foreground">
                  3.2 seconds
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-card-foreground">Total Errors</span>
                <span className="font-semibold text-card-foreground">
                  10 errors
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-card-foreground">Completion Rate</span>
                <span className="font-semibold text-card-foreground">100%</span>
              </div>
            </div>

            {/* Age Comparison */}
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-primary" />
                <span className="font-medium text-card-foreground">
                  Age Group Comparison
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                Performance is within normal range for adults aged 65-75. Slight
                decline in complex pattern recognition is typical.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePerformanceChart;
