# URL Shortener

This is a simple URL shortening app! You paste a long URL, and it gives you a short one (plus a QR code) that you can share. It’s like a magic shrink ray for links! The frontend (the part you see) lives on GitHub Pages, and the backend (the part that does the shrinking) runs on Vercel.

- **Frontend Repo**: [https://github.com/Jagan515/Url-shortner](https://github.com/Jagan515/Url-shortner)
- **Backend Repo**: [https://github.com/Jagan515/url-backend](https://github.com/Jagan515/url-backend)
- **Live Frontend**: [https://Jagan515.github.io/Url-shortner](https://Jagan515.github.io/Url-shortner)
- **Live Backend**: [https://url-backend-tau.vercel.app](https://url-backend-tau.vercel.app)

---

## How It Works
1. **Frontend**: Built with React and Vite, hosted on GitHub Pages. You type a URL, hit "Shorten," and it shows a short link and QR code.
2. **Backend**: Built with Node.js, Express, and MongoDB, hosted on Vercel. It shrinks the URL, saves it, and makes the QR code.
3. **Database**: MongoDB stores the long URLs and their short codes.

When you click a short link (like `https://url-backend-tau.vercel.app/we`), it takes you to the original long URL!

---

## Features
- Shorten any URL into a tiny one.
- Add a custom alias (e.g., `we`) if you want.
- Get a QR code to scan with your phone.
- Works on desktop and mobile.

---

## Setup (For Developers)

### Prerequisites
- **Node.js**: v20.15.0 or higher (get it from [nodejs.org](https://nodejs.org)).
- **npm**: Comes with Node.js.
- **Git**: To clone the repos (get it from [git-scm.com](https://git-scm.com)).
- **MongoDB**: A free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the database.
- **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
- **GitHub Account**: For hosting the frontend.

### Backend Setup (`url-backend`)
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/Jagan515/url-backend.git
   cd url-backend
