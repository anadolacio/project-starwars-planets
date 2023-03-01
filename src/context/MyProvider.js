import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchPlanetsContext from './SearchPlanetsContext';

function MyProvider({ children }) {
  const url = 'https://swapi.dev/api/planets';
  const [planets, setPlanets] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const planetsSearched = data.results.map((planet) => {
          const { residents, ...planetSearched } = planet;
          return planetSearched;
        });
        setPlanets(planetsSearched);
        setSelectedPlanets(planetsSearched);
      });
  }, []);

  const funcFilter = ({ target: { value } }) => {
    const filteredPlanets = planets.filter((planet) => planet.name
      .includes(value));
    setSelectedPlanets([...filteredPlanets]);
  };

  const filterConditions = ({ number, column, operation }) => {
    if (operation === 'maior que') {
      const filter = selectedPlanets
        .filter((planet) => Number(planet[column]) > Number(number));
      //   console.log(filter);
      setSelectedPlanets([...filter]);
    }
    if (operation === 'menor que') {
      const filter = selectedPlanets
        .filter((planet) => Number(planet[column]) < Number(number));
      setSelectedPlanets([...filter]);
    } else {
      const filter = selectedPlanets
        .filter((planet) => Number(planet[column]) === Number(number));
      //   console.log(filter);
      setSelectedPlanets([...filter]);
    }
  };

  const contexValue = {
    planets,
    setPlanets,
    selectedPlanets,
    setSelectedPlanets,
    funcFilter,
    filterConditions,
  };

  return (
    <SearchPlanetsContext.Provider value={ contexValue }>
      { children }
    </SearchPlanetsContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MyProvider;
