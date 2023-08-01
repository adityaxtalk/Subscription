import React from 'react';

import { useGlobalContext } from '../context';

function SubscriptionList() {
  const {subscriptions, fetchConsumptionData, isCustomerOptionSelected, isSubscriptionDataLoading} = useGlobalContext();
  return (
    <>
    {!isCustomerOptionSelected && <h3 className="loading">Please select customer to get the subscription details.</h3>}
    {isSubscriptionDataLoading &&  isCustomerOptionSelected && <h3 className="loading">Loading Subscription Data....</h3>}
      {!isSubscriptionDataLoading && isCustomerOptionSelected &&
        <>
              <label htmlFor='subscriptionList'>Select subscription from below options: </label>
              <select onChange={(e)=> fetchConsumptionData(e.target.value)} id="subscriptionList" className='select_menu'>
                  <option disabled selected value>--Select an option--</option>
                  {
                    subscriptions.map((data) => {
                        return <option key={data.subscriptionId} value={data.subscriptionId}>{data.displayName}</option>
                    })
                  }
              </select>
        </>
      }
    </>
  )
}

export default SubscriptionList;
