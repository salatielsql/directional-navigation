import pug from 'pug'
import { screen } from '@testing-library/dom'
import { DIRECTION_NAVIGATE_ATTR, PARENT_SECTION_ATTR } from '../constants'

import { all, focusElement, getFocusedElement, getNextElementFromDirection, qs } from '../lib/dom'
import { Directions } from '../lib/types'

beforeAll(() => {
  // prettier-ignore
  const html = pug.render(
`
button#clickme.btns(data-testid='clickme', ${DIRECTION_NAVIGATE_ATTR.replace('{direction}', 'down')}='#clickme2') Click me
button#clickme2.btns(data-testid='clickme2', ${DIRECTION_NAVIGATE_ATTR.replace('{direction}', 'up')}='#clickme', ${PARENT_SECTION_ATTR}='test') Click me 2
`)

  document.body.innerHTML = html
})

describe('dom functions', () => {
  it('should return a html element when queries a valid selector', () => {
    expect(screen.queryByTestId('clickme')).toBeInTheDocument()

    const btn = qs('button#clickme')

    expect(btn).toBeTruthy()
    expect(btn?.tagName).toBe('BUTTON')
  })

  it('should return null when queries invalid selector', () => {
    expect(screen.queryByTestId('clickme')).toBeInTheDocument()

    const btn = qs('button#not')

    expect(btn).toBeNull()
  })

  it('should return a NodeList when querying all', () => {
    const buttonsList = all('button.btns')
    const emptyList = all('button.buttons')

    expect(buttonsList.length).toBe(2)
    expect(emptyList.length).toBe(0)
  })

  it('should focus the passing element and get the same element as focused', () => {
    const btn = screen.getByTestId('clickme')

    expect(getFocusedElement()).toBe(document.body)

    focusElement(btn)

    expect(getFocusedElement()).toBe(btn)
  })

  it('should return parent section id when the element is a section child', () => {
    expect(screen.queryByTestId('clickme2')?.getAttribute(PARENT_SECTION_ATTR)).toBe('test')
  })

  it('should return null when the element is not a section child', () => {
    expect(screen.queryByTestId('clickme')?.getAttribute(PARENT_SECTION_ATTR)).toBe(null)
  })

  it('should return the next element correctly based on the direction', () => {
    const btn = screen.getByTestId('clickme')
    const btn2 = screen.getByTestId('clickme2')

    const btnNextElement = getNextElementFromDirection(btn, Directions.DOWN)
    const btn2NextElement = getNextElementFromDirection(btn2, Directions.UP)

    expect(btnNextElement).toBe(btn2)
    expect(btn2NextElement).toBe(btn)
  })
})
