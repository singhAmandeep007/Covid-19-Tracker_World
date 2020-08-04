import React from 'react'
import numeral from 'numeral'
import '../css/Table.css';

function Table({countries}) {

     console.log(countries)
    return (
        <div className="table">      
           
            <tr className="tableHead">
                <td>Flag</td>
                <td>Country</td>
                <td>Total Cases</td>
            </tr>
            {countries.slice(0,10).map(({countryInfo,country,cases},index) =>{
                return(
                    
                <tr key={index}>
                    <td><img width="20px"src={countryInfo.flag}/></td>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
                )
                
            })}

           
              
        </div>
    )
}

export default Table
