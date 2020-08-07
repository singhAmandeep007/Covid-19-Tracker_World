import React,{useState, useEffect} from 'react';
import InfoBox from './Dashboard/InfoBox';
import CreateMap from './Dashboard/Map';
import Table from './Dashboard/Table';
import LineGraph from './Dashboard/LineGraph';
import {sortData , prettyPrintStat } from '../utils/util';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {MenuItem,FormControl,Select,Card,CardContent,FormHelperText} from "@material-ui/core";


import '../css/App.css';
import '../css/Dashboard/Navbar.css';
import "leaflet/dist/leaflet.css"

function Dashboard() {
  const[countries,setCountries]=useState([]);
  const[selectedCountry,setSelectedCountry]=useState('worldwide')
  const[countryInfo,setCountryInfo]=useState({});
  const[countryName,setCountryName]=useState('Worlwide')
  const[tableData,setTableData]=useState([]);
  // we pass in the center of the world
  const[mapCenter,setMapCenter]=useState({ lat:21.14, lng:79.088 });
  const[mapZoom,setMapZoom]=useState(2.6);
  const[mapCountries,setMapCountries]=useState([])
  const[casesType,setCasesType]=useState('cases')
  const[graphColor,setGraphColor]=useState('blue');
  const colors=['blue','green','red'];

  useEffect(()=>{ 
   
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data)
    })
  }, [])

  useEffect(()=>{
    const getCountriesData= async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=>{
        //console.log(data)
        const countries = data.map((country,index)=>{
          //here we return an  object and push it into countries array with map 
          //console.log(country.countryInfo._id)
          return(
            {
              name:country.country,//United States,United Kingdom
              value: country.countryInfo.iso2,//Uk,USA, FR
              id:index
            }
          )      
        })
        const sortedData=sortData(data);
        //here we pass in the sorteddata to tableData state
        setTableData(sortedData);
        //to make our dropdown selectable and get value attribute when selected
        setCountries(countries);

        setMapCountries(data);
      })
    }
    getCountriesData();
  },[])

 
  

  const onCountryChange= async (e)=>{
    //console.log(e)
   const countryCode=e.target.value;
    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[country_code]
    const url= countryCode==='worldwide'
    ?'https://disease.sh/v3/covid-19/all'
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then((response)=>response.json())
    .then(data=>{
      setSelectedCountry(countryCode)
      setCountryInfo(data)
      // console.log(selectedCountry)
      if(data && countryCode !=='worldwide'){
        console.log('lat')
        
        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
        setMapZoom(4.3);
      }else{
        setMapCenter([21.14,79.088])
        setMapZoom(5.3);
      }
    
      //console.log(data)
    })

    const el = document.querySelector("#dropdown1");
  
    console.log(el.innerHTML)
 
    setCountryName(el.innerHTML)
  }



  
  return (
    
    <div >
      {/* navbar */}
        <nav id="navbar">
          <h1 className="logo">
            <span className="text-primary">
             Covid</span><TrendingUpIcon fontSize="large" style={{color:'rgb(173, 255, 47)'}} /><span style={{color:'rgb(243, 28, 21)'}}>Tracker</span>
          </h1>
          <ul>
            <li><a href="#home">Dashboard</a></li>
            <li><a href="#what">Precautions</a></li>
            <li><a href="#who">Donate</a></li>
            <li><a href="#contact">News</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      {/* container */}
    <div className="app">

      {/* left part */}
      <div className="app_left">
        {/* Header */}
        <div className="app_header">
        <h1>Covid-19 Dashboard</h1>
        {/* {Title + Select Input dropdown} */}
        <FormControl className="app_dropdown">
        
          <Select             
            variant="outlined" 
            id="dropdown1" 
            className="menuItem"
            value={selectedCountry} 
            onChange={onCountryChange}
            >
            
            <MenuItem key="a1b2"  value="worldwide">Worldwide</MenuItem>

            {/* loop through all countries and show a dropdown select option for each */}
          
            { countries.map(country=>{             
              return(
                <MenuItem key={country.id}  value={country.value}>{country.name}</MenuItem>
              )
              })
            }

          </Select>
          <FormHelperText style={{marginTop:'12px'}}>Select Country</FormHelperText>
        </FormControl>
        </div>
      
        <h3 className="app_graphTitle">Overview of {countryName}</h3>

        <div className="app_stats">
       
          <InfoBox
          color={colors[0]}
          onClick={()=>{setCasesType('cases'); setGraphColor('blue');}} 
          title="Confirmed Cases" 
          cases={prettyPrintStat(countryInfo.todayCases)} 
          total={countryInfo.cases} ></InfoBox>
        {/* Info Boxes title="coronavirus active cases*/}
          <InfoBox 
           color={colors[1]}
          title="Recovered"
          active={casesType==="recovered"}
          onClick={()=>{setCasesType('recovered'); setGraphColor('green');}} 
          cases={prettyPrintStat(countryInfo.todayRecovered)} 
          total={countryInfo.recovered}></InfoBox>
        {/* Info Boxes title="coronavirus recoverd */}
          <InfoBox 
           color={colors[2]}
          title="Deaths" 
          active={casesType==="deaths"}
          onClick={()=>{setCasesType('deaths'); setGraphColor('red');}} 
          cases={prettyPrintStat(countryInfo.todayDeaths)} 
          total={countryInfo.deaths}></InfoBox>
        {/* Info Boxes title="coronavirus deaths*/}
        </div>
 
        {/* Map */}
          <h3 className="app_graphTitle">Covid-19 Impact in {countryName}</h3>
        <CreateMap 
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries} 
         
          countryInfo={countryInfo}  
        />      
      </div>
      {/* right part */}
      <div className="app_right">
      <Card className="item app_table">
          <CardContent>
            <h3 className="app_graphTitle">Top Total Cases by Country</h3>
            {/* Table */}
            <Table countries={tableData}/>
          </CardContent>
      </Card>
      <Card className="item ">
        <CardContent>
          {/* Graph */}
        <h3 className="app_graphTitle noData">{countryName} {casesType} Timeline </h3>
        <LineGraph 
        className="app_graph"       
              casesType={casesType}  
              graphColor={graphColor} 
              selectedCountry={selectedCountry}
            />
        </CardContent>
      </Card>
      </div>  
    </div>
    </div>

  );
          
}

export default Dashboard;
