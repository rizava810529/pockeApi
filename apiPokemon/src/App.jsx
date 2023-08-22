import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  
  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20');
        const data = await response.json();
        setPokemonData(data.results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    }
    
    fetchPokemonData();
  }, []);

  return (
    <div className="App">
      <h1 className="text-center mt-4">Pokémon Cards</h1>
      <div className="card-container d-flex flex-wrap justify-content-center">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="card m-3" style={{ width: '200px' }}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={pokemon.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
