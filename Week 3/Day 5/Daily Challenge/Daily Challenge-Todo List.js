// ============================================
// DAILY TASKS APP
// ============================================


// -----------------------------
// ELEMENTS
// -----------------------------

const taskForm =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const counter =
    document.getElementById("remaining");

const progressNumber =
    document.getElementById("progressNumber");

const dateElement =
    document.getElementById("date");

const clearCompleted =
    document.getElementById("clearCompleted");

const filters =
    document.querySelectorAll(".filter");


// -----------------------------
// DATA
// -----------------------------

const tasks = [];

const savedTasks = JSON.parse(
    localStorage.getItem("dailyTasks")
) || [];

tasks.push(...savedTasks);

tasks.forEach((task, index) => {
    task.task_id = task.task_id ?? task.id ?? index;
    task.done = task.done ?? task.completed ?? false;
    task.completed = task.done;
});

let currentFilter = "all";


// -----------------------------
// DATE
// -----------------------------

const today = new Date();

dateElement.textContent =
    today.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
    );


// -----------------------------
// AUDIO
// -----------------------------

let audioContext;


function getAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }

    return audioContext;
}


function playSound(
    frequency,
    duration = 0.1
) {

    const ctx = getAudio();

    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    oscillator.type = "sine";

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0.05,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
    );


    oscillator
        .connect(gain)
        .connect(ctx.destination);


    oscillator.start();

    oscillator.stop(
        ctx.currentTime + duration
    );

}


// -----------------------------
// SAVE
// -----------------------------

function saveTasks() {

    localStorage.setItem(
        "dailyTasks",
        JSON.stringify(tasks)
    );

}


// -----------------------------
// ADD TASK
// -----------------------------

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        taskInput.focus();
        return;
    }

    const task = {
        task_id: tasks.length
            ? Math.max(...tasks.map(item => item.task_id)) + 1
            : 0,
        text: text,
        done: false,
        completed: false
    };

    tasks.unshift(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
    playSound(523, 0.12);
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();
    addTask();
});


// -----------------------------
// RENDER TASKS
// -----------------------------

function renderTasks() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let filtered =
        tasks.filter(task => {


            // Filter

            if (
                currentFilter ===
                "active" &&
                task.completed
            ) {

                return false;

            }


            if (
                currentFilter ===
                "completed" &&
                !task.completed
            ) {

                return false;

            }


            // Search

            if (
                search &&
                !task.text
                    .toLowerCase()
                    .includes(search)
            ) {

                return false;

            }


            return true;

        });


    taskList.innerHTML = "";


    filtered.forEach(task => {

        const taskElement =
            createTaskElement(task);

        taskList.appendChild(
            taskElement
        );

    });


    updateStats();


    emptyState.style.display =
        filtered.length === 0
            ? "block"
            : "none";

}


// -----------------------------
// CREATE TASK
// -----------------------------

function createTaskElement(task) {
    const div = document.createElement("div");
    div.className = "task";
    div.dataset.taskId = task.task_id;

    if (task.done) {
        div.classList.add("completed");
    }

    div.innerHTML = `
        <input class="check" type="checkbox" title="Complete task" aria-label="Complete task" ${task.done ? "checked" : ""}>
        <span class="task-text">${escapeHTML(task.text)}</span>
        <div class="task-actions">
            <button class="edit" title="Edit task" aria-label="Edit task"><i class="fa-solid fa-pen"></i></button>
            <button class="delete" title="Delete task" aria-label="Delete task"><i class="fa-solid fa-trash"></i></button>
        </div>`;

    const check = div.querySelector(".check");
    check.addEventListener("change", () => doneTask(task, check.checked));

    const deleteButton = div.querySelector(".delete");
    deleteButton.addEventListener("click", () => deleteTask(task, div));

    // EDIT
    const editButton = div.querySelector(".edit");


    editButton.addEventListener(
        "click",
        () => {

            const newText =
                prompt(
                    "Edit your task:",
                    task.text
                );


            if (
                newText !== null &&
                newText.trim() !== ""
            ) {

                task.text =
                    newText.trim();


                saveTasks();

                renderTasks();

                playSound(440, 0.1);

            }

        }
    );


    return div;

}

function doneTask(task, isDone) {
    task.done = isDone;
    task.completed = isDone;
    saveTasks();
    renderTasks();
    playSound(isDone ? 659 : 330, isDone ? 0.15 : 0.1);
}

function deleteTask(task, taskElement) {
    taskElement.style.transform = "translateX(100px)";
    taskElement.style.opacity = "0";
    setTimeout(() => {
        const taskIndex = tasks.findIndex(item => item.task_id === task.task_id);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
        }
        saveTasks();
        renderTasks();
    }, 180);
    playSound(180, 0.12);
}


// -----------------------------
// SEARCH
// -----------------------------

searchInput.addEventListener(
    "input",
    renderTasks
);


// -----------------------------
// FILTERS
// -----------------------------

filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


            filter.classList.add(
                "active"
            );


            currentFilter =
                filter.dataset.filter;


            renderTasks();

        }
    );

});


// -----------------------------
// CLEAR COMPLETED
// -----------------------------

clearCompleted.addEventListener(
    "click",
    () => {

        const completedCount =
            tasks.filter(
                task => task.completed
            ).length;


        if (completedCount === 0) {

            return;

        }


        for (let index = tasks.length - 1; index >= 0; index -= 1) {
            if (tasks[index].done) {
                tasks.splice(index, 1);
            }
        }


        saveTasks();

        renderTasks();

        playSound(150, 0.15);

    }
);


// -----------------------------
// STATISTICS
// -----------------------------

function updateStats() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const remaining =
        total - completed;


    counter.textContent =
        remaining;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    progressNumber.textContent =
        `${percentage}%`;

}


// -----------------------------
// SECURITY
// -----------------------------

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// -----------------------------
// START APP
// -----------------------------

renderTasks();