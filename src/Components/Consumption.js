import React, {useState, useEffect} from 'react'
import classes from './Consumption.module.css';
import LineChart from './Visuals/LineChart';
import PieChart from './Visuals/PieChart';
import BarChart from './Visuals/BarChart';
import { useGlobalContext } from '../context';

function Consumption({subscriptionId}) {
  const {isConsumptionDataLoading, consumptionData} = useGlobalContext();
   const [pieChartData, setPieChartData]= useState(null);
   const [lineChartData, setLineChartData]= useState(null);
   const [barChartData, setBarChartData] = useState(null);
   const [barChartData2, setBarChartData2]=useState(null);
   useEffect(()=>{
    if (consumptionData.length > 0) {
      setPieChartData({
        labels: consumptionData.map((data)=> data.resourcelocation),
        datasets:[{
          label: 'Unit Price',
          data: consumptionData.map((data)=> data.unitprice),
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
        labels: consumptionData.map((data)=> data.servicefamily),
        datasets:[{
          label: 'Consumption as service Family',
          data: consumptionData.map((data)=> data.Consumption),
          borderWidth: 2,
          borderColor: 'black',
          backgroundColor: [
            "#rgba(170,170, 170, 0.3)"
          ]
        }]
       })

       setBarChartData({
        labels: consumptionData.map((data)=> data.resourcelocation),
        datasets:[{
          label: 'Consumption as resource location',
          data: consumptionData.map((data)=> data.Consumption),
          borderWidth: 2,
          borderColor: 'black',
          backgroundColor: [
            "#rgba(170,170, 170, 0.3)"
          ]
        }]
       })

       setBarChartData2({
        labels: consumptionData.map(data=> data.resourcegroupId),
        datasets:[
          {
            label: 'BillingDate: 09-06-2023',
            data: consumptionData.map(data=> {
                  if (data.billingdate==='09-06-2023') {
                      return data.Consumption
                  } else {
                      return 0                  
                  }}),
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
          },
          {
            label: 'BillingDate: 10-06-2023',
            data: consumptionData.map(data=> {
                  if (data.billingdate==='10-06-2023') {
                      return data.Consumption
                  } else {
                      return 0                  
                  }}),
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
          }
        ]

       })
     } else {
      setPieChartData(null);
      setBarChartData(null);
      setLineChartData(null);
      setBarChartData2(null);
     }
   }, [consumptionData])
  return (
    <div className={classes['consumption_Container']}>    
       {isConsumptionDataLoading  && <h3 className='loading'>Loading...</h3>}
       {!isConsumptionDataLoading && <h3>{subscriptionId}</h3>}
       {!isConsumptionDataLoading && lineChartData && pieChartData && barChartData && <section className={classes['visual__graph']}>
          <div className={classes.visual}>
            <LineChart chartData={lineChartData}/>
          </div>
          <div className={classes.visual}>
            <PieChart chartData={pieChartData}/>
          </div>
          <div className={classes.visual}>
            <BarChart chartData={barChartData}/>
          </div>
          <div className={classes.visual}>
            <BarChart chartData={barChartData2}/>
          </div>
        </section>
      }
      {
        !isConsumptionDataLoading  && !lineChartData && !pieChartData && !barChartData && <h3 style={{textAlign: 'center'}}>Data Not Found!</h3>
      }
    </div>
  )
}

export default Consumption
