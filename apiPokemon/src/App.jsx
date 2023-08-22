export default App; import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import PokemonSearch from '../src/components/pokemonsearch/PokemonSearch';
import PokemonCards from '../src/components/pokemoncards/PokemonCards';

function App() {
  return (
    <div>
      <div className='h-100 d-flex justify-content-center align-items-center'><h1>Pokémon</h1></div>
      <PokemonSearch />
      <PokemonCards />
    </div>
  );
}

