import React,{useState, useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'
import {MenuItem,FormControl,Select,Card,CardContent} from "@material-ui/core";
import './App.css';

function App() {
  const[countries,setCountries]=useState([]);
  const[selectedCountry,setSelectedCountry]=useState('worldwide')
  const[countryInfo,setCountryInfo]=useState({});
  const[tableData,setTableData]=useState([])

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
        setTableData(data)
        setCountries(countries);
      })
    }
    getCountriesData();
  },[])

  const generateDropdownOptions=()=>{
     {/* loop through all countries and show a dropdown select option for each */}  
   return (
      countries.map((country=>{
      //console.log(country.id)
       return(
         <MenuItem key={country.id}  value={country.value}>{country.name}</MenuItem>
       )
     }))
   )
  }

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
                  
            {generateDropdownOptions()}
          </Select>
        </FormControl>

        </div>
      
      
        <div className="app_stats">
          <InfoBox 
          title="Coronavirus Cases" 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases} ></InfoBox>
        {/* Info Boxes title="coronavirus active cases*/}
          <InfoBox title="Recovered" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered}></InfoBox>
        {/* Info Boxes title="coronavirus recoverd */}
          <InfoBox title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths}></InfoBox>
        {/* Info Boxes title="coronavirus deaths*/}
        </div>
 
        {/* Map */}
        <Map></Map>
      </div>
      
      <Card className="app_right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            {/* Table */}
            <Table countries={tableData}/>
            <h3>Worldwide new cases</h3>
            {/* Graph */}
          </CardContent>
        </Card>
     
     
    </div>
  );
}

export default App;
