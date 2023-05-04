import { useContext } from 'react';
import MyContext from '../contexts/MyContext';
import { Conditions, selectName } from '../data';

function FilterNumber() {
  const { NameSelect,
    Rules,
    setRules,
    inputNumber,
    setinputNumber,
    filterApi,
    setNameSelect,
  } = useContext(MyContext);

  return (
    <>
      <select
        value={ NameSelect }
        onChange={ ({ target }) => setNameSelect(target.value) }
        data-testid="column-filter"
      >
        {selectName.map((select) => (
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
        {Conditions.map((Condition) => (
          <option key={ Condition }>{Condition}</option>
        ))}
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ inputNumber }
        onChange={ ({ target }) => setinputNumber(target.value) }
      />
      <button
        data-testid="button-filter"
        onClick={ filterApi }
      >
        FILTRAR

      </button>
    </>
  );
}

export default FilterNumber;
