import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function PokemonCards() {
  const [pokemonData, setPokemonData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  const handleModalOpen = async (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
    
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = response.data;
      setPokemonDetails(data);
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
    }
  };

  const handleModalClose = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null);
    setShowModal(false);
  };

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
    <div>
      <div className="container">
        <div className="row">
          {pokemonData.map((pokemon, index) => (
            <div key={index} className="col-md-3 mb-4 d-flex align-items-center justify-content-center">
              <div className="card border border-black shadow">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                  alt={`${pokemon.name} Sprite`}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{pokemon.name}</h5>
                  <Button variant="primary" onClick={() => handleModalOpen(pokemon)}>
                    Ver detalles
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedPokemon && selectedPokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pokemonDetails && (
          <div>
             {/* Usa una URL de imagen diferente en el modal */}
             <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`}
              alt={`${pokemonDetails.name} Official Artwork`}
            />
            <p>Height: {pokemonDetails.height}</p>
            <p>Weight: {pokemonDetails.weight}</p>
            <p>Types: {pokemonDetails.types.map(type => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p>Base Stats:</p>
            <ul>
              {pokemonDetails.stats.map(stat => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
            {/* ... Otros detalles ... */}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default PokemonCards;
