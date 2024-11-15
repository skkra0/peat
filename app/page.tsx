"use client";
import { Poppins, Noto_Sans } from "next/font/google";
import classNames from "classnames";
import React from "react";
import Editable from "./components/editable";
const NAMESPACE = "TODOAPP";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const noto = Noto_Sans({ subsets: ["latin"], weight: ["400", "700"] });



const Page = () => {
  enum ListDisplay {
    LEFT_MAX,
    SPLIT,
    RIGHT_MAX
  }

  const [listDisplay, setListDisplay] = React.useState(ListDisplay.SPLIT);

  return (
    <>
  
      <div className={classNames("h-full min-w-0 bg-master border border-t-0 border-master-border inline-block basis-0 minmax", 
        { "flex-grow z-20" : listDisplay === ListDisplay.LEFT_MAX},
        { "flex-grow z-10": listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0 z-0 text-nowrap" : listDisplay === ListDisplay.RIGHT_MAX },
      )}>
          <p>lorem</p>
          <Editable 
            className="text-2xl"
            initial=""
            onBlur={(content) => console.log(content)}
            placeholder="New category..."/>
          <button className={classNames("border-black bg-master-accent rounded-full w-20 h-20 minmax-button absolute bottom-2",
            {"left-1/4" : listDisplay === ListDisplay.SPLIT || listDisplay === ListDisplay.RIGHT_MAX},
            {"left-1/2" : listDisplay === ListDisplay.LEFT_MAX},
          )}>edit</button>
          
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