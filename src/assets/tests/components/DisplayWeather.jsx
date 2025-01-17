import { useEffect, useState } from 'react';
const apiKeyPixabay = '48284475-42c6fed8456debbb2c2e99314';

const DisplayWeather = (props) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Funzione per cercare una foto su Pixabay
    const getRandomImage = async () => {
      if (props.weatherByPosition) {
        try {
          const response = await fetch(
            `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${props.weatherByPosition.name}&image_type=photo&orientation=vertical`
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
            `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${props.weatherByName.name}&image_type=photo&orientation=vertical`
          );
          const data = await response.json();
          setImageUrl(data.hits[0]?.webformatURL);
        } catch (error) {
          console.log('Error fetching image:', error);
        }
      }
    };

    if (props.weatherByPosition) {
      getRandomImage();
    }
  }, [props.weatherByPosition, props.weatherByname]);

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

  if (props.weatherByname) {
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
        <h2>Weather for {props.weatherByname.name}</h2>
        <p>
          Location: {props.weatherByname.name},{props.weatherByname.sys.country}
        </p>
        <p>Temperature: {props.weatherByname.main.temp.toFixed(1)}°C</p>
        <p>Weather: {props.weatherByname.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${props.weatherByname.weather[0].icon}@2x.png`}
          alt='weather icon'
          style={{ width: '50px', height: '50px' }}
        />
      </div>
    );
  }

  return <p>No weather data available.</p>;
};

export default DisplayWeather;
