import { useState } from 'react';

const SearchBar = (props) => {
  const [city, setCity] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getCity(city);
    setCity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={city}
        onChange={handleInputChange}
        placeholder='Search for a City(exemple: "Milan, IT")'
        style={{ padding: '0.5rem', width: '50%', fontSize: '1rem' }}
        required
      />
      <button>Search City</button>
    </form>
  );
};

export default SearchBar;
