import React, { useEffect, useState } from 'react';
import classes from './SubscriptionList.module.css';
import Subscription from './Subscription';

function SubscriptionList({customerId}) {
  const [isLoading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions]=useState([]);
  useEffect(()=>{
    fetch(`http://localhost:5000/api/getSubscriptionData/${customerId}`).then((data)=> data.json()).then((res)=>{
      setSubscriptions(res.subscriptionData);
      setLoading(false);
    });
  }, [customerId]);
  return (
    <>
      {isLoading && <h3 className="loading"> Loading... </h3>}
      {!isLoading && <ul className={classes['subscription-modal']}>
        {
            subscriptions.map((subscriptionData) => 
                <Subscription data={subscriptionData} key={subscriptionData.subscriptionId}
            />)
        }
      </ul>}
    </>
  )
}

export default SubscriptionList;
