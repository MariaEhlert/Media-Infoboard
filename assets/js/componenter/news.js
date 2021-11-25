// Importere myFetch funktionen fra helpers.js
import { myFetch } from "../helpers.js";

export const newsFunction = async () => {
  // Laver en konstant med navnet "data" som venter på at myFetch kører.
  // Fortæller og hvad for en API, myFetch skal fetche fra
  const data = await myFetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23"
  );

  // Henter min div med id news fra HTML
  const newsContainer = document.querySelector("#news");

  // Laver et marquee tag, inde i min DOM
  const marquee = document.createElement("marquee");

  // Giver marquee attributen "scrollamount" på 20
  marquee.setAttribute("scrollamount", 20);

  // Loger mit data for at se data'et om Json i min console
  console.log(data);

  // Mapper mit data igennem og gemmer det returnerede data i parameteret "item"
  data &&
    data.items.map((item) => {
      // Laver en const som laver et span_title i mit DOM
      const span_title = document.createElement("span");

      // Laver en const som laver et span_bullet i mit DOM
      const span_bullet = document.createElement("span");

      // Giver min span classen "news_bullet"
      span_bullet.classList.add("news_bullet");

      // Giver min span noget innerHTML som er et ASCII tegn.
      span_bullet.innerHTML = "&#8226";

      // Giver min span_title innerHTML = items titel, som er taget fra json
      span_title.innerHTML = item.title;

      // Så appender jeg span_title og span_bullet til mit marquee tag
      marquee.append(span_title, span_bullet);
    });
  // Til sidst appender (sender) jeg mit marquee tag og det den indeholder til min div container fra HTML
  newsContainer.append(marquee);
};
