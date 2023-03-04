import { beforeEach, describe, expect, test } from 'vitest'
import { screen, render } from '@testing-library/react'

import App from '../App'

describe('Accordion test', () => {
  beforeEach(() => {
    render(<App />)
  })

  test('Should show title', () => {
    expect(screen.getByText(/Hello to AccessIT 2.0!/i)).toBeDefined()
  })
})
