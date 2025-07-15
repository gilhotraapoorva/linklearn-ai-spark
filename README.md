# LinkLearn - AI-Powered Learning Platform

LinkLearn is an innovative learning companion that combines the power of AI with gamified learning experiences to help developers and professionals upskill effectively. Built for the LinkedIn HackDay - Linked[Out] hackathon, it bridges the gap between learning and professional credibility.

## 🚀 Features

### Core Functionality
- **AI-Generated Daily Quests**: Personalized coding challenges powered by Ollama/LLaMA 3
- **Skill Graph Visualization**: Interactive skill tracking and progress monitoring
- **Gamification System**: XP tracking, badges, streaks, and achievements
- **Real-time Dashboard**: Live updates of learning progress and statistics
- **LinkedIn Integration**: Seamless integration with professional networking

### Key Components
- **Personalized SkillGraph Generator**: Visual representation of skills and learning paths
- **Weekly Hackathons**: Company-sponsored challenges with automated evaluation
- **AI Reflection Writer**: Automated learning summaries and insights
- **Timeline of Contributions**: Public portfolio of completed challenges
- **Skill Auto-Endorsement**: Verified skill validation through completed challenges

## 🎥 Demo Video
Watch our demo video: [LinkLearn Demo](https://drive.google.com/file/d/17YhBONWEBg8dBoira9fGTwFFJop4Jj2e/view?usp=drive_link)

## 🛠️ Technology Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS & Radix UI components
- Vite (Build tool & dev server)
- React Router for navigation

**Backend:**
- Node.js with Express.js
- Ollama/LLaMA 3 for AI-powered quest generation

**Database & Authentication:**
- Firebase Firestore for real-time data synchronization
- Firebase Auth for user authentication

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- **Ollama with LLaMA 3** (see installation steps below)
- Firebase project setup

### Ollama Installation

1. **Download and Install Ollama**
   - Visit [https://ollama.ai](https://ollama.ai) and download Ollama for your OS
   - Or use the command line:
   ```bash
   # On Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # On Mac and Windows
   # Download the installer from https://ollama.ai
   ```

2. **Install LLaMA 3 Model**
   ```bash
   ollama pull llama3
   ```

3. **Verify Installation**
   ```bash
   ollama list
   ```
   You should see `llama3` in the list of available models.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gilhotraapoorva/linklearn-ai-spark.git
   cd linklearn-ai-spark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Configure Firebase credentials
   - Ensure Ollama is properly configured

### Running the Application

1. **Check if Ollama is running** (it usually starts automatically)
   ```bash
   # Verify Ollama is running
   ollama list
   ```
   
   If you get an error, start Ollama manually:
   ```bash
   ollama serve
   ```
   
   **Note**: If you see "address already in use" error, Ollama is already running and you can proceed to step 2.

2. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8080`.

### Demo Credentials
For testing purposes, use these credentials:
- **Email**: `john@gmail.com`
- **Password**: `1234567`

## 📋 Project Structure

```
linklearn-ai-spark/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Application pages
│   ├── lib/                # Utilities and contexts
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── server.cjs             # Express.js backend server
├── docs/                  # Documentation
└── package.json           # Dependencies and scripts
```

## 🎯 Key Features Implementation

### AI-Powered Quest Generation
- Deterministic daily quest generation using Ollama API
- Real-time feedback and scoring

### Gamification System
- XP tracking and level progression
- Achievement badges with rarity system
- Daily streak maintenance
- Visual progress indicators

### Real-time Updates
- Firebase Firestore for live data synchronization
- Real-time dashboard updates
- Instant progress tracking

## 🏆 Hackathon Information

**Event**: LinkedIn HackDay - Linked[Out]  
**Dates**: July 15-17, 2025  
**Team**: Anupam Gaurav, Sakshi Priya, Apoorva Na, Nashwan Nashwan, Prateek Mourya, Sriteja Pashya

---

*Built with ❤️ for LinkedIn HackDay - Linked[Out] 2025*