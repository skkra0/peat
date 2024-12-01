"use client";
import classNames from "classnames";
import React, { useCallback, useEffect } from "react";
import Editable from "./components/editable";
import Category from "./components/category";
import Project from "./components/project";
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
  const [listDisplay, setListDisplay] = React.useState(ListDisplay.SPLIT);
  const [masterList, setMasterList] = React.useState([] as Category[]);
  const [isInitialized, setIsInitialized] = React.useState(false);
  useEffect(() => {
    setMasterList(t("master"));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(`${NAMESPACE}-master`, JSON.stringify(masterList));
      for (let c of masterList) {
        console.log(c.items);
      }
    }
  }, [masterList]);

  return (
    <>
      <div className={classNames("h-full min-w-0 text-slate-800 bg-master border border-t-0 border-master-border inline-block basis-0 minmax", 
        { "flex-grow z-20" : listDisplay === ListDisplay.LEFT_MAX},
        { "flex-grow z-10": listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0 z-0" : listDisplay === ListDisplay.RIGHT_MAX },
      )}>
          <div className="m-0 pt-2 pl-3">
            <h1 className="text-3xl font-bold mb-6">master list</h1>
              {
                masterList.map((cat, _) => <Project
                cat={cat}
                onDelete = {(cat) => {}}
                onUpdate = {(cat) => {
                  setMasterList(masterList.map((c) => c.key === cat.key ? cat : c));
                }}
                key={cat.key}
                />)
              }
              <Editable 
              className="text-2xl font-semibold italic w-max mt-5"
              initial=""
              onBlur={(content: string) => {
                setMasterList((prevMasterList) => {
                  return [...prevMasterList, new Category(content, [], [], generateId())];
                });
              }}
              placeholder="New category..."
              clearOnBlur
              />
            <button className={classNames("border-black bg-master-accent rounded-full w-20 h-20 minmax-button absolute bottom-2",
              {"left-1/4" : listDisplay === ListDisplay.SPLIT || listDisplay === ListDisplay.RIGHT_MAX},
              {"left-1/2" : listDisplay === ListDisplay.LEFT_MAX},
            )}>edit</button>
          </div>
      </div>
      <div 
      className={classNames("w-10 h-full cursor-pointer bg-master border border-t-0 border-l-0 border-master-border flex items-center justify-center",
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
          className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>

      </div>
      <div 
      className={classNames("w-10 h-full z-10 cursor-pointer bg-daily border-t-0 border-r-0 border-daily-border flex items-center justify-center",
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
        className="size-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

      </div>
      <div className={classNames("h-full min-w-0 bg-daily border border-t-0 border-daily-border inline-block basis-0 minmax",
        { "flex-grow z-20" : listDisplay === ListDisplay.RIGHT_MAX },
        { "flex-grow z-10": listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0 z-0" : listDisplay === ListDisplay.LEFT_MAX },
      )}>
        <p>ipsum</p>
        <p>dolor</p>
        <p>sit</p>
        <p>amet</p>
        <button className={classNames("border-black bg-daily-accent rounded-full w-20 h-20 minmax-button absolute bottom-2",
          {"left-3/4" : listDisplay === ListDisplay.SPLIT || listDisplay === ListDisplay.LEFT_MAX},
          {"left-1/2" : listDisplay === ListDisplay.RIGHT_MAX},
        )}>edit</button>
      </div>
    </>
  );
};

export default Page;