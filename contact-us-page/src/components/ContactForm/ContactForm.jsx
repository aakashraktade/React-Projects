import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import Button from "../Button/Button";
import { MdMessage } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const ContactForm = () => {

  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [text,setText]=useState();



  const onSubmit=(e)=>{
    e.preventDefault();

   setName(e.target[0].value)
    setEmail(e.target[1].value)
    setText(e.target[2].value)

  }


  return (
    <div className={styles.container}>
      <div className={styles.contact_form}>
        <div className={styles.top_btn}>
          <Button
            text="VIA SUPPORT CHAT"
            icon={<MdMessage fontSize={"24px"} />}
          />
          <Button 
         
          text="VIA CALL" icon={<FaPhoneAlt fontSize={"24px"} />} />
        </div>
        <Button
          isOutLine={true}
          text="VIA EMAIL FORM"
          icon={<IoIosMail fontSize={"24px"} />}
        />

        <form onSubmit={onSubmit}>
          <div className={styles.form_control}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="" />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="text">Text</label>
            <textarea name="text" id="" rows="8" />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button text="Submit" />
          </div>
          <div>
            {name+" "+email+" "+text+" "}
          </div>
        </form>
      </div>
      <div className={styles.contact_Img}>
        <img src="./images/Service 24_7-pana 1.svg" alt="contact" />
      </div>
    </div>
  );
};

export default ContactForm;
