import { useContext, useState } from 'react';
import MyContext from '../contexts/MyContext';

function FilterNumber() {
  const { NameSelect,
    Rules,
    setRules,
    inputNumber,
    setinputNumber,
    filterApi,
    SaveFilter,
    initialStateName,
    initialStateRules,
    setNameSelect,
    handleRemoveFilter,
    removeAllFilters,
    apiData,
    setapiData,
  } = useContext(MyContext);

  const [stateFilter, setStateFilter] = useState({
    order: { column: 'population', sort: 'ASC' },
  });
  const orderNames = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setStateFilter((prevState) => ({
      order: { ...prevState.order, [name]: value },
    }));
  };

  const tableOrder = () => {
    const { sort, column } = stateFilter.order;
    const unknown = apiData.filter((data) => data[column] === 'unknown');
    const allPlanets = apiData.filter((data) => data[column] !== 'unknown');

    if (sort === 'ASC') {
      const sortPlanets = allPlanets.sort((a, b) => (
        +(a[column] - +(b[column]))));
      setapiData([...sortPlanets, ...unknown]);
    } else if (sort === 'DESC') {
      const sortPlanetsDesc = allPlanets.sort((a, b) => (
        +(b[column] - +(a[column]))));
      setapiData([...sortPlanetsDesc, ...unknown]);
    }
  };

  return (
    <>
      <select
        value={ NameSelect }
        onChange={ ({ target }) => setNameSelect(target.value) }
        data-testid="column-filter"
      >
        {initialStateName.map((select) => (
          <option
            key={ select }
          >
            {select}

          </option>
        ))}
      </select>
      <select
        value={ Rules }
        onChange={ ({ target }) => setRules(target.value) }
        data-testid="comparison-filter"
      >
        {initialStateRules.map((condition) => (
          <option key={ condition }>{condition}</option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ inputNumber }
        onChange={ ({ target }) => setinputNumber(target.value) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterApi }
      >
        FILTRAR

      </button>

      {
        (SaveFilter.map((visible) => (
          <div data-testid="filter" key={ visible.NameSelect }>
            <h4>

              {visible.NameSelect}
              {' '}

              {visible.Rules}
              {' '}

              {visible.inputNumber}

            </h4>
            <button
              onClick={ () => handleRemoveFilter(visible.NameSelect) }
            >
              Remover Filtro

            </button>
          </div>
        ))
        )
      }
      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        REMOVER FILTROS

      </button>
      <form>
        <label>
          Ordenar:
          <select
            name="column"
            data-testid="column-sort"
            onChange={ handleChange }
            value={ stateFilter.order.column }
          >
            {orderNames.map((order) => (
              <option value={ order } key={ order }>{order}</option>
            ))}
          </select>
        </label>
        <label htmlFor="asc">
          ASCENDENTE
          <input
            onChange={ handleChange }
            id="asc"
            type="radio"
            data-testid="column-sort-input-asc"
            name="sort"
            value="ASC"
          />
        </label>
        <label htmlFor="desc">
          DESCENDENTE
          <input
            onChange={ handleChange }
            id="desc"
            type="radio"
            data-testid="column-sort-input-desc"
            name="sort"
            value="DESC"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ tableOrder }
        >
          ORDENAR

        </button>
      </form>
    </>

  );
}

export default FilterNumber;
