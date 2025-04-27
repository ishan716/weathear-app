import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

function Weather() {

    const inputRef=useRef();

    const [weatherData, setWeatherData] = useState(false);
    


    const search = async (city) => {
        if(city===""){
            alert("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: data.weather[0].icon
            });
        } catch {
            console.error("Failed to fetch weather data.");
        }
    }

    const iconUrl = weatherData ? `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png` : "";

    useEffect(() => { search(inputRef.current.value); }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
            </div>
            <img src={iconUrl} alt="" className='weather-icon' />
            <p className='temp'>{weatherData.temperature} °C</p>
            <p className='city'>{inputRef.current.value}</p>
            <div className="weather-data">
                <div className='col'>
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} km/h</p>
                        <span>wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Weather;
