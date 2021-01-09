import React from 'react';
import Header from './components/header/Header.js';
import Routes from './routes';
import Footer from './components/footer/Footer.js';

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
