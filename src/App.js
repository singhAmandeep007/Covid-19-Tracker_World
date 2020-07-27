import React,{useState, useEffect} from 'react';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table'
import {sortData , prettyPrintStat } from './utils/util';
import LineGraph from './components/LineGraph';

import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import './css/App.css';
import "leaflet/dist/leaflet.css"

function App() {
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
    console.log(e)
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
      if(data){
        console.log('lat')
        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
        setMapZoom(4.3);
      }
    
      console.log(data)
    })

    const el = document.querySelector("#dropdown1");
  
    console.log(el.innerHTML)
    setCountryName(el.innerHTML)
  }

  return (
    <div className="app">
      <div className="app_left">
        {/* Header */}
        <div className="app_header">
        <h1>Track Covid-19</h1>
        {/* {Title + Select Input dropdown} */}
        <FormControl className="app_dropdown">
          <Select variant="outlined" id="dropdown1" value={selectedCountry} onChange={onCountryChange}>
            <MenuItem key="a1b2"  value="worldwide">Worldwide</MenuItem>

            {/* loop through all countries and show a dropdown select option for each */}  
            { countries.map(country=>{             
              return(
                <MenuItem key={country.id}  value={country.value}>{country.name}</MenuItem>
              )
              })
            }

          </Select>
        </FormControl>

        </div>
      
      
        <div className="app_stats">
          <InfoBox
          color={colors[0]}
          onClick={()=>{setCasesType('cases'); setGraphColor('blue');}} 
          title="Coronavirus Cases" 
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
          <h3 className="app_graphTitle">Overview of {countryName}</h3>
        <Map 
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
         
        />
      </div>
      
      <Card className="app_right">
          <CardContent>
            <h3 className="app_graphTitle">Top Total Cases by Country</h3>
            {/* Table */}
            <Table countries={tableData}/>

            <h3 className="app_graphTitle">{countryName} {casesType} Timeline </h3>

            {/* Graph */}
            <LineGraph 
              className="app_graph" 
              casesType={casesType}  
              graphColor={graphColor} 
              selectedCountry={selectedCountry}
            />
          </CardContent>
      </Card>
     
     
    </div>
  );
}

export default App;
