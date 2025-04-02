import classNames from "classnames";
import Editable from "./editable";
import { useEffect, useRef } from "react";
import { ProjectInfo } from "@prisma/client";

interface ProjectProps {
    cat: ProjectInfo;
    onDelete: (cat: ProjectInfo) => void;
    onUpdate: (cat: ProjectInfo) => void;
    sendCatToDaily?: (cat: ProjectInfo) => void;
    sendItemToDaily?: (cat: ProjectInfo, item: string) => void;
    master?: boolean;
}
const Project = ({ cat, onDelete, onUpdate, sendCatToDaily, sendItemToDaily, master }: ProjectProps) => {
    const catRef = useRef(cat);
    useEffect(() => {
        catRef.current = cat;
    }, [cat]);
    return <div className={classNames("group mb-3 p-3 rounded-md max-w-xl min-w-[32rem]", master ? "bg-master" : "bg-daily")}>
        <div className="flex flex-row">
            <Editable
                className="text-2xl inline-block"
                initial={cat.title}
                onBlur={(content: string) => {
                    onUpdate({ ...catRef.current, title: content });
                }}
            />
            <button
                className="hidden group-hover:inline-block hover:text-red-700"
                onClick={() => onDelete(cat)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="size-7 mr-3"
                    fill="currentColor">
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
            </button>
            {master ?
                <button
                    className="hidden group-hover:inline-block hover:text-daily-accent select-none"
                    onClick={() => {
                        sendCatToDaily && sendCatToDaily(cat);
                    }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="size-7"
                        fill="currentColor">
                        {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                        <path d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-112 174.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L128 288l0-224zm0 224l0 48L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24l104 0zM512 128l-128 0L384 0 512 128z" />
                        <title>Send to Daily</title>
                    </svg>
                </button> : null}
        </div>
        <ul>
            {
                cat.items.map((item, i) => {
                    return <li key={(master ? "master" : "daily") + `-item-${cat.id}-${i}`} className="relative">
                        <input
                            type="checkbox"
                            id={(master ? "master" : "daily") + `-item-checkbox-${cat.id}-${i}`}
                            className="relative appearance-none w-4 h-4 align-sub border-slate-600 border-2 rounded-sm mr-2 shrink-0 peer
                                hover:border-slate-800"
                            checked={cat.finished[i]}
                            onChange={(e) => {
                                onUpdate(
                                    {
                                        ...catRef.current,
                                        finished: cat.finished.map((f, j) => j === i ? e.target.checked : f)
                                    }
                                );
                            }}
                        />
                        <label
                            //htmlFor={`master-item-checkbox-${cat.key}-${i}`}
                            className="leading-7"
                        >
                            <Editable
                                className="text-md inline min-w-52"
                                initial={item}
                                onBlur={(content) => {
                                    onUpdate({
                                        ...catRef.current,
                                        items: catRef.current.items.map((it, j) => j === i ? content : it)
                                    }
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
                    id={(master ? "master" : "daily") + `-${cat.id}-newitem`}
                    className="relative appearance-none w-4 h-4 align-sub border-slate-400 border-2 rounded-sm mr-2 shrink-0"
                />
                <label className="leading-7">
                    <Editable
                        className={classNames("text-lg inline-block", master ? "before:text-white" : "")}
                        initial=""
                        placeholder="New item..."
                        onBlur={(content) => {
                            onUpdate({
                                ...catRef.current,
                                items: [...catRef.current.items, content],
                                finished: [...catRef.current.finished, false]
                            }
                            );
                        }}
                        clearOnBlur
                    />
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
        </ul>
    </div>
}
export default Project;