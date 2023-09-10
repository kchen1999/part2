import weatherService from './services/weather'

const CountryView = ({country, temp, setTemp, windSpeed, setWindSpeed, iconSrc, setIconSrc}) => {
    const flagStyle = {
        fontSize: 80
    }

    const weatherData = () => {
        async function getWeatherData() {
            const res = await weatherService.getWeather(country['latlng'][0], country['latlng'][1]);
            setTemp(Number(res['main']['temp'] - 273.15).toFixed(2)); 
            setWindSpeed(res['wind']['speed']);
            setIconSrc(`https://openweathermap.org/img/wn/${res['weather'][0]['icon']}@2x.png`)
        }
        getWeatherData()
    }

    return (
        <div>
            <h1>{country['name']['common']}</h1>
            <div>capital {country['capital']}</div>
            <div>area {country['area']}</div>
            <h3>languages:</h3>
            <ul>
                {Object.entries(country['languages']).map(eachCountry => <li key={eachCountry[0]}>{eachCountry[1]}</li>)}
            </ul>
            <div style={flagStyle}>{country['flag']}</div> 
            <h2>Weather in {country['capital']}</h2>
            {weatherData()}
            <div>temperature {temp} Celcius</div>
            <img src={iconSrc}></img>
            <div>wind {windSpeed} m/s</div>
        </div>

    )
} 

export default CountryView;