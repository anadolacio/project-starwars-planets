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

  const filterConditions = ({ operation, unit, column }) => {
    const filter = selectedPlanets;
    if (operation === 'maior que') {
      const filtro = filter
        .filter((planet) => parseInt(planet[column], 10) > parseInt(unit, 10));
      setSelectedPlanets(filtro);
    } else if (operation === 'menor que') {
      const filtro = filter
        .filter((planet) => parseInt(planet[column], 10) < parseInt(unit, 10));
      setSelectedPlanets(filtro);
    } else {
      const filtro = filter
        .filter((planet) => parseInt(planet[column], 10) === parseInt(unit, 10));
      setSelectedPlanets(filtro);
    }
  };

  const funcFilter = ({ target: { value } }) => {
    let filtro = planets;
    filtro = filtro.filter((elemento) => elemento.name.toLowerCase()
      .includes(value.toLowerCase()));
    setSelectedPlanets(filtro);
  };

  return (
    <SearchPlanetsContext.Provider
      value={ { funcFilter, selectedPlanets, filterConditions } }
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
