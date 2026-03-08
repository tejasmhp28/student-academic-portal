export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Portal</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="/login" className="text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Login</a>
              <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Your Academic Companion
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">
            Study smarter with revision hubs, assignment discussions, and collaborative tools.
          </p>
          <div className="mt-8">
            <a href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700">
              Get Started
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Revision Hub</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Organize notes, flashcards, and past papers.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Assignment Forum</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Discuss assignments with peers and teachers.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Study Planner</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Personalized schedules and progress tracking.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Resource Library</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Access lecture slides, e-books, and multimedia.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Collaboration Tools</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Group chats, whiteboards, and project spaces.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Gamified Learning</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Earn badges, climb leaderboards, maintain streaks.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
