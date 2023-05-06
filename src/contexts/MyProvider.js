import { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [apiData, setapiData] = useState([]);
  const [inputName, setinputName] = useState('');
  const [inputNumber, setinputNumber] = useState(0);
  const [SaveFilter, setSaveFilter] = useState([]);
  const [saveNames, setsaveNames] = useState([]);
  const [initialStateName, setinitialStateName] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [initialStateRules] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);
  const [NameSelect, setNameSelect] = useState(initialStateName[0]);
  const [Rules, setRules] = useState(initialStateRules[0]);

  useEffect(() => {
    const requestApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      results.map((r) => delete r.residents);
      setapiData(results);
    };
    requestApi();
  }, []);

  const filterApi = useCallback(() => {
    if (Rules === 'maior que') {
      const filterMaior = apiData
        .filter((data) => (data[NameSelect] > +inputNumber));
      setSaveFilter([...SaveFilter, { NameSelect, inputNumber, Rules }]);
      setapiData(filterMaior);
    } else if (Rules === 'menor que') {
      const filterMenor = apiData
        .filter((data) => (data[NameSelect] < +inputNumber));
      setSaveFilter([...SaveFilter, { NameSelect, inputNumber, Rules }]);
      setapiData(filterMenor);
    } else {
      const filterIgual = apiData
        .filter((data) => (data[NameSelect] === inputNumber));
      setSaveFilter([...SaveFilter, { NameSelect, inputNumber, Rules }]);
      setapiData(filterIgual);
    }
    const saveSelectName = (SaveFilter, { NameSelect });
    const removeNames = [...initialStateName
      .filter((state) => !state.includes(saveSelectName.NameSelect))];
    setinitialStateName(removeNames);
    setNameSelect(removeNames[0]);
  }, [
    Rules,
    apiData,
    inputNumber,
    NameSelect,
    SaveFilter,
    initialStateName]);

  const handleRemoveFilter = useCallback((filterRemove) => {
    const removeFilter = SaveFilter.filter((save) => save.NameSelect !== filterRemove);
    setSaveFilter(removeFilter);
    setinitialStateName((prevState) => [...prevState, filterRemove]);
    setapiData(apiData);
  }, [SaveFilter, apiData]);

  const values = useMemo(() => ({
    apiData,
    inputName,
    setinputName,
    NameSelect,
    Rules,
    setRules,
    setinputNumber,
    inputNumber,
    filterApi,
    setNameSelect,
    SaveFilter,
    saveNames,
    setsaveNames,
    initialStateRules,
    initialStateName,
    handleRemoveFilter,
  }), [
    apiData,
    inputName,
    setinputName,
    NameSelect,
    Rules,
    setRules,
    setinputNumber,
    inputNumber,
    filterApi,
    setNameSelect,
    SaveFilter,
    saveNames,
    setsaveNames,
    initialStateRules,
    initialStateName,
    handleRemoveFilter,
  ]);

  return (
    <MyContext.Provider value={ values }>
      {children}
    </MyContext.Provider>
  );
}
MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
