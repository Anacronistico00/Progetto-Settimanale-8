import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import DisplayWeather from './DisplayWeather';
import { Alert, Spinner } from 'react-bootstrap';

const apiKey = 'c0f05cf525dd8d5e671bdcd5e5846d00';

const MainComponent = () => {
  const [searchedCity, setSearchedCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherByPosition, setWeatherByPosition] = useState([]);
  const [weatherByName, setWeatherByName] = useState([]);
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const [isSearchingByCity, setIsSearchingByCity] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getCity = (cityName) => {
    setSearchedCity(cityName);
  };

  const getWeatherByPosition = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nel recuper dati dall'API");
      }

      const data = await response.json();
      console.log('by position', data);
      setWeatherByPosition(data);
      setLoadingPosition(true);
      setIsSearchingByCity(false);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherByPosition();
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, [latitude, longitude]);

  const getWeatherBySearch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero dati dall'API");
      }

      const data = await response.json();
      console.log('by search', data);
      setWeatherByName(data);
      setLoadingCity(true);
      setIsSearchingByCity(true);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    if (searchedCity) {
      getWeatherBySearch();
    }
  }, [searchedCity]);

  return (
    <main className='container-fluid text-center p-0 mt-2'>
      <SearchBar getCity={getCity} />

      {!isSearchingByCity && loadingPosition && !isLoading && !isError && (
        <DisplayWeather
          weatherByPosition={weatherByPosition}
          isLoading={isLoading}
          isError={isError}
        />
      )}
      {isSearchingByCity && loadingCity && !isLoading && !isError && (
        <DisplayWeather
          weatherByName={weatherByName}
          isLoading={isLoading}
          isError={isError}
        />
      )}

      {isLoading && (
        <div className='text-center'>
          <div>
            <p>Caricamento in corso...</p>

            <Spinner
              animation='grow'
              size='sm'
              variant='info'
              className='ms-2'
            />
            <Spinner
              animation='grow'
              size='sm'
              variant='info'
              className='ms-2'
            />
            <Spinner
              animation='grow'
              size='sm'
              variant='info'
              className='ms-2'
            />
          </div>
        </div>
      )}

      {isError && (
        <div className='text-center'>
          <Alert variant='danger'>
            Si è verificato un errore <br /> Impossibile Caricare i dati
          </Alert>
        </div>
      )}
    </main>
  );
};

export default MainComponent;
