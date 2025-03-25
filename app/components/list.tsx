"use client";
import classNames from "classnames";
import { ProjectInfo } from "@prisma/client";
import { ListType } from "./types";
import Project from "./project";
import Editable from "./editable";

interface ListProps {
    title: string;
    listType: ListType;
    categories: ProjectInfo[];
    updateCategoryGlobal: (cat: ProjectInfo) => void; 
    addCategory: (cat: ProjectInfo, listType: ListType) => void;
    deleteCategory: (cat: ProjectInfo, listType: ListType) => void;
    transferCategory?: (cat: ProjectInfo) => void;
    className?: string;
}

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const List = ({title, listType, categories, updateCategoryGlobal, addCategory, deleteCategory, transferCategory, className} : ListProps) => {

    return (
        <div className={classNames(className, "w-fit pl-5 pr-5 flex flex-col items-center mx-auto")}>
            <h1 className="text-3xl font-semibold mb-1 mt-3">{title}</h1>
            <hr className="w-full border-1 border-peat-dark mb-6"/>
            {
                categories.map((cat, _) => <Project
                    cat={cat}
                    onDelete = {(cat: ProjectInfo) => deleteCategory(cat, listType)}
                    onUpdate = {updateCategoryGlobal}
                    key={cat.id}
                    sendCatToDaily={transferCategory}
                    master={listType === 'master'}
                />)
            }
            <Editable 
              className="text-2xl font-semibold italic w-max mb-24"
              initial=""
              onBlur={(content: string) => {
                // addCategory(new Category(content, [], [], generateId()), listType);
                }}
              placeholder="New category..."
              clearOnBlur
            />

        </div>
    );
}

export default List;