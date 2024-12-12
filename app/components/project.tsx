import classNames from "classnames";
import Category from "./category";
import Editable from "./editable";

interface ProjectProps {
    cat: Category;
    onDelete: (cat: Category) => void;
    onUpdate: (cat: Category) => void;
    sendCatToDaily?: (cat: Category) => void;
    sendItemToDaily?: (cat: Category, item: string) => void;
    master?: boolean;
}
const Project = ({cat, onDelete, onUpdate, sendCatToDaily, sendItemToDaily, master} : ProjectProps) => {
    return <div className="group">
        <Editable
            className="text-2xl inline-block font-semibold"
            initial={cat.title}
            onBlur={(content: string) => {
                cat.title = content;
                onUpdate(cat);
            }}
        />
        <div className="hidden group-hover:inline-block">
            <button
                className={classNames("inline border-2 rounded", master ? "border-master-border" : "border-daily-border")}
                onClick={() => onDelete(cat)}>delete me</button>
            { master ?
                <button
                className="inline border-2 rounded border-master-border"
                onClick={() => {
                    sendCatToDaily && sendCatToDaily(cat);
                }}>send to daily</button> : null }
        </div>
        
        <ul>
            {
            cat.items.map((item, i) => {
                return <li key={(master ? "master" : "daily") + `-item-${cat.key}-${i}`} className="relative mt-2 text-sm">
                    <input
                        type="checkbox"
                        id={(master ? "master" : "daily") + `-item-checkbox-${cat.key}-${i}`}
                        className="relative appearance-none w-4 h-4 align-sub border-slate-600 border-2 rounded-sm mr-2 shrink-0 peer
                                hover:border-slate-800
                                checked:bg-emerald-500 checked:border-0"
                        checked={cat.finished[i]}
                        onChange={(e) => {
                            cat.finished[i] = e.target.checked;
                            onUpdate(cat);
                          }}
                    />
                    <label 
                    //htmlFor={`master-item-checkbox-${cat.key}-${i}`}
                    className="leading-4"
                    >
                        <Editable
                            className="inline-block min-w-52"
                            initial={item}
                            onBlur={(content) => {
                                cat.items[i] = content;
                                onUpdate(cat);
                            }}
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
            })}
            <li className="relative mt-2 text-sm">
                <input
                    type="checkbox"
                    id={(master ? "master" : "daily") + `-${cat.key}-newitem`}
                    className="relative appearance-none w-4 h-4 align-sub border-slate-400 border-2 rounded-sm mr-2 shrink-0"
                />
                <label className="leading-4">
                    <Editable
                        className="inline-block"
                        initial=""
                        placeholder="New item..."
                        onBlur={(content) => {
                            cat.items.push(content);
                            cat.finished.push(false);
                            onUpdate(cat);
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