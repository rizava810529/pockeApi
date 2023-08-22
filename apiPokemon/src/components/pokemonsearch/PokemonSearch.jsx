import React, { useState } from 'react';

function PokemonSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(`name=${searchTerm}`);
  };

  return (
    <div className='h-100 d-flex justify-content-center align-items-center m-4 gap-5'>
      <input
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default PokemonSearch;
