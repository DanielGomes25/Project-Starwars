import { useEffect, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
// import { selectName, Conditions } from '../data';

function MyProvider({ children }) {
  const [apiData, setapiData] = useState([]);
  const [inputName, setinputName] = useState('');
  const [NameSelect, setNameSelect] = useState('population');
  const [Rules, setRules] = useState('maior que');
  const [inputNumber, setinputNumber] = useState(0);
  // const [SaveFilter, setSaveFilter] = useState([]);

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

  const handleSelectedNames = useCallback(({ target }) => {
    setNameSelect((previousState) => [...previousState, target.value]);
  }, []);

  const filterApi = useCallback(() => {
    if (Rules === 'maior que') {
      const filterMaior = apiData
        .filter((data) => Number(data[NameSelect] > Number(inputNumber)));
      setapiData(filterMaior);
    } else if (Rules === 'menor que') {
      const filterMenor = apiData
        .filter((data) => Number(data[NameSelect] <= inputNumber));
      setapiData(filterMenor);
    } else if (Rules === 'igual a') {
      const filterIgual = apiData
        .filter((data) => Number(data[NameSelect] === inputNumber));
      setapiData(filterIgual);
    }
  }, [Rules, apiData, inputNumber, NameSelect]);

  const values = useMemo(() => ({
    apiData,
    inputName,
    setinputName,
    NameSelect,
    handleSelectedNames,
    Rules,
    setRules,
    setinputNumber,
    inputNumber,
    filterApi,
    setNameSelect,
  }), [
    apiData,
    inputName,
    setinputName,
    NameSelect,
    handleSelectedNames,
    Rules,
    setRules,
    setinputNumber,
    inputNumber,
    filterApi,
    setNameSelect,
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
