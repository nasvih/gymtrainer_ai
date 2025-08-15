import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'trainer';
  timestamp: Date;
}

const ChatTrainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hey there! I'm your personal AI fitness trainer. I'm here to help you with workouts, nutrition, form corrections, and any fitness questions you have. What would you like to work on today?",
      sender: 'trainer',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const GROQ_API_KEY = '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';
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
    
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b', // Model from your Python example
          messages: [
            {
              role: 'system',
              content: 'You are a professional fitness trainer and nutritionist. Provide helpful, accurate, and concise advice. Use fitness emojis where appropriate.'
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          reasoning_effort: "medium", // From your Python example
          stream: false, // We're not using streaming for this implementation
          stop: null
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || generateFallbackResponse(userMessage);
    } catch (error) {
      console.error('Groq API Error:', error);
      return generateFallbackResponse(userMessage);
    }
  };

  const generateFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise')) {
      return "💪 Great question about workouts! For effective results, I recommend combining strength training 3-4 times per week with cardio 2-3 times per week. Focus on compound movements like squats, deadlifts, and push-ups. What's your current fitness level?";
    } else if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('food')) {
      return "🥗 Nutrition is crucial for fitness success! Focus on whole foods: lean proteins (chicken, fish, legumes), complex carbs (oats, quinoa, sweet potatoes), and healthy fats (avocado, nuts). Stay hydrated and eat in a slight calorie deficit for weight loss or surplus for muscle gain.";
    } else if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
      return "🔥 For weight loss, create a calorie deficit through diet and exercise. Combine strength training to preserve muscle mass with cardio for fat burning. Aim for 1-2 lbs per week loss. High-protein diet helps maintain muscle and keeps you full longer.";
    } else if (lowerMessage.includes('muscle') || lowerMessage.includes('gain') || lowerMessage.includes('bulk')) {
      return "💪 To build muscle, focus on progressive overload in your strength training, eat in a slight calorie surplus with adequate protein (0.8-1g per lb bodyweight), and get proper recovery. Compound exercises like squats and deadlifts are most effective.";
    } else if (lowerMessage.includes('beginner') || lowerMessage.includes('start')) {
      return "🌟 Welcome to your fitness journey! Start with 3 full-body workouts per week focusing on basic movements. Begin with bodyweight exercises or light weights, prioritize proper form over heavy weight, and gradually increase intensity. Consistency is key!";
    } else {
      return "💯 I'm here to help with all your fitness needs! Whether it's workout planning, nutrition advice, form corrections, or motivation - just ask. What specific area of fitness would you like to focus on today?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage);

      const trainerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'trainer',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, trainerMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "⚠️ I'm having temporary connection issues, but here's my advice: " + generateFallbackResponse(inputMessage),
        sender: 'trainer',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Create a beginner workout plan",
    "What should I eat to lose weight?",
    "How to build muscle at home?",
    "Best cardio for fat loss?",
    "Proper squat form tips",
    "Weekly meal prep ideas"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Fitness Trainer</h3>
              <p className="text-orange-100 text-sm">Online • Ready to help</p>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="p-4 border-b border-gray-700">
          <p className="text-gray-400 text-sm mb-3">Quick questions to get started:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputMessage(question);
                  setTimeout(() => {
                    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
                    inputElement?.focus();
                  }, 100);
                }}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-xs rounded-full transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md`}>
                {message.sender === 'trainer' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-2xl ${message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto'
                    : 'bg-gray-700 text-gray-100'}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-700 px-4 py-2 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
                    <span className="text-gray-300 text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about fitness, workouts, or nutrition..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              disabled={isLoading}
              autoFocus
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by Groq & GPT-OSS-20B • Ultra-fast responses
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatTrainer;