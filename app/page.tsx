"use client";

import { auth } from "@/firebase/config";
import { addTask, deleteTask, getTasks } from "@/server/task";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);
  const [user, setUser] = useState<User | null>(null);
   const router = useRouter();
 useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      setUser(currentUser);

      if (currentUser) {
        const data = await getTasks();
        setTasks(data);
      } else {
        // clear tasks when logout
        setTasks([]);
      }

    });

    return () => unsubscribe();

  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

 

  const handleAdd = async () => {
    if (!task.trim()) return;
if(!user){
  toast.error("login first")
  router.push("/signup")
}
    await addTask(task);
    setTask("");
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          My Todo List
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Manage your daily tasks easily
        </p>

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
        <div className="space-y-3 max-h-[320px] overflow-y-auto">

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

              <span className="text-gray-700">
                {t.title}
              </span>

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