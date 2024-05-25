import Task from './task';

const TaskRender = (task: Task, key: string, onDelete: any) => {
    return (<div key={`task-${key}`}
    className="bg-orange-300 w-72 aspect-square text-slate-700 rounded-lg pt-5 pl-4 pr-6 inline-block group relative">
        <h5 className="font-semibold text-xl overflow-hidden overflow-ellipsis">{task.title}</h5>
        <button className="hidden group-hover:block absolute top-3 right-3 p-0 aspect-square border-black border-2"
                onClick={() => onDelete(key)}
                >delete me</button>
        <h5 className = "italic text-xl">{!task.title ? "Untitled" : null}</h5>
        <h6 className="break-words line-clamp-3">{task.description}</h6>
        <ol>
            {task.steps.map((step, i) => {
                return (
                    <li key={`step-${key}-${i}`} className="align-top">
                        <input 
                        type="checkbox"
                        id={`step-checkbox-${key}-${i}`}
                        className=""/>
                        <label 
                        htmlFor={`step-checkbox-${key}-${i}`}>{step}</label>
                    </li>
                );
            })}
        </ol>
    </div>);
}

export default TaskRender;