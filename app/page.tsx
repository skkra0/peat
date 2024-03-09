"use client"
import React, {FormEvent, useState} from 'react';
interface Task {
    title: string;
    description: string;
}
const page = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setTasks([...tasks, {title, description}])
        setTitle("");
        setDescription("");
        console.log(tasks)
    }
    
    let renderTasks : JSX.Element[] = [<h2 className="text-xl">No Tasks</h2>];

    renderTasks = tasks.map((task, index) => {
        return (
            <div key={index} className="bg-orange-300 w-full aspect-square text-slate-700 rounded-lg p-3 inline-block">
                <h5 className = "font-semibold text-xl">{task.title}</h5>
                <h6 className="break-words">{task.description}</h6>
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
        <div className="main text-black bg-slate-50" >
            <form onSubmit={submitHandler}>
                <input 
                    type="text"
                    className="border-b-2 border-zinc-400 py-1 m-2 block"
                    placeholder="List Title"
                    value={title}
                    onChange={
                        (e) => {
                            setTitle(e.target.value);
                        }
                    }
                />
                <textarea
                    className="border-b-2 border-zinc-400 py-1 m-2 h-20 block break-words resize-none"
                    placeholder="List Description"
                    value={description}
                    onChange={
                        (e) => {
                            setDescription(e.target.value);
                        }
                    }
                />
                <div>
                <div>
                        <input 
                        className="border-zinc-400 border-b-2 py-1 m-2" 
                        placeholder="Add to-do item"/>
                    <button 
                        type="button"
                        className="bg-slate-700 text-white rounded py-1 px-2"
                    >+</button>
                </div>
                <button
                    className="bg-slate-700 text-white rounded py-1 px-2"
                >Add Task
                </button>
                </div>
            </form>
            <div className="m-6 grid grid-cols-4 gap-6">
                {renderTasks}
            </div>
        </div>
        </>
    )
}

export default page;