import React from 'react';
import './App.css';
import Table from './components/Table';
import InputText from './components/InputText';
import FilterNumber from './components/FilterNumber';

function App() {
  return (
    <>
      <InputText />
      <FilterNumber />
      <Table />
    </>
  );
}

export default App;
