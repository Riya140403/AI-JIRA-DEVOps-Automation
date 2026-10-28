const express = require("express");

const app = express();

app.use(express.json());

let tasks = [
    {
        id: 1,
        title: "Learn Jira",
        status: "Pending"
    }
];

app.get("/", (req, res) => {
    res.send("AI Jira DevOps Automation API is running");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const task = {
        id: tasks.length + 1,
        title: title.trim(),
        status: "Pending"
    };

    tasks.push(task);

    res.status(201).json(task);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});