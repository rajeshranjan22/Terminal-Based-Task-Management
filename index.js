const readline = require('readline');
const { addTask, listTasks, completeTask } = require('./task-manager/taskManager');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("📝 Welcome to Task Manager CLI!");
console.log("Type a command: add-task, list-tasks, complete-task, or exit");

function promptUser() {
    rl.question('> ', (input) => {
        const [command, ...args] = input.trim().split(' ');

        switch (command) {
            case 'add-task':
                rl.question('Enter task title: ', (title) => {
                    rl.question('Enter due date: ', (dueDate) => {
                        addTask(title, dueDate);
                        promptUser();
                    });
                });
                break;

            case 'list-tasks':
                listTasks();
                promptUser();
                break;

            case 'complete-task':
                rl.question('Enter task ID or title: ', (idOrTitle) => {
                    completeTask(idOrTitle);
                    promptUser();
                });
                break;

            case 'exit':
                console.log("👋 Goodbye!");
                rl.close();
                break;

            default:
                console.log("❓ Unknown command. Try: add-task, list-tasks, complete-task, or exit");
                promptUser();
        }
    });
}

promptUser();
