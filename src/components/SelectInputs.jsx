import React, { useContext, useState } from 'react';
import SearchPlanetsContext from '../context/SearchPlanetsContext';

function SelectInputs() {
  const { filterConditions } = useContext(SearchPlanetsContext);
  const [conditions, setConditions] = useState({
    unit: 0,
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
        type="number"
        id="number"
        // name={ conditions.number }
        value={ conditions.unit }
        data-testid="value-filter"
        onChange={ ({ target: { value } }) => {
          setConditions({ ...conditions, unit: value });
        } }
      />

      <button
        data-testid="button-filter"
        onClick={ () => {
          filterConditions(conditions);
          setFilterColumns([...filterColumns, conditions.column]);
          setConditions({ ...conditions,
            column: saveColumns.filter((element) => !conditions.column
              .includes(element))[0] });
        } }
        type="button"
      >
        Filtrar
      </button>

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ () => {
          setFilterColumns([]);
          setConditions({
            unit: 0,
            column: 'population',
            operation: 'maior que',
          });
        } }
      >
        Remover todas filtragens
      </button>

      {
        filterColumns.map((filter) => (
          <button
            data-testid="filter"
            type="button"
            key={ filter }
          >
            {filter}
          </button>
        ))
      }
    </div>
  );
}

export default SelectInputs;
