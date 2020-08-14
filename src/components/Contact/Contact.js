import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin:10,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

export default function Contact() {
  const classes = useStyles();
//   direction="column"
//   justify="space-around"
//   alignItems="center"
  return (
    <div >
      <Grid container
            
            spacing={3}
            style={{marginBottom:'150px', height:'100%'}}
      >
        <Grid item xs={6} sm={3}>
            <Tooltip title="click to visit">
                <Card className={classes.root} onClick={()=>window.open(`https://www.mohfw.gov.in/`, "_blank")}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="https://www.mohfw.gov.in/assets/images/logo-flag.png"
                title="Mohfw India"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                MOHFW - India
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Government of India updates on COVID-19 
                Helpline Number :+91-11-23978046 , Toll Free : 1075 , Helpline Email ID : ncov2019@gov.in
                </Typography>
                </CardContent>
            </CardActionArea>
            
            </Card>
            </Tooltip>
        </Grid>
        <Grid item xs={6} sm={3}>
        <Tooltip title="click to visit">
            <Card className={classes.root}  onClick={()=>window.open(`https://www.who.int/health-topics/coronavirus#tab=tab_1`, "_blank")}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image="https://lh3.googleusercontent.com/proxy/GePEij_6SIIiWFTqYom5FVftciIm0HxnCUqCaERL5SGy2Q6zUOjrJ54ozm_QK_x1Z5EyPpO-5QQupBCHO5Ir_p9hPGswIDGt9iCNBBCPyz0tG6OsQh8I6kPd3UL1R1o"
            title="who"
            />
    
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            WHO
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                WHO Portal for Coronavirus. 
                Join WhatsApp-
            Send "hi" to +41 79 893 18 92 on WhatsApp


            </Typography>
            </CardContent>
        </CardActionArea>
        
        </Card>
        </Tooltip>
        </Grid>
        <Grid item xs={6} sm={3}>
        <Tooltip title="click to visit">
        <Card className={classes.root} onClick={()=>window.open(`https://www.worldometers.info/coronavirus/`, "_blank")}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.worldometers.info/img/worldometers-logo.gif"
          title="worldometer"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
           Worldometers Info
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Find COVID-19 global corona virus cases count in different countries in real time and other important information here  
          </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>
    </Tooltip>
        </Grid>
        <Grid item xs={6} sm={3}>
        <Tooltip title="click to visit">
        <Card className={classes.root} onClick={()=>window.open(`https://www.cdc.gov/coronavirus/2019-nCoV/index.html`, "_blank")}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.finddx.org/wp-content/uploads/2019/07/cdc-logo-356x219-300x185.jpg"
          title="America"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          CDC
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Centers for Disease Control and Prevention provides informative updates on COVID-19
          </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>
    </Tooltip>
        </Grid>
        <Grid item xs={6} sm={3}>
        <Tooltip title="click to visit">
        <Card className={classes.root} onClick={()=>window.open(` https://www.gov.uk/government/organisations/department-of-health-and-social-care`, "_blank")}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://echalliance.com/wp-content/uploads/2019/03/GOV-UK-logo-3col.jpg"
          title="UK"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          United Kingdom
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Read the latest information about the coronavirus situation in the UK
          </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>
    </Tooltip>
        </Grid>
        <Grid item xs={6} sm={3}>
        <Tooltip title="click to visit"> 
        <Card className={classes.root}  onClick={()=>window.open(`https://coronavirus.jhu.edu/?utm_campaign=jh20&utm_content=ow_hubinfo&utm_medium=dig_link&utm_source=jhu_properties`, "_blank")}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://brand.jhu.edu/assets/uploads/sites/5/2014/06/university_logo_small_vertical_blue.png"
          title="John Hopkins"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Johns Hopkins
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Johns Hopkins 's website is a resource to help advance the understanding of the virus, inform the public, and brief policymakers in order to guide a response, improve care, and save lives.
          </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>
    </Tooltip>
        </Grid>
        
      </Grid>
    </div>
  );
}

