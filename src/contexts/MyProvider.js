import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import context from './MyContext';

function MyProvider({ children }) {
  const [apiData, setapiData] = useState([]);
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

  const values = useMemo(() => ({
    apiData,
  }), [apiData]);

  return (
    <context.Provider value={ values }>
      {children}
    </context.Provider>
  );
}
MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
