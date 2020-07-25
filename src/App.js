import React,{useState, useEffect} from 'react';
import {MenuItem,FormControl,Select} from "@material-ui/core";
import './App.css';

function App() {
  const[countries,setCountries]=useState([]);

  useEffect(()=>{
    const getCountriesData= async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data)
        const countries = data.map((country)=>{
          //here we return an  object and push it into countries array with map 
          return(
            {
              name:country.country,//United States,United Kingdom
              value: country.countryInfo.iso2,//Uk,USA, FR
              id:country.countryInfo._id
            }
          )
          
        })
        setCountries(countries);
      })
    }
    getCountriesData();
  },[])

  return (
    <div className="App">
      {/* Header */}
      <div className="app_header">
      <h1>Covid Tracker</h1>
      
      <FormControl className="app_dropdown">
        <Select variant="outlined" value="abc">
          {/* loop through all countries and show a dropdown select option for each */}
          {countries.map((country=>{
            return(
              <MenuItem key={country.id}  value={country.value}>{country.name}</MenuItem>
            )
          }))}
        </Select>
      </FormControl>

      </div>
     
      {/* {Title + Select Input dropdown} */}
      
      {/* Info Boxes */}
      {/* Info Boxes */}
      {/* Info Boxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
