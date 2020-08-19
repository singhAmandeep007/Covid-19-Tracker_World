import React,{useEffect} from 'react'
import $ from 'jquery';
import '../css/Progress.scss'
export default function Progress({text,total,type,...props}) {



//     const activeper=
//     const recoveredper=countryInfo.recovered
//     const deathsper=countryInfo.deaths

//     console.log(active,recovered,deaths)
const calPercentage=(totalNum,typeNum)=>{
    return Math.ceil((typeNum/totalNum)*100)
}


    var $progress = $(`.progress.${text}`),
  $bar = $(`.progress__bar.${text}`),
  $text = $(`.progress__text.${text}`),
  percent = 0,
  speed = 1000,
  start = 0,
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
      percent = percent + 1;
      $text.find("em").text( percent + "%" );
    

      if(text==='Death'){

        
        if( percent >= green ) {
          $bar.addClass("progress__bar--red");
        }        
        else if( percent >= yellow ) {
          $bar.addClass("progress__bar--yellow");
        }       
        else if( percent >= orange ) {
          $bar.addClass("progress__bar--orange");
        }
        else if( percent >= start ) {
          $bar.addClass("progress__bar--green");
        }
         speed = 100;
        update(typeCase);
      }


       else if (text==='Recovery') {
        
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

      else if (text==='Active') {
        
        
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

      else {
    
        percent = 100;
        $progress.addClass("progress--complete");
        $bar.addClass("progress__bar--blue");
        $text.find("em").text( "100% " );
    
      }

      $bar.css({ width: percent + "%" });
    
    }, speed);
    
    };

 
        //console.log(text,total,type)
       useEffect(()=>{
        setTimeout( function() {
        
            $progress.addClass("progress--active");
         //   console.log('called update')
            update(parseInt(calPercentage(total,type)))
            },500);


            return ()=>{
              $bar.removeClass("progress__bar--green progress__bar--yellow progress__bar--orange")
              $text.find("em").text( 0 + "%" )
              $bar.css({ width: 0 + "%" });

            }

        
       },[type,total])
        

    return (
        <div>
            <div  className={`progress ${text}`}>
             <b  className={`progress__bar ${text}`}>
                <span className={`progress__text ${text}`}>
                {text}: <em>0%</em>
                </span>
             </b>
             </div>
        </div>
    )
}
