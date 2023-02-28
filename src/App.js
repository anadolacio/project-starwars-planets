import React, { useEffect, useState } from 'react';
import './App.css';
import SearchPlanetsContext from './context/SearchPlanetsContext';
import Table from './components/Table';

function App() {
  const url = 'https://swapi.dev/api/planets';
  const [planets, setPlanets] = useState([]);
  const [selectedPlanets, setSelectPlanets] = useState([]);
  const [searchPlanets, setSearchPlanets] = useState('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const planetsSearched = data.results.map((planet) => {
          const { residents, ...planetSearched } = planet;
          // console.log(planetSearched);
          return planetSearched;
        });
        setPlanets(planetsSearched);
      });
  }, []);

  const handleChange = ({ target }) => {
    // console.log(target.value);
    const { value } = target;
    setSearchPlanets(value);
  };

  useEffect(() => {
    const filteredPlanets = planets.filter((planet) => planet.name
      .includes(searchPlanets));
    setSelectPlanets(filteredPlanets);
    // console.log(filteredPlanets);
  }, [planets, searchPlanets]);

  const contexValue = {
    planets,
    selectedPlanets,
    searchPlanets,
  };

  return (
    <SearchPlanetsContext.Provider value={ contexValue }>
      <div>
        <h1>Projeto Star Wars</h1>
        <input
          placeholder="Filtrar por nome"
          type="text"
          id="searchPlanets"
          name="searchPlanets"
          value={ searchPlanets }
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </div>
      <Table />
    </SearchPlanetsContext.Provider>
  );
}

export default App;
