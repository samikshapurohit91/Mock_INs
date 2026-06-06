#  Mock Interview Simulator

A comprehensive Mock Interview Simulator built using HTML, CSS, and JavaScript that helps users practice technical and HR interviews through category-based question sets, timers, voice recording, analytics dashboards, interview history tracking, and PDF certificate generation.

---

##  Features

###  Interview Categories
- Java
- Spring Boot
- SQL
- HR Interview Questions

###  Interview System
- Start Interview Session
- Select Category
- Select Difficulty Level
- Select Number of Questions
- Next / Previous Navigation
- Save Answers
- Question Counter
- Countdown Timer

###  Answer Management
- Write and save answers
- Auto-save using LocalStorage
- Resume interview progress

###  Bookmark Questions
- Bookmark important questions
- View bookmarked questions later

###  Daily Challenge
- Random interview question generator
- Daily practice question

###  Analytics Dashboard
- Total Interviews
- Average Score
- Best Score
- Interview Streak

###  Charts & Reports
- Category-wise Performance Chart
- Interview History Chart
- Progress Visualization using Chart.js

###  Voice Recording
- Record interview answers
- Playback recordings
- Browser-based microphone support

###  Certificate Generation
- Generate PDF certificate after interview completion
- Download certificate instantly

###  User Experience
- Dark Mode
- Responsive Design
- Toast Notifications
- Modern Dashboard UI

###  Local Storage
- Interview History
- Saved Answers
- Bookmarks
- Theme Preference
- Streak Tracking

---

##  Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API
- Chart.js
- jsPDF
- MediaRecorder API

---

##  Project Structure

```text
mock-interview-simulator/
│
├── index.html
├── style.css
├── script.js
├── questions.js
├── README.md

```

---

##  Installation

### Clone Repository

```bash
git clone https://github.com/samikshapurohit91/Mock_INs.git
```

### Open Project

```bash
cd mock-interview-simulator
```

### Run

Simply open:

```text
mis.html
```

in your browser.

No backend setup required.

---

## 🎮 How To Use

### Step 1
Select:
- Interview Category
- Difficulty Level
- Number Of Questions

### Step 2
Click:

```text
Start Interview
```

### Step 3
Answer questions using:
- Text Input
- Voice Recording

### Step 4
Save answers and navigate through questions.

### Step 5
Finish interview and view:
- Score
- Analytics
- Interview History

### Step 6
Download PDF certificate.

---

##  Scoring Logic

```text
Answered Question = 1 Point

Score =
(Answered Questions / Total Questions) × 100
```

Example:

```text
Answered: 8/10

Score: 80%
```

---



