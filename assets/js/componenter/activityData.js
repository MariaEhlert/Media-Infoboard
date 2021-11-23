import { myFetch } from "../helpers.js";
const url = 'https://iws.itcn.dk/techcollege/schedules?departmentcode=smed';


const getActivityData = async () => {
    const data = await myFetch(url)
    console.log(data);

}



