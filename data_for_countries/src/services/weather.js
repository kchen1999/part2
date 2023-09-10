import axios from 'axios'
const api_key = process.env.REACT_APP_WEATHER_API_KEY;


const getWeather = (lat, lon) => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {getWeather}