import { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
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
  const [apiData, setapiData] = useState([]);
  const [apiDataInitial, setapiDataInitial] = useState([]);
  const [inputName, setinputName] = useState('');
  const [inputNumber, setinputNumber] = useState(0);
  const [SaveFilter, setSaveFilter] = useState([]);
  const [NameSelect, setNameSelect] = useState(initialStateName[0]);
  const [Rules, setRules] = useState(initialStateRules[0]);
  const [stateRemove, setStateRemove] = useState(false);

  const requestApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    const { results } = data;
    results.map((r) => delete r.residents);
    setapiData(results);
    setapiDataInitial(results);
  };
  useEffect(() => {
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
    initialStateName,
  ]);

  const handleRemoveFilter = useCallback((filterRemove) => {
    const removeFilter = SaveFilter.filter((save) => save.NameSelect !== filterRemove);
    setSaveFilter(removeFilter);
    setinitialStateName((prevState) => [...prevState, filterRemove]);
    setStateRemove(true);
  }, [SaveFilter]);

  const removeAllFilters = useCallback(() => {
    setapiData(apiDataInitial);
    setSaveFilter([]);
  }, [apiDataInitial]);

  useEffect(() => {
    if (stateRemove) {
      let apiResult = apiDataInitial;

      SaveFilter.forEach((element) => {
        if (element.Rules === 'maior que') {
          apiResult = apiResult
            .filter((data) => (data[element.NameSelect]) > +element.inputNumber);
        } if (element.Rules === 'menor que') {
          apiResult = apiResult
            .filter((data) => (data[element.NameSelect] < +element.inputNumber));
        } if (element.Rules === 'igual a') {
          apiResult = apiResult
            .filter((data) => (data[element.NameSelect] === +element.inputNumber));
        }
      });
      setapiData(apiResult);
      console.log(apiResult);
    }
    setStateRemove(false);
  }, [SaveFilter, apiDataInitial, stateRemove]);

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
    initialStateRules,
    initialStateName,
    handleRemoveFilter,
    removeAllFilters,
    stateRemove,
    setStateRemove,
    setapiData,
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
    initialStateRules,
    initialStateName,
    handleRemoveFilter,
    removeAllFilters,
    stateRemove,
    setStateRemove,
    setapiData,
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
