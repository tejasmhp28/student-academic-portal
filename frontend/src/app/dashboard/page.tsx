'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('notes');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      // TODO: Fetch user data
      setUser({ name: 'User' }); // Placeholder
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const tabs = [
    { id: 'notes', name: 'Revision Hub' },
    { id: 'assignments', name: 'Assignments' },
    { id: 'discussions', name: 'Forum' },
    { id: 'resources', name: 'Resources' },
    { id: 'planner', name: 'Study Planner' },
    { id: 'gamification', name: 'Achievements' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row">
          <nav className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-2 rounded-md ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className="lg:w-3/4 lg:ml-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              {activeTab === 'notes' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Revision Hub</h2>
                  <p className="text-gray-600 dark:text-gray-300">Manage your notes and flashcards here.</p>
                  {/* TODO: Add notes and flashcards components */}
                </div>
              )}
              {activeTab === 'assignments' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Assignments</h2>
                  <p className="text-gray-600 dark:text-gray-300">View and submit assignments.</p>
                  {/* TODO: Add assignments component */}
                </div>
              )}
              {activeTab === 'discussions' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Discussion Forum</h2>
                  <p className="text-gray-600 dark:text-gray-300">Participate in discussions.</p>
                  {/* TODO: Add discussions component */}
                </div>
              )}
              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resource Library</h2>
                  <p className="text-gray-600 dark:text-gray-300">Access study materials.</p>
                  {/* TODO: Add resources component */}
                </div>
              )}
              {activeTab === 'planner' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Study Planner</h2>
                  <p className="text-gray-600 dark:text-gray-300">Plan your study schedule.</p>
                  {/* TODO: Add planner component */}
                </div>
              )}
              {activeTab === 'gamification' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Achievements</h2>
                  <p className="text-gray-600 dark:text-gray-300">View your badges and progress.</p>
                  {/* TODO: Add gamification component */}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}