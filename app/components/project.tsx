import classNames from "classnames";
import { Category } from "./types";
import Editable from "./editable";
import { useEffect, useRef } from "react";

interface ProjectProps {
    cat: Category;
    onDelete: (cat: Category) => void;
    onUpdate: (cat: Category) => void;
    sendCatToDaily?: (cat: Category) => void;
    sendItemToDaily?: (cat: Category, item: string) => void;
    master?: boolean;
}
const Project = ({cat, onDelete, onUpdate, sendCatToDaily, sendItemToDaily, master} : ProjectProps) => {
    const catRef = useRef(cat);
    useEffect(() => {
        catRef.current = cat;
    }, [cat]);
    return <div className={classNames("relative group mb-3 p-3 rounded-md max-w-2xl min-w-96", master ? "bg-master" : "bg-daily")}>
        <Editable
            className="text-2xl inline-block font-semibold"
            initial={cat.title}
            onBlur={(content: string) => {
                onUpdate({...catRef.current, title: content} as Category);
            }}
        />
        <ul>
            {
            cat.items.map((item, i) => {
                return <li key={(master ? "master" : "daily") + `-item-${cat.key}-${i}`} className="relative mt-2 text-sm">
                    <input
                        type="checkbox"
                        id={(master ? "master" : "daily") + `-item-checkbox-${cat.key}-${i}`}
                        className="relative appearance-none w-5 h-5 align-sub border-slate-600 border-2 rounded-sm mr-2 shrink-0 peer
                                hover:border-slate-800"
                        checked={cat.finished[i]}
                        onChange={(e) => {
                            onUpdate(
                                {...catRef.current,
                                    finished: cat.finished.map((f, j) => j === i ? e.target.checked : f)
                                } as Category
                            );
                          }}
                    />
                    <label 
                    //htmlFor={`master-item-checkbox-${cat.key}-${i}`}
                    className="leading-7"
                    >
                        <Editable
                            className="text-lg inline min-w-52"
                            initial={item}
                            onBlur={(content) => {
                                onUpdate({
                                    ...catRef.current,
                                    items: catRef.current.items.map((it, j) => j === i ? content : it)
                                    } as Category
                                );
                            }}
                        />
                    </label>
                    <svg
                        className="
                                absolute left-0 top-0 w-5 h-8 hidden align-sub text-slate-600 pointer-events-none
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
            })}
            <li className="relative mt-2 text-sm">
                <input
                    type="checkbox"
                    id={(master ? "master" : "daily") + `-${cat.key}-newitem`}
                    className="relative appearance-none w-5 h-5 align-sub border-slate-400 border-2 rounded-sm mr-2 shrink-0"
                />
                <label className="leading-7">
                    <Editable
                        className={classNames("text-lg inline-block", master ? "before:text-white" : "")}
                        initial=""
                        placeholder="New item..."
                        onBlur={(content) => {
                            onUpdate({...catRef.current,
                                items: [...catRef.current.items, content],
                                finished: [...catRef.current.finished, false]
                            } as Category
                        );
                        }}
                        clearOnBlur
                    />
                </label>
            </li>
        </ul>
        <div className="absolute top-3 right-3 hidden group-hover:inline-block">
            <button
                className="block"
                onClick={() => onDelete(cat)}>
                    <svg 
                    className="w-8 h-7 m-1 border-1 text-slate-700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    stroke="currentColor">
                        {/*Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                        <title>Delete Project</title>
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
            </button>
            { master ?
                <button
                className="block m-1"
                onClick={() => {
                    sendCatToDaily && sendCatToDaily(cat);
                }}>
                    <svg 
                    className="w-8 h-8 m-1"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    {/*Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                    <title>Send to Today&apos;s List</title>
                    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                    </svg>
                </button>
                : null }
        </div>
    </div>
}
export default Project;