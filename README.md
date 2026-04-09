# 📌 GitHub Issue Tracker

A modern, responsive web application that visually displays and manages GitHub-style issues in a clean card-based layout. Users can easily **filter**, **search**, and **explore** issues based on their status (Open/Closed) and titles.

---

## ✨ Live Demo
[View Live Demo](https://afaz31028.github.io/Github-Issue-Tracker-Project/home.html)  

---

## 🚀 Features

- **📋 Issue Cards**  
  Each issue is displayed in a beautifully structured card including:
  - Issue Title
  - Description
  - Problem Tags / Labels
  - Priority Tag (Low, Medium, High)
  - Issue Creator / Assignee Name
  - Date & Time

- **🎨 Dynamic Status Styling**  
  - 🟢 **Green top border** for Open Issues  
  - 🟣 **Violet top border** for Closed Issues

- **🔘 Filter Toggle Buttons**  
  - **All** → Displays all issues  
  - **Open** → Shows only open issues with total count  
  - **Closed** → Shows only closed issues with total count

- **🔍 Real-time Search**  
  Search bar in the navbar filters issues instantly by title.

- **⚡ Interactive & Smooth UI**  
  Instant filtering and updating without page reload. Fully responsive across devices.

---

## 🛠️ Technologies Used

- **HTML5** – Semantic structure  
- **CSS3** – Custom styling  
- **Tailwind CSS** – Utility-first responsive design  
- **DaisyUI** – Beautiful pre-built components and themes  
- **JavaScript (ES6)** – Dynamic filtering, search, and interactivity  

---

## How It Works
#### 🔹 Data Handling

- Issues are stored as JavaScript objects containing all necessary details such as title, status, tags, and timestamps.

####🔹 Filtering System
- Toggle buttons trigger filtering logic
- Dynamically updates UI based on selected category
- Displays total number of issues per filter
####🔹 Search System
- Captures user input from the navbar
- Matches input with issue titles
- Updates displayed cards instantly

----

## 🎯 Future Improvements
- 🔗 Integration with GitHub API
- 🌙 Dark/Light mode toggle
- 📱 Improved mobile responsiveness
- 🧠 Advanced filtering (tags, priority)
- 📌 Pagination / infinite scrolling

---

## how to run it on local Machine

####Follow these steps to run GitHub Issue Tracker on your local machine:

### 1️⃣ Clone the Repository
- https://github.com/Afaz31028/Github-Issue-Tracker-Project.git

### 2️⃣ Navigate to Project Folder
  - cd github-issue-tracker
  
### 3️⃣ Open the Project
Since this is a simple frontend project (HTML, CSS, JavaScript), you can run it in multiple ways:

### ✅ Option 1: Open Directly in Browser
- Open index.html file in your browser
- Double click or right-click → Open with browser

### ✅ Option 2: Use Live Server (Recommended)
If you are using Visual Studio Code:

- Install Live Server Extension
- Right-click on index.html
- Click "Open with Live Server"
