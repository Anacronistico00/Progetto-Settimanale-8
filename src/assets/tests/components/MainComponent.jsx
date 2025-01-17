import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import DisplayWeather from './DisplayWeather';
import { Col, Row } from 'react-bootstrap';

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

  const getCity = (cityName) => {
    setSearchedCity(cityName);
  };

  const getWeatherByPosition = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nel recuper dati dall'API");
      }

      const data = await response.json();
      console.log('by position', data);
      setWeatherByPosition(data);
      setLoadingPosition(true);
      setIsSearchingByCity(false);
    } catch (error) {
      console.log('error', error);
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
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero dati dall'API");
      }

      const data = await response.json();
      console.log('by search', data);
      setWeatherByName(data);
      setLoadingCity(true);
      setIsSearchingByCity(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (searchedCity) {
      getWeatherBySearch();
    }
  }, [searchedCity]);

  return (
    <main className='container-fluid text-center'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8}>
          <SearchBar getCity={getCity} />
        </Col>

        <Col xs={12} md={8}>
          {!isSearchingByCity && loadingPosition && (
            <DisplayWeather weatherByPosition={weatherByPosition} />
          )}
          {isSearchingByCity && loadingCity && (
            <DisplayWeather weatherByname={weatherByName} />
          )}
        </Col>
      </Row>
    </main>
  );
};

export default MainComponent;
