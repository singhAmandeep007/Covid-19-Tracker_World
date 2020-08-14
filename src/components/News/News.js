import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import './News.css'

//import {debounce} from '../../utils/util';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin:40
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
    
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color:'white',
    backgroundColor:'#2196f3',
    marginLeft: 0,
    paddingBottom:10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '22ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },

}));
export default function News() {
    const[data,setData]=useState([])
    const[term,setTerm]=useState('coronavirus')
    const [debouncedTerm, setDebouncedTerm] = useState(term);
   

    const classes = useStyles();
    //&from=2020-07-13&sortBy=publishedAt
    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedTerm(term);
      }, 700);
  
      return () => {
        clearTimeout(timerId);
      };
    }, [term]);
    useEffect(()=>{
        const  fetchNews = async ()=>{
             await fetch(` https://gnews.io/api/v3/search?q=${debouncedTerm}&token=267280a167badea462bdd528fe6cb2a5`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data)
                
                const newsData = data.articles.map(({description,publishedAt,source,title,url,image})=>{  
                      
                    return(
                      {
                        title:title,                       
                        description: description,
                        name:source.name,
                        date:publishedAt,
                        img:image,
                        url:url                 
                      }
                    )      
                  })
    
                setData(newsData)
               
            })
        }
       
        if (debouncedTerm) {
          fetchNews()
        }
        
        
        
    },[debouncedTerm])

    const handleOnChange=(e)=>{   
      setTerm(e.target.value)
    }
   
   

  return (
    <div className={classes.root}>
     
      <GridList cellHeight={210}   cols={4}>
      <GridListTile key="Subheader" cols={4}  style={{ height: 'auto' ,textAlign:'center' }}>
         
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={term}
              onChange={(e)=>handleOnChange(e)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </GridListTile>
             
        {data.map((d,index) => (
          <GridListTile key={index} cols={2} style={{fontSize:'0.2rem'}}>
            
              <img  src={ d.img ? d.img : './nothumb.png'} alt={d.title} />
            
            {/* <img src={d.img} alt={d.title} /> */}

            <GridListTileBar
              classes={classes.tileBar}
            
              title={d.title}
              subtitle={<span>by: {d.name}</span>}
              actionIcon={
                <IconButton onClick={()=>window.open(`${d.url}`, "_blank")} aria-label={`info about ${d.title}`} className={classes.icon} >
                <InfoIcon ></InfoIcon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}

      </GridList>
    </div>
  );
}
