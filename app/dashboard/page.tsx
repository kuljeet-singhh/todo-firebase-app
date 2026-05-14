"use client";

import { addTask, getTasks, deleteTask } from "@/server/task";
import { useState, useEffect, ChangeEvent } from "react";

interface Task {
  id: string;
  title: string;
}

export default function Dashboard() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async () => {
    if (!task.trim()) return;

    await addTask(task);
    setTask("");
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Todo List
        </h2>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">

          <input
            placeholder="Add a new task..."
            onChange={handleChange}
            value={task}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
          >
            Add
          </button>

        </div>

        {/* Task List */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto">

          {tasks.length === 0 && (
            <p className="text-center text-gray-400">
              No tasks yet
            </p>
          )}

          {tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:shadow-md transition"
            >

              <p className="text-gray-700">
                {t.title}
              </p>

              <button
                onClick={async () => {
                  await deleteTask(t.id);
                  loadTasks();
                }}
                className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition"
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}