/* =====================================================
   ACADEMIC STUDENT TRACKER
===================================================== */


/* ================= DATA ================= */

let students = JSON.parse(
    localStorage.getItem("academicStudents")
) || [

    {
        id: 1,
        name: "Advaith Kumar",
        roll: "1EC25EC001"
    },

    {
        id: 2,
        name: "Rahul Sharma",
        roll: "1EC25EC002"
    },

    {
        id: 3,
        name: "Priya Reddy",
        roll: "1EC25EC003"
    },

    {
        id: 4,
        name: "Arjun Singh",
        roll: "1EC25EC004"
    }

];


let subjects = JSON.parse(
    localStorage.getItem("academicSubjects")
) || [

    {
        id: 1,
        name: "Digital Electronics",
        code: "BEC301",
        score: 82
    },

    {
        id: 2,
        name: "Analog Electronics",
        code: "BEC302",
        score: 76
    },

    {
        id: 3,
        name: "Signals and Systems",
        code: "BEC303",
        score: 88
    },

    {
        id: 4,
        name: "Communication Systems",
        code: "BEC304",
        score: 79
    },

    {
        id: 5,
        name: "Microprocessors",
        code: "BEC305",
        score: 91
    }

];


let marks = JSON.parse(
    localStorage.getItem("academicMarks")
) || [

    {
        student: "Advaith Kumar",
        subject: "Digital Electronics",
        internal: 18,
        assignment: 9,
        exam: 42
    },

    {
        student: "Advaith Kumar",
        subject: "Analog Electronics",
        internal: 17,
        assignment: 8,
        exam: 39
    },

    {
        student: "Rahul Sharma",
        subject: "Digital Electronics",
        internal: 15,
        assignment: 8,
        exam: 36
    }

];


let attendance = JSON.parse(
    localStorage.getItem("academicAttendance")
) || [

    {
        student: "Advaith Kumar",
        subject: "Digital Electronics",
        classes: 30,
        present: 27
    },

    {
        student: "Advaith Kumar",
        subject: "Analog Electronics",
        classes: 28,
        present: 24
    },

    {
        student: "Rahul Sharma",
        subject: "Digital Electronics",
        classes: 30,
        present: 25
    }

];


let tasks = JSON.parse(
    localStorage.getItem("academicTasks")
) || [

    {
        title: "Digital Electronics Assignment",
        subject: "Digital Electronics",
        type: "Assignment",
        date: "2026-10-05"
    },

    {
        title: "Communication Systems Internal Exam",
        subject: "Communication Systems",
        type: "Exam",
        date: "2026-10-10"
    },

    {
        title: "Microprocessor Lab Record",
        subject: "Microprocessors",
        type: "Lab",
        date: "2026-10-12"
    }

];


let goals = JSON.parse(
    localStorage.getItem("academicGoals")
) || [

    {
        title: "Maintain 85% Attendance",
        description: "Keep attendance above university requirement.",
        progress: 78
    },

    {
        title: "Improve Mathematics",
        description: "Score at least 80% in the next examination.",
        progress: 65
    },

    {
        title: "Complete Assignments",
        description: "Submit all assignments before deadlines.",
        progress: 90
    }

];


/* ================= SAVE ================= */

function saveData() {

    localStorage.setItem(
        "academicStudents",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "academicSubjects",
        JSON.stringify(subjects)
    );

    localStorage.setItem(
        "academicMarks",
        JSON.stringify(marks)
    );

    localStorage.setItem(
        "academicAttendance",
        JSON.stringify(attendance)
    );

    localStorage.setItem(
        "academicTasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "academicGoals",
        JSON.stringify(goals)
    );

}


/* ================= LOGIN ================= */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const user =
                document.getElementById(
                    "username"
                ).value;

            const pass =
                document.getElementById(
                    "password"
                ).value;

            if (
                user === "admin" &&
                pass === "1234"
            ) {

                document
                    .getElementById(
                        "loginScreen"
                    )
                    .classList.add(
                        "hidden"
                    );

                document
                    .getElementById(
                        "application"
                    )
                    .classList.remove(
                        "hidden"
                    );

                initialize();

            } else {

                showToast(
                    "Invalid login details"
                );

            }

        }
    );


/* ================= LOGOUT ================= */

document
    .getElementById("logout")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "application"
                )
                .classList.add(
                    "hidden"
                );

            document
                .getElementById(
                    "loginScreen"
                )
                .classList.remove(
                    "hidden"
                );

        }
    );


/* ================= INITIALIZE ================= */

function initialize() {

    showDate();

    updateDashboard();

    renderSubjects();

    renderMarks();

    renderAttendance();

    renderTasks();

    renderGoals();

    updateReports();

}


/* ================= DATE ================= */

function showDate() {

    const today =
        new Date();

    document.getElementById(
        "todayDate"
    ).textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


/* ================= NAVIGATION ================= */

document
    .querySelectorAll(".nav")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const section =
                    this.dataset.section;

                showSection(
                    section
                );

            }
        );

    });


function showSection(section) {

    document
        .querySelectorAll(".section")
        .forEach(s =>
            s.classList.add(
                "hidden"
            )
        );


    document
        .getElementById(section)
        .classList.remove(
            "hidden"
        );


    document
        .querySelectorAll(".nav")
        .forEach(n =>
            n.classList.remove(
                "active"
            )
        );


    document
        .querySelector(
            `.nav[data-section="${section}"]`
        )
        .classList.add(
            "active"
        );


    const titles = {

        dashboard: "Dashboard",

        subjects: "Subjects",

        marks: "Marks",

        attendance: "Attendance",

        tasks: "Assignments & Exams",

        goals: "Academic Goals",

        reports: "Reports"

    };


    document.getElementById(
        "sectionTitle"
    ).textContent =
        titles[section];


    if (
        section === "dashboard"
    ) {

        updateDashboard();

    }

    if (
        section === "reports"
    ) {

        updateReports();

    }

}


/* ================= DASHBOARD ================= */

function updateDashboard() {

    document.getElementById(
        "studentCount"
    ).textContent =
        students.length;


    document.getElementById(
        "subjectCount"
    ).textContent =
        subjects.length;


    const averageScore =
        calculateAverageScore();


    const averageAttendance =
        calculateAverageAttendance();


    document.getElementById(
        "averageScore"
    ).textContent =
        averageScore + "%";


    document.getElementById(
        "averageAttendance"
    ).textContent =
        averageAttendance + "%";


    document.getElementById(
        "summaryMarks"
    ).textContent =
        averageScore + "%";


    document.getElementById(
        "summaryAttendance"
    ).textContent =
        averageAttendance + "%";


    document.getElementById(
        "marksProgress"
    ).style.width =
        averageScore + "%";


    document.getElementById(
        "attendanceProgress"
    ).style.width =
        averageAttendance + "%";


    const completed =
        Math.round(
            (tasks.length === 0
                ? 0
                : 75)
        );


    document.getElementById(
        "summaryTasks"
    ).textContent =
        completed + "%";


    document.getElementById(
        "taskProgress"
    ).style.width =
        completed + "%";


    renderPerformanceChart();

    renderUpcoming();

    updateNotifications();

}


/* ================= AVERAGE SCORE ================= */

function calculateAverageScore() {

    if (
        subjects.length === 0
    ) return 0;


    const total =
        subjects.reduce(
            (sum, subject) =>
                sum + Number(
                    subject.score
                ),
            0
        );


    return Math.round(
        total /
        subjects.length
    );

}


/* ================= ATTENDANCE ================= */

function calculateAverageAttendance() {

    if (
        attendance.length === 0
    ) return 0;


    let totalClasses = 0;

    let totalPresent = 0;


    attendance.forEach(record => {

        totalClasses +=
            Number(
                record.classes
            );

        totalPresent +=
            Number(
                record.present
            );

    });


    if (
        totalClasses === 0
    ) return 0;


    return Math.round(
        (
            totalPresent /
            totalClasses
        ) * 100
    );

}


/* ================= SUBJECTS ================= */

function renderSubjects(
    search = ""
) {

    const container =
        document.getElementById(
            "subjectCards"
        );

    container.innerHTML = "";


    const filtered =
        subjects.filter(
            subject =>
                subject.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );


    filtered.forEach(
        subject => {

            let status =
                "Excellent";

            if (
                subject.score < 75
            ) {

                status =
                    "Needs Improvement";

            } else if (
                subject.score < 85
            ) {

                status =
                    "Good";

            }


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "subject-card";


            card.innerHTML = `

                <div class="subject-top">

                    <div class="subject-icon">
                        📚
                    </div>

                    <span>
                        ${subject.code}
                    </span>

                </div>

                <h3>
                    ${subject.name}
                </h3>

                <p>
                    Academic Performance
                </p>

                <div class="subject-score">
                    ${subject.score}%
                </div>

                <p>
                    ${status}
                </p>

                <div class="progress">

                    <div
                        class="progress-fill"
                        style="width:${subject.score}%"
                    ></div>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* ================= SUBJECT SEARCH ================= */

document
    .getElementById(
        "subjectSearch"
    )
    .addEventListener(
        "input",
        function() {

            renderSubjects(
                this.value
            );

        }
    );


/* ================= MARKS ================= */

function renderMarks() {

    const table =
        document.getElementById(
            "marksTable"
        );

    table.innerHTML = "";


    marks.forEach(
        record => {

            const total =
                Number(
                    record.internal
                ) +
                Number(
                    record.assignment
                ) +
                Number(
                    record.exam
                );


            const percentage =
                Math.round(
                    total
                );


            let grade =
                getGrade(
                    percentage
                );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${record.student}
                </td>

                <td>
                    ${record.subject}
                </td>

                <td>
                    ${record.internal}
                </td>

                <td>
                    ${record.assignment}
                </td>

                <td>
                    ${record.exam}
                </td>

                <td>
                    <strong>
                        ${total}
                    </strong>
                </td>

                <td>
                    ${grade}
                </td>

            `;


            table.appendChild(
                row
            );

        }
    );

}


function getGrade(score) {

    if (
        score >= 90
    ) return "A+";

    if (
        score >= 80
    ) return "A";

    if (
        score >= 70
    ) return "B+";

    if (
        score >= 60
    ) return "B";

    if (
        score >= 50
    ) return "C";

    return "F";

}


/* ================= ATTENDANCE ================= */

function renderAttendance() {

    const table =
        document.getElementById(
            "attendanceTable"
        );

    table.innerHTML = "";


    attendance.forEach(
        record => {

            const percentage =
                Math.round(
                    (
                        record.present /
                        record.classes
                    ) * 100
                );


            let status =
                "Good";


            if (
                percentage < 75
            ) {

                status =
                    "Low";

            } else if (
                percentage < 85
            ) {

                status =
                    "Average";

            }


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${record.student}
                </td>

                <td>
                    ${record.subject}
                </td>

                <td>
                    ${record.classes}
                </td>

                <td>
                    ${record.present}
                </td>

                <td>
                    ${
                        record.classes -
                        record.present
                    }
                </td>

                <td>
                    <strong>
                        ${percentage}%
                    </strong>
                </td>

                <td>
                    ${status}
                </td>

            `;


            table.appendChild(
                row
            );

        }
    );

}


/* ================= TASKS ================= */

function renderTasks() {

    const container =
        document.getElementById(
            "taskList"
        );

    container.innerHTML = "";


    tasks.forEach(
        task => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "task";


            div.innerHTML = `

                <span class="task-type">
                    ${task.type}
                </span>

                <h3>
                    ${task.title}
                </h3>

                <p>
                    ${task.subject}
                </p>

                <div class="task-date">
                    📅 ${task.date}
                </div>

            `;


            container.appendChild(
                div
            );

        }
    );

}


/* ================= GOALS ================= */

function renderGoals() {

    const container =
        document.getElementById(
            "goalList"
        );

    container.innerHTML = "";


    goals.forEach(
        goal => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "goal";


            div.innerHTML = `

                <h3>
                    ${goal.title}
                </h3>

                <p>
                    ${goal.description}
                </p>

                <div class="goal-number">
                    ${goal.progress}%
                </div>

                <div class="progress">

                    <div
                        class="progress-fill"
                        style="width:${goal.progress}%"
                    ></div>

                </div>

            `;


            container.appendChild(
                div
            );

        }
    );

}


/* ================= UPCOMING ================= */

function renderUpcoming() {

    const container =
        document.getElementById(
            "upcomingDashboard"
        );

    container.innerHTML = "";


    tasks
        .slice(0,5)
        .forEach(
            task => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "activity";


                div.innerHTML = `

                    <div>

                        <h4>
                            ${task.title}
                        </h4>

                        <p>
                            ${task.subject}
                        </p>

                    </div>

                    <strong>
                        ${task.date}
                    </strong>

                `;


                container.appendChild(
                    div
                );

            }
        );

}


/* ================= PERFORMANCE CHART ================= */

let performanceChart;


function renderPerformanceChart() {

    const canvas =
        document.getElementById(
            "performanceChart"
        );


    if (
        performanceChart
    ) {

        performanceChart.destroy();

    }


    performanceChart =
        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels:
                        subjects.map(
                            s =>
                                s.name
                        ),

                    datasets: [

                        {

                            label:
                                "Score %",

                            data:
                                subjects.map(
                                    s =>
                                        s.score
                                )

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false,

                    scales: {

                        y: {

                            beginAtZero:
                                true,

                            max: 100

                        }

                    }

                }

            }
        );

}


/* ================= REPORT ================= */

let reportChart;


function updateReports() {

    const score =
        calculateAverageScore();

    const attendancePercentage =
        calculateAverageAttendance();


    document.getElementById(
        "reportScore"
    ).textContent =
        score + "%";


    document.getElementById(
        "reportAttendance"
    ).textContent =
        attendancePercentage + "%";


    const cgpa =
        (
            score /
            10
        ).toFixed(2);


    document.getElementById(
        "reportCGPA"
    ).textContent =
        cgpa;


    const canvas =
        document.getElementById(
            "reportChart"
        );


    if (
        reportChart
    ) {

        reportChart.destroy();

    }


    reportChart =
        new Chart(
            canvas,
            {

                type: "line",

                data: {

                    labels:
                        subjects.map(
                            s =>
                                s.code
                        ),

                    datasets: [

                        {

                            label:
                                "Academic Score",

                            data:
                                subjects.map(
                                    s =>
                                        s.score
                                ),

                            tension:
                                0.3

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio:
                        false,

                    scales: {

                        y: {

                            min: 0,

                            max: 100

                        }

                    }

                }

            }
        );

}


/* ================= ADD SUBJECT ================= */

document
    .getElementById(
        "addSubjectBtn"
    )
    .addEventListener(
        "click",
        function() {

            openModal(
                "Add Subject",
                `

                <div class="form-group">

                    <label>
                        Subject Name
                    </label>

                    <input
                        id="newSubjectName"
                        placeholder="Example: Engineering Mathematics"
                    >

                </div>

                <div class="form-group">

                    <label>
                        Subject Code
                    </label>

                    <input
                        id="newSubjectCode"
                        placeholder="Example: 1BMATS101"
                    >

                </div>

                <div class="form-group">

                    <label>
                        Current Score %
                    </label>

                    <input
                        type="number"
                        id="newSubjectScore"
                        min="0"
                        max="100"
                        value="75"
                    >

                </div>

                <button
                    class="primary"
                    onclick="addSubject()"
                >
                    Add Subject
                </button>

                `
            );

        }
    );


function addSubject() {

    const name =
        document.getElementById(
            "newSubjectName"
        ).value;

    const code =
        document.getElementById(
            "newSubjectCode"
        ).value;

    const score =
        Number(
            document.getElementById(
                "newSubjectScore"
            ).value
        );


    if (!name || !code) {

        showToast(
            "Fill all fields"
        );

        return;

    }


    subjects.push({

        id:
            Date.now(),

        name,

        code,

        score

    });


    saveData();

    closeModal();

    renderSubjects();

    updateDashboard();

    updateReports();

    showToast(
        "Subject added successfully"
    );

}


/* ================= ADD MARKS ================= */

document
    .getElementById(
        "addMarksBtn"
    )
    .addEventListener(
        "click",
        function() {

            openModal(
                "Add Marks",
                `

                <div class="form-group">

                    <label>Student</label>

                    <select id="markStudent">

                        ${students.map(
                            s =>
                            `<option>${s.name}</option>`
                        ).join("")}

                    </select>

                </div>

                <div class="form-group">

                    <label>Subject</label>

                    <select id="markSubject">

                        ${subjects.map(
                            s =>
                            `<option>${s.name}</option>`
                        ).join("")}

                    </select>

                </div>

                <div class="form-group">

                    <label>Internal</label>

                    <input
                        type="number"
                        id="internal"
                        min="0"
                        max="20"
                        value="15"
                    >

                </div>

                <div class="form-group">

                    <label>Assignment</label>

                    <input
                        type="number"
                        id="assignment"
                        min="0"
                        max="10"
                        value="8"
                    >

                </div>

                <div class="form-group">

                    <label>Exam</label>

                    <input
                        type="number"
                        id="exam"
                        min="0"
                        max="70"
                        value="45"
                    >

                </div>

                <button
                    class="primary"
                    onclick="addMarks()"
                >
                    Save Marks
                </button>

                `
            );

        }
    );


function addMarks() {

    marks.push({

        student:
            document.getElementById(
                "markStudent"
            ).value,

        subject:
            document.getElementById(
                "markSubject"
            ).value,

        internal:
            Number(
                document.getElementById(
                    "internal"
                ).value
            ),

        assignment:
            Number(
                document.getElementById(
                    "assignment"
                ).value
            ),

        exam:
            Number(
                document.getElementById(
                    "exam"
                ).value
            )

    });


    saveData();

    closeModal();

    renderMarks();

    showToast(
        "Marks saved successfully"
    );

}


/* ================= ADD ATTENDANCE ================= */

document
    .getElementById(
        "addAttendanceBtn"
    )
    .addEventListener(
        "click",
        function() {

            openModal(
                "Update Attendance",
                `

                <div class="form-group">

                    <label>Student</label>

                    <select id="attendanceStudent">

                        ${students.map(
                            s =>
                            `<option>${s.name}</option>`
                        ).join("")}

                    </select>

                </div>

                <div class="form-group">

                    <label>Subject</label>

                    <select id="attendanceSubject">

                        ${subjects.map(
                            s =>
                            `<option>${s.name}</option>`
                        ).join("")}

                    </select>

                </div>

                <div class="form-group">

                    <label>Total Classes</label>

                    <input
                        type="number"
                        id="classes"
                        value="30"
                    >

                </div>

                <div class="form-group">

                    <label>Classes Present</label>

                    <input
                        type="number"
                        id="present"
                        value="25"
                    >

                </div>

                <button
                    class="primary"
                    onclick="addAttendance()"
                >
                    Save Attendance
                </button>

                `
            );

        }
    );


function addAttendance() {

    const classes =
        Number(
            document.getElementById(
                "classes"
            ).value
        );

    const present =
        Number(
            document.getElementById(
                "present"
            ).value
        );


    if (
        present > classes
    ) {

        showToast(
            "Present cannot exceed classes"
        );

        return;

    }


    attendance.push({

        student:
            document.getElementById(
                "attendanceStudent"
            ).value,

        subject:
            document.getElementById(
                "attendanceSubject"
            ).value,

        classes,

        present

    });


    saveData();

    closeModal();

    renderAttendance();

    updateDashboard();

    showToast(
        "Attendance updated"
    );

}


/* ================= ADD TASK ================= */

document
    .getElementById(
        "addTaskBtn"
    )
    .addEventListener(
        "click",
        function() {

            openModal(
                "Add Academic Activity",
                `

                <div class="form-group">

                    <label>Activity Name</label>

                    <input
                        id="taskTitle"
                        placeholder="Assignment / Exam"
                    >

                </div>

                <div class="form-group">

                    <label>Subject</label>

                    <select id="taskSubject">

                        ${subjects.map(
                            s =>
                            `<option>${s.name}</option>`
                        ).join("")}

                    </select>

                </div>

                <div class="form-group">

                    <label>Type</label>

                    <select id="taskType">

                        <option>
                            Assignment
                        </option>

                        <option>
                            Exam
                        </option>

                        <option>
                            Lab
                        </option>

                        <option>
                            Project
                        </option>

                    </select>

                </div>

                <div class="form-group">

                    <label>Due Date</label>

                    <input
                        type="date"
                        id="taskDate"
                    >

                </div>

                <button
                    class="primary"
                    onclick="addTask()"
                >
                    Add Activity
                </button>

                `
            );

        }
    );


function addTask() {

    const title =
        document.getElementById(
            "taskTitle"
        ).value;


    const subject =
        document.getElementById(
            "taskSubject"
        ).value;


    const type =
        document.getElementById(
            "taskType"
        ).value;


    const date =
        document.getElementById(
            "taskDate"
        ).value;


    if (
        !title ||
        !date
    ) {

        showToast(
            "Enter activity details"
        );

        return;

    }


    tasks.push({

        title,

        subject,

        type,

        date

    });


    saveData();

    closeModal();

    renderTasks();

    renderUpcoming();

    updateNotifications();

    showToast(
        "Activity added"
    );

}


/* ================= ADD GOAL ================= */

document
    .getElementById(
        "addGoalBtn"
    )
    .addEventListener(
        "click",
        function() {

            openModal(
                "Add Academic Goal",
                `

                <div class="form-group">

                    <label>Goal</label>

                    <input
                        id="goalTitle"
                        placeholder="Example: Score 90% in semester"
                    >

                </div>

                <div class="form-group">

                    <label>Description</label>

                    <input
                        id="goalDescription"
                        placeholder="Describe your goal"
                    >

                </div>

                <div class="form-group">

                    <label>Progress %</label>

                    <input
                        type="number"
                        id="goalProgress"
                        min="0"
                        max="100"
                        value="0"
                    >

                </div>

                <button
                    class="primary"
                    onclick="addGoal()"
                >
                    Add Goal
                </button>

                `
            );

        }
    );


function addGoal() {

    goals.push({

        title:
            document.getElementById(
                "goalTitle"
            ).value,

        description:
            document.getElementById(
                "goalDescription"
            ).value,

        progress:
            Number(
                document.getElementById(
                    "goalProgress"
                ).value
            )

    });


    saveData();

    closeModal();

    renderGoals();

    showToast(
        "Goal added"
    );

}


/* ================= MODAL ================= */

function openModal(
    title,
    body
) {

    document
        .getElementById(
            "modalTitle"
        )
        .textContent =
        title;


    document
        .getElementById(
            "modalBody"
        )
        .innerHTML =
        body;


    document
        .getElementById(
            "modal"
        )
        .classList.remove(
            "hidden"
        );

}


function closeModal() {

    document
        .getElementById(
            "modal"
        )
        .classList.add(
            "hidden"
        );

}


document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        closeModal
    );


/* ================= DARK MODE ================= */

document
    .getElementById(
        "darkMode"
    )
    .addEventListener(
        "click",
        function() {

            document.body
                .classList.toggle(
                    "dark"
                );


            localStorage.setItem(
                "academicDarkMode",
                document.body.classList.contains(
                    "dark"
                )
            );

        }
    );


if (
    localStorage.getItem(
        "academicDarkMode"
    ) === "true"
) {

    document.body.classList.add(
        "dark"
    );

}


/* ================= NOTIFICATIONS ================= */

function updateNotifications() {

    const today =
        new Date();


    const upcoming =
        tasks.filter(
            task =>
                new Date(
                    task.date
                ) >= today
        ).length;


    document.getElementById(
        "notificationNumber"
    ).textContent =
        upcoming;

}


/* ================= EXPORT REPORT ================= */

document
    .getElementById(
        "exportReport"
    )
    .addEventListener(
        "click",
        function() {

            let csv =
                "Subject,Code,Score\n";


            subjects.forEach(
                subject => {

                    csv +=
                        `"${subject.name}",` +
                        `"${subject.code}",` +
                        `${subject.score}\n`;

                }
            );


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href = url;

            link.download =
                "academic_report.csv";


            link.click();

            URL.revokeObjectURL(
                url
            );


            showToast(
                "Academic report exported"
            );

        }
    );


/* ================= TOAST ================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}
