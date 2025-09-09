📚 Bookly — Elegant Book Catalog App
Bookly is a modern, mobile-friendly book cataloging platform built with React + Vite. It allows users to browse, filter, and review books by genre, rating, and title. Designed with a nude-tone aesthetic and premium UX, Bookly delivers a frustration-free experience across devices.

🚀 Live Demo
👉 https://anmolugale13.github.io/bookly-frontend/

🛠 Tech Stack
| Frontend        | Backend         | Deployment       |
|-----------------|-----------------|------------------|
| React + Vite    | Node.js + Express | GitHub Pages     |
| Inline CSS      | MongoDB Atlas     | HashRouter + 404 fallback |
| Axios           | JWT Auth          | Vite config base path |

✨ Features

- 🔍 **Search & Filter** by title, genre, rating, and sort order  
- 📖 **Book Details** with cover, author, genres, and reviews  
- 🧠 **User Auth** with login/signup and protected routes  
- 📝 **Add Book** form with validation and image upload  
- 📱 **Responsive Design** with mobile-first layout  
- 🎨 **Nude-tone UI** for elegant, modern aesthetics  
- 🧭 **404-safe routing** for GitHub Pages reloads  

## 📦 Folder Structure
frontend/

├── public/

├── src/

│   ├── api/           # Axios config

│   ├── assets/        # Images and icons

│   ├── components/    # Reusable UI (BookCard, RatingStars)

│   ├── context/       # AuthContext

│   ├── pages/         # Home, Login, Signup, AddBook, BookDetails

│   ├── App.jsx        # Main app with routing

│   └── main.jsx       # Vite entry point

├── index.html

├── vite.config.js     # Base path for GitHub Pages

└── README.md


