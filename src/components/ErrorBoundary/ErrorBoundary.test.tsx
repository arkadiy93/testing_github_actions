import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'
import React from 'react'

const renderProviders = (ui: React.ReactElement) => render(ui, {})

const Child = () => {
  throw new Error()
}

describe('Error Boundary', () => {
  it(`should render error boundary component when there is an error`, () => {
    const { getByText } = renderProviders(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    )
    const errorMessage = getByText('An error occurred!😕')
    expect(errorMessage).toBeDefined()
  })
})
