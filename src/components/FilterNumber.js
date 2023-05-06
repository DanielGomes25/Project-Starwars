import { useContext } from 'react';
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
    apiData,
    setNameSelect,
    handleRemoveFilter,
  } = useContext(MyContext);
  console.log(apiData);
  console.log(SaveFilter);

  return (
    <div>
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
          <>
            <h4 key={ visible.NameSelect }>

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
          </>
        ))
        )
      }
    </div>
  );
}

export default FilterNumber;
