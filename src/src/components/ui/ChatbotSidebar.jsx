import React, { useState, useRef, useEffect } from "react";
import Icon from "../AppIcon";
import Button from "./button";

const ChatbotSidebar = ({
  isOpen = false,
  onToggle = () => { },
  currentStage = "registration",
  className = "",
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm here to help you through your cognitive assessment. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const contextualHelp = {
    registration: [
      "Need help with registration?",
      "What information do I need to provide?",
      "Is my data secure?",
    ],
    "voice-setup": [
      "How do I set up voice assistance?",
      "Test my microphone",
      "Voice commands help",
    ],
    "memory-game": [
      "How does the memory game work?",
      "Tips for better performance",
      "Can I repeat the game?",
    ],
    "word-game": [
      "Word recognition instructions",
      "What if I can't hear clearly?",
      "How is this scored?",
    ],
    report: [
      "Understanding my results",
      "Share my report",
      "What do these scores mean?",
    ],
  };

  const handleSendMessage = () => {
    if (!inputMessage?.trim()) return;

    const newMessage = {
      id: messages?.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages?.length + 2,
        type: "bot",
        content: getBotResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage?.toLowerCase();

    if (message?.includes("help") || message?.includes("assist")) {
      return "I'm here to help! You can ask me about the assessment process, technical issues, or any concerns you have.";
    } else if (message?.includes("voice") || message?.includes("audio")) {
      return "For voice assistance, make sure your microphone is enabled and speak clearly. I can help you test your audio setup.";
    } else if (message?.includes("game") || message?.includes("test")) {
      return "The cognitive games are designed to be simple and engaging. Take your time and don't worry about perfect scores.";
    } else if (message?.includes("data") || message?.includes("privacy")) {
      return "Your data is completely secure and HIPAA compliant. We never share your personal information or assessment results.";
    } else {
      return "Thank you for your question. I'm here to support you through this assessment. Is there anything specific you'd like help with?";
    }
  };

  const handleQuickHelp = (question) => {
    const quickMessage = {
      id: messages?.length + 1,
      type: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, quickMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: messages?.length + 2,
        type: "bot",
        content: getBotResponse(question),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed right-0 top-20 bottom-0 w-80 bg-card border-l border-border shadow-soft transform transition-transform duration-300 ease-out z-40 ${isOpen ? "translate-x-0" : "translate-x-full"
          } ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={16} color="white" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">
                AI Assistant
              </h3>
              <p className="text-xs text-text-secondary">Here to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="X"
            className="w-8 h-8"
          />
        </div>

        {/* Quick Help Section */}
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium text-card-foreground mb-3">
            Quick Help
          </h4>
          <div className="space-y-2">
            {contextualHelp?.[currentStage]?.map((question, index) => (
              <Button
                key={index}
                onClick={() => handleQuickHelp(question)}
                className="w-full text-left text-sm text-primary hover:bg-muted p-2 rounded transition-colors duration-200"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          {messages?.map((message) => (
            <div
              key={message?.id}
              className={`flex ${message?.type === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${message?.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                  }`}
              >
                <p className="text-sm">{message?.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message?.timestamp?.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e?.target?.value)}
              onKeyPress={(e) => e?.key === "Enter" && handleSendMessage()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
            <Button
              variant="default"
              size="sm"
              onClick={handleSendMessage}
              iconName="Send"
              disabled={!inputMessage?.trim()}
            />
          </div>
        </div>
      </div>
      {/* Mobile Bottom Panel */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft transform transition-transform duration-300 ease-out z-40 ${isOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={16} color="white" />
            </div>
            <h3 className="font-semibold text-card-foreground">AI Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName="ChevronDown"
            className="w-8 h-8"
          />
        </div>

        {/* Mobile Content */}
        <div className="max-h-80 overflow-y-auto">
          {/* Quick Help */}
          <div className="p-4 border-b border-border">
            <h4 className="text-sm font-medium text-card-foreground mb-3">
              Quick Help
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {contextualHelp?.[currentStage]?.map((question, index) => (
                <Button
                  key={index}
                  onClick={() => handleQuickHelp(question)}
                  className="text-left text-sm text-primary hover:bg-muted p-3 rounded transition-colors duration-200"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4">
            {messages?.slice(-3)?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${message?.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                    }`}
                >
                  <p className="text-sm">{message?.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Input */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e?.target?.value)}
              onKeyPress={(e) => e?.key === "Enter" && handleSendMessage()}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base"
            />
            <Button
              variant="default"
              size="default"
              onClick={handleSendMessage}
              iconName="Send"
              disabled={!inputMessage?.trim()}
              className="px-4"
            />
          </div>
        </div>
      </div>
      {/* Toggle Button */}
      {!isOpen && (
        <Button
          variant="default"
          size="lg"
          onClick={onToggle}
          iconName="MessageCircle"
          className="fixed bottom-6 right-6 lg:right-8 w-14 h-14 rounded-full shadow-soft z-50"
        />
      )}
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default ChatbotSidebar;
