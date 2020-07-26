import React,{ useState, useEffect } from 'react'
//we need to export line graph
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';


const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    parser: "MM/DD/YYYY",
                    tooltipFormate: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callbacks: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function LineGraph({ casesType = "cases" }) {
    //console.log(casesType)
    const[data,setData] = useState({});
    const buildChartData= (data , casesType = "cases") => {
       
        //here we create  a new array to store the data create by subtracting the previous date data
        //next date data
        //x and y represents the x axis and y axis;
        
        let chartData=[];
        //to compare the last data
        let lastDataPoint;
        //we will check if the data is of cases or recovered or deaths
        for(let date in data.cases){
            if (lastDataPoint) {
                let newDataPoint = {
                    x:date,
                    //we get the new cases the next date
                    y:data[casesType][date] - lastDataPoint,
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }      
        return chartData;
    };
    useEffect(()=>{
            //to fetch data on initial render
          //https://disease.sh/v3/covid-19/historical/all?lastdays=30
        const fetchData= async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then((response) => {
                return response.json();
            })
            .then(data=>{
                //here we pass in the data and the term to extract specific data from the data obj
                
                let chartData=buildChartData(data,casesType);
                setData(chartData);

                //console.log(data)
                console.log(chartData);
                
            });
        };
        fetchData();       
    },[casesType]);

    return (
        <div>
            
          {data && data.length > 0 ?(
                    <Line 
                        options={options}
                        data={{
                            datasets:[
                                {
                                    backgroundColor:"rgb(8, 83, 140 , 0.4)",
                                    borderColor:'#08538c',
                                    data:data,
                                },                        
                            ],
                        }} 
                />        
            ):null}
        </div>
    );
}

export default LineGraph
