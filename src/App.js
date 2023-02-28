import React, { useEffect, useState } from 'react';
import './App.css';
import SearchPlanetsContext from './context/SearchPlanetsContext';
import Table from './components/Table';

function App() {
  const url = 'https://swapi.dev/api/planets';
  const [planets, setPlanets] = useState([]);
  const [selectedPlanets, setSelectPlanets] = useState([]);

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

  useEffect(() => {
    const filteredPlanets = planets.filter((planet) => planet.name);
    setSelectPlanets(filteredPlanets);
    // console.log(filteredPlanets);
  }, [planets]);

  const contexValue = {
    planets,
    selectedPlanets,
  };

  return (
    <SearchPlanetsContext.Provider value={ contexValue }>
      <Table />
    </SearchPlanetsContext.Provider>
  );
}

export default App;
