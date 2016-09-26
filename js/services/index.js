import * as Config from '../config'

export async function _geolocationService ({latitude,longitude}){
    return new Promise((resolve,reject)=>{
        try {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.geolocationApiKey}`)
            .then((data)=>data.json())
            .then((response)=>resolve(response))
        } catch(error) {
            reject(error)
        }
    })
}