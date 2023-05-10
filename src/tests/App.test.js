import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from '../helpers/mockData';
import MyProvider from '../contexts/MyProvider';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('testa se os elementos estão tela', () => {
beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => (mockData),
  })
})
it('testa se a tela inicial é renderizada corretamente', async () => {
render(
  <MyProvider>
  <App />

</MyProvider>,
)
expect(global.fetch).toBeCalled()
expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets')
expect(screen.getByTestId('column-filter')).toBeInTheDocument()
expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
expect(screen.getByTestId('value-filter')).toBeInTheDocument()
expect(screen.getByTestId('button-filter')).toBeInTheDocument()
expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument()
expect(screen.getByTestId('column-sort')).toBeInTheDocument()
expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument()
expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument()
expect(screen.getByTestId('column-sort-button')).toBeInTheDocument()
expect(await screen.findByRole('cell', {
  name: /tatooine/i
})).toBeInTheDocument()
expect(await screen.findByRole('cell', {
  name: /Alderaan/i
})).toBeInTheDocument()
})

it('testes para o componente input text', async () => {
  render(
    <MyProvider>
    <App />
  
  </MyProvider>,
  )
  const inputName = screen.getByTestId('name-filter')
  userEvent.type(inputName, 'Endor')
  expect(await screen.findByRole('cell', {
    name: /Endor/i
  })).toBeInTheDocument()
  userEvent.clear(inputName)
  expect(await screen.findByRole('cell', {
    name: /alderaan/i
  })).toBeInTheDocument()
})
it('testes para o componente filterNumber', async () => {
  render(
    <MyProvider>
    <App />
  
  </MyProvider>,
  )
  const getColumn = screen.getByTestId('column-filter')
  const getComparison = screen.getByTestId('comparison-filter')
  const getValuFilter = screen.getByTestId('value-filter')
  const getButtonFilter = screen.getByTestId('button-filter')
  const getButtonRemoveFilter = screen.getByRole('button', {
    name: 'REMOVER FILTROS'
  })

  expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
  
  
  userEvent.clear(getValuFilter)

  userEvent.selectOptions(getColumn, 'diameter')
  userEvent.selectOptions(getComparison, 'igual a')
  userEvent.type(getValuFilter, '4900')

  userEvent.click(getButtonFilter)
  expect(screen.getAllByTestId('planet-name')).toHaveLength(1)

  const getRemoveFilter = screen.getByRole('button', {
    name: 'Remover Filtro'
  })
  userEvent.click(getRemoveFilter)

  expect(getButtonFilter).toBeInTheDocument()

  act(() => {

    userEvent.click(getButtonRemoveFilter)
  })
  expect(screen.getAllByTestId('planet-name')).toHaveLength(10)

})
it('testes para o componente filter number verificar o filtro de ascendente e descendente', async () => {
  render(
    <MyProvider>
    <App />
  
  </MyProvider>,
  )
  const getColumn = screen.getByTestId('column-filter')
  const getComparison = screen.getByTestId('comparison-filter')
  const getValuFilter = screen.getByTestId('value-filter')
  const getButtonFilter = screen.getByTestId('button-filter')
  const getButtonRemoveFilter = screen.getByRole('button', {
    name: 'REMOVER FILTROS'
  })
  const getColumnSort =  screen.getByTestId('column-sort')
const getSortInputAsc = screen.getByTestId('column-sort-input-asc')
const getSortInputDes = screen.getByTestId('column-sort-input-desc')
const getButtonSort = screen.getByTestId('column-sort-button')

userEvent.selectOptions(getColumnSort, 'population')
userEvent.click(getSortInputAsc)
userEvent.click(getButtonSort)

expect(await screen.findByRole('cell', {
  name: /Yavin IV/i
})).toBeInTheDocument()

userEvent.selectOptions(getColumnSort, 'population')
userEvent.click(getSortInputDes)
userEvent.click(getButtonSort)

expect(await screen.findByRole('cell', {
  name: /Coruscant/i
})).toBeInTheDocument()

userEvent.click(getButtonRemoveFilter)

expect(screen.getAllByTestId('planet-name')).toHaveLength(10)

userEvent.clear(getValuFilter)

userEvent.selectOptions(getColumn, 'surface_water')
  userEvent.selectOptions(getComparison, 'menor que')
  userEvent.type(getValuFilter, '40')

  userEvent.click(getButtonFilter)
  userEvent.selectOptions(getColumnSort, 'population')
userEvent.click(getSortInputAsc)

userEvent.click(getButtonSort)

expect(await screen.findByRole('cell', {
  name: /Bespin/i
})).toBeInTheDocument()

userEvent.click(getButtonRemoveFilter)

expect(screen.getAllByTestId('planet-name')).toHaveLength(10)

userEvent.clear(getValuFilter)

userEvent.selectOptions(getColumn, 'rotation_period')
  userEvent.selectOptions(getComparison, 'maior que')
  userEvent.type(getValuFilter, '24')

  userEvent.click(getButtonFilter)
  userEvent.selectOptions(getColumnSort, 'population')
userEvent.click(getSortInputDes)

userEvent.click(getButtonSort)

expect(await screen.findByRole('cell', {
  name: /Kamino/i
})).toBeInTheDocument()
userEvent.click(getButtonRemoveFilter)

userEvent.clear(getValuFilter)

userEvent.selectOptions(getColumn, 'orbital_period')
  userEvent.selectOptions(getComparison, 'maior que')
  userEvent.type(getValuFilter, '341')

  userEvent.click(getButtonFilter)
  userEvent.selectOptions(getColumnSort, 'population')
userEvent.click(getSortInputDes)

userEvent.click(getButtonSort)

expect(await screen.findByRole('cell', {
  name: /Coruscant/i
})).toBeInTheDocument()
expect(screen.getAllByTestId('planet-name')).toHaveLength(7)

  })
  it('testes para o componente filter number testes para o botão de remover filtro unico', async () => {
    render(
      <MyProvider>
      <App />
    
    </MyProvider>,
    )
   
    const getColumn = screen.getByTestId('column-filter')
    const getComparison = screen.getByTestId('comparison-filter')
    const getValuFilter = screen.getByTestId('value-filter')
    const getButtonFilter = screen.getByTestId('button-filter')
    const getButtonRemoveFilter = screen.getByRole('button', {
      name: 'REMOVER FILTROS'
    })
    userEvent.click(getButtonRemoveFilter)
    userEvent.clear(getValuFilter)

    userEvent.selectOptions(getColumn, 'orbital_period')
    userEvent.selectOptions(getComparison, 'maior que')
    userEvent.type(getValuFilter, '364')
    userEvent.click(getButtonFilter)
  
    const getRemoveSilgleFilter = screen.getByRole('button', {
      name: 'Remover Filtro'
    })
    act(() => {
      
    userEvent.click(getRemoveSilgleFilter)
  })

  expect(getButtonRemoveFilter).toBeInTheDocument()

  })
})
