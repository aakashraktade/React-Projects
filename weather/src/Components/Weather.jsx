import React, { useRef, useEffect, useState } from 'react';
import './Weather.css';
import SearchIcon from '@mui/icons-material/Search';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const Weather = () => {
    const inputRef = useRef(null);
    const [weatherData, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [fiveDay, setFiveDay] = useState([]);
    const [bgColor, setBgColor] = useState("linear-gradient(45deg, #2f4680, #500ae4)");
    const [showMobileSearch, setShowMobileSearch] = useState(false); // Mobile toggle

    const search = async (city) => {
        if (!city) {
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            if (!response.ok) {
                const data = await response.json();
                alert(data.message);
                return;
            }
            const data = await response.json();

            const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            setWeather({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                weatherType: data.weather[0].description,
                country: data.sys.country,
                pressure: data.main.pressure,
                feelsLike: data.main.feels_like
            });

            let weatherMain = data.weather[0].main.toLowerCase();
            let bg;
            switch (weatherMain) {
                case "clear":
                    bg = "linear-gradient(45deg, #ffb347, #ffcc33)";
                    break;
                case "snow":
                    bg = "linear-gradient(45deg, #e0eafc, #cfdef3)";
                    break;
                case "rain":
                case "drizzle":
                    bg = "linear-gradient(45deg, #283e51, #485563)";
                    break;
                case "clouds":
                    bg = "linear-gradient(45deg, #757f9a, #d7dde8)";
                    break;
                case "thunderstorm":
                    bg = "linear-gradient(45deg, #141e30, #243b55)";
                    break;
                default:
                    bg = "linear-gradient(45deg, #385190ff, #500ae4)";
            }
            setBgColor(bg);

            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const forecastRes = await fetch(forecastUrl);
            const forecastData = await forecastRes.json();

            setForecast(forecastData.list.slice(0, 8));

            let groupedByDate = {};
            forecastData.list.forEach(item => {
                const date = new Date(item.dt * 1000).toLocaleDateString();
                if (!groupedByDate[date]) {
                    groupedByDate[date] = { temps: [], icons: [] };
                }
                groupedByDate[date].temps.push(item.main.temp);
                groupedByDate[date].icons.push(item.weather[0].icon);
            });

            const fiveDayArray = Object.keys(groupedByDate).map(date => {
                const dayData = groupedByDate[date];
                const total = dayData.temps.reduce((sum, t) => sum + t, 0);
                const avgTemp = Math.floor(total / dayData.temps.length);
                const icon = `https://openweathermap.org/img/wn/${dayData.icons[0]}@2x.png`;
                return { date, avgTemp, icon };
            });

            setFiveDay(fiveDayArray);

        } catch (error) {
            setWeather(null);
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search("Pune");
    }, []);

    return (
        <div className='weather' style={{ background: bgColor }}>
            <div className={`search-bar ${showMobileSearch ? 'active' : ''}`}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Search'
                    onKeyDown={(e) => e.key === 'Enter' && search(inputRef.current.value)}
                />
                <SearchIcon
                    className="search-icon"
                    onClick={() => {
                        if (window.innerWidth <= 480) {
                            setShowMobileSearch(prev => !prev);
                             search(inputRef.current.value);// Toggle for mobile
                        } else {
                            search(inputRef.current.value); // Desktop search
                        }
                    }}
                />
            </div>

            {weatherData && (
                <>
                    <div className='main' key={weatherData.location + weatherData.temperature}>
                        <div className='weather-type'>{weatherData.weatherType}</div>
                        <img src={weatherData.icon} alt="" className='weather-icon' />
                        <p className='temperature'>{weatherData.temperature}°c</p>
                        <p className='location'>{weatherData.location} ({weatherData.country})</p>

                        <div className='weather-data'>
                            <div className="col">
                                <WaterDropIcon className="icon-humidity" />
                                <div>
                                    <p>{weatherData.humidity}%</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="col">
                                <AirIcon className="icon-wind" />
                                <div>
                                    <p>{weatherData.windSpeed} Km/h</p>
                                    <span>Wind-Speed</span>
                                </div>
                            </div>
                            <div className="col">
                                <CompressIcon className="icon-pressure" />
                                <div>
                                    <p>{weatherData.pressure}</p>
                                    <span>Pressure</span>
                                </div>
                            </div>
                            <div className="col">
                                <DeviceThermostatIcon className="icon-feelslike" />
                                <div>
                                    <p>{weatherData.feelsLike}°c</p>
                                    <span>Feels-Like</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='hr'><hr /><h2>Hourly Forecast</h2></div>
                    <div className='foreCast'>
                        {forecast.map((hour, index) => (
                            <div key={index} className="forecast-item" style={{ animationDelay: `${index * 0.1}s` }}>
                                <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="" />
                                <p>{Math.floor(hour.main.temp)}°c</p>
                            </div>
                        ))}
                    </div>

                    <div className='hr'><hr /><h2>Daily Forecast</h2></div>
                    <div className='fiveDayForecast'>
                        {fiveDay.map((day, index) => (
                            <div key={index} className='forecast-item' style={{ animationDelay: `${index * 0.1}s` }}>
                                <p>{day.date}</p>
                                <img src={day.icon} alt="" />
                                <p>{day.avgTemp}°c</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
