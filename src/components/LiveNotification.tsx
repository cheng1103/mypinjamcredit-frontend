'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  name: string;
  location: string;
  amount: number;
  timeAgo: string;
}

// Expanded data pool for maximum randomization and variety
const names = [
  // Malay names
  'Ahmad', 'Siti', 'Fatimah', 'Hassan', 'Aziz', 'Nurul', 'Zainab', 'Ibrahim', 'Aminah', 'Ismail',
  'Aisha', 'Rahman', 'Khadijah', 'Yusuf', 'Maryam', 'Ali', 'Farah', 'Omar', 'Nadia', 'Hakim',
  'Zulaikha', 'Karim', 'Sofea', 'Rashid', 'Aisyah', 'Hamid', 'Laila', 'Farhan', 'Amira', 'Hadi',
  // Chinese names
  'Lee', 'Wong', 'Tan', 'Lim', 'Chen', 'Ng', 'Chong', 'Teo', 'Ong', 'Goh',
  'Mei Ling', 'Wei', 'Xin Yi', 'Jun Hao', 'Yi Ting', 'Jia Wei', 'Hui Min', 'Kai', 'Lin', 'Yang',
  'Cheng', 'Feng', 'Yun', 'Ming', 'Hui', 'Wen', 'Li', 'Hao', 'Xiang', 'Yu',
  // Indian names
  'Kumar', 'Raj', 'Priya', 'Ravi', 'Devi', 'Suresh', 'Lakshmi', 'Anand', 'Maya', 'Sanjay',
  'Kavitha', 'Deepak', 'Indra', 'Ganesh', 'Rani', 'Vijay', 'Shanti', 'Rajan', 'Muthu', 'Selvam',
  // Other names
  'David', 'Sarah', 'Michael', 'Linda', 'James', 'Emily', 'Daniel', 'Jessica', 'Robert', 'Maria'
];

const locations = [
  // States
  'Kuala Lumpur', 'Selangor', 'Johor Bahru', 'Penang', 'Melaka', 'Perak', 'Kedah', 'Sabah', 'Sarawak',
  'N. Sembilan', 'Pahang', 'Terengganu', 'Kelantan', 'Perlis', 'Putrajaya', 'Labuan',
  // Major cities
  'Petaling Jaya', 'Shah Alam', 'Subang Jaya', 'Klang', 'Ipoh', 'Kota Kinabalu', 'Kuching',
  'Kota Bharu', 'Alor Setar', 'Kuantan', 'Muar', 'Batu Pahat', 'Seremban', 'Taiping',
  'Kulai', 'Segamat', 'Kluang', 'Sandakan', 'Tawau', 'Sibu', 'Miri'
];

const loanAmounts = [
  // Small loans
  3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500,
  // Medium loans
  8000, 8500, 9000, 9500, 10000, 11000, 12000, 13000, 14000, 15000,
  // Large loans
  16000, 17000, 18000, 19000, 20000, 22000, 24000, 26000, 28000, 30000,
  // Very large loans
  32000, 35000, 38000, 40000, 42000, 45000, 48000, 50000, 55000, 60000
];

const timeAgoOptions = [
  '1 min ago', '2 mins ago', '3 mins ago', '5 mins ago', '7 mins ago', '10 mins ago',
  '12 mins ago', '15 mins ago', '18 mins ago', '20 mins ago', '25 mins ago', '30 mins ago'
];

// Fisher-Yates shuffle for better randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate unique notification pool with no immediate repetition
function generateNotificationPool(count: number): Notification[] {
  const shuffledNames = shuffleArray(names);
  const shuffledLocations = shuffleArray(locations);
  const shuffledAmounts = shuffleArray(loanAmounts);
  const shuffledTimes = shuffleArray(timeAgoOptions);

  const notifications: Notification[] = [];
  const usedCombinations = new Set<string>();

  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loop

  while (notifications.length < count && attempts < maxAttempts) {
    const nameIndex = attempts % shuffledNames.length;
    const locationIndex = Math.floor(attempts / shuffledNames.length) % shuffledLocations.length;
    const amountIndex = Math.floor(attempts / (shuffledNames.length * shuffledLocations.length)) % shuffledAmounts.length;
    const timeIndex = attempts % shuffledTimes.length;

    const name = shuffledNames[nameIndex];
    const location = shuffledLocations[locationIndex];
    const amount = shuffledAmounts[amountIndex];
    const timeAgo = shuffledTimes[timeIndex];

    // Create unique key to avoid exact duplicates
    const combinationKey = `${name}-${location}-${amount}`;

    if (!usedCombinations.has(combinationKey)) {
      notifications.push({
        id: notifications.length,
        name,
        location,
        amount,
        timeAgo
      });
      usedCombinations.add(combinationKey);
    }

    attempts++;
  }

  return shuffleArray(notifications); // Final shuffle for extra randomness
}

export function LiveNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Generate large pool of highly randomized, non-repeating notifications
    const initialNotifications = generateNotificationPool(40);
    setNotifications(initialNotifications);

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (notifications.length === 0) return;

    // Cycle through notifications every 30 seconds
    const cycleInterval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
        setIsVisible(true);
      }, 500); // Wait for fade out animation
    }, 30000); // 30 seconds

    return () => clearInterval(cycleInterval);
  }, [notifications.length]);

  if (notifications.length === 0) return null;

  const currentNotification = notifications[currentIndex];

  return (
    <>
      {/* Notification Toast */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-80 max-w-[calc(100vw-3rem)] transition-all duration-500 md:bottom-8 md:right-8 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-green-100 bg-white shadow-2xl">
          {/* Green accent bar */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-green-400 to-green-600"></div>

          <div className="p-4 pl-6">
            {/* Header with icon */}
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-green-600">Loan Approved!</div>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-slate-400 transition hover:text-slate-600"
                aria-label="Dismiss notification"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="text-sm">
              <p className="font-semibold text-slate-900">
                {currentNotification.name} from {currentNotification.location}
              </p>
              <p className="mt-1 text-slate-600">
                just got approved for{' '}
                <span className="font-semibold text-blue-600">
                  RM {currentNotification.amount.toLocaleString()}
                </span>
              </p>
              <p className="mt-2 text-xs text-slate-500">{currentNotification.timeAgo}</p>
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="h-1 w-full overflow-hidden bg-slate-100">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600"
              style={{
                animation: isVisible ? 'progressBar 30s linear' : 'none',
                width: '0%'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add keyframes for progress bar animation */}
      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
