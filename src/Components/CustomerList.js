import React from 'react';
import { useGlobalContext } from '../context';

function CustomerList() {
  const { isLoading, customerData, handleSubscriptions} = useGlobalContext();
  return (
    <>
      {isLoading && <h3 className="loading">Loading...</h3>}
      {!isLoading && 
        <>
            <label htmlFor='customerOptions'>Select Customer from below options: </label>
            <select onChange={(e)=> handleSubscriptions(e.target.value)} id="customerOptions" className='select_menu'>
                <option value="">Select an option....</option>
                {
                  customerData.map((data) => {
                    return <option key={data.customerId} value={data.customerId}>{data.name}</option>
                  })
                }
            </select>
          </>
       }
    </>
  )
}

export default CustomerList
