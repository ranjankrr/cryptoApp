import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';


const GraphChart =(props)=>{
     const [records, setRecords] = useState([]);
      const getData = async()=>{
      const res = await fetch("https://supermind-staging.vercel.app/api/test/graph");
      const actualData = await res.json();
         setRecords(actualData);
          //console.log(actualData);
     }
     useEffect(()=>{
          getData();
     },[]);
     
  return(
    <>
       <h4 className='text-center'>Displaying Crypto Market Data</h4>
       <div className='coins-name'>{props.Selects}</div>
       <ResponsiveContainer width="100%" aspect={3}>
           <LineChart data={records}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="datetime"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line dataKey="price" stroke='green' activeDot={{r :10}}/>
              </LineChart>
            </ResponsiveContainer>
    </>
  )
}
export default GraphChart;