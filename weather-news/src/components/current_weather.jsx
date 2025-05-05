import React, { useState, useEffect } from 'react'
import '../styles/weatherBox.css'
import { getWeatherColor } from '../components/weatherChange';


function CurrentWeather({ }) {

    const [currWeather, setCurrWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const WTH_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


    //lets get the data from the weather app
    const fetchData = async (lat, lon) => {
        const API_CALL_CURR = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WTH_API_KEY}
        `;
        try {
            const response = await fetch(API_CALL_CURR);

            //check if response status is okay
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setCurrWeather(data);
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
                console.log("Geolocation error:", err);
            }
        );
    }, []);

    if (isLoading) return <p>Loading the weather...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!currWeather) return null;

    return (
        <div
            className="current-weather-container"
            style={{
                backgroundColor: 'transparent',
                color: 'black',

            }}
        >

            <h2>Weather in {currWeather.name}, {currWeather.sys.country}</h2>
            <div className="weath_img">
                <img
                    src={`https://openweathermap.org/img/wn/${currWeather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                />
            </div>

            <div className="weather-flex">
                <div className="weather-item">
                    <p><strong>Feels Like</strong></p>
                    <p>{Math.round(currWeather.main.feels_like - 273.15)}°C</p>
                </div>
                <div className="weather-item">
                    <p><strong>Humidity</strong></p>
                    <p>{currWeather.main.humidity}%</p>
                </div>
                <div className="weather-item">
                    <p><strong>Wind Speed</strong></p>
                    <p>{currWeather.wind.speed} m/s</p>
                </div>
                <div className="weather-item">
                    <p><strong>Condition</strong></p>
                    <p>{currWeather.weather[0].description}</p>
                </div>
            </div>
        </div>
    );

}

export default CurrentWeather;

