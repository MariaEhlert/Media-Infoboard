export const watchFuntions = async () => {
//nogen ting bliver først forklaret længer ned

    //Laver et hook I mit 'html'
    const watchContainer = document.querySelector(`#watch`)

    // Function til at calc uge nummer (Den er lidt for hardcore for Patrik)
    Date.prototype.getWeekNumber = function () {
        const date = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        const dayNum = date.getUTCDay() || 7;
        date.setUTCDate(date.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        return Math.ceil((((date - yearStart) / 86400000) + 1) / 7)
    };
    const weekP = document.createElement('p')
    weekP.innerText = ('Uge ' + new Date().getWeekNumber())


    // Bare en 'arrey' med de danske måneder.
    const monthNames = ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
        "Juli", "August", "September", "October", "November", "December"
    ];

    // new Date() er dit pc klok instilling
    // getDate() er så 'dagen i måneden' ud fra dit klok instilling
    // getFullYear() er så 'år' ud fra dit klok instilling
    // Basically der mange "getStuff", bare søg på google.
    const date = new Date()
    const day = date.getDate()
    const year = date.getFullYear()
    const monthP = document.createElement('p')
    monthP.innerText = (`${day}  ${monthNames[date.getMonth()]}  ${year}`);

    const watchP = document.createElement('p')



    // 'setInterval' er en metode til at kalde en function flere gange, med et fast 'time-delay'
    setInterval(() => {
        // new Date() er dit pc klok instilling
        // getHours() er så 'timer' ud fra dit klok instilling
        // getMinutes() er så 'minuter' ud fra dit klok instilling
        // Basically der mange "getStuff", bare søg på google.
        const date = new Date()

        let hours = date.getHours()
        // 'padStart' er en metode til at få fat i begyndelsen af et string. (der er også en 'padEnd' giver lidt sig selv)
        //'2' er minimum af de tegn der skal vises i en string og 
        //'0' er hvad der skal visis hvis der er ikke noget Fx. !9:5 men 09:05. Du kunne også skriv '6' så vil der stå 69:95.
        hours = String(hours).padStart(2, '0')

        let minutes = date.getMinutes()
        minutes = String(minutes).padStart(2, '0')

        const format = `${hours}:${minutes}`


        watchP.innerText = format

        // Her setter man ens 'time-delay' i 'miliseconds'
    }, 1000)

    //Setter alle mine 'P' (Paragraths in i mit hook)
    watchContainer.append(weekP, monthP, watchP)
}
