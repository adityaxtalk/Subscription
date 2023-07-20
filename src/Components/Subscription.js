import React, {useState} from 'react'
import classes from './Subscription.module.css';
import Consumption from './Consumption';

function Subscription({data}) {
    const [expand, setExpand] = useState(false);
    const handleSectionExpand = () =>{
      setExpand(prevState => !prevState);
    }
  return (
    
    <li className={classes.modal}>
        <div className={classes.name}>
            {data.displayName} 
            <button onClick={handleSectionExpand} className={classes.expand}>
                {expand ? '-': '+'}
            </button>
            {expand && <Consumption subscriptionId={data.subscriptionId}/>}
        </div>    
    </li>
  )
}

export default Subscription
