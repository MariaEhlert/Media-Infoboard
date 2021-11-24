
//kører myfetchfuntion asynkront med option og url i parameter

export const myFetchFunction = async (url, options = null) => {
    let response
    try {
        if(!options) {
            response = await fetch(url);
        } else {
            response = await fetch(url, options);
        }
        const result = await response.json();
        //saves response info in object key response
        result.response = {
            ok : response.ok,
            status : response.status,
            statusText : response.statusText
        }

        // console.log(result)
        return result
    }
    catch(err) {
        // console.error(`Fejl i myFetch: ${err}`)
    }
}
