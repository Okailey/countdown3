import React, { useState, useEffect } from 'react'
import '../styles/hourly.css';
import { getWeatherColor } from '../components/weatherChange';

// import { Button } from '@mui/material';


function HourlyWeather({ }) {

    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState("");
    const WTH_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    //lets get the data from the weather app
    const fetchData = async (lat, lon) => {
        const API_CALL_HOURLY = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${WTH_API_KEY}&units=metric`;
        try {
            const response = await fetch(API_CALL_HOURLY);

            //check if response status is okay
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText} `);
            }

            const data = await response.json();
            setHourlyWeather(data);
            setIsLoading(false);
            console.log(data);
        }
        //catch erros
        catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchData(latitude, longitude);
            },
            (err) => {
                setError("Failed to get location");
                setIsLoading(false);
            }
        );
    }, []);

    if (isLoading) return <p>Loading the weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!hourlyWeather) return null;

    return (
        <div className="hourlyForecast">
            <h2>
                Hourly Forecast for {hourlyWeather.city.name}, {hourlyWeather.city.country}
            </h2>
            <div className="hourly-scroll">
                {hourlyWeather.list.slice(0, 12).map((hour, index) => (
                    <div
                        className="hour-card"
                        key={index}
                        style={{ backgroundColor: getWeatherColor(hour.weather[0].main) }} // Apply dynamic background if its sunny its yellow etc...
                    >
                        <p><strong>{hour.dt_txt.split(" ")[1].slice(0, 5)}</strong></p>
                        <img
                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                            alt="weather icon"
                        />
                        <p>{Math.round(hour.main.temp)}°C</p>
                        <p style={{ fontSize: '0.8em' }}>{hour.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}
export default HourlyWeather;

// <img
//     src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
//     alt="weather icon"
// />