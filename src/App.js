import React,{useState, useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'
import {sortData , prettyPrintStat } from './utils';
import LineGraph from './LineGraph0';

import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import './App.css';
import "leaflet/dist/leaflet.css"

function App() {
  const[countries,setCountries]=useState([]);
  const[selectedCountry,setSelectedCountry]=useState('worldwide')
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData,setTableData]=useState([]);
  // we pass in the center of the world
  const[mapCenter,setMapCenter]=useState({ lat:34.80746, lng:-40.4796 });
  const[mapZoom,setMapZoom]=useState(3);
  const[mapCountries,setMapCountries]=useState([])

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
        console.log(data)
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
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      })

    }
    getCountriesData();
  },[])

  // const generateDropdownOptions=()=>{
  //   
  //  return (
     
  //  )
  // }

  const onCountryChange= async (e)=>{
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

      setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      setMapZoom(4);
      console.log(data)
    })
  }

  return (
    <div className="app">
      <div className="app_left">
        {/* Header */}
        <div className="app_header">
        <h1>Covid Tracker</h1>
        {/* {Title + Select Input dropdown} */}
        <FormControl className="app_dropdown">
          <Select variant="outlined"  value={selectedCountry} onChange={onCountryChange}>
            <MenuItem key="a1b2" value="worldwide">Worldwide</MenuItem>

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
          title="Coronavirus Cases" 
          cases={prettyPrintStat(countryInfo.todayCases)} 
          total={prettyPrintStat(countryInfo.cases)} ></InfoBox>
        {/* Info Boxes title="coronavirus active cases*/}
          <InfoBox title="Recovered" 
          cases={prettyPrintStat(countryInfo.todayRecovered)} 
          total={countryInfo.recovered}></InfoBox>
        {/* Info Boxes title="coronavirus recoverd */}
          <InfoBox title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths}></InfoBox>
        {/* Info Boxes title="coronavirus deaths*/}
        </div>
 
        {/* Map */}
        <Map 
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      
      <Card className="app_right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            {/* Table */}
            <Table countries={tableData}/>
            <h3>Worldwide new cases</h3>
            {/* Graph */}
            <LineGraph />
          </CardContent>
        </Card>
     
     
    </div>
  );
}

export default App;
