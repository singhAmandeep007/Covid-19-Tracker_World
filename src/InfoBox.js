//rfce is shortcut to buid boilerplate
import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core"
function InfoBox({title,cases,total}) {
    return (
      <Card className="infoBox">
          <CardContent>
              {/* title */}
                <Typography color="textSecondary">{title}</Typography>
              {/* no.of cases */}
                <h2 className="infoBox_cases">{cases}</h2>

              {/* total no. cases */}
                <Typography className="infoBox_cases" color="textSecondary">
                    {total} Total             
                </Typography>
          </CardContent>
      </Card>
    )
}

export default InfoBox
