import { useState } from "react";

const TaskForm = ({formTask, setFormTask, handleSubmit}: {formTask: Task, setFormTask: any, handleSubmit: any}) => {
    const [inputs, setInputs] = useState(1);

    return (
        <>
            <form 
            className="m-1"
            onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="focus:border-sky-500 outline-sky-500 border-b-2 border-emerald-800 bg-slate-50 py-1 mt-2 w-72 block"
                    placeholder="List Title"
                    value={formTask.title}
                    onChange={
                        (e) => {
                            setFormTask({
                                ...formTask,
                                title: e.target.value,
                            });
                        }
                    }
                />
                <textarea
                    className="focus:border-sky-500 outline-sky-500 border-emerald-800 border-b-2 bg-slate-50 py-1 mt-2 h-20 w-72 block break-words resize-none"
                    placeholder="List Description"
                    value={formTask.description}
                    onChange={
                        (e) => {
                            setFormTask({
                                ...formTask,
                                description: e.target.value,
                            });
                        }
                    }
                />
                <div>
                <div className="mt-2">
                        {Array.from({length: inputs}, (_, i) => 
                            <>
                                    {i > 0 ? <br key={`br-${i}`}/> : null}
                                    <input 
                                        key={`input-${i}`}
                                        type="text"
                                        value={formTask.steps[i] ? formTask.steps[i] : ""}
                                        onChange={(e) => {
                                            let newSteps = [...formTask.steps];
                                            newSteps[i] = e.target.value;
                                            setFormTask({
                                                ...formTask,
                                                steps: newSteps,
                                            });
                                        }}
                                        className="focus:border-sky-500 outline-sky-500 border-emerald-800 border-b-2 bg-slate-50 mt-2 py-1 w-72" 
                                        placeholder="Add to-do item"/>
                            </>)
                        }
                    <button 
                        type="button"
                        onClick={() => setInputs(inputs + 1)}
                        className="bg-slate-700 text-white rounded py-1 px-2 ml-2"
                    >+</button>
                </div>
                <button
                    type="submit"
                    className="bg-slate-700 text-white rounded mt-2 py-1 px-2"
                >Add Task
                </button>
                </div>
            </form>
        </>
    )
}

export default TaskForm;