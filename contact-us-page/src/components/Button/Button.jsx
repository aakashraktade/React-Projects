import React from "react";
import { MdMessage } from "react-icons/md";
import styles from "./Button.module.css";

const Button = (props) => {

    const {isOutLine,icon,text,...rest}=props;
  return (
    <button {...rest} className={isOutLine ?styles.outline_btn: styles.primary_btn}>
     
      {icon}
      {text}
    </button>
  );
};

export default Button;
