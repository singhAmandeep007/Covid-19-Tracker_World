//rfce is shortcut to buid boilerplate
import React,{useState} from 'react'
import numeral from 'numeral';
import {Card,CardContent,Typography,Tooltip} from "@material-ui/core"
import '../../css/Dashboard/InfoBox.css';
function InfoBox({title,cases, total,...props}) {
//console.log(title , cases,total,props.color)
const [isActive,setIsActive]=useState(props.isActive)
const active = isActive ? `isActive--${props.color}` :'';

function handleClick(){
  props.onClick()
  setIsActive(!isActive)
   
}

      return (
      <Tooltip title="Click to see Changes">
        
      <Card 
      className={`infoBox infoBox--${props.color} isHighlighted--${props.color}  ${active}`}
      //onMouseEnter={()=>setIsHovered(!isHovered)}
      //onMouseLeave={()=>setIsHovered(!isHovered)}
      onClick={handleClick}>
          <CardContent>
              {/* title */}
                <Typography  variant="h6" className="infoTitle">{title}</Typography>
              {/* no.of cases */}
                <h2 className="infoBox_cases">{cases}</h2>

              {/* total no. cases */}
                <Typography className="infoBox_total" >
                <span className="infoTotalspan" >Total:</span> {numeral(total).format("0,0")}              
                </Typography>
          </CardContent>
      </Card>

      </Tooltip>
    )
 }

export default InfoBox
