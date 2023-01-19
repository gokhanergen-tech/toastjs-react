
 
export interface Params{
    message:string,
    type:"info"|"error"|"success"|"warning",
    timeout:number,
    autoCloseWithTimeout:boolean,
    animation:{
        slideAnimation:boolean
        animationDuration:number
    },
 }

export type withKey=Params&{key:number}