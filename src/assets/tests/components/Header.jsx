const Header = () => {
  return (
    <header className='header'>
      <img src='./DataSky.jpg' alt='DataSky logo' className='headerLogo' />
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='fw-bolder'>DataSky</h1>
        <p className='m-0'>Your Weather&apos;s Best Friend</p>
      </div>
    </header>
  );
};

export default Header;
