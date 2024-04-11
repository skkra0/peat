"use client"
import React, {FormEvent, useState} from 'react';
import TaskForm from './taskform';

const page = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const [formTask, setFormTask] = useState<Task>({
        title: "",
        description: "",
        steps: [],
    });    

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTasks([...tasks, formTask]);
        setFormTask({
            title: "",
            description: "",
            steps: [],
        });
        console.log(tasks);
    }
    
    let renderTasks : JSX.Element[] = [<h2 className="text-xl">No Tasks</h2>];

    renderTasks = tasks.map((task, index) => {
        return (
            <div key={`task-${index}`} className="bg-orange-300 w-full aspect-square text-slate-700 rounded-lg p-3 inline-block">
                <h5 className = "font-semibold text-xl">{task.title}</h5>
                <h6 className="break-words">{task.description}</h6>
                <ol>
                    {task.steps.map((step, i) => {
                        return (
                            <li key={`step-${index}-${i}`}>
                                <input 
                                type="checkbox"
                                id={`step-checkbox-${index}-${i}`}
                                className="mr-2"/>
                                <label htmlFor={`step-checkbox-${index}-${i}`}>{step}</label>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    });

    return (
        <>
        <div className="pt-4 pb-3 pl-3 pr-3 h-16 bg-slate-50 text-slate-700 text-4xl font-bold">
            <h1 className="inline-block">To-Do</h1>
            <button className="btn inline-block float-right">+</button>
        </div>
        <div className="bg-gradient-to-r from-emerald-600 to-amber-500 h-2"></div>
        <div className="main text-black bg-slate-50 pl-4 pr-4" >
            <TaskForm
                formTask={formTask}
                setFormTask={setFormTask}
                handleSubmit={handleSubmit}
            />
            <div className="grid grid-cols-4 gap-6">
                {renderTasks}
            </div>
        </div>
        </>
    )
}

export default page;