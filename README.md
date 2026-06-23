# <p align="center">movie-db</p>

<p align="center">Discover, search, and track the most popular movies with a lightning-fast React application powered by serverless Firebase.</p>

<p align="center">
  <img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge" />
  <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" />
</p>

---

## Overview

`movie-db` is an intuitive, high-performance React application that offers instant movie search capabilities. Its serverless Firebase backend ensures real-time updates and automatically surfaces the top 5 most searched movies, giving users immediate insight into trending content and a seamless browsing experience. This project demonstrates modern web development practices, leveraging serverless architecture for scalability and efficiency.

---

## Key Features

*   🔍 **Instant Movie Search**: Quickly find any movie by title, delivering results in real-time as you type.
*   ⚡ **Real-time Trend Tracking**: Automatically updates and displays the top 5 most searched movies, keeping you informed on what's popular now.
*   🚀 **Blazing Fast Performance**: Built with React and a serverless Firebase backend for a smooth, responsive user interface and minimal load times.
*   ☁️ **Serverless Architecture**: Leverages Firebase for robust, scalable backend services (Firestore for data, Hosting for deployment) without managing infrastructure.
*   📱 **Responsive Design**: Enjoy a consistent and appealing experience across all devices, from desktops to mobile phones.
*   🛡️ **Secure Data Handling**: Firebase's integrated security rules protect your search data and ensure robust backend operations.

---

## Technical Architecture

The `movie-db` application is built upon a robust and scalable modern web stack, combining a reactive frontend with a powerful serverless backend.

### Tech Stack

| Technology | Purpose                               | Key Benefit                                                 |
| :--------- | :------------------------------------ | :---------------------------------------------------------- |
| **React**  | Frontend UI Library                   | Declarative, component-based development for dynamic UIs.   |
| **Vite**   | Build Tool & Development Server       | Extremely fast development server and optimized production builds. |
| **Firebase** | Serverless Backend (Firestore, Hosting) | Real-time database, authentication, and global hosting for scalability. |
| **JavaScript** | Primary Language                      | Versatile and ubiquitous for both frontend logic and Firebase functions. |
| **Node.js** | Runtime Environment                   | Executes JavaScript outside the browser, powering development tools. |

### Directory Structure

```
movie-db/
├── 📁 .firebase/                     # Firebase local emulation and configuration
├── 📄 .firebaserc                   # Firebase project aliases
├── 📁 .github/                      # GitHub Actions workflows or issue templates
├── 📄 .gitignore                    # Specifies intentionally untracked files to ignore
├── 📄 README.md                     # Project documentation
├── 📄 eslint.config.js              # ESLint configuration for code quality
├── 📄 firebase.json                 # Firebase project configuration (hosting, functions, etc.)
├── 📄 firestore.indexes.json        # Firestore custom index definitions
├── 📄 firestore.rules               # Firestore security rules
├── 📄 index.html                    # Main HTML entry point for the React app
├── 📄 package-lock.json             # Records exact dependency versions
├── 📄 package.json                  # Project metadata and script definitions
├── 📁 public/                       # Static assets served directly
├── 📁 src/                          # Main application source code
└── 📄 vite.config.js                # Vite build tool configuration
```

---

## Operational Setup

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: [LTS version recommended](https://nodejs.org/en/download/)
*   **npm**: (Comes with Node.js) or [Yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
*   **Firebase CLI**: Globally installed for interacting with Firebase services.
    ```bash
    npm install -g firebase-tools
    ```

### Installation

Follow these steps to get a local copy of the project up and running:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/YOUR_USERNAME/movie-db.git
    cd movie-db
    ```
    *(Remember to replace `YOUR_USERNAME` with the actual GitHub username or organization if forking.)*

2.  **Install Dependencies**:
    ```bash
    npm install # Or yarn install / pnpm install
    ```

3.  **Start the Development Server**:
    ```bash
    npm run dev # Or yarn dev / pnpm dev
    ```
    The application will typically be accessible at `http://localhost:5173`.

### Environment Configuration

This project relies on Firebase for its backend services. To set up your environment:

1.  **Create a Firebase Project**:
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2.  **Login to Firebase CLI**:
    ```bash
    firebase login
    ```

3.  **Associate Project**:
    *   Link your local project to your Firebase project. The `.firebaserc` file might already contain a project alias. If not, you can initialize Firebase:
        ```bash
        firebase init
        ```
        Follow the prompts to select your project, choose `Firestore` and `Hosting`, and ensure the `public` directory for hosting is set to `dist` (Vite's default build output).

4.  **Deploy Firestore Rules and Indexes**:
    *   The `firestore.rules` and `firestore.indexes.json` files define the security and indexing for your database. Deploy them:
        ```bash
        firebase deploy --only firestore
        ```

5.  **Deploy Hosting (Optional, for production)**:
    *   To deploy the React application to Firebase Hosting:
        ```bash
        npm run build       # First, build the React app for production
        firebase deploy --only hosting
        ```
