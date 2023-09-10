import CountryView from "./CountryView"
import {useState} from 'react'

const CountryInfo = ({setCountry, filteredCountries}) => {
    const [temp, setTemp] = useState(0)
    const [windSpeed, setWindSpeed] = useState(0)
    const [iconSrc, setIconSrc] = useState(``)

    if(filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if(filteredCountries.length > 1) { 
        return filteredCountries.map(eachCountry => {
            return (
            <div key={eachCountry['cca2']}>
                <div>{eachCountry['name']['common']} <button onClick={() => setCountry(eachCountry['name']['common'])}>show</button></div>
            </div>)
        })
    }
    else if(filteredCountries.length === 1) {
        return <CountryView country={filteredCountries[0]} temp={temp} setTemp={setTemp} windSpeed={windSpeed} setWindSpeed={setWindSpeed} iconSrc={iconSrc} setIconSrc={setIconSrc}/>
    }
}

export default CountryInfo;