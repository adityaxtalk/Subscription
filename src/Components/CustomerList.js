import React from 'react';
import { useGlobalContext } from '../context';
import Customer from './Customer';
function CustomerList() {
  const { isLoading, customerData} = useGlobalContext();
  return (
    <>
      {isLoading && <h3 className="loading">Loading...</h3>}
      {!isLoading && <ul>
        {
            customerData.map((data, index)=>{
                return <Customer key={index} data={data}/>
            })
        }
       </ul>}
    </>
  )
}

export default CustomerList
