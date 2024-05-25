"use client"
import React, {FormEvent, useEffect, useState} from 'react';
import TaskForm from './task_form';
import Modal from './modal';
import TaskRender from './task_render';
import Task from './task';
const NAMESPACE = "TODOAPP";

const t = () => {
    let tasks = localStorage.getItem(NAMESPACE);
    if (tasks != null) {
        return JSON.parse(tasks);
    }
    return [];
}

const page = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
        setTasks(t());
    }, []);

    useEffect(() => {
        if (tasks.length > 0) localStorage.setItem(NAMESPACE, JSON.stringify(tasks));
    }, [tasks]);

    const [formTask, setFormTask] = useState<Task>(new Task("", "", []));    
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTasks([formTask, ...tasks]);
        setFormTask(new Task("", "", []));
        console.log(tasks);
    }
    
    const onDelete = (key: string) => {
        setTasks(tasks.filter((_, index) => index.toString() !== key));
    }

    let renderTasks : JSX.Element[] = [<h2 className="text-xl">No Tasks</h2>];

    if (tasks.length > 0) {
        renderTasks = tasks.map((task, index) => TaskRender(task, index.toString(), onDelete));
    }


    return (
        <>
        {formOpen ? <Modal setOpen={setFormOpen}>
        <TaskForm
            formTask={formTask}
            setFormTask={setFormTask}
            handleSubmit={handleSubmit}
        />
        </Modal> : null}
        <div className="flex justify-between pt-4 pb-3 pl-3 pr-3 h-16 bg-slate-50 text-slate-700 text-4xl font-bold">
            <h1 className="inline-block">To-Do</h1>
            <button
            onClick={() => setFormOpen(true)}
            className="btn inline-block border-black border-2 w-12 h-12">+</button>
        </div>
        <div className="bg-gradient-to-r from-emerald-600 to-amber-500 h-2"></div>
        <div className="main text-black bg-slate-50 pl-4 pr-4" >
        <div className="grid around pt-5 gap-2">
            {renderTasks}
        </div>
        </div>
        </>
    )
} //https://stackoverflow.com/questions/48239687/flexbox-space-between-behavior-combined-with-wrap orz

export default page;