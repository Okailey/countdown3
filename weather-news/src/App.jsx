import React, { useEffect, useState } from 'react'
import './App.css'
import News from './components/news';
import DailyWeather from './components/daily';
import HourlyWeather from './components/hourly';
import CurrentWeather from './components/current_weather';
import { Button } from '@mui/material';
import './styles/weatherBox.css'
import './styles/dailyWeather.css'

// import TriviaQuestions from './components/TriviaQuestion';
// import { Button } from '@mui/material';
// import './styles/AnswerButton.css'


function App() {
  const [view, setView] = useState('current');
  // const [weather, setWeather] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // // const baseURL = new URL("api.openweathermap.org/data/2.5/forecast/daily");

  // const lat = 42.1015;
  // const lon = -72.5898;
  // const The_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  // const [error, setError] = useState(null);
  // const url = " "
  // url += 'lat = ..'
  // url += '&lon = ...'

  //use curl to hit api endpoints
  //if you put in an API, use incognito mode else your browser will cache it and will not load your new updats since it is optimizing and not running your code at all. 


  return (

    <div>
      {/* <h1>My Weather App</h1> */}
      <CurrentWeather />

      <div style={{ marginBottom: '1rem', marginTop: '2rem', marginRight: '1rem', marginLeft: '1rem' }}>
        <Button
          className="hourly"
          variant="contained"
          color="primary"
          onClick={() => setView(view === 'hourly' ? null : 'hourly')}
          style={{ marginRight: '1rem', marginLeft: '1rem' }}
        >
          Hourly Weather
        </Button>

        <Button
          className="daily"
          variant="contained"
          color="primary"
          onClick={() => setView(view === 'daily' ? null : 'daily')}
          style={{ marginRight: '1rem', marginLeft: '1rem' }}
        >
          Daily Weather
        </Button>


        <Button
          className='news'
          variant="contained"
          color="primary"
          onClick={() => setView(view === 'news' ? null : 'news')} //toggle between showing and not
          style={{ marginRight: '1rem', marginLeft: '1rem' }}

        >
          News
        </Button>
      </div>

      {/* <Button
          className="current"
          variant="contained"
          color="primary"
          onClick={() => setView('current')}
          style={{ marginRight: '2rem' }}
        >
          Current Weather
        </Button> */}


      {/* <HourlyWeather />
      <DailyWeather /> */}
      {view === 'hourly' && <HourlyWeather />}
      {view === 'daily' && <DailyWeather />}
      {view === 'news' && <News />}
      {/* {view === 'current' && <CurrentWeather />} */}

    </div>
  );
}

export default App;
