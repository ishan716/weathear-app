import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

function Weather() {

    const [weatherData, setWeatherData] = useState(false);

    const search = async (city) => {
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

    useEffect(() => { search("London"); }, []);

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='Search' />
                <img src={search_icon} alt="" />
            </div>
            <img src={iconUrl} alt="" className='weather-icon' />
            <p className='temp'>16C</p>
            <p className='city'>london</p>
            <div className="weather-data">
                <div className='col'>
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>91 %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>3.6 km/h</p>
                        <span>wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Weather;
