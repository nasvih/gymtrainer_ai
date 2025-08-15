# AI Fitness Trainer Chatbot

![Project Screenshot](./screenshot.png)

## Overview
The AI Fitness Trainer is an open-source chatbot application that provides personalized fitness advice, workout plans, and nutrition guidance. Powered by Groq's ultra-fast AI inference and the GPT-OSS-20B model, this application delivers real-time responses to your fitness queries.

## Key Features
- 💬 Interactive chat interface with quick question suggestions
- 💪 Personalized fitness and nutrition advice
- 🏋️ Workout plan generation
- 🥗 Diet and meal planning suggestions
- ⚡ Ultra-fast responses powered by Groq AI
- 📱 Responsive design for all devices
- 🔒 Secure API communication

## Technology Stack
- **Frontend**: React + TypeScript
- **AI Backend**: Groq API
- **UI Components**: Lucide React
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites
- Node.js v16+
- npm v8+
- [Groq API key](https://console.groq.com/) (free account)

### Installation
```bash
git clone https://github.com/your-username/ai-fitness-trainer.git
cd ai-fitness-trainer
npm install
Installation
Clone the repository:
bash
git clone https://github.com/your-username/ai-fitness-trainer.git
cd ai-fitness-trainer

Install dependencies:
bash
npm install

Create a .env file in the root directory:
env
REACT_APP_GROQ_API_KEY=your_groq_api_key_here

Start the development server:
bash
npm start
Open your browser at http://localhost:3000

Usage
Type your fitness question in the input field
Use quick questions to get started faster
Press Enter or click the Send button
Get instant fitness advice from your AI trainer

Customization
You can customize the AI personality by modifying the system prompt in the generateAIResponse function:
typescript
{
  role: 'system',
  content: 'Customize this prompt to change the AI personality...'
}