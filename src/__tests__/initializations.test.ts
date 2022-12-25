import pug from 'pug'
import { screen } from '@testing-library/dom'

import { INITIAL_FOCUS_ATTR, PARENT_SECTION_ATTR } from '../constants'
import { focusInitialElement, initManagedDirectionalSection } from '../lib/initializations'
import { ManagedDirectionalSection } from '../lib/sections'

beforeAll(() => {
  // prettier-ignore
  const html = pug.render(`
div(tabindex='0', data-section-id='horizontal-test', data-section-direction='horizontal', data-focused-children-index='0')
  button(${PARENT_SECTION_ATTR}='horizontal-test' ${INITIAL_FOCUS_ATTR}='true') Card H1
  button(${PARENT_SECTION_ATTR}='horizontal-test') Card H2
div(tabindex='0', data-section-id='vertical-test', data-section-direction='vertical', data-focused-children-index='0')
  button(${PARENT_SECTION_ATTR}='vertical-test') Card V1
  button(${PARENT_SECTION_ATTR}='vertical-test') Card V2
`)

  document.body.innerHTML = html
})

describe('Initializations functions', () => {
  it('should focus the initial element', () => {
    focusInitialElement()

    expect(document.activeElement).toBe(screen.getByText('Card H1'))
  })

  it('should initialize the navigation sections', () => {
    initManagedDirectionalSection()

    const sections = window['__dn_sections__'] as ManagedDirectionalSection | undefined

    expect(sections).not.toBeUndefined()

    const sectionNames = Object.keys(sections as {})

    expect(sectionNames.length).toBe(2)
  })
})
