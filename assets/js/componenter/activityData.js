import { myFetch } from "../helpers.js";

const root = document.querySelector('#activityData')

export const getActivityData = async () => {
    // Henter config settings
    const config = await myFetch('./config.json');

    let data = JSON.parse(localStorage.getItem('activity_data'));
    let update = new Date(localStorage.getItem('activity_update'));

    // Henter dags dato + næste dag i sekunder
    let curdate = new Date();
    let cur_stamp = Math.round(curdate.getTime() / 1000);
    let nextday_stamp = Math.round(curdate.setHours(0, 0, 0, 0) / 1000) + 86400;

    // Beregner antal sekunder siden sidste update
    let seconds_to_update = Math.round((curdate.getTime() - update.getTime()) / 1000);

    if (data || seconds_to_update > config.max_seconds_to_last_update) {
        const url = 'https://iws.itcn.dk/techcollege/Schedules?departmentCode=smed';
        // const url = '../api.json'
        const result = await myFetch(url);
        data = result.value;

        // Henter friendly names på emner
        //Dette er lavet på heinz's api så vi ikke behøver at skulle skrive det hele i js men kan i stedet for bruge vores fetch, 
        //til at ændre de fag/uddannelse som ikke er læsevenlig til at det giver mening som webudvikler i det for data/komm.udd.
        const friendly_names = await myFetch('https://api.mediehuset.net/infoboard/subjects');
        const arr_friendly_names = friendly_names.result;

        // Filtrerer data for uønskede uddannelser fra JSON fil 
        data = data.filter(elm => config.array_valid_educations.includes(elm.Education));

        data.map(item => {
            //Sætter den rigtige tidzone da API'et er en time bagud 
            item.StartDate = item.StartDate.replace("+01:00", "+00:00");
            // Sætter tidsformat til time:minut på property item.Time
            item.Time = new Date(item.StartDate).toLocaleTimeString(
                'en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            });
            // Udskifter tekniske betegnelser med læsevenlige i Subject og Education
            arr_friendly_names.map(word => {
                if (word.name === item.Education) {
                    item.Education = word.friendly_name;
                }
                if (word.name === item.Subject) {
                    item.Subject = word.friendly_name;
                }
            })
            // Sætter property Stamp til aktivitetens tid i antal sekunder
            item.Stamp = Math.round(new Date(item.StartDate).getTime() / 1000);
        })

        //denne sorterer sådan at startdate og education begge tages i betragtning
        //altså først kl og så uddannelse
        data.sort((a, b) => {
            if (a.StartDate === b.StartDate) {
                return a.Education < b.Education ? -1 : 1
            } else {
                return a.StartDate < b.StartDate ? -1 : 1
            }
        })
        //den der sætter activity_data (altså api) i local storage
        localStorage.setItem('activity_data', JSON.stringify(data));
        localStorage.setItem('activity_update', new Date());
    }


    let acc_html = `<table border="0">
                        <tr>
                            <th>Kl.</td>
                            <th>Uddannelse</td>
                            <th>Hold</td>
                            <th>Fag</td>
                            <th>Lokale</td>
                        </tr>
        `;


    // Henter dags datos aktiviteter/Timer ind i array arr_subjects
    let arr_subjects = [];
    //henter dagens aktiviteter ind
    //det er sådan at den ved hvad der hører til dagen i dag af elementer
    arr_subjects.push(...data.filter(elm => (elm.Stamp + 3600) >= cur_stamp && elm.Stamp < nextday_stamp));

    // Henter næste dags aktiviteter ind i array arr_nextday_subjects
    let arr_nextday_subjects = [];
    arr_nextday_subjects.push(...data.filter(elm => elm.Stamp >= nextday_stamp));

    // Tilføj næste dags dato og aktiviteter til arr_subjects hvis der er nogle
    if (arr_nextday_subjects.length) {
        // Lokal formatering af dato med toLocalDateString
        let next_day_friendly = new Date(arr_nextday_subjects[0].StartDate).toLocaleDateString(
            "da-DK", { weekday: "long", day: 'numeric', month: "long" }
        );
        arr_subjects.push({ day: next_day_friendly })
        arr_subjects.push(...arr_nextday_subjects);
    }

    // Begrænser antal aktiviteter - henter alle hvis 0
    if (config.max_num_activities) {
        arr_subjects = arr_subjects.slice(0, config.max_num_activities);
    }

    // Looper data
    arr_subjects.map(item => {

        // Hvis object item har property Team skal den ligge aktivitetne ind i table
        if (item.Team) {
            // Tilføj table row med aktivitet til acc_tml
            acc_html += createRow(item);
            //Hvis object item ikke har property Team er det fordi at der ikke er flere timer på dagen 
            //og skal derfor ligge de aktivitetner for næste dag ind i table     
        } else {
            // Tilføj table row med dato til acc_html
            acc_html += createDayRow(item);
        }
    })
    //afslutter vores table i html så det hele virker
    acc_html += `</table>`;
    root.innerHTML = acc_html;


}
//Reloader hvert 5 sekund
setInterval(() => {
    getActivityData();
}, (500000))


//denne funktion gør at der kommer en class på hver education
//i case skal der stå navnet på educations
//i dotColor skal der stå det navn som class'en skal have
function addDotClass(color) {
    let dotColor;
    switch (color) {
        default:
            dotColor = color;
            break;
        case 'AMU indmeld':
            dotColor = 'amu';
            break;
        case 'Brobyg teknisk':
            dotColor = 'brobyg';
            break;
        case 'Data/komm.udd.':
        case 'Webudvikler':
            dotColor = 'web';
            break;
        case 'Grafisk Tekniker':
        case 'Grafisk teknik.':
            dotColor = 'grafTek';
            break;
        case 'Mediegrafiker':
            dotColor = 'medieGraf';
            break;
    }
    return dotColor;
}

//Sætter item infomation ind under oversktifterne 
//(de bliver sat ind ud fra den rækkefølge de står i)
//der bliver lavet en span med class'en dot hvor der også bliver 
//tilføjet den class vi har give de forskellige educations
function createRow(item) {
    return `<tr>
        <td>${item.Time}</td>
        <td> <span class="dot ${addDotClass(item.Education)}"></span> ${item.Education}</td>
        <td>${item.Team}</td>
        <td class="capitalize">${item.Subject}</td>
        <td>${item.Room}</td>
        </tr>`
}

//Sætter en overskrift med den næste dag (fx tirsdag d. 30 november) 
//når der ikke er flere aktiviterter på pågældene dag
function createDayRow(item) {
    return `<tr id="nextDay">
              <td colspan="5">${item.day}</td>
            </tr>`;
}



