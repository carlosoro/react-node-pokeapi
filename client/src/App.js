import React from 'react';
import './App.css';
import 'nes.css/css/nes.min.css';
import SearchPokemon from './components/SearchPokemon/SearchPokemon';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchPokemon />
      <Footer />
    </div>
  );
}

export default App;
