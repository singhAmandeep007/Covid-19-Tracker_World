//rfce is shortcut to buid boilerplate
import React from 'react'
import numeral from 'numeral';
import {Card,CardContent,Typography,Tooltip} from "@material-ui/core"
import '../../css/Dashboard/InfoBox.css';
function InfoBox({title,cases, total,...props}) {
//console.log(title , cases,total,props.color)

const color= props.color;

    return (
      <Tooltip title="Click to see Changes">
      <Card 
      className={`infoBox infoBox--${color}`}
      onClick={props.onClick}>
          <CardContent>
              {/* title */}
                <Typography  variant="h6" className="infoTitle">{title}</Typography>
              {/* no.of cases */}
                <h2 style={{color:props.color}}className="infoBox_cases">{cases}</h2>

              {/* total no. cases */}
                <Typography className="infoBox_total" >
                <span  style={{display:'block',fontSize:'1.4em',color:'#41474d'}}>Total:</span> {numeral(total).format("0,0")}              
                </Typography>
          </CardContent>
      </Card>
      </Tooltip>
    )
}

export default InfoBox