import React, { useState } from "react";
import classes from './Customer.module.css';
import Subscription from "./Subscription";

function Customer(props) {
  const data=props.data;
  const [expand, setExpand] = useState(false);
  const handleSectionExpand = () =>{
    setExpand(prevState => !prevState);
  }
  
  return (
      <li>
        <div className={classes.name}>
            {data.name} 
            <button onClick={handleSectionExpand} className={classes.expand}>
                {expand ? '-': '+'}
            </button>
        </div>
        {expand && <Subscription subscription={data}/>}        
      </li>
  )
}

export default Customer;
