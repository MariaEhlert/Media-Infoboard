import { myFetchFunction } from "/assets/js/componenter/helpers.js"

let bustimewrapper = document.getElementById('bustimewrapper')
let departures



//fetches data and creates array containing first 5 entries
async function getData() {
    const busurl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=8519734&format=json'
    const busdata = await myFetchFunction(busurl)
    departures = busdata.MultiDepartureBoard.Departure.splice(0, 5)
    
}


//The first time getBustime runs it cant map out departures properties, but after its first fetch it can
async function getBustime() {
     bustimewrapper.innerHTML = ''

     getData()
    
     //created date object from local time properties
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    
    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth()
    
    //timeformat without seconds
    const time_format = `${hours}:${minutes}:00`
    
    const today_format = `${year}/${month}/${day}`
    
    console.log(date)
    //maps out properties of departures and creates p for each entry
    departures.map(dep => {

        let p = document.createElement('p')
        
        
        const todayTime = new Date(`${today_format} ${time_format}`)
        
        const departureTime = new Date(`${today_format} ${dep.time}:00`)
        
        //calculates difference in seconds between departureTime and todayTime
        let diff_seconds = Math.abs(Math.round(departureTime) - todayTime) / 1000
        
        //grabs hours from todayTime and divides it with diff_seconds, within the range of 24
        const hours = Math.floor(diff_seconds / 3600) % 24
        
        diff_seconds -= hours * 3600
        
        //grabs minutes from todayTime and divides it with diff_seconds, within the range of 60
        const minutes = Math.floor(diff_seconds / 60) % 60
        
        //difference becomes outcome of difference between diff_seconds and minutes
        let difference = `${minutes} min`
        
        console.log(difference)
        p.classList.add('busText')
        //sets p innerHTML to difference in seconds between todayTime and departureTime, departures.line and departures.direction
        p.innerHTML = ` ${difference} ${dep.line} ${dep.direction} `
        bustimewrapper.append(p)

    })
    
}
//runs getBustime every 5 seconds
setInterval(() => {

    getBustime()

}, 5000);