import Category from "./category";
import Editable from "./editable";

interface ProjectProps {
    cat: Category;
    onDelete: (cat: Category) => void;
    onUpdate: (cat: Category) => void;
}
const Project = ({cat, onDelete, onUpdate} : ProjectProps) => {
    return <div>
        <Editable
            className="text-2xl font-semibold w-80"
            initial={cat.title}
            onBlur={(content: string) => {
                cat.title = content;
                onUpdate(cat);
            }}
        />
        <ul>
            {
            cat.items.map((item, i) => {
                return <li key={`master-item-${cat.key}-${i}`} className="relative mt-2 text-sm">
                    <input
                        type="checkbox"
                        id={`master-item-checkbox-${cat.key}-${i}`}
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
                    id={`master-${cat.key}-newitem`}
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