// UDEN BULLET STYLING

import { myFetch } from "../helpers.js";

export const weatherFunction = async () => {

    const data = await myFetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric"
      );
      
      const weatherContainer = document.querySelector("#weather");
      
      // Laver en const som laver et span_title i mit DOM
      const p = document.createElement("p");
      
      // Giver min span_title innerHTML = items titel, som er taget fra json
      p.innerHTML = ` ${data.main.temp} &#176;`;
      
      console.log(data);
      
      weatherContainer.append(p);
      
      // MED BULLET STYLING
      
      /* import { myFetch } from "../helpers.js";
      
      const data = await myFetch(
          "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric"
        );
        
      const weatherContainer = document.querySelector("#weather");
      
          // Laver en const som laver et span_title i mit DOM
          const p = document.createElement("p");
      
               // Laver en const som laver et span_bullet i mit DOM
               const span_bullet = document.createElement("span");
      
               // Giver min span classen "degree_bullet"
               span_bullet.classList.add("degree_bullet");
           
               // Giver min span noget innerHTML som er et ASCII tegn.
               span_bullet.innerHTML = "&#176;";
      
          // Giver min span_title innerHTML = items titel, som er taget fra json
          p.innerHTML = ` ${data.main.temp} `
      
        console.log(data);
      
      
        weatherContainer.append(p, span_bullet);
       */
      

}

