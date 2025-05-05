import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import '../styles/dailyWeather.css'
import { getWeatherColor } from '../components/weatherChange';


function DailyWeather({ }) {

    const [dailyWeather, setDailyWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const WTH_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;



    //lets get the data from the weather app
    const fetchData = async (lat, lon) => {
        const API_CALL_DAILY = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${WTH_API_KEY}&units=metric
        `;
        try {
            const response = await fetch(API_CALL_DAILY);

            //check if response status is okay
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setDailyWeather(data);
            setIsLoading(false);
            console.log(data);
        }
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
    if (!dailyWeather) return null;

    return (
        <div className="dailyForecast">
            <h2>Forecast for {dailyWeather.city.name}, {dailyWeather.city.country}</h2>
            <div className="daily-flex">
                {dailyWeather.list.map((day, index) => (
                    <div
                        key={index}
                        className="daily-item"
                        style={{
                            backgroundColor: getWeatherColor(day.weather[0].main), // Apply dynamic background color
                            color: 'white', // Optional: Set text color to white for better visibility
                        }}
                    >
                        <p><strong>{new Date(day.dt * 1000).toDateString()}</strong></p>
                        <p>Day Temp: {day.temp.day}°C</p>
                        <p>Condition: {day.weather[0].description}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt="weather icon"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}




export default DailyWeather


