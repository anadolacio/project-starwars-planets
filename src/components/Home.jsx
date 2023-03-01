import React, { useContext } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';
import Table from './Table';
import SelectInputs from './SelectInputs';

export default function Home() {
  const { funcFilter } = useContext(SearchPlanetsContext);

  return (
    <>
      <div>
        <h1>Projeto Star Wars</h1>
        <input
          placeholder="Filtrar por nome"
          type="text"
          id="searchPlanets"
          name="searchPlanets"
          data-testid="name-filter"
          onChange={ funcFilter }
        />
      </div>
      <SelectInputs />
      <Table />
    </>
  );
}
