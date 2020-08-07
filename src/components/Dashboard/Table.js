import React,{useState,useEffect} from 'react'
import numeral from 'numeral'
import ArrowDropUpIcon  from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import '../../css/Dashboard/Table.css';

function Table(props) {
    //we are getting data already sorted in descending order
 const[data,setData]=useState([])
 console.log(data)
 useEffect(()=>{  
     setData(props.countries)
},[props.countries])

function sortByAscending(field) {
    return function(a, b) {
        if (a[field] > b[field]) {
            return -1;
        } else if (a[field] < b[field]) {
            return 1;
        }
        return 0;
    };
}
function sortByDescending(field) {
    return function(a, b) {
        if (a[field] > b[field]) {
            return 1;
        } else if (a[field] < b[field]) {
            return -1;
        }
        return 0;
    };
}
const sortDataDescd=(data,field)=>{
    console.log('descend',data, field)
    const sortedData=[...data];

    //sortedData.sort((a,b)=> a.cases>b.cases?-1:1)
    sortedData.sort(sortByDescending(field))
    console.log(sortedData)
    setData(sortedData)
}
const sortDataAscend=(data,field)=>{
    console.log('ascend' , data, field)
    const sortedData=[...data];

    //sortedData.sort((a,b)=> a.cases>b.cases?-1:1)
    sortedData.sort(sortByAscending(field))
    console.log(sortedData)
    setData(sortedData)
}

function ellipsify (str) {
    if (str.length > 8) {
        return (str.substring(0, 8) + "...");
    }
    else {
        return str;
    }
}
    
console.log(data)
    return (
        <table className="table" >      
         <tbody>
            <tr className="tableHead">
                <td>Flag</td>
                <td>Country</td>
                
                <td><span style={{display:'flex',alignItems:'center'}}>Total<span style={{display:"inline-grid"}}>  <ArrowDropUpIcon fontSize="inherit" onClick={()=>sortDataAscend(data,'cases')}/>  <ArrowDropDownIcon onClick={()=>sortDataDescd(data,'cases')} fontSize="inherit" /></span></span> </td>
                <td><span style={{display:'flex',alignItems:'center'}}>Recovered<span style={{display:"inline-grid"}}>  <ArrowDropUpIcon fontSize="inherit" onClick={()=>sortDataAscend(data,'recovered')}/>  <ArrowDropDownIcon onClick={()=>sortDataDescd(data,'recovered')} fontSize="inherit" /></span></span> </td>
                <td><span style={{display:'flex',alignItems:'center'}}>Deaths<span style={{display:"inline-grid"}}>  <ArrowDropUpIcon fontSize="inherit" onClick={()=>sortDataAscend(data,'deaths')}/>  <ArrowDropDownIcon fontSize="inherit"  onClick={()=>sortDataDescd(data,'deaths')}/></span></span> </td>
            </tr>

            {data.slice(0,10).map(({countryInfo,country,cases,recovered,deaths},index) =>{
                return(
                    
                <tr key={index}>
                    <td><img width="20px"src={countryInfo.flag}/></td>
                    <td>{ellipsify(country)}</td>
                    <td><strong>{numeral(cases).format("0a")}</strong></td>
                    <td><strong>{numeral(recovered).format("0a")}</strong></td>
                    <td><strong>{numeral(deaths).format("0a")}</strong></td>
                </tr>
                )
                
            })}


</tbody>
        </table>
    )
}

export default Table
