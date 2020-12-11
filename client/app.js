import React from 'react'
import Header from './components/header/header'
import Routes from './routes'
import Footer from './components/footer/footer'

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Routes />
      {/* <Footer /> */}
    </div>
  )
}

export default App
