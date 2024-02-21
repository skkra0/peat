"use client"
import { stringify } from 'querystring';
import React, {FormEvent, useState} from 'react';

const page = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState<string[]>([]);
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        //console.log(title);
    }
    return (
        <>
        <div className="pt-4 pb-3 pl-3 pr-3 h-16 bg-slate-50 text-slate-700 text-4xl font-bold">
            <h1 className="inline-block">To-Do</h1>
            <button className="btn inline-block float-right">+</button>
        </div>
        <div className="bg-gradient-to-r from-emerald-600 to-amber-500 h-2"></div>
        <div className="main text-black">
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
                <input
                    type="text"
                    className="border-b-2 border-zinc-400 py-1 m-2 h-20 block"
                    placeholder="List Description"
                    value={description}
                    onChange={
                        (e) => {
                            setDescription(e.target.value);
                        }
                    }
                />
                <div>
                <input 
                    className="border-zinc-400 border-b-2 py-1 m-2" 
                    placeholder="Add to-do item"/>
                <button 
                    className="bg-slate-700 text-white rounded py-1 px-2"
                >+</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default page;