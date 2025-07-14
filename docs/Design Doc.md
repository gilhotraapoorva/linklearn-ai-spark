# Intern HackDay \- Linked\[Out\]

**Prelims date**: Jul 15, 2025  
**Final date**: Jul 17, 2025

## Authors

[Anupam Gaurav](mailto:angaurav@linkedin.com) [Sakshi Priya](mailto:sapriya@linkedin.com)[Apoorva Na](mailto:apoorva@linkedin.com)[Nashwan Nashwan](mailto:nnashwan@linkedin.com)[Prateek Mourya](mailto:pmourya@linkedin.com)[Sriteja Pashya](mailto:spashya@linkedin.com)

# Motivation & Problem Statement

In today’s rapidly evolving professional landscape, countless talented students and developers struggle to gain visibility, even when they possess outstanding skills. Platforms often reward profile polish, paid features, or prior connections over raw ability. Meanwhile, recruiters find it difficult to separate noise from genuine, job-ready talent.

Moreover, existing learning platforms suffer from extremely low course completion rates (≤15%) as users lose motivation over time. They are forced to jump between tools for learning, skill validation, and job discovery, creating fragmented experiences and a lack of measurable skill credibility.

Hackathons, on the other hand, provide immersive, hands-on opportunities to apply skills in realistic contexts. However, these are not seamlessly integrated into professional platforms like LinkedIn, missing the chance to connect learning directly with hiring potential.

**Our Goal:** To build a GenAI-powered learning companion within LinkedIn that:

* Guides users with personalized quests and challenges.  
* Visually tracks skill development via a skill graph.  
* Encourages learning through gamification (XP, streaks, badges).  
* Bridges the gap between learning and professional credibility.

# Architecture/Solution

We propose a unified, AI-powered companion module—a one-stop solution for learning, skill-building, and professional credibility **integrated directly into the LinkedIn ecosystem.**, functions as a personalized learning and hackathon companion. It uses Generative AI for dynamic quest generation, project briefs, reflections, and adaptive learning recommendations.

### **Key System Components:**

1. **Onboarding & SkillGraph Generator:**  
   * User inputs interests, current skill level, and goals.  
   * GenAI generates a universal skill map for the target role.  
   * A personalized skill graph is created comparing user profile with market trends.  
2. **Daily AI Quests:**  
   * Lightweight, adaptive tasks like:  
     * Refactor this code snippet for clarity  
     * Summarize OAuth2 in 2 lines  
   * Quests are updated daily, adjusted by GenAI based on skill progression.  
   * Feedback provided instantly using LLM capabilities.  
3. **Upcoming Hackathons:**  
   * Companies(also startups) host their premier hackathons on LinkLearn.  
   * Users submit within the LinkedIn interface.  
   * Semi-auto-evaluation logic scores code based on quality, completion, and correctness.  
4. **Gamified Dashboard:**  
   * XP bar, current streak, recent badges.  
   * SkillGraph shows role-specific mastery level via progress bars.  
5. **Contribution Journey Timeline \+ Skill Endorsements:**  
   * Each quest and hackathon is recorded with AI-generated reflection summaries.  
   * Timeline is public/shareable to boost professional credibility.  
   * Skills used in completed tasks are automatically added to the LinkedIn Skills section.  
   * A "Verified via Hackathon" badge is shown for skills demonstrated through GenAI-evaluated challenges.  
6. **AI Reflection Writer:**  
   * After each challenge, GenAI drafts a summary post:  
     * What was learned  
     * What skills were used  
     * What’s next  
   * User can edit/review and directly post to LinkedIn feed.  
   * Reflections can be used as proof to validate and endorse new skills on the user profile.

# Expected Deliverables

1. **Personalized SkillGraph Generator:**   
* Interactive onboarding flow captures interests, current proficiency, and career goals.    
* Gen-AI produces a role-specific “universal skill map” and positions the user within it.    
* Visual graph component highlights strengths, gaps, and recommended next skills; updates in real-time as quests and hackathons are completed.  
2. **AI-Generated Daily Quests:**   
* Lightweight coding or theory tasks tailored to the user’s current gaps on the SkillGraph.    
* Deterministic generation per day (seeded by date) to keep cohorts in sync.    
* Instant LLM-powered feedback and auto-scoring; XP awarded and graph updated on completion.  
3. **AI-Powered Weekly Hackathons:**   
* Partner companies supply project briefs, sample data, and evaluation criteria.    
* Platform delivers starter repos and submission pipelines to participants.    
*  Automated test harness \+ Gen-AI rubric scoring produces quantitative scores and qualitative feedback.    
* Top performers surface to sponsoring companies for potential interviews.  
4. **Gamified Learning Dashboard:**   
* Central HUD showing total XP, current streak flame, badge collection, and SkillGraph progress.    
* Real-time updates via Firestore listeners; adaptive celebratory animations on level-ups and milestones.    
5. **Timeline of Contributions:**   
* Public (or share-restricted) chronological feed of completed quests and hackathons.    
* Each entry contains AI-generated reflection summary, code link, score, and badges earned.    
* Shareable URL suitable for résumés or LinkedIn posts, demonstrating consistent growth.  
6. **AI Reflection Writer:**   
* After each challenge, Gen-AI drafts a “What I learned / Skills used / What’s next” post.    
* User can edit and publish directly to their LinkedIn feed in a single click.    
* Reflections stored for future portfolio use and recruiter review.  
7. **Skill Auto-Endorsement & Verification:**   
* When a quest or company hackathon validates a skill, the platform pushes a “Verified via Hackathon” endorsement to the user’s LinkedIn Skills section (pending user consent).    
* Badges visually distinguish AI-scored quests from company-scored hackathons for higher credibility.


# Example Workflow

### **First Login:**

* User selects role: "Backend Developer"  
* Current proficiency: Basic  
* Vvccccnheirjhedvhfgrviktkrbngdrjjngekcchrjef  
* : Advanced  
* GenAI generates:  
  * Universal skill set (e.g., Python, SQL, APIs, Docker)  
  * Skill graph: Python 40%, SQL 20%, APIs 10%, Docker 0%  
  * First quest: "Write a SQL query to list top 3 products by sales."  
* Quest: "Refactor this Flask app for better modularity."  
* User submits.  
* GenAI feedback: "Good modularization, add more error handling."  
* XP \+15, Flask skill \+10%  
* SkillGraph updates  
* Weekly Hackathon Challenge: "Build an API to fetch user data with pagination"  
* Project brief, sample data, starter repo provided.  
* After submission, reflection auto-drafted: *"This week I practiced API design and learned how to implement pagination using Flask and SQLAlchemy. I plan to add authentication next."*


  
        

# Future Scope

1. ###  **Real Backend Integration**

* Replace mock data with live APIs for quests, submissions, reflections.  
* Persist XP, streaks, and learning history.

2. ###  **Social Leaderboard**

* Show XP/streaks of user’s connections.  
* Encourage competition via friend networks.  
3. **Recruiter View**  
* Provide recruiters with view of verified skills, completed challenges, reflections.  
* Match talent with job roles based on demonstrated ability.

4. ### **Skill Endorsement via AI**

* Auto-link projects and quests to Skills section.  
* Use reflection summaries as public proof.  
* Endorse using LinkedIn’s system with badges like "Verified via AI Hackathon."

  