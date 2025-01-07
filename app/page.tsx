"use client";
import classNames from "classnames";
import { useEffect, useState } from "react";
import {Category, ListType} from "./components/types";
import List from "./components/list";
const NAMESPACE = "PEATAPP";

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
const Page = () => {
  enum ListDisplay {
    LEFT_MAX,
    SPLIT,
    RIGHT_MAX
  }

  const t = (key: String) => {
    let lists = localStorage.getItem(`${NAMESPACE}-${key}`);
    if (lists !== null) {
      return JSON.parse(lists);
    }
    return [];
  }

  const [listDisplay, setListDisplay] = useState(ListDisplay.SPLIT);
  const [masterList, setMasterList] = useState([] as Category[]);
  const [dailyList, setDailyList] = useState([] as Category[]);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleUpdate = (cat : Category) => {
    setMasterList(prevMasterList => prevMasterList.map((c) => c.key === cat.key ? cat : c));
    setDailyList(prevDailyList => prevDailyList.map((c) => c.key === cat.key ? cat : c));
  }

  const addToList = (cat: Category, listType: ListType) => {
    if (listType === 'master') {
      setMasterList(prevMasterList => [...prevMasterList, cat]);
    } else if (listType === 'daily') {
      setDailyList(prevDailyList => [...prevDailyList, cat]);
    }
  }

  const deleteFromList = (cat: Category, listType: ListType) => {
    if (listType === 'master') {
      setMasterList(prevMasterList => prevMasterList.filter((c) => c.key !== cat.key));
    } else if (listType === 'daily') {
      setDailyList(prevDailyList => prevDailyList.filter((c) => c.key !== cat.key));
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
  }, [masterList, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(`${NAMESPACE}-daily`, JSON.stringify(dailyList));
    }
  }, [dailyList, isInitialized]);

  return (
    <>
      <div className={classNames("w-full min-h-0 md:h-full md:min-w-0 justify-start border border-t-0 border-stone-700 basis-0 overflow-scroll minmax", 
        { "flex-grow" : listDisplay === ListDisplay.LEFT_MAX || listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0" : listDisplay === ListDisplay.RIGHT_MAX },
      )}>
            <List
              title="Master List"
              listType="master"
              categories={masterList}
              updateCategoryGlobal={handleUpdate}
              addCategory={addToList}
              deleteCategory={deleteFromList}
              transferCategory={(cat : Category) => {
                setDailyList((prevDailyList) => {
                  if (prevDailyList.find((c) => c.key === cat.key) === undefined) {
                    return [...prevDailyList, cat];
                  }
                  return prevDailyList;
                });
              }}
            />
          <button className={classNames("hidden md:flex items-center justify-center border-black bg-master-accent rounded-full w-20 h-20 minmax-button fixed bottom-2 left-1/2 transform -translate-x-1/2",
              {"md:left-1/4" : listDisplay === ListDisplay.SPLIT },
              {"md:hidden" : listDisplay === ListDisplay.RIGHT_MAX},
            )}>
              <svg
                className="w-12 h-12 ml-1 mb-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                {/*Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
                <title>Edit</title>
                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/>
              </svg>
            </button>
      </div>
      <button 
      className={classNames("h-10 w-full md:w-10 md:h-full cursor-pointer border border-stone-700 flex items-center justify-center",
        { "hidden" : listDisplay === ListDisplay.RIGHT_MAX },
      )}
      onClick={() => { 
          if (listDisplay === ListDisplay.SPLIT) {
            setListDisplay(ListDisplay.RIGHT_MAX);
          } else if (listDisplay === ListDisplay.LEFT_MAX){
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
      className={classNames("h-10 w-full md:w-10 md:h-full cursor-pointer border border-stone-700 flex items-center justify-center",
        { "hidden" : listDisplay === ListDisplay.LEFT_MAX },
      )}
      onClick={() => {
          if (listDisplay === ListDisplay.SPLIT) {
            setListDisplay(ListDisplay.LEFT_MAX);
          } else if (listDisplay === ListDisplay.RIGHT_MAX){
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
      <div className={classNames("h-full min-w-0 border border-stone-700 basis-0 minmax overflow-scroll",
        { "flex-grow" : listDisplay === ListDisplay.RIGHT_MAX || listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0" : listDisplay === ListDisplay.LEFT_MAX },
      )}>
        <List
          title="Today"
          listType="daily"
          categories={dailyList}
          updateCategoryGlobal={handleUpdate}
          addCategory={addToList}
          deleteCategory={deleteFromList}
        />
        <button className={classNames("hidden md:flex items-center justify-center border-black bg-daily-accent rounded-full w-20 h-20 minmax-button fixed bottom-2 left-1/2 -translate-x-1/2",
          {"left-3/4" : listDisplay === ListDisplay.SPLIT},
          {"md:hidden" : listDisplay === ListDisplay.LEFT_MAX},
        )}>
          <svg
            className="w-12 h-12 ml-1 mb-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            {/*Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
            <title>Edit</title>
            <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z"/>
            </svg>
        </button>
      </div>
    </>
  );
};

export default Page;