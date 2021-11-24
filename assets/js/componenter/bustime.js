import { myFetchFunction } from "/assets/js/componenter/helpers.js"

let bustimewrapper = document.getElementById('bustimewrapper')

async function getBustime () {
    bustimewrapper.innerHTML = ''
    let bustimeheader = document.createElement('h2')
    bustimeheader.innerText = 'Bustider'
    const busurl = 'https://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=8519734&format=json'
    const busdata = await myFetchFunction(busurl)

    const departures = busdata.MultiDepartureBoard.Departure.splice(0, 5)

    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    
    const day = date.getDate()
    const year = date.getFullYear()
    const month = date.getMonth()

    
    const time_format = `${hours}:${minutes}:00`
    
    const today_format = `${year}/${month}/${day}`
    
    console.log(date)
    
    departures.map(dep => {
    
        

        let p = document.createElement('p')
        const todayTime = new Date(`${today_format} ${time_format}`)
        
        const departureTime = new Date(`${today_format} ${dep.time}:00`)
        
        let diff_seconds = Math.abs(Math.round(departureTime) - todayTime) / 1000

        
        const hours = Math.floor(diff_seconds / 3600) % 24
        
        diff_seconds -= hours * 3600
        
        const minutes = Math.floor(diff_seconds / 60) % 60
        
        let difference = `${minutes} min`
        
        
       console.log(difference)
        
        p.innerHTML = ` ${difference} ${dep.line} ${dep.direction} `
        bustimewrapper.append(p)
        // console.log(dep)
    })
    
}

// getBustime()

setInterval(() => {

    getBustime()
}, 10000);