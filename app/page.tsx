"use client";
import { Poppins, Noto_Sans } from "next/font/google";
import React, { FormEvent, useEffect, useState } from "react";
import TaskForm from "./components/task_form";
import Modal from "./components/modal";
import TaskItem from "./components/task_item";
import Task from "./components/task";
const NAMESPACE = "TODOAPP";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const noto = Noto_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const t = () => {
  let tasks = localStorage.getItem(NAMESPACE);
  if (tasks != null) {
    return JSON.parse(tasks);
  }
  return [];
};

const emptyTask = () => new Task("", "", [], "task-" + Date.now().toString());

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>(t());

  // useEffect(() => {
  //   setTasks(t());
  // }, []);

  useEffect(() => {
    localStorage.setItem(NAMESPACE, JSON.stringify(tasks));
  }, [tasks]);

  const [formTask, setFormTask] = useState<Task>(emptyTask());
  const [isNewTask, setIsNewTask] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isNewTask) {
      setTasks(tasks.map((t) => (t.key === formTask.key ? formTask : t)));
    } else {
      setTasks([formTask, ...tasks]);
    }
    setFormTask(emptyTask());
    setFormOpen(false);
  };

  const onDelete = (task: Task) => {
    setTasks(tasks.filter((t) => t.key !== task.key));
  };

  const onUpdate = (newTask: Task) => {
     setTasks(
       tasks.map((t) => (t.key === newTask.key ? newTask : t)),
     );
  };
  
  const onEdit = (oldTask: Task) => {
    setFormTask(oldTask);
    setIsNewTask(false);
    setFormOpen(true);
  };

  return (
    <>
      {formOpen ? (
        <Modal key="modal" setOpen={setFormOpen}>
          <TaskForm
            formTask={formTask}
            setFormTask={setFormTask}
            isNewTask={isNewTask}
            handleSubmit={handleSubmit}
          />
        </Modal>
      ) : null}

      <div
        className={`flex justify-between pt-4 pb-3 pl-3 pr-3 h-16 bg-slate-50 text-slate-700 ${poppins.className}`}
      >
        <h1 className="inline-block text-4xl">To-Do</h1>
        <button
          onClick={() => {
            setFormTask(emptyTask());
            setIsNewTask(true);
            setFormOpen(true);
          }}
          className="btn inline-block p-2 font-bold rounded bg-slate-100 hover:bg-slate-300"
        >
          Add task
        </button>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-amber-500 h-2"></div>
      <div
        className={`main text-black bg-slate-50 pl-4 pr-4 ${noto.className}`}
      >
        <div className="grid around pt-5 gap-3">
          {tasks.length > 0 ? (
            tasks.map((task, _) => (
              <TaskItem
                task={task}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onEdit={onEdit}
                key={task.key}
              />
            ))
          ) : (
            <h2 className="text-xl">No Tasks</h2>
          )}
        </div>
      </div>
    </>
  );
}; //https://stackoverflow.com/questions/48239687/flexbox-space-between-behavior-combined-with-wrap orz

export default Page;