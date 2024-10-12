"use client";
import { Poppins, Noto_Sans } from "next/font/google";
import classNames from "classnames";
import React from "react";
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
        { "flex-grow" : listDisplay === ListDisplay.LEFT_MAX || listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0" : listDisplay === ListDisplay.RIGHT_MAX },
      )}>
        lorem
      </div>
      <div 
      className={classNames("w-10 h-full bg-master border border-t-0 border-l-0 border-master-border flex items-center justify-center",
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
      className={classNames("w-10 h-full bg-daily border-t-0 border-r-0 border-daily-border flex items-center justify-center",
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
        { "flex-grow" : listDisplay === ListDisplay.RIGHT_MAX || listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0" : listDisplay === ListDisplay.LEFT_MAX },
      )}>
        <p>ipsum</p>
        <p>dolor</p>
        <p>sit</p>
        <p>amet</p>
      </div>
    </>
  );
};

export default Page;