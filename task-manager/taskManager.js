const fs = require('fs');
const path = './tasks.json';

function loadTasks() {
    if (!fs.existsSync(path)) return [];
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

function addTask(title, dueDate) {
    if (!title || !dueDate) {
        console.log(" Task title and due date cannot be empty.");
        return;
    }
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        title,
        dueDate,
        status: 'pending',
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`✅ Task "${title}" added with due date ${dueDate}`);
}

function listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("📭 No tasks found.");
        return;
    }
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.title} | Due: ${task.dueDate} | Status: ${task.status}`);
    });
}

function completeTask(identifier) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id == identifier || t.title.toLowerCase() === identifier.toLowerCase());

    if (!task) {
        console.log("❌ Task not found.");
        return;
    }

    if (task.status === 'completed') {
        console.log("⚠️ Task is already completed.");
        return;
    }

    task.status = 'completed';
    saveTasks(tasks);
    console.log(`✅ Task "${task.title}" marked as completed.`);
}

module.exports = {
    addTask,
    listTasks,
    completeTask,
};
