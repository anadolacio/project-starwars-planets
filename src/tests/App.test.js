import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockFetch from './mockFetch';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
    json: () => (mockFetch)
  }))
})
afterEach(() => jest.clearAllMocks());

test('All tests', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByTestId('name-filter')))
  expect(screen.getByText(/coluna/i))
  expect(screen.getByTestId("column-filter"))
  userEvent.selectOptions(screen.getByTestId("column-filter"), 'diameter')
  expect(screen.getByTestId('comparison-filter'))
  userEvent.click(screen.getByTestId('comparison-filter'))
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que')
  userEvent.click(screen.getByTestId('button-filter'))
  userEvent.click(screen.getByTestId('comparison-filter'))
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que')
  userEvent.click(screen.getByTestId('button-filter'))
  userEvent.click(screen.getByTestId('comparison-filter'))
  userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a')
  userEvent.click(screen.getByTestId('button-filter'))
  userEvent.click(screen.getByTestId('button-remove-filters'))
  expect(screen.getByTestId('button-remove-filters'))
});

test('test API', async () => {
  render(<App />);
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled(1)
    screen.findByTestId("name-filter")
  })});
