import React from 'react';
import Header from './components/header/Header';
import Routes from './routes';
import Footer from './components/footer/Footer';

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
