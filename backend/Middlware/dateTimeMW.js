
module.exports.getTimeFromString = (time)=>{
    let timeAsArr = time.split(":");
    let hours = timeAsArr[0];
    let minuts = timeAsArr[1];
    let seconds = timeAsArr[2];

    let date = new Date(2022,0,1);
    date.setHours(hours,minuts,seconds)
    console.log(date)
    return date;
}

