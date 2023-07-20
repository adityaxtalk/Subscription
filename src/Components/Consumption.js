import React, {useState, useEffect} from 'react'
import classes from './Consumption.module.css';
import LineChart from './Visuals/LineChart';
import PieChart from './Visuals/PieChart';
import BarChart from './Visuals/BarChart';
function Consumption({subscriptionId}) {
   const [isLoading, setLoading] = useState(true);
   const [resourceGroupData, setResourceGroup] = useState([]);
   const [consumptionData, setConsumptionData] = useState([]);
   const [pieChartData, setPieChartData]= useState(null);
   const [lineChartData, setLineChartData]= useState(null);
   const [barChartData, setBarChartData] = useState(null);
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
        const mergedData=[]
        for (let i = 0; i<consumption.length; i++) {
            const {id, ...temp}={
                ...consumption[i],
                ...resource.find(item => consumption[i].id === item.resourceGroupId)
            }
            mergedData.push(temp)
         }
         if (mergedData.length > 0) {
          setPieChartData({
            labels: mergedData.map((data)=> data.resourcelocation),
            datasets:[{
              label: 'Unit Price',
              data: mergedData.map((data)=> data.unitprice),
              borderWidth: 2,
              borderColor: 'black',
              backgroundColor: [
                "#rgba(170,170, 170, 0.3)",
                "rgba(150, 59, 71, 0.3)",
                "rgba(213, 134, 238, 0.3)"
              ]
            }]
           })
  
           setLineChartData({
            labels: mergedData.map((data)=> data.servicefamily),
            datasets:[{
              label: 'Consumption as service Family',
              data: mergedData.map((data)=> data.Consumption),
              borderWidth: 2,
              borderColor: 'black',
              backgroundColor: [
                "#rgba(170,170, 170, 0.3)"
              ]
            }]
           })
  
           setBarChartData({
            labels: mergedData.map((data)=> data.resourcelocation),
            datasets:[{
              label: 'Consumption as resource location',
              data: mergedData.map((data)=> data.Consumption),
              borderWidth: 2,
              borderColor: 'black',
              backgroundColor: [
                "#rgba(170,170, 170, 0.3)"
              ]
            }]
           })
         }
         
         setLoading(false);
    }
    getSubscriptionData();
   }, [])
  return (
    <>
       {isLoading && <h3 className='loading'>Loading...</h3>}
       {!isLoading && <h3>{subscriptionId}</h3>}
       {!isLoading && lineChartData && pieChartData && barChartData && <section className={classes['visual__graph']}>
          <div className={classes.visual}>
            <LineChart chartData={lineChartData}/>
          </div>
          <div className={classes.visual}>
            <PieChart chartData={pieChartData}/>
          </div>
          <div className={classes.visual}>
            <BarChart chartData={barChartData}/>
          </div>
        </section>
      }
      {
        !isLoading && !lineChartData && !pieChartData && !barChartData && <h3 style={{textAlign: 'center'}}>Oops! Unable to retrive analytics</h3>
      }
    </>
  )
}

export default Consumption
