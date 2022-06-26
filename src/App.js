import React, { useState } from 'react';
import './App.css';
import ErrorModal from './Components/ErrorModal';

const api = {
  key: '90d3f2fb4e744ba8109885a68128b095',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          if (typeof result.message === 'string') setError(true);
          else setError(false);
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year}`;
  };

  const errorHandler = () => {
    setError(false);
    // console.log('I was clicked');
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.weather[0].main === 'Thunderstorm'
            ? 'app thunder'
            : weather.weather[0].main === 'Drizzle'
            ? 'app rain'
            : weather.weather[0].main === 'Rain'
            ? 'app light-rain'
            : weather.weather[0].main === 'Snow'
            ? 'app snow'
            : weather.weather[0].main === 'Haze'
            ? 'app haze'
            : weather.weather[0].main === 'Clear'
            ? 'app clear'
            : weather.weather[0].main === 'Clouds'
            ? 'app clouds'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {error ? (
          <ErrorModal
            errorState={(error, setError)}
            onErrorHandle={errorHandler}
          />
        ) : typeof weather.main != 'undefined' ? (
          <>
            <div className='classify'>
              <div className='side1'>
                <div className='location-box'>
                  <div className='location'>
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className='date'>{dateBuilder(new Date())}</div>
                </div>
                <div className='weather-box'>
                  <div className='temp'>{Math.round(weather.main.temp)}°c</div>
                  <div className='weather'>{weather.weather[0].main}</div>
                </div>
              </div>
              <div className='side2'>
                <div className='wind-box'>
                  <div className='wind-direction-text'>Wind Direction</div>
                  <div className='direction-north'>N</div>
                  <div className='wind-direction'>
                    <div
                      className='wind'
                      style={{
                        transform: `rotate(${weather.wind.deg}deg)`,
                      }}
                    >
                      ↑
                    </div>
                  </div>
                  <div className='direction-south'>S</div>
                  <div className='wind-speed'>{weather.wind.speed} m/s</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='message'>Enter a city name...</div>
          </>
        )}
        <div className='origin'>
          Made with ❤️ by{' '}
          <a href='https://twitter.com/pandya_dhawal'>Dhawal Pandya</a>
        </div>
      </main>
    </div>
  );
}

export default App;
