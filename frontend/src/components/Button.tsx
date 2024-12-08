import { ReactElement } from "react"


interface buttonProps{
     variant: "primary" | "secondary",
     text: string,
     startIcon: ReactElement,
}
const vairiantClasses={
     "primary":"bg-purple-600 text-white",
     "secondary":"bg-purple-200 text-purple-600",
};
const defaultClasses="px-5 py-2 rounded-md font-light"
export function Button({variant,text,startIcon}:buttonProps){
     return (
          <button className={vairiantClasses[variant]+""+defaultClasses}>
               {startIcon}
               {text}
          </button>
     )
}