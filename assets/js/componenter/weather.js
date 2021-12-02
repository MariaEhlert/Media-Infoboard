import { myFetch } from "../helpers.js";

//exporter weatherFunction
export const weatherFunction = async () => {


  //fetcher weather api'et med hjælp fra "helper.js"
  const data = await myFetch(

    "https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric"

  );


  //får fat i vejret og laver det om til en "string variable"
  let apiWeatherString = data.weather[0].main
  //laver en "class variable" til sener brug
  let weatherClass;

  //Her "hooker" vi så der e plads til graderne
  const weatherContainer = document.querySelector("#weather");
  // Laver en const, som laver et span_title i mit DOM
  const p = document.createElement("p");




  // laver en "Conditional Statements" i form a en "switch", som henter "string variablen - apiWeatherString" og laver det til upper case for at ungå fejl fra api'et
  switch (apiWeatherString.toUpperCase()) {

    default:
    case `DEFAULT`:
      break;
    case `CLEAR`:
    case `MEATBALLS-RAIN`:
    case `CLOUDS`:
    case `DRIZZLE`:
    case `FOGGY`:
    case `LIGHT-RAIN`:
    case `MIST`:
    case `PARTLY-CLOUDY`:
    case `RAIN`:
    case `SNOW`:
    case `SUNNY`:
    case `THUNDERSTORM`:
    case `WINDY`:

      //her bruger vi så den "class variable - weatherClass" til at "contain"
      weatherClass = apiWeatherString.toLowerCase()
      break;

  }


  //her "hooker" vi i "HTML" og giver den en class, baseret på vejret ved hjæelp af at bruge "class variable - weatherClass", som en "templet string"
  document.querySelector("#leftSide").className = `${weatherClass}`




  // Her laver vi graderne

  // Laver en varibel med navnet temp. Derefter benytter jeg mig af en "Conditional Ternary Operator" til at sige at hvis temp er falsk (0 eller -0) så (?) skal temp bare vise 0, ellers (:) skal den vise temp
  let temp = (!data.main.temp) ? 0 : Math.round(data.main.temp);
  // Giver min span_title innerHTML = items titel, som er taget fra json
  p.innerHTML = `${temp} &#176;`;


  // Her appender jeg elementet p ind i weatherContaineren efter alt i den bliver "reset"
  weatherContainer.innerHTML = ""
  weatherContainer.append(p);


}

// Her afspiller vi "weatherFunction()" efter 2 timer i en loop
setInterval(() => {
  weatherFunction()
}, 7200000)
