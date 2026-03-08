# Student Academic Portal

A modern, student-friendly academic web portal and mobile app that supports revision, assignment discussions, and collaborative study.

## Features

- **Revision Hub**: Organized notes, flashcards, and past papers.
- **Assignment Discussion Forum**: Threaded conversations, peer feedback, and teacher moderation.
- **Study Planner**: Personalized schedules, reminders, and progress tracking.
- **Resource Library**: Uploads of lecture slides, e-books, and multimedia content.
- **Collaboration Tools**: Group chats, shared whiteboards, and project spaces.
- **Gamified Learning**: Badges, leaderboards, and streaks to motivate students.
- **Accessibility & Inclusivity**: Multilingual support, dark/light mode, and mobile responsiveness.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Mobile**: PWA (Progressive Web App)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

Create `.env` file in backend directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Running the Application

1. Start the backend:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Step 1: Set Up MongoDB Atlas (Database)

1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (M0 Sandbox - free)
3. Create database user:
   - Go to "Database Access" > "Add New Database User"
   - Username: `admin`, Password: `securepassword123`
4. Allow network access:
   - Go to "Network Access" > "Add IP Address"
   - Add `0.0.0.0/0` (allow all IPs)
5. Get connection string:
   - Go to "Clusters" > "Connect" > "Connect your application"
   - Copy URI and update `backend/.env`:
     ```
     MONGODB_URI=mongodb+srv://admin:securepassword123@cluster0.xxxxx.mongodb.net/student-academic?retryWrites=true&w=majority
     ```

### Step 2: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/student-academic.git
   git push -u origin main
   ```

### Step 3: Deploy Backend to Railway

1. Sign up at [Railway](https://railway.app)
2. Create new project > Deploy from GitHub
3. Connect your GitHub repo
4. Set environment variables in Railway:
   - `MONGODB_URI` = your Atlas URI
   - `JWT_SECRET` = secure random string
   - `PORT` = 5000
5. Deploy and get backend URL (e.g., `https://your-app.railway.app`)

### Step 4: Deploy Frontend to Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Create new project > Import Git Repository
3. Select your GitHub repo
4. Configure:
   - Framework: Next.js
   - Root Directory: `frontend`
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = Railway backend URL + `/api`
6. Deploy and get frontend URL

### Step 5: Test Live Application

- Visit your Vercel URL
- Register a new account
- Test all features: notes, assignments, discussions, etc.
- The app works as a PWA on mobile devices

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Notes
- `GET /api/notes` - Get user's notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Flashcards
- `GET /api/flashcards` - Get user's flashcards
- `POST /api/flashcards` - Create flashcard
- `PUT /api/flashcards/:id` - Update flashcard
- `DELETE /api/flashcards/:id` - Delete flashcard

### Assignments
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment (teacher only)
- `POST /api/assignments/:id/submit` - Submit assignment

### Discussions
- `GET /api/discussions` - Get all discussions
- `POST /api/discussions` - Create discussion
- `POST /api/discussions/:id/reply` - Add reply

### Resources
- `GET /api/resources` - Get all resources
- `POST /api/resources` - Upload resource

### Study Plans
- `GET /api/studyplans` - Get user's study plans
- `POST /api/studyplans` - Create study plan
- `PUT /api/studyplans/:id/progress` - Update progress

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## License

This project is licensed under the MIT License.