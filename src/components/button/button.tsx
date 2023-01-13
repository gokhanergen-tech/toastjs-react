import React from "react";

import styles from "./button.module.css";

const Button = ({ value, onClick,disabled=false, customClassName = "" }:{
  value:any,onClick:(event:object)=>void,disabled?:boolean,customClassName?:string
}) => {
  return (
    <button disabled={disabled} className={styles.button + " " + customClassName} onClick={onClick}>
      {value}
    </button>
  );
};


export default React.memo(Button);
