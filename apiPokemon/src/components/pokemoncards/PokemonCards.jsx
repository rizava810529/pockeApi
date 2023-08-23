import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import "./PokemonCards.css"

function PokemonCards({ searchParams }) {
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
            console.error('Error al obtener detalles del Pokémon:', error);
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
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?${searchParams}`);
                const data = await response.json();
                setPokemonData(data.results);
            } catch (error) {
                console.error('Error al obtener datos de Pokémon:', error);
            }
        }

        fetchPokemonData();
    }, [searchParams]);

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
                                    <Button variant="danger" onClick={() => handleModalOpen(pokemon)}>
                                        Descripcion
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal show={showModal} onHide={handleModalClose} >
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPokemon && selectedPokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='fondo2'>
                    {pokemonDetails && (
                        <div >
                            {/* Usa una URL de imagen diferente en el modal */}
                            <div className='border'>
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`}
                                    alt={`${pokemonDetails.name} Official Artwork`}
                                /></div>
                            <div className='border p-1'>
                                <p>Altura: {pokemonDetails.height}</p>

                            </div>
                            <div className='border p-1'>
                                <p>Peso: {pokemonDetails.weight}</p>

                            </div>

                            <div className='border p-1'>
                                <p>Habilidades: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</p>
                                <p>Estadísticas Base:</p>
                                <ul>
                                    {pokemonDetails.stats.map(stat => (
                                        <li key={stat.stat.name}>
                                            {stat.stat.name}: {stat.base_stat}
                                        </li>
                                    ))}
                                </ul>
                            </div>





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
