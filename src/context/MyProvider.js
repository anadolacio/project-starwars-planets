import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchPlanetsContext from './SearchPlanetsContext';

function MyProvider({ children }) {
  const url = 'https://swapi.dev/api/planets';
  const [planets, setPlanets] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState([]);

  const fetchAPI = () => {
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
  };

  useEffect(() => {
    function init() {
      fetchAPI();
    }
    init();
  }, []);

  const filterConditions = (filter, value) => {
    const { operation, unit, column } = value;
    if (operation === 'maior que') {
      return filter
        .filter((planet) => parseInt(planet[column], 10) > parseInt(unit, 10));
    }
    if (operation === 'menor que') {
      return filter
        .filter((planet) => parseInt(planet[column], 10) < parseInt(unit, 10));
    } return filter
      .filter((planet) => parseInt(planet[column], 10) === parseInt(unit, 10));
  };

  const funcFilter = (type, value) => {
    let filtro = planets;
    if (type === 'inputText') {
      filtro = filtro.filter((elemento) => elemento.name.toLowerCase()
        .includes(value.toLowerCase()));
      setSelectedPlanets(filtro);
    }
    if (type === 'completFilter') {
      filtro = selectedPlanets;
      setSelectedPlanets(filterConditions(filtro, value));
    }
  };

  return (
    <SearchPlanetsContext.Provider
      value={ { funcFilter, selectedPlanets } }
    >
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
