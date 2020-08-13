
import numeral from 'numeral';


//sort data in descending order
export const sortData = (data) => {
    const sortedData = [...data];

    //sortedData.sort((a,b)=> a.cases>b.cases?-1:1)
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;
}




//Draw circles on map with interactive tooltip
//export const showDataOnMap = (data, casesType = "cases", countryInfo) =>
    
export const debounce=(func,delay=1000)=>{
    let timeoutId;
    return (...args)=>{
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId=setTimeout(()=>{
            func.apply(null,args)
        },delay);
    };
};

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0 a")}` : `+0`;

