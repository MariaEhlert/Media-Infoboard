import { myFetch } from "../helpers.js";

//Menu function med mulighed for export
export const dishFunction = async() => {

    //Kalder data fra vores json file
    const jsonData = await myFetch('https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json');

    //Vælger vores dish div og gør til const 
    const divDish = document.querySelector('#dish');

    //Opretter div om wrapper af listen
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'wrapper');
    wrapper.innerHTML = ''

    //Opretter h2 med overskrift
    const dishTitle = document.createElement('h2');
    dishTitle.innerText = 'Ugens menu';

    //Placere title 
    divDish.append(dishTitle);

    //Henter dato fra vsCode-interface
    const date = new Date()
    const day = date.getDay()
        //Laver et Array - søndag er med så søndag er 0
    const arrDays = [
        "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"
    ]

    //Laver map
    jsonData && jsonData.Days.map((item) => {

        //Opretter li
        const days = document.createElement('p');
        //Giver vores data der hedder days en id så vi kan style den seprarert
        days.id = ('capitalize')
            //Skriver vores data fra api i vores li
        days.innerHTML = `${item.DayName}: `;
        const dish = document.createElement('p');
        //Skriver vores data fra api i vores li
        dish.innerHTML = ` ${item.Dish}`;

        //Conditional (ternary) operator
        //Hvis dayName er identisk med arrday skal den have class active ellers være normal li
        const className = (item.DayName === arrDays[day].toLowerCase()) ? 'active' : 'normal'
        days.classList.add(className)
        dish.classList.add(className)

        divDish.innerHTML = ''

        //Placere li i ul og ul i div
        wrapper.append(days, dish);
        divDish.append(wrapper)

    })
    //Reloade hver time
    setInterval(() => {
    
        dishFunction();
    }, (3600000))
}

