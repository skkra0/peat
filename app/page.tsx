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

  const [listDisplay, setListDisplay] = React.useState(ListDisplay.LEFT_MAX);

  return (
    <>
  
      <div className={classNames("h-full min-w-0 bg-slate-600 inline-block basis-0 minmax", 
        { "flex-grow" : listDisplay === ListDisplay.LEFT_MAX || listDisplay === ListDisplay.SPLIT },
        {"flex-grow-0" : listDisplay === ListDisplay.RIGHT_MAX },
      )}>
        lorem
      </div>
      <div className="w-10 h-full bg-slate-400 inline-block" onClick={() => { 
          if (listDisplay === ListDisplay.SPLIT) {
            setListDisplay(ListDisplay.RIGHT_MAX);
          } else if (listDisplay === ListDisplay.LEFT_MAX){
            setListDisplay(ListDisplay.SPLIT);
          }
        }}>
      </div>
      <div className="w-10 h-full bg-slate-300 inline-block" onClick={() => {
          if (listDisplay === ListDisplay.SPLIT) {
            setListDisplay(ListDisplay.LEFT_MAX);
          } else if (listDisplay === ListDisplay.RIGHT_MAX){
            setListDisplay(ListDisplay.SPLIT);
          }
      }}>
            
      </div>
      <div className={classNames("h-full min-w-0 bg-slate-900 inline-block basis-0 minmax",
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