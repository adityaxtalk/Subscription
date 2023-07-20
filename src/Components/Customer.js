import React, { useState } from "react";
import classes from './Customer.module.css';
import SubscriptionList from "./SubscriptionList";

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
        {expand && <SubscriptionList customerId={data.customerId}/>}        
      </li>
  )
}

export default Customer;
