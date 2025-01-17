import { useEffect, useState } from 'react';
const apiKeyPixabay = '48284475-42c6fed8456debbb2c2e99314';

const DisplayWeather = (props) => {
  const [imageUrl, setImageUrl] = useState('');
  const [county, setCounty] = useState('');

  const getRandomImage = async (county) => {
    if (props.weatherByPosition) {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${county}&image_type=photo&orientation=vertical`
        );
        const data = await response.json();
        setImageUrl(data.hits[0]?.webformatURL);
      } catch (error) {
        console.log('Error fetching image:', error);
      }
    }
    if (props.weatherByName) {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${county}&image_type=photo&orientation=vertical`
        );
        const data = await response.json();
        setImageUrl(data.hits[0]?.webformatURL);
      } catch (error) {
        console.log('Error fetching image:', error);
      }
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      if (!response.ok) {
        throw new Error('Errore nel recupero dei dati');
      }
      const data = await response.json();
      console.log('Dati Geografici:', data);
      if (props.weatherByPosition) {
        setCounty(data.address.county);
      }
      if (props.weatherByName) {
        setCounty(data.address.county);
      }

      return data;
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  useEffect(() => {
    if (props.weatherByPosition) {
      reverseGeocode(
        props.weatherByPosition.coord.lat,
        props.weatherByPosition.coord.lon
      );
    }
    if (props.weatherByName) {
      reverseGeocode(
        props.weatherByName.coord.lat,
        props.weatherByName.coord.lon
      );
    }
  }, [props.weatherByPosition, props.weatherByName]);

  useEffect(() => {
    if (county) {
      getRandomImage(county);
    }
  }, [county]);

  if (props.weatherByPosition) {
    return (
      <div
        style={{
          position: 'relative',
          height: '80vh',
          width: '100%',
          backgroundImage: `linear-gradient(to bottom, #B8C4C5, transparent 30%), url(${imageUrl}), linear-gradient(to top, #B8C4C5, transparent 20%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className='text-white'
      >
        <h2 className='fs-bolder text-white'>
          Weather for your current location
        </h2>
        <p>
          Location: {props.weatherByPosition.name},
          {props.weatherByPosition.sys.country}
        </p>
        <p>Temperature: {props.weatherByPosition.main.temp.toFixed(1)}°C</p>
        <p>Weather: {props.weatherByPosition.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${props.weatherByPosition.weather[0].icon}@2x.png`}
          alt='weather icon'
          style={{ width: '50px', height: '50px' }}
        />
      </div>
    );
  }

  if (props.weatherByName) {
    return (
      <div
        style={{
          position: 'relative',
          height: '80vh',
          width: '100%',
          backgroundImage: `linear-gradient(to bottom, #B8C4C5, transparent), url(${imageUrl}), linear-gradient(to top, #B8C4C5, transparent)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className='fs-bolder text-white'>
          Weather for {props.weatherByName.name}
        </h2>
        <p>
          Location: {props.weatherByName.name},{props.weatherByName.sys.country}
        </p>
        <p>Temperature: {props.weatherByName.main.temp.toFixed(1)}°C</p>
        <p>Weather: {props.weatherByName.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${props.weatherByName.weather[0].icon}@2x.png`}
          alt='weather icon'
          style={{ width: '50px', height: '50px' }}
        />
      </div>
    );
  }

  return <p>No weather data available.</p>;
};

export default DisplayWeather;
