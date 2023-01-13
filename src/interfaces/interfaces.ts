export interface Params{
    message:string,
    type:"info"|"error"|"success"|"warning",
    timeout:number,
    userControl:boolean,
    key?:number
 }