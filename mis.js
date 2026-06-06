// ===============================
// DOM ELEMENTS
// ===============================

const categorySelect =
    document.getElementById("category");

const difficultySelect =
    document.getElementById("difficulty");

const questionCountSelect =
    document.getElementById("questionCount");

const startInterviewBtn =
    document.getElementById("startInterview");

const questionText =
    document.getElementById("questionText");

const questionCounter =
    document.getElementById("questionCounter");

const answerBox =
    document.getElementById("answerBox");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const saveBtn =
    document.getElementById("saveBtn");

const timerElement =
    document.getElementById("timer");

const dailyQuestion =
    document.getElementById("dailyQuestion");

const randomQuestionBtn =
    document.getElementById("randomQuestionBtn");

const themeToggle =
    document.getElementById("themeToggle");

// ===============================
// GLOBAL VARIABLES
// ===============================

let selectedQuestions = [];

let currentQuestionIndex = 0;

let answers = [];

let countdown;

let totalTime = 300;

// ===============================
// DARK MODE
// ===============================

if (
    localStorage.getItem("theme") ===
    "dark"
) {
    document.body.classList.add("dark");
}

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );

        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            localStorage.setItem(
                "theme",
                "light"
            );
        }
    }
);

// ===============================
// START INTERVIEW
// ===============================

startInterviewBtn.addEventListener(
    "click",
    startInterview
);

function startInterview() {

    const category =
        categorySelect.value;

    const count =
        parseInt(
            questionCountSelect.value
        );

    selectedQuestions =
        interviewQuestions[
            category
        ].slice(0, count);

    currentQuestionIndex = 0;

    answers =
        new Array(count).fill("");

    loadQuestion();

    startTimer();

    showToast(
        "Interview Started"
    );
}

// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion() {

    questionText.textContent =
        selectedQuestions[
            currentQuestionIndex
        ];

    questionCounter.textContent =
        `Question ${
            currentQuestionIndex + 1
        } / ${
            selectedQuestions.length
        }`;

    answerBox.value =
        answers[
            currentQuestionIndex
        ] || "";
}

// ===============================
// SAVE ANSWER
// ===============================

saveBtn.addEventListener(
    "click",
    saveAnswer
);

function saveAnswer() {

    answers[
        currentQuestionIndex
    ] =
        answerBox.value.trim();

    localStorage.setItem(
        "current_answers",
        JSON.stringify(answers)
    );

    showToast(
        "Answer Saved"
    );
}

// ===============================
// NEXT QUESTION
// ===============================

nextBtn.addEventListener(
    "click",
    () => {

        saveAnswer();

        if (
            currentQuestionIndex <
            selectedQuestions.length - 1
        ) {

            currentQuestionIndex++;

            loadQuestion();
        }
    }
);

// ===============================
// PREVIOUS QUESTION
// ===============================

prevBtn.addEventListener(
    "click",
    () => {

        saveAnswer();

        if (
            currentQuestionIndex > 0
        ) {

            currentQuestionIndex--;

            loadQuestion();
        }
    }
);

// ===============================
// TIMER
// ===============================

function startTimer() {

    clearInterval(countdown);

    totalTime = 300;

    countdown = setInterval(
        () => {

            let minutes =
                Math.floor(
                    totalTime / 60
                );

            let seconds =
                totalTime % 60;

            timerElement.textContent =
                `${String(
                    minutes
                ).padStart(
                    2,
                    "0"
                )}:${String(
                    seconds
                ).padStart(
                    2,
                    "0"
                )}`;

            totalTime--;

            if (
                totalTime < 0
            ) {

                clearInterval(
                    countdown
                );

                showToast(
                    "Interview Time Over"
                );
            }

        },
        1000
    );
}

// ===============================
// DAILY QUESTION
// ===============================

function loadDailyQuestion() {

    const categories =
        Object.keys(
            interviewQuestions
        );

    const randomCategory =
        categories[
            Math.floor(
                Math.random() *
                categories.length
            )
        ];

    const questions =
        interviewQuestions[
            randomCategory
        ];

    const randomQuestion =
        questions[
            Math.floor(
                Math.random() *
                questions.length
            )
        ];

    dailyQuestion.textContent =
        randomQuestion;
}

loadDailyQuestion();

// ===============================
// RANDOM QUESTION BUTTON
// ===============================

randomQuestionBtn.addEventListener(
    "click",
    loadDailyQuestion
);

// ===============================
// TOAST NOTIFICATION
// ===============================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    toast.textContent =
        message;

    toast.style.display =
        "block";

    setTimeout(() => {

        toast.style.display =
            "none";

    }, 2500);
}




// =====================================
// FINISH INTERVIEW
// =====================================

const finishInterviewBtn =
    document.getElementById(
        "finishInterview"
    );

const answeredCount =
    document.getElementById(
        "answeredCount"
    );

const scoreValue =
    document.getElementById(
        "scoreValue"
    );

const historyTable =
    document.getElementById(
        "historyTable"
    );

const totalInterviewsCard =
    document.getElementById(
        "totalInterviews"
    );

const avgScoreCard =
    document.getElementById(
        "avgScore"
    );

const bestScoreCard =
    document.getElementById(
        "bestScore"
    );

const streakCard =
    document.getElementById(
        "streak"
    );

// =====================================
// STORAGE KEYS
// =====================================

const HISTORY_KEY =
    "interview_history";

const STREAK_KEY =
    "interview_streak";

// =====================================
// FINISH BUTTON
// =====================================

finishInterviewBtn.addEventListener(
    "click",
    finishInterview
);

function finishInterview() {

    saveAnswer();

    let answered =
        answers.filter(
            answer =>
                answer.trim() !== ""
        ).length;

    let score =
        Math.round(
            (
                answered /
                selectedQuestions.length
            ) * 100
        );

    answeredCount.textContent =
        answered +
        "/" +
        selectedQuestions.length;

    scoreValue.textContent =
        score + "%";

    saveInterviewHistory(
        categorySelect.value,
        score
    );

    updateDashboard();

    updateStreak();

    loadCharts();

    showToast(
        "Interview Completed"
    );
}

// =====================================
// SAVE HISTORY
// =====================================

function saveInterviewHistory(
    category,
    score
) {

    let history =
        JSON.parse(
            localStorage.getItem(
                HISTORY_KEY
            )
        ) || [];

    history.push({

        category: category,

        score: score,

        date:
            new Date()
            .toLocaleDateString()

    });

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

    renderHistory();
}

// =====================================
// RENDER HISTORY
// =====================================

function renderHistory() {

    let history =
        JSON.parse(
            localStorage.getItem(
                HISTORY_KEY
            )
        ) || [];

    historyTable.innerHTML = "";

    history.forEach(item => {

        historyTable.innerHTML += `

        <tr>

            <td>
                ${item.date}
            </td>

            <td>
                ${item.category}
            </td>

            <td>
                ${item.score}%
            </td>

        </tr>

        `;
    });
}

// =====================================
// DASHBOARD
// =====================================

function updateDashboard() {

    let history =
        JSON.parse(
            localStorage.getItem(
                HISTORY_KEY
            )
        ) || [];

    totalInterviewsCard.textContent =
        history.length;

    if (
        history.length === 0
    ) return;

    let totalScore =
        history.reduce(
            (sum, item) =>
                sum +
                item.score,
            0
        );

    let avg =
        Math.round(
            totalScore /
            history.length
        );

    let best =
        Math.max(
            ...history.map(
                item =>
                    item.score
            )
        );

    avgScoreCard.textContent =
        avg + "%";

    bestScoreCard.textContent =
        best + "%";
}

// =====================================
// STREAK SYSTEM
// =====================================

function updateStreak() {

    let streak =
        parseInt(
            localStorage.getItem(
                STREAK_KEY
            )
        ) || 0;

    streak++;

    localStorage.setItem(
        STREAK_KEY,
        streak
    );

    streakCard.textContent =
        streak + " 🔥";
}

function loadStreak() {

    let streak =
        parseInt(
            localStorage.getItem(
                STREAK_KEY
            )
        ) || 0;

    streakCard.textContent =
        streak + " 🔥";
}

// =====================================
// BOOKMARK QUESTIONS
// =====================================

const bookmarkList =
    document.getElementById(
        "bookmarkList"
    );

const BOOKMARK_KEY =
    "bookmarked_questions";

function bookmarkCurrentQuestion() {

    let bookmarks =
        JSON.parse(
            localStorage.getItem(
                BOOKMARK_KEY
            )
        ) || [];

    let question =
        selectedQuestions[
            currentQuestionIndex
        ];

    if (
        !bookmarks.includes(
            question
        )
    ) {

        bookmarks.push(
            question
        );

        localStorage.setItem(
            BOOKMARK_KEY,
            JSON.stringify(
                bookmarks
            )
        );

        renderBookmarks();

        showToast(
            "Question Bookmarked"
        );
    }
}

// =====================================
// ADD BOOKMARK BUTTON
// =====================================

const bookmarkBtn =
    document.createElement(
        "button"
    );

bookmarkBtn.textContent =
    "⭐ Bookmark";

bookmarkBtn.style.marginLeft =
    "10px";

document
    .querySelector(".controls")
    .appendChild(
        bookmarkBtn
    );

bookmarkBtn.addEventListener(
    "click",
    bookmarkCurrentQuestion
);

// =====================================
// RENDER BOOKMARKS
// =====================================

function renderBookmarks() {

    let bookmarks =
        JSON.parse(
            localStorage.getItem(
                BOOKMARK_KEY
            )
        ) || [];

    bookmarkList.innerHTML = "";

    bookmarks.forEach(
        question => {

            let li =
                document.createElement(
                    "li"
                );

            li.textContent =
                question;

            bookmarkList.appendChild(
                li
            );
        }
    );
}

// =====================================
// INITIAL LOAD
// =====================================

renderHistory();

updateDashboard();

loadStreak();

renderBookmarks();





// =====================================
// VOICE RECORDING
// =====================================

const startRecordBtn =
    document.getElementById(
        "startRecord"
    );

const stopRecordBtn =
    document.getElementById(
        "stopRecord"
    );

const audioPlayback =
    document.getElementById(
        "audioPlayback"
    );

let mediaRecorder;
let audioChunks = [];

startRecordBtn.addEventListener(
    "click",
    async () => {

        try {

            const stream =
                await navigator
                .mediaDevices
                .getUserMedia({
                    audio: true
                });

            mediaRecorder =
                new MediaRecorder(
                    stream
                );

            audioChunks = [];

            mediaRecorder.addEventListener(
                "dataavailable",
                event => {

                    audioChunks.push(
                        event.data
                    );
                }
            );

            mediaRecorder.addEventListener(
                "stop",
                () => {

                    const audioBlob =
                        new Blob(
                            audioChunks,
                            {
                                type:
                                    "audio/wav"
                            }
                        );

                    const audioUrl =
                        URL.createObjectURL(
                            audioBlob
                        );

                    audioPlayback.src =
                        audioUrl;

                    showToast(
                        "Recording Saved"
                    );
                }
            );

            mediaRecorder.start();

            showToast(
                "Recording Started"
            );

        } catch {

            showToast(
                "Microphone Access Denied"
            );
        }
    }
);

stopRecordBtn.addEventListener(
    "click",
    () => {

        if (
            mediaRecorder &&
            mediaRecorder.state ===
                "recording"
        ) {

            mediaRecorder.stop();

            showToast(
                "Recording Stopped"
            );
        }
    }
);



// =====================================
// CHARTS
// =====================================

let performanceChart;
let historyChart;

function loadCharts() {

    let history =
        JSON.parse(
            localStorage.getItem(
                HISTORY_KEY
            )
        ) || [];

    // Category Wise Scores

    let java = [];
    let spring = [];
    let sql = [];
    let hr = [];

    history.forEach(item => {

        if (
            item.category === "java"
        )
            java.push(
                item.score
            );

        if (
            item.category ===
            "spring"
        )
            spring.push(
                item.score
            );

        if (
            item.category === "sql"
        )
            sql.push(
                item.score
            );

        if (
            item.category === "hr"
        )
            hr.push(
                item.score
            );
    });

    const avg = arr =>
        arr.length
            ? Math.round(
                  arr.reduce(
                      (a, b) =>
                          a + b,
                      0
                  ) /
                      arr.length
              )
            : 0;

    const performanceCtx =
        document.getElementById(
            "performanceChart"
        );

    if (performanceChart)
        performanceChart.destroy();

    performanceChart =
        new Chart(
            performanceCtx,
            {
                type: "bar",

                data: {

                    labels: [
                        "Java",
                        "Spring",
                        "SQL",
                        "HR"
                    ],

                    datasets: [
                        {
                            label:
                                "Average Score",

                            data: [
                                avg(
                                    java
                                ),
                                avg(
                                    spring
                                ),
                                avg(
                                    sql
                                ),
                                avg(hr)
                            ]
                        }
                    ]
                }
            }
        );

    const historyCtx =
        document.getElementById(
            "historyChart"
        );

    if (historyChart)
        historyChart.destroy();

    historyChart =
        new Chart(
            historyCtx,
            {
                type: "line",

                data: {

                    labels:
                        history.map(
                            (
                                item,
                                index
                            ) =>
                                `Attempt ${
                                    index +
                                    1
                                }`
                        ),

                    datasets: [
                        {
                            label:
                                "Interview Score",

                            data:
                                history.map(
                                    item =>
                                        item.score
                                )
                        }
                    ]
                }
            }
        );
}




// =====================================
// CERTIFICATE
// =====================================

const downloadCertificateBtn =
    document.getElementById(
        "downloadCertificate"
    );

downloadCertificateBtn.addEventListener(
    "click",
    generateCertificate
);

function generateCertificate() {

    const {
        jsPDF
    } = window.jspdf;

    const doc =
        new jsPDF();

    const score =
        scoreValue.textContent;

    doc.setFontSize(
        24
    );

    doc.text(
        "Certificate of Completion",
        20,
        30
    );

    doc.setFontSize(
        16
    );

    doc.text(
        "Awarded To",
        20,
        60
    );

    doc.text(
        "Samiksha Purohit",
        20,
        80
    );

    doc.text(
        `Score Achieved: ${score}`,
        20,
        110
    );

    doc.text(
        `Date: ${new Date().toLocaleDateString()}`,
        20,
        140
    );

    doc.save(
        "Interview-Certificate.pdf"
    );

    showToast(
        "Certificate Downloaded"
    );
}