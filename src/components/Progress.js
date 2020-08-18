import React,{useEffect} from 'react'
import $ from 'jquery';
import '../css/Progress.scss'
export default function Progress({text,total,type,...props}) {



//     const activeper=
//     const recoveredper=countryInfo.recovered
//     const deathsper=countryInfo.deaths

//     console.log(active,recovered,deaths)
const calPercentage=(totalNum,typeNum)=>{
    return parseFloat(((typeNum/totalNum)*100).toFixed(1))
}


    var $progress = $(".progress"),
  $bar = $(".acti"),
  $text = $(".actitext"),
  percent = 0,
 
  speed = 1000,
  orange = 30,
  yellow = 55,
  green = 85,
  timer

 const update = (typeCase) => {

    //console.log(typeCase)

 

    timer = setTimeout( function() {
        if(percent===typeCase){
           // console.log('cleared')
           clearTimeout(timer)
           return;
        }
      percent = percent + 0.1;
      percent = parseFloat( percent.toFixed(1) );
    
     // console.log('timer called', percent,speed)
    
      $text.find("em").text( percent + "%" );
    
      if( percent >= 100 ) {
    
        percent = 100;
        $progress.addClass("progress--complete");
        $bar.addClass("progress__bar--blue");
        $text.find("em").text( "100% " );
    
      } else {
        
        if( percent >= green ) {
          $bar.addClass("progress__bar--green");
        }        
        else if( percent >= yellow ) {
          $bar.addClass("progress__bar--yellow");
        }       
        else if( percent >= orange ) {
          $bar.addClass("progress__bar--orange");
        }
        
        //speed=Math.floor( Math.random() * 1000 )
        speed = 100;
        update(typeCase);
    
      }
    
      $bar.css({ width: percent + "%" });
    
    }, speed);
    
    };

 
        //console.log(text,total,type)
       useEffect(()=>{
        setTimeout( function() {
        
            $progress.addClass("progress--active");
         //   console.log('called update')
            update(parseFloat(calPercentage(total,type)))
            },500);
       },[type,total])
        

    return (
        <div>
            <div  className={`progress ${text}`}>
             <b  className="progress__bar acti">
                <span className="progress__text actitext">
                {text}: <em>0%</em>
                </span>
             </b>
             </div>
        </div>
    )
}
