import { useState } from "react";
import Task from "./task";

const TaskRender = (task: Task, key: string, onDelete: any, onUpdate: any) => {
  return (
    <div
      key={`task-${key}`}
      className="bg-orange-300 w-60 aspect-square text-slate-700 rounded-lg pt-5 pl-4 pr-6 inline-block group relative"
    >
      <h5 className="font-semibold text-xl overflow-hidden overflow-ellipsis">
        {task.title}
      </h5>
      <button
        className="hidden group-hover:block absolute top-3 right-3 p-0"
        onClick={() => onDelete(key)}
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
      <h5 className="italic text-xl">{!task.title ? "Untitled" : null}</h5>
      <h6 className="break-words line-clamp-3">{task.description}</h6>
      <ol>
        {task.steps.map((step, i) => {
          return (
            <li key={`step-${key}-${i}`} className="relative mt-2 text-sm">
              <input
                type="checkbox"
                id={`step-checkbox-${key}-${i}`}
                className="relative appearance-none w-4 h-4 align-sub border-slate-600 border-2 rounded-sm mr-2 shrink-0 peer
                         hover:border-slate-800
                         checked:bg-emerald-500 checked:border-0"
                onChange={(e) => {
                  task.finished[i] = e.target.checked;
                  onUpdate(task, key);
                }}
                checked={task.finished[i]}
              />
              <label
                htmlFor={`step-checkbox-${key}-${i}`}
                className="leading-4"
              >
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
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <title>Finished</title>
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TaskRender;
