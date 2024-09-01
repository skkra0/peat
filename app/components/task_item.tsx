import { useState } from "react";
import Task from "./task";

interface TaskProps {
  task: Task;
  onDelete: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onEdit: (task: Task) => void;
}
const TaskItem = ({ task, onDelete, onUpdate, onEdit }: TaskProps) => {
  return (
    <div className="bg-orange-300 w-72 min-h-60 text-slate-700 rounded-lg pt-5 pl-4 pr-6 inline-block group relative">
      <div className="absolute top-3 right-3 mt-1">
      <button className = "hidden group-hover:inline-block p-0" onClick={() => onEdit(task)}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        className="h-5 w-5 text-slate-700 hover:text-emerald-600 fill-current"
        >
          <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/>
        <title>Edit</title>
        </svg>
      </button>

      <button
        className="hidden group-hover:inline-block pl-3"
        onClick={() => onDelete(task)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current text-slate-700 hover:text-red-600"
        >
          <title>Delete</title>
          <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
        </svg>
      </button>
      </div>
      
      <h5 className="font-semibold text-xl overflow-hidden overflow-ellipsis mt-3">
        {task.title}
      </h5>
      
      <h5 className="italic text-xl">{!task.title ? "Untitled" : null}</h5>
      <h6 className="break-words line-clamp-3">{task.description}</h6>
      <ol>
        {task.steps.map((step, i) => {
          return (
            <li key={`step-${task.key}-${i}`} className="relative mt-2 text-sm">
              <input
                type="checkbox"
                id={`step-checkbox-${task.key}-${i}`}
                className="relative appearance-none w-4 h-4 align-sub border-slate-600 border-2 rounded-sm mr-2 shrink-0 peer
                         hover:border-slate-800
                         checked:bg-emerald-500 checked:border-0"
                onChange={(e) => {
                  task.finished[i] = e.target.checked;
                  onUpdate(task);
                }}
                checked={task.finished[i]}
              />
              <label htmlFor={`step-checkbox-${task.key}-${i}`} className="leading-4">
                {step}
              </label>
              <svg
                className="
                        absolute left-0 top-0 w-4 h-4 hidden align-sub text-white pointer-events-none
                        peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Checkmark</title>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TaskItem;
