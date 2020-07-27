import React from 'react'
import numeral from 'numeral'
import '../css/Table.css';

function Table({countries}) {

     
    return (
        <div className="table">      
           
            <tr className="tableHead">
                <td>Country</td>
                <td>Total Cases</td>
            </tr>
            {countries.slice(0,10).map(({country,cases},index) =>{
                return(
                    
                <tr key={index}>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
                )
                
            })}

           
              
        </div>
    )
}

export default Table
