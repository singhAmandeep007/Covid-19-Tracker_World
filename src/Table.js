import React from 'react'

import './Table.css';
function Table({countries}) {
    return (
        <div className="table">      
            <tbody >
            {countries.map(({country,cases},index) =>{
                return(
                    
                <tr key={index}>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
                )
                
            })}
            </tbody>      
        </div>
    )
}

export default Table
