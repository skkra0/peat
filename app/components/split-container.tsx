'use client';
import { useEffect, useState } from 'react';
import List from './list';
import classNames from 'classnames';
import { ProjectInfo } from '@prisma/client';
import { ListType } from './types';
enum ListDisplay {
    LEFT_MAX,
    SPLIT,
    RIGHT_MAX
}

const NAMESPACE = "PEATAPP";

const SplitContainer = ({ lists }: { lists: ProjectInfo[][] }) => {
    const t = (key: String) => {
        let lists = localStorage.getItem(`${NAMESPACE}-${key}`);
        if (lists !== null) {
            return JSON.parse(lists);
        }
        return [];
    }

    const [listDisplay, setListDisplay] = useState(ListDisplay.SPLIT);
    const [masterList, setMasterList] = useState(lists[0]);
    const [dailyList, setDailyList] = useState(lists[1]);
    const [isInitialized, setIsInitialized] = useState(false);
    const handleUpdate = (cat: ProjectInfo) => {
        setMasterList(prevMasterList => prevMasterList.map((c) => c.id === cat.id ? cat : c));
        setDailyList(prevDailyList => prevDailyList.map((c) => c.id === cat.id ? cat : c));
    }

    const addToList = (cat: ProjectInfo, listType: ListType) => {
        if (listType === 'master') {
            setMasterList(prevMasterList => [...prevMasterList, cat]);
        } else if (listType === 'daily') {
            setDailyList(prevDailyList => [...prevDailyList, cat]);
        }
    }

    const deleteFromList = (cat: ProjectInfo, listType: ListType) => {
        if (listType === 'master') {
            setMasterList(prevMasterList => prevMasterList.filter((c) => c.id !== cat.id));
        } else if (listType === 'daily') {
            setDailyList(prevDailyList => prevDailyList.filter((c) => c.id !== cat.id));
        }
    }
    useEffect(() => {
        setMasterList(t("master"));
        setDailyList(t("daily"));
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(`${NAMESPACE}-master`, JSON.stringify(masterList));
        }
    }, [masterList]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(`${NAMESPACE}-daily`, JSON.stringify(dailyList));
        }
    }, [dailyList]);

    return (
        <>
            <div className={classNames("w-full min-h-0 md:h-full md:min-w-0 justify-start border border-t-0 border-peat-dark basis-0 overflow-scroll minmax",
                { "flex-grow": listDisplay === ListDisplay.LEFT_MAX || listDisplay === ListDisplay.SPLIT },
                { "flex-grow-0": listDisplay === ListDisplay.RIGHT_MAX },
            )}>
                <List
                    title="Master List"
                    listType="master"
                    categories={masterList}
                    updateCategoryGlobal={handleUpdate}
                    addCategory={addToList}
                    deleteCategory={deleteFromList}
                    transferCategory={(cat: ProjectInfo) => {
                        setDailyList((prevDailyList) => {
                            if (prevDailyList.find((c) => c.id === cat.id) === undefined) {
                                return [...prevDailyList, cat];
                            }
                            return prevDailyList;
                        });
                    }}
                />
                <button className={classNames("hidden md:block border-peat-dark bg-master-accent rounded-full w-20 h-20 minmax-button fixed bottom-2 left-1/2 transform -translate-x-1/2",
                    { "md:left-1/4": listDisplay === ListDisplay.SPLIT },
                    { "md:hidden": listDisplay === ListDisplay.RIGHT_MAX },
                )}>edit</button>
            </div>
            <button
                className={classNames("h-10 w-full md:w-10 md:h-full cursor-pointer border border-peat-dark flex items-center justify-center",
                    { "hidden": listDisplay === ListDisplay.RIGHT_MAX },
                )}
                onClick={() => {
                    if (listDisplay === ListDisplay.SPLIT) {
                        setListDisplay(ListDisplay.RIGHT_MAX);
                    } else if (listDisplay === ListDisplay.LEFT_MAX) {
                        setListDisplay(ListDisplay.SPLIT);
                    }
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-10 rotate-90 md:rotate-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

            </button>
            <button
                className={classNames("h-10 w-full md:w-10 md:h-full cursor-pointer border border-peat-dark flex items-center justify-center",
                    { "hidden": listDisplay === ListDisplay.LEFT_MAX },
                )}
                onClick={() => {
                    if (listDisplay === ListDisplay.SPLIT) {
                        setListDisplay(ListDisplay.LEFT_MAX);
                    } else if (listDisplay === ListDisplay.RIGHT_MAX) {
                        setListDisplay(ListDisplay.SPLIT);
                    }
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-10 rotate-90 md:rotate-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </button>
            <div className={classNames("h-full min-w-0 border border-peat-dark basis-0 minmax overflow-scroll",
                { "flex-grow": listDisplay === ListDisplay.RIGHT_MAX || listDisplay === ListDisplay.SPLIT },
                { "flex-grow-0": listDisplay === ListDisplay.LEFT_MAX },
            )}>
                <List
                    title="Today"
                    listType="daily"
                    categories={dailyList}
                    updateCategoryGlobal={handleUpdate}
                    addCategory={addToList}
                    deleteCategory={deleteFromList}
                />
                <button className={classNames("hidden md:block border-peat-dark bg-daily-accent rounded-full w-20 h-20 minmax-button fixed bottom-2 left-1/2 -translate-x-1/2",
                    { "left-3/4": listDisplay === ListDisplay.SPLIT },
                    { "md:hidden": listDisplay === ListDisplay.LEFT_MAX },
                )}>edit</button>
            </div>
        </>
    );
};

export default SplitContainer;