"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Category, ListType } from "./types";
import Project from "./project";
import Editable from "./editable";

interface ListProps {
    title: string;
    listType: ListType;
    categories: Category[];
    updateCategoryGlobal: (cat: Category) => void; 
    addCategory: (cat: Category, listType: ListType) => void;
    deleteCategory: (cat: Category, listType: ListType) => void;
    transferCategory?: (cat: Category) => void;
    className?: string;
}

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const List = ({title, listType, categories, updateCategoryGlobal, addCategory, deleteCategory, transferCategory, className} : ListProps) => {
    const [list, setList] = useState(categories);

    useEffect(() => {
        setList(categories);
    }, [categories]);


    return (
        <div className={classNames(className, "w-fit pl-5 pr-5 flex flex-col items-start mx-auto")}>
            <h1 className="text-3xl font-bold mb-1 mt-3">{title}</h1>
            <hr className="w-full border-1 border-stone-600 mb-6"/>
            {
                list.map((cat, _) => <Project
                    cat={cat}
                    onDelete = {(cat: Category) => deleteCategory(cat, listType)}
                    onUpdate = {updateCategoryGlobal}
                    key={cat.key}
                    sendCatToDaily={transferCategory}
                    master={listType === 'master'}
                />)
            }
            <Editable 
              className="text-2xl font-semibold italic w-max"
              initial=""
              onBlur={(content: string) => {
                addCategory(new Category(content, [], [], generateId()), listType);
                }}
              placeholder="New category..."
              clearOnBlur
            />

        </div>
    );
}

export default List;