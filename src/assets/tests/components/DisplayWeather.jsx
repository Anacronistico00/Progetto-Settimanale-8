import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
const apiKeyPixabay = '48284475-42c6fed8456debbb2c2e99314';

const DisplayWeather = (props) => {
  const [imageUrl, setImageUrl] = useState('');
  const [county, setCounty] = useState('');

  const getRandomImage = async (county) => {
    if (props.weatherByPosition) {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${county}&image_type=photo&orientation=horizzontal`
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
          `https://pixabay.com/api/?key=${apiKeyPixabay}&q=${county}&image_type=photo&orientation=horizzontal`
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
        if (data.address.county) {
          setCounty(data.address.county);
        } else {
          setCounty(data.address.country);
        }
      }
      if (props.weatherByName) {
        if (data.address.county) {
          setCounty(data.address.county);
        } else {
          setCounty(data.address.country);
        }
      }

      return data;
    } catch (error) {
      console.error('Errore:', error);
    }
  };

  useEffect(() => {
    if (props.weatherByPosition) {
      reverseGeocode(
        props.weatherByPosition.city.coord.lat,
        props.weatherByPosition.city.coord.lon
      );
    }
    if (props.weatherByName) {
      reverseGeocode(
        props.weatherByName.city.coord.lat,
        props.weatherByName.city.coord.lon
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
      <>
        {!props.isLoading && !props.isError && (
          <div
            style={{
              position: 'relative',
              height: '70vh',
              width: '100%',
              backgroundImage: `linear-gradient(to bottom, #B8C4C5, transparent 30%), url(${imageUrl}), linear-gradient(to top, #B8C4C5, transparent 20%)`,
              backgroundSize: 'cover',
            }}
            className='text-white'
          >
            <h2 className='fs-bolder'>Weather for your current location</h2>
            <p>
              Location: {props.weatherByPosition.name},{county},
              {props.weatherByPosition.city.country}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Colonna di sinistra */}
              <div style={{ width: '48%' }}>
                {props.weatherByPosition.list
                  .slice(0, 5)
                  .map((weather, index) => (
                    <div key={index} className='weatherItem mb-3'>
                      <p className='m-0'>
                        <strong>Data/Ora:</strong>
                        {new Date(weather.dt * 1000).toLocaleString()}
                      </p>
                      <p className='m-0'>
                        <strong>Temperatura:</strong>
                        {weather.main.temp.toFixed(1)}°C
                      </p>
                      <div className='d-flex justify-content-center align-items-center'>
                        <p className='m-0'>
                          <strong>Descrizione:</strong>
                          {weather.weather[0].description}
                        </p>
                        <img
                          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                          alt={weather.weather[0].description}
                          style={{ width: '50px', height: '50px' }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* Colonna di destra */}
              <div style={{ width: '48%' }}>
                {props.weatherByPosition.list
                  .slice(5, 10)
                  .map((weather, index) => (
                    <div key={index} className='weatherItem mb-3'>
                      <p className='m-0'>
                        <strong>Data/Ora:</strong>
                        {new Date(weather.dt * 1000).toLocaleString()}
                      </p>
                      <p className='m-0'>
                        <strong>Temperatura:</strong>
                        {weather.main.temp.toFixed(1)}°C
                      </p>
                      <div className='d-flex justify-content-center align-items-center'>
                        <p className='m-0'>
                          <strong>Descrizione:</strong>
                          {weather.weather[0].description}
                        </p>
                        <img
                          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                          alt={weather.weather[0].description}
                          style={{ width: '50px', height: '50px' }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {props.isLoading && (
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

        {props.isError && (
          <div className='text-center'>
            <Alert variant='danger'>
              Si è verificato un errore <br /> Impossibile Caricare i dati
            </Alert>
          </div>
        )}
      </>
    );
  }

  if (props.weatherByName) {
    return (
      <>
        {!props.isLoading && !props.isError && (
          <div
            style={{
              position: 'relative',
              height: '70vh',
              width: '100%',
              backgroundImage: `linear-gradient(to bottom, #B8C4C5, transparent 30%), url(${imageUrl}), linear-gradient(to top, #B8C4C5, transparent 20%)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className='text-white'
          >
            <h2 className='fs-bolder'>Weather for your current location</h2>
            <p>
              Location: {props.weatherByName.name},{county},
              {props.weatherByName.city.country}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Colonna di sinistra */}
              <div style={{ width: '48%' }}>
                {props.weatherByName.list.slice(0, 5).map((weather, index) => (
                  <div key={index} className='weatherItem mb-3'>
                    <p className='m-0'>
                      <strong>Data/Ora:</strong>
                      {new Date(weather.dt * 1000).toLocaleString()}
                    </p>
                    <p className='m-0'>
                      <strong>Temperatura:</strong>
                      {weather.main.temp.toFixed(1)}°C
                    </p>
                    <div className='d-flex justify-content-center align-items-center'>
                      <p className='m-0'>
                        <strong>Descrizione:</strong>
                        {weather.weather[0].description}
                      </p>
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Colonna di destra */}
              <div style={{ width: '48%' }}>
                {props.weatherByName.list.slice(5, 10).map((weather, index) => (
                  <div key={index} className='weatherItem mb-3'>
                    <p className='m-0'>
                      <strong>Data/Ora:</strong>
                      {new Date(weather.dt * 1000).toLocaleString()}
                    </p>
                    <p className='m-0'>
                      <strong>Temperatura:</strong>
                      {weather.main.temp.toFixed(1)}°C
                    </p>
                    <div className='d-flex justify-content-center align-items-center'>
                      <p className='m-0'>
                        <strong>Descrizione:</strong>
                        {weather.weather[0].description}
                      </p>
                      <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {props.isLoading && (
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

        {props.isError && (
          <div className='text-center'>
            <Alert variant='danger'>
              Si è verificato un errore <br /> Impossibile Caricare i dati
            </Alert>
          </div>
        )}
      </>
    );
  }

  return <p>No weather data available.</p>;
};

export default DisplayWeather;
