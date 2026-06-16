# Full-Stack Twitter (X) Clone

A responsive, feature-rich full-stack Twitter (X) clone built using the MERN stack with modern libraries such as React Query for state management, TailwindCSS and DaisyUI for UI styling, and Cloudinary for image hosting. The application is designed to be fully self-contained and ready to deploy as a unified service on Render.com.

---

## 🚀 Live Demo & Repository
- **Production URL:** [https://twitter-clone-bkw5.onrender.com](https://twitter-clone-bkw5.onrender.com)
- **GitHub Repository:** [https://github.com/gayatrii-ii/twitter-clone](https://github.com/gayatrii-ii/twitter-clone)

---

## ✨ Features

- **🔒 Authentication & Security:**
  - Secure Signup & Login with JWT stored in secure HTTP-only cookies.
  - Robust form validation (e.g. checking for empty fields, email format, minimum password length).
  - Password hashing using `bcryptjs`.
- **📝 Post Creation & Interactions:**
  - Create posts with text and/or images.
  - Client-side image compression (HTML5 Canvas) to optimize network payloads before Base64 upload.
  - Delete own posts, with Cloudinary asset cleanup handled automatically in the backend.
- **💬 Social Features:**
  - Like/Unlike posts with zero-latency **optimistic UI updates** via React Query.
  - Comment on posts.
  - Follow and unfollow users, updating suggested users and feeds instantly.
- **🔔 Notifications Feed:**
  - Real-time updates for Likes and Follows.
  - Feature to clear all notifications at once.
- **👤 User Profiles:**
  - Edit Profile modal to update Cover Image, Profile Picture (Avatar), Bio, Full Name, Username, and password.
  - Dedicated tabs showing User's Posts vs. Liked Posts.
- **📱 Responsive Design:**
  - Beautifully styled dark-themed UI matching the modern X (Twitter) layout.
  - Fully responsive, adjusting seamlessly from desktop screens to tablets and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
- **Framework/Build Tool:** React (Vite)
- **State Management & Data Fetching:** TanStack React Query (v5)
- **Styling:** TailwindCSS & DaisyUI
- **Routing:** React Router DOM (with Lazy-loaded routes for performance optimization)
- **Notifications:** React Hot Toast
- **Icons:** React Icons

### Backend
- **Runtime Environment:** Node.js
- **Framework:** Express.js (v5)
- **Database:** MongoDB Atlas (via Mongoose)
- **Image Cloud Storage:** Cloudinary (v2)
- **Authentication:** JSON Web Tokens (JWT) & Cookie Parser

---

## ⚙️ Project Structure

```
├── backend/
│   ├── controllers/      # Route controllers (auth, post, user, notification)
│   ├── db/               # MongoDB connection setup
│   ├── models/           # Mongoose schemas (User, Post, Notification)
│   ├── routes/           # Express API endpoints
│   ├── server.js         # Entry point, middleware, and production static serving
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/   # Common components (Post, Sidebar, RightPanel, etc.)
│   │   ├── hooks/        # Reusable React Query custom hooks
│   │   ├── pages/        # Page components (Home, Profile, Notifications, Auth)
│   │   ├── utils/        # Helper files (date formatters, image compression)
│   │   └── App.jsx       # Route configs and main wrapper
│   └── ...
├── package.json          # Root package configuration & monorepo build script
└── README.md
```

---

## 🛠️ Getting Started (Local Development)

### 1. Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v18 or higher recommended)
- npm or yarn
- MongoDB account (local database or MongoDB Atlas connection URI)
- Cloudinary account (for image upload credentials)

### 2. Clone the Repository
```bash
git clone https://github.com/gayatrii-ii/twitter-clone.git
cd twitter-clone
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_uri
PORT=5000
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### 4. Install Dependencies & Start the App
You can use the root-level scripts to run the project.

**To run the backend server & frontend client simultaneously in development mode:**
```bash
# In the root directory
npm install
npm run dev
```

The backend server runs on `http://localhost:5000` (which proxy requests from the frontend in development via the Vite configuration).

---

## 🌐 Production Deployment

The project is structured to deploy easily as a **single Render Web Service** running Node.js. 

### Express Production Setup
In production, the Express server acts as a unified service hosting both the APIs and the React client:
- Node installs all backend dependencies and builds the Vite frontend.
- Express serves the compiled static files out of `frontend/dist`.
- Standard wildcards use the Express 5 compatible `*all` path parameter to redirect direct routing entries back to `index.html`, allowing React Router to handle page routing.

### Root Build Script
Render should be configured with the following parameters:
- **Build Command:** `npm run build` (This runs installation and compiles the Vite production build inside `frontend/dist`).
- **Start Command:** `npm start` (Runs the production Express server in `backend/server.js`).

---

## 📝 License
This project is licensed under the ISC License.
