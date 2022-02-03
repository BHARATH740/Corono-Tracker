import React from "react";
import { fetchDailyData } from "../../api";
import {Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import {Chart as ChartJS} from 'chart.js/auto';

export default function Charts({data, country}){
    const [dailyData , setDailyData] = React.useState({});
    // console.log(fetchDailyData());

    React.useEffect(()=> {
        const fetchApi = async ()=>{
            setDailyData(await fetchDailyData());
        }
        fetchApi();
    },[]);
    console.log(data.confirmed)
    
    const lineChart =(
        dailyData.length ?
        (
            <Line 
                data={{
                    labels : dailyData.map(({date}) => date),
                    datasets : [{
                        data : dailyData.map(({confirmed}) => confirmed),
                        label : 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },{
                        data : dailyData.map(({deaths}) => deaths),
                        label : 'Deaths',
                        backgroundColor: 'rgba(255, 0, 0 , 0.5)',
                        fill: true,
                    }],
                }}
            />
        ) : null
    )

    const barChart = (
        data.confirmed
        ?(
            <Bar 
                data={{
                    labels: [ 'Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)']

                    ,
                    data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                }]
            }}
                options={{
                    legend: {display: false},
                    title: {display: true, text:`Current State in ${country}`}
                }}
            
            />
        ): null
    )

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}