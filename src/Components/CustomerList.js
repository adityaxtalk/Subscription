import React from 'react';
import { useGlobalContext } from '../context';
import classes from './CustomerList.module.css';
import Customer from './Customer';
function CustomerList() {
  const { isLoading, customerData} = useGlobalContext();
  return (
    <>
      {isLoading && <div className={classes.loading}>Loading...</div>}
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
