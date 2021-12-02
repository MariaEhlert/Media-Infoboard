// Importere myFetch funktionen fra helpers.js
import { myFetch } from "../helpers.js";
 
// Her exporter jeg en const som indeholder hele news ticket, for derefter at kunne kalde det i main.js
export const newsFunction = async () => {
    const url = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.dr.dk%2Fnyheder%2Fservice%2Ffeeds%2Fallenyheder%23';
    const result = await myFetch(url);
    const data = result.items.map(elm => `<span>${elm.title}</span>`).join('<span>&#8226;</span>');
    document.querySelector('#news').innerHTML = `<div>${data}</div>`;
};