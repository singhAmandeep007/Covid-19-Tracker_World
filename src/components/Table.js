import React from 'react'
import numeral from 'numeral'
import '../css/Table.css';

function Table({countries}) {
    return (
        <div className="table">      
            <tbody >
            {countries.map(({country,cases},index) =>{
                return(
                    
                <tr key={index}>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
                )
                
            })}
            </tbody>      
        </div>
    )
}

export default Table
