import { db } from './firebase';
import { doc, updateDoc, getDoc, increment, setDoc, collection, Timestamp } from 'firebase/firestore';
import { toast } from 'sonner';

interface QuestSubmissionResult {
  success: boolean;
  xpEarned: number;
  newStreak: number;
}

export async function submitQuestSolution(
  userId: string,
  questId: string,
  solution: string
): Promise<QuestSubmissionResult> {
  try {
    // Get user's current data
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        xp: 0,
        streak: 0,
        longestStreak: 0,
        lastQuestDate: null,
        completedQuests: {}
      });
    }

    const userData = userDoc.exists() ? userDoc.data() : { xp: 0, streak: 0, longestStreak: 0 };
    const currentStreak = userData.streak || 0;
    const lastQuestDate = userData.lastQuestDate?.toDate() || new Date(0);
    const today = new Date();
    
    // Check if this is a consecutive day
    const isConsecutiveDay = 
      lastQuestDate.getDate() === today.getDate() - 1 ||
      (lastQuestDate.getDate() === today.getDate() && 
       lastQuestDate.toDateString() !== today.toDateString());

    // Calculate new streak
    const newStreak = isConsecutiveDay ? currentStreak + 1 : 1;

    // Calculate XP (base XP + streak bonus)
    const baseXP = 150;
    const streakBonus = Math.min(Math.floor(newStreak / 5) * 25, 100); // +25 XP every 5 days, max 100
    const totalXP = baseXP + streakBonus;

    // Create submission document
    const submissionRef = doc(collection(db, 'submissions'));
    await setDoc(submissionRef, {
      userId,
      questId,
      solution,
      xpEarned: totalXP,
      submittedAt: Timestamp.now(),
      status: 'completed'
    });

    // Update user data
    await updateDoc(userRef, {
      xp: increment(totalXP),
      streak: newStreak,
      longestStreak: Math.max(newStreak, userData.longestStreak || 0),
      lastQuestDate: Timestamp.now(),
      [`completedQuests.${questId}`]: {
        submissionId: submissionRef.id,
        completedAt: Timestamp.now(),
        xpEarned: totalXP
      }
    });

    // Show success toast
    const message = [
      '🎉 Quest Completed!',
      `+${totalXP} XP Earned!${streakBonus > 0 ? ` (Includes +${streakBonus} XP Streak Bonus!)` : ''}`,
      `🔥 ${newStreak} Day Streak!`
    ].join('\n');

    toast.success(message, {
      duration: 4000,
      position: 'top-center',
      className: 'bg-white text-gray-900 shadow-lg rounded-lg',
      style: {
        padding: '1rem',
        minWidth: '300px'
      }
    });

    return {
      success: true,
      xpEarned: totalXP,
      newStreak
    };
  } catch (error) {
    console.error('Error submitting quest:', error);
    toast.error('Failed to submit quest. Please try again.', {
      duration: 3000,
      position: 'top-center'
    });
    throw error;
  }
}

export async function submitQuizCompletion(
  userId: string,
  score: number,
  totalQuestions: number
): Promise<{ success: boolean; xpEarned: number }> {
  try {
    // Only award XP for perfect scores
    if (score !== totalQuestions) {
      return { success: true, xpEarned: 0 };
    }

    const XP_REWARD = 100; // Fixed XP reward for perfect quiz score

    // Get user's current data
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(userRef, {
        xp: XP_REWARD,
        completedQuizzes: 1
      });
    } else {
      // Update user's XP
      await updateDoc(userRef, {
        xp: increment(XP_REWARD),
        completedQuizzes: increment(1)
      });
    }

    // Show success toast
    toast.success(
      '🎉 Perfect Score!\n+100 XP Earned!',
      {
        duration: 4000,
        position: 'top-center',
        className: 'bg-white text-gray-900 shadow-lg rounded-lg',
        style: {
          padding: '1rem',
          minWidth: '300px'
        }
      }
    );

    return {
      success: true,
      xpEarned: XP_REWARD
    };
  } catch (error) {
    console.error('Error submitting quiz completion:', error);
    toast.error('Failed to update XP. Please try again.', {
      duration: 3000,
      position: 'top-center'
    });
    throw error;
  }
}
