import React from "react"

 
export interface Params{
    message:string,
    type:"info"|"error"|"success"|"warning",
    timeout:number,
    autoCloseWithTimeout:boolean,
    animation:{
        slideAnimation:boolean
        animationDuration:number
    },
    header:React.ReactElement,
    body:React.ReactElement,
    className:string,
    title:string,
    button:{
        className?:string,
        title?:string
    },
    Component?: React.FC|React.ComponentClass
 }

export type withKey=Params&{key:number}