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
- **Backend**: Node.js, Express.js
- **Database**: Firebase (Firestore)
- **Authentication**: Firebase Auth
- **Mobile**: PWA (Progressive Web App)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Firebase account (free tier available)

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

Create `.env` file in backend directory with your Firebase service account credentials:

```
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id","private_key_id":"key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n","client_email":"firebase-adminsdk@your-project-id.iam.gserviceaccount.com","client_id":"client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"cert-url"}
JWT_SECRET=supersecretkey123456789
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

### Step 1: Set Up Firebase (Database & Auth)

1. Visit [Firebase Console](https://console.firebase.google.com) and create a new project
2. Enable **Firestore Database**:
   - Click "Create Database"
   - Choose region (e.g., us-central1)
   - Start in "Production mode"
3. Enable **Authentication**:
   - Click "Authentication" > "Get Started"
   - Enable "Email/Password" provider
4. Generate **Service Account Key**:
   - Go to "Project Settings" > "Service Accounts"
   - Click "Generate New Private Key"
   - Copy the JSON content and save it
5. Update `backend/.env` with the service account JSON

### Step 2: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Firebase + Express backend"
   git branch -M main
   git remote add origin https://github.com/yourusername/student-academic.git
   git push -u origin main
   ```

### Step 3: Deploy Backend to Railway

1. Sign up at [Railway](https://railway.app)
2. Create new project > Deploy from GitHub
3. Connect your GitHub repo
4. Set environment variables in Railway:
   - `FIREBASE_SERVICE_ACCOUNT` = your Firebase service account JSON
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
- Register a new account (uses Firebase Auth)
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