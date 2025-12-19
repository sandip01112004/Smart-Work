# Smart Work 🚀

**Smart Work** is a productivity‑focused academic resource management platform built for college students. It helps students **discover, organize, bookmark, and contribute syllabus‑wise learning resources** semester‑by‑semester — all in one place.

This project is designed as a **real-world MERN stack application** with a strong focus on **usability, collaboration, and exam‑oriented preparation**.

---

## 🔍 Problem Statement

College students often struggle with:

* Scattered resources across YouTube, PDFs, and websites
* Wasting time searching before exams
* No single trusted, syllabus‑aligned resource hub
* Difficulty revisiting saved resources efficiently

**Smart Work solves this by providing a structured, semester‑wise academic library built collaboratively by students.**

---

## 💡 Solution Overview

Smart Work provides:

* A **public academic resource library** organized by *Semester → Subject → Chapter → Concept*
* A **private study space** where users can bookmark important resources
* A **contribution system** allowing students to add useful resources for their batch
* Clean, calm UI inspired by academic tools (Notion‑style clarity)

---

## ✨ Key Features

### 🔐 Authentication

* Google Sign‑In using Firebase Authentication
* Secure user identification

### 📚 Public Resource Library

* Semester‑wise academic resources (Semester 1–8)
* Structured hierarchy: **Subject → Chapter → Concept**
* Resource types:

  * 🎥 Video (YouTube)
  * 📄 PDF
  * 🌐 Website
  * 📝 Text notes

### ⭐ Bookmarking (My Study Space)

* Save important resources privately
* Visual bookmark confirmation
* Remove bookmarks anytime

### ✍️ Contribution System

* Logged‑in users can contribute resources
* Simple contribution form
* Supports multiple content types
* Contributor attribution

### 🧪 Realistic Academic Data

* Seeded with **real, working academic resources**
* Trusted sources like Gate Smashers, NPTEL, Abdul Bari, GeeksforGeeks, etc.

---

## 🏗️ Tech Stack

### Frontend

* **React** (Vite)
* **Chakra UI** (component‑based UI)
* **React Router**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**

### Authentication

* **Firebase Authentication** (Google Login)

---

## 🧠 Architecture Overview

```
Frontend (React + Chakra UI)
        |
        | REST APIs
        v
Backend (Node + Express)
        |
        v
MongoDB (Resources, Users, Bookmarks)
```

---

## 📂 Database Design (Simplified)

### Resource Schema

* title
* description
* semester (1–8)
* subject
* chapter
* concept
* type (video | pdf | website | text | image | other)
* link / textContent
* contributor details

### User Schema

* firebaseUid
* name
* email
* bookmarked resources

---

## 🧪 UI/UX Highlights

* Academic‑calm design language
* Clear visual hierarchy
* Subtle animations for better guidance
* Optimized for desktop and scalable for PWA

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sandip01112004/smart-work.git
cd smart-work
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_key
```

### 4️⃣ Run the App

```bash
npm run dev
```

---

## 📸 Screenshots

<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/c599b9ad-0d0a-408b-bbb7-fe93c8edb7fe" />

<img width="1890" height="895" alt="image" src="https://github.com/user-attachments/assets/6f1d7267-122e-468d-b8c1-e2ccd8eb3622" />



---

## 🎯 Learning Outcomes

Through this project, I gained hands‑on experience with:

* Full‑stack MERN application development
* Firebase authentication integration
* Schema‑driven backend design
* UX‑focused frontend engineering
* Real‑world data seeding & validation
* Production‑ready project structuring

---

## 📌 Future Enhancements

* Role‑based moderation
* Search & filters
* Resource ratings
* Comments & discussions
* PWA offline support

---

## 🙌 Acknowledgements

Inspired by real student struggles and productivity tools like Notion.
Built **by a student, for students**.

---



⭐ If you like this project, feel free to star the repository!
