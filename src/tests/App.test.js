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
  const inputName = screen.getByTestId('name-filter')
  const getColumn = screen.getByTestId('column-filter')
  const getComparison = screen.getByTestId('comparison-filter')
  const getValuFilter = screen.getByTestId('value-filter')
  const getButtonFilter = screen.getByTestId('button-filter')
  const getButtonRemoveFilter = screen.getByRole('button', {
    name: 'FILTRAR'
  })

  expect(await screen.findAllByTestId('planet-name')).toHaveLength(10)
  
  userEvent.click(getButtonFilter)

userEvent.clear(inputName)
  userEvent.selectOptions(getColumn, 'diameter')
  userEvent.selectOptions(getComparison, 'igual a')
  userEvent.type(getValuFilter, '4900')

  act(() => {

    userEvent.click(getButtonFilter)
  })
  
expect(screen.getAllByTestId('planet-name')).toHaveLength(1)
})

})
