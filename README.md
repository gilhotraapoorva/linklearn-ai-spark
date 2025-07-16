# LinkedIn Hackathons - AI-Powered Hackathon Platform

An innovative hackathon platform integrated directly into LinkedIn that combines AI assistance with professional networking to revolutionize how developers participate in hackathons. Built for the LinkedIn HackDay - Linked[Out] hackathon using **Vibe Coding** methodology, this platform seamlessly integrates hackathon discovery, team formation, and participation into the professional networking experience.

## 🚀 Features

### Primary Hackathon Features
- **LinkedIn Navbar Integration**: Seamless "Hackathons" option added to LinkedIn's main navigation
- **Profile Hackathons Card**: New hackathons section in user profiles alongside education, skills, and experience
- **Company Hackathon Management**: Recruiters can add and manage hackathons directly from their company pages
- **AI-Powered Pixie Chatbot**: Intelligent assistant to help discover hackathons and find team members
- **Real-time Dashboard**: Live updates of hackathon participation and progress

### Learning & Gamification Features
- **AI-Generated Daily Quests**: Personalized coding challenges powered by Ollama/LLaMA 3 (Daily Dev Dose)
- **Skill Graph Visualization**: Interactive skill tracking and progress monitoring
- **Gamification System**: XP tracking, badges, streaks, and achievements
- **AI Reflection Writer**: Automated learning summaries and insights

### Key Components
- **Hackathon Discovery**: Browse and search hackathons across different companies and technologies
- **Team Formation**: AI-assisted matching with compatible team members
- **Weekly Hackathons**: Company-sponsored challenges with automated evaluation
- **Timeline of Contributions**: Public portfolio of completed challenges and hackathons
- **Skill Auto-Endorsement**: Verified skill validation through completed challenges

## 🎥 Demo Video
Watch our demo video: [LinkedIn Hackathons Demo](https://drive.google.com/file/d/17YhBONWEBg8dBoira9fGTwFFJop4Jj2e/view?usp=drive_link)

## 🛠️ Technology Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS & Radix UI components
- Vite (Build tool & dev server)
- React Router for navigation

**Backend:**
- Node.js with Express.js
- Ollama/LLaMA 3 for AI-powered Pixie chatbot and quest generation

**Database & Authentication:**
- Firebase Firestore for real-time data synchronization
- Firebase Auth for user authentication

**LinkedIn Integration:**
- Custom userscripts for LinkedIn UI modifications
- Seamless integration with existing LinkedIn interface

**Development Methodology:**
- Built using **Vibe Coding** - an innovative development approach

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

2. **Install LLaMA 3 Model** (for Pixie AI assistant and quest generation)
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

**Note**: This repository contains the hackathon platform backend and dashboard. LinkedIn UI modifications (navbar integration, profile cards) are handled by separate userscripts and are not part of this repository.

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

**LinkedIn Integration**: The LinkedIn navbar modifications and profile cards are implemented via userscripts. After setting up the main application, the hackathons feature will appear as a new option in LinkedIn's navigation bar.

### Demo Credentials
For testing purposes, use these credentials:
- **Email**: `anupam@example.com`
- **Password**: `a1s2d3f4`

## 📋 Project Structure

```
linklearn-ai-spark/
├── src/
│   ├── components/          # React components (hackathon & learning features)
│   ├── pages/              # Application pages (dashboard, hackathon details, learning)
│   ├── lib/                # Utilities, contexts, and AI services
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
├── server.cjs             # Express.js backend server
├── docs/                  # Documentation
├── linkedin-hackathons-*.user.js  # LinkedIn UI modification scripts
└── package.json           # Dependencies and scripts
```

**Note**: LinkedIn UI modifications are handled by the `linkedin-hackathons-*.user.js` files, which are userscripts that modify the LinkedIn interface to add hackathon features.

## 🎯 Key Features Implementation

### LinkedIn Integration (Primary Focus)
- **Navbar Integration**: Seamless addition of "Hackathons" to LinkedIn's main navigation
- **Profile Cards**: New hackathons section in user profiles alongside existing sections
- **Company Pages**: Recruiters can manage hackathons directly from company pages

### AI-Powered Features
- **Pixie Chatbot**: Intelligent assistant for hackathon discovery and team matching
- **Daily Dev Dose**: AI-generated coding challenges using Ollama/LLaMA 3
- **Smart Recommendations**: Personalized hackathon suggestions based on skills and interests

### Hackathon Management
- **Event Discovery**: Browse hackathons across companies and technologies
- **Team Formation**: AI-assisted matching with compatible developers
- **Real-time Updates**: Live progress tracking and notifications

### Learning & Gamification System
- **Quest Generation**: Deterministic daily quest generation using Ollama API
- **XP Tracking**: Level progression and achievement badges with rarity system
- **Skill Visualization**: Interactive skill graphs and learning paths
- **Daily Streaks**: Streak maintenance and visual progress indicators

### Real-time Platform
- Firebase Firestore for live data synchronization
- Real-time dashboard updates for both hackathons and learning progress
- Instant notifications and updates

### Development Approach
- **Vibe Coding**: Built using innovative vibe coding methodology
- **Rapid Prototyping**: Fast iteration and feature development
- **User-Centric Design**: Focus on seamless LinkedIn integration

## 🏆 Hackathon Information

**Event**: LinkedIn HackDay - Linked[Out]  
**Dates**: July 15-17, 2025  
**Team**: Anupam Gaurav, Sakshi Priya, Apoorva Na, Nashwan Nashwan, Prateek Mourya, Sriteja Pashya

---

*Built with ❤️ for LinkedIn HackDay - Linked[Out] 2025*