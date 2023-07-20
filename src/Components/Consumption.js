import React, {useState, useEffect} from 'react'

function Consumption({subscriptionId}) {
   const [isLoading, setLoading] = useState(true);
   const [resourceGroupData, setResourceGroup] = useState([]);
   const [consumptionData, setConsumptionData] = useState([]);
   useEffect(()=>{
    const getSubscriptionData= async () => {
        let consumption = await fetch(`http://localhost:5000/api/getConsumptionDetail/${subscriptionId}`);
        consumption= await consumption.json()
        consumption=consumption.consumptionData;
        setConsumptionData(consumption);
        let resource= await fetch(`http://localhost:5000/api/getResourceGroups/${subscriptionId}`);
        resource= await resource.json();
        resource=resource.resourceData;
        setResourceGroup(resource);
        setLoading(false);
        const mergedData=[]
        for (let i = 0; i<consumption.length; i++) {
            const {id, ...temp}={
                ...consumption[i],
                ...resource.find(item => consumption[i].id === item.resourceGroupId)
            }
            mergedData.push(temp)
         }
    }
    getSubscriptionData();
   }, [])
  return (
    <>
       {isLoading && <h3 className='loading'>Loading...</h3>}
       {!isLoading && <h3>{subscriptionId}</h3>}
    </>
  )
}

export default Consumption
