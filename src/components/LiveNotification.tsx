'use client';

import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  name: string;
  location: string;
  amount: number;
  timeAgo: string;
}

// Sample data pool for realistic notifications
const names = [
  'Ahmad', 'Siti', 'Lee', 'Kumar', 'Tan', 'Fatimah', 'Wong', 'Raj', 'Mei Ling', 'Hassan',
  'Aziz', 'Nurul', 'Chen', 'Priya', 'Lim', 'Aisha', 'David', 'Sarah', 'Michael', 'Linda'
];

const locations = [
  'KL', 'Selangor', 'JB', 'Penang', 'Melaka', 'Perak', 'Kedah', 'Sabah', 'Sarawak',
  'N. Sembilan', 'Pahang', 'Terengganu', 'Kelantan', 'Perlis', 'Putrajaya'
];

const loanAmounts = [5000, 8000, 10000, 12000, 15000, 18000, 20000, 25000, 30000, 35000, 40000, 50000];

const timeAgoOptions = ['2 mins ago', '5 mins ago', '8 mins ago', '12 mins ago', '15 mins ago', '20 mins ago'];

function generateNotification(id: number): Notification {
  return {
    id,
    name: names[Math.floor(Math.random() * names.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    amount: loanAmounts[Math.floor(Math.random() * loanAmounts.length)],
    timeAgo: timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)]
  };
}

export function LiveNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Generate initial pool of notifications
    const initialNotifications = Array.from({ length: 10 }, (_, i) => generateNotification(i));
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
