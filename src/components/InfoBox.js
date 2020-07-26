//rfce is shortcut to buid boilerplate
import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"
import '../css/InfoBox.css';
function InfoBox({title,cases, total,...props}) {
console.log(title , cases,total,props.color)

const color= props.color;

    return (
      <Card 
      className={`infoBox infoBox--${color}`}
      onClick={props.onClick}>
          <CardContent>
              {/* title */}
                <Typography className="smallFont" variant="h6">{title}</Typography>
              {/* no.of cases */}
                <h2 style={{color:props.color}}className="infoBox_cases">{cases}</h2>

              {/* total no. cases */}
                <Typography className="infoBox_total" color="textSecondary">
                Total: {total}              
                </Typography>
          </CardContent>
      </Card>
    )
}

export default InfoBox
