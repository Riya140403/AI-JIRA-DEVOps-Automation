
const express = require("express");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Temporary task database
let tasks = [
    {
        id: 1,
        title: "Learn Jira",
        status: "Pending"
    }
];

let nextTaskId = 2;

// 1. HOME API
app.get("/", (req, res) => {
    res.send("AI Jira DevOps Automation API is running");
});

// 2. GET ALL TASKS
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// 3. CREATE NEW TASK
app.post("/tasks", (req, res) => {
    const { title } = req.body || {};

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const newTask = {
        id: nextTaskId++,
        title: title.trim(),
        status: "Pending"
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// 4. UPDATE EXISTING TASK
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, status } = req.body || {};

    if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Valid task title is required"
            });
        }
    }

    if (status !== undefined) {
        const allowedStatuses = [
            "Pending",
            "In Progress",
            "Completed"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid task status"
            });
        }
    }

    if (title !== undefined) {
        task.title = title.trim();
    }

    if (status !== undefined) {
        task.status = status;
    }

    res.status(200).json(task);
});

// 5. DELETE EXISTING TASK
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid task ID"
        });
    }

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask
    });
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
