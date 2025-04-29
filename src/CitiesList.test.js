import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CitiesList from './CitiesList'

beforeEach(() => {
  global.fetch = jest.fn()
  fetch.mockClear()
})

test('renders city names', async () => {
  fetch.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        results: [{ latitude: 51.1, longitude: 71.4 }]
      })
    })
  )

  render(<CitiesList />)

  expect(await screen.findByText(/Almaty/)).toBeInTheDocument()
})

test('renders weather info', async () => {

  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        results: [{ latitude: 51.1, longitude: 71.4 }]
      })
    })
  )

  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        current_weather: {
          temperature: 22,
          windspeed: 5
        }
      })
    })
  )

  render(<CitiesList />)

  await waitFor(() => {
    expect(screen.getByText(/22/)).toBeInTheDocument()
    expect(screen.getByText(/5/)).toBeInTheDocument()
  })
})
