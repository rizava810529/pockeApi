export default App; import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import PokemonSearch from '../src/components/pokemonsearch/PokemonSearch';
import PokemonCards from '../src/components/pokemoncards/PokemonCards';
import "./App.css";

function App() {
  const setSearchParams = (searchParams) => {
    // Aquí podrías manejar la lógica para actualizar los parámetros de búsqueda
    console.log('Search parameters:', searchParams);
  };
  return (
    <div className='fondo'>
      <div className='h-100 d-flex justify-content-center align-items-center '><h1 className='color'>Pokemon</h1></div>
      <PokemonSearch onSearch={setSearchParams} />
      <PokemonCards />
    </div>
  );
}
