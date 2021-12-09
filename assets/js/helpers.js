//Fecht Function
export const myFetch = async (url, options = null) => {
    // deklarerer response variabel
    let response;

    //forsøger at lave et kald
    try {
        //hvis options er null skal den kun bruge url
        if (!options) {
            response = await fetch(url);
            //ellers skal den bruge både url og options
        } else {
            response = await fetch(url, options);
        }
        //laver en parse på response 
        const result = await response.json();
        //gemmer response info i object key response
        result.response = {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText
        }
        //retuner result
        return result;
    }
    //fanger evt fejl i fetch
    catch (err) {
        console.error(`Der er fejl i myFetch: ${err}`);
    }
}

//Funktion til at hente dk dag
export const day2local = intDay => {
    let day;
    switch (intDay) {
        default:
            break;
        case 0:
            day = 'Søndag';
            break;
        case 1:
            day = 'Mandag';
            break;
        case 2:
            day = 'Tirsdag';
            break;
        case 3:
            day = 'Onsdag';
            break;
        case 4:
            day = 'Torsdag';
            break;
        case 5:
            day = 'Fredag';
            break;
        case 6:
            day = 'Lørdag';
            break;
    }

    return day;
}


//Funktion til at hente dk måned
export const month2local = intMonth => {
    let month;
    switch (intMonth) {
        default:
            break;
        case 0:
            month = 'Januar';
            break;
        case 1:
            month = 'Febuar';
            break;
        case 2:
            month = 'Marts';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'Maj';
            break;
        case 5:
            month = 'Juni';
            break;
        case 6:
            month = 'Juli';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'Oktober';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
    }

    return month;
}

export const dayDateMonth2local = strDate => {
    const date = new Date(strDate);
    return `${day2local(date.getDay())} d. ${date.getDate()}. ${month2local(date.getMonth())}`;
}


//sætter kun første bogstav til stort bogstav
export const capitalizeFirstLetter = (str) => {

    return str.charAt(0).toUpperCase() + str.slice(1);

};