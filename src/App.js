import React,{useState, useEffect} from 'react';
import {MenuItem,FormControl,Select} from "@material-ui/core";
import './App.css';

function App() {
  const[countries,setCountries]=useState([]);
  const[selectedCountry,setSelectedCountry]=useState('Worldwide')

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
    setSelectedCountry(e.target.value)
  }

  return (
    <div className="App">
      {/* Header */}
      <div className="app_header">
      <h1>Covid Tracker</h1>
       {/* {Title + Select Input dropdown} */}
      <FormControl className="app_dropdown">
        <Select variant="outlined" value={selectedCountry} onChange={onCountryChange}>
          <MenuItem key="a1b2" value="worldwide"> Worldwide </MenuItem>
                
          {generateDropdownOptions()}
        </Select>
      </FormControl>

      </div>
     
     
      <div className="app_stats">
      {/* Info Boxes title="coronavirus active cases*/}
      {/* Info Boxes title="coronavirus recoverd */}
      {/* Info Boxes title="coronavirus deaths*/}
      </div>
      

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
