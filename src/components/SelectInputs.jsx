import React, { useContext, useState } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

function SelectInputs() {
  const { filterConditions } = useContext(SearchPlanetsContext);
  const [conditions, setConditions] = useState({
    number: '0',
    column: 'population',
    operation: 'maior que',
  });
  const [filterColumns, setFilterColumns] = useState([]);
  const saveColumns = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  return (
    <div>
      <label>
        <h4>Coluna</h4>
        <select
          name={ conditions.column }
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => {
            setConditions({ ...conditions, column: value });
          } }
        >
          { saveColumns.filter((element) => !filterColumns.includes(element))
            .map((e) => (<option value={ e } key={ e }>{e}</option>))}
        </select>
      </label>

      <label>
        <h4>Operador</h4>
        <select
          data-testid="comparison-filter"
          type="select"
          onChange={ ({ target: { value } }) => {
            setConditions({ ...conditions, operation: value });
          } }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        placeholder="Digite um número"
        type="text"
        id="number"
        name={ conditions.number }
        value={ conditions.number }
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => {
          setConditions({ ...conditions, number: value });
        } }
      />

      <button
        data-testid="button-filter"
        onClick={ () => {
          filterConditions(conditions);
          setFilterColumns([...filterColumns, conditions.column]);
        } }
        type="button"
      >
        Filtrar
      </button>
      {
        filterColumns.map((filter) => (
          <button type="button" key={ filter }>
            {filter}
          </button>
        ))
      }
    </div>
  );
}

export default SelectInputs;
