import { screen } from '@testing-library/dom'
import { DID_FOCUS_EVENT, LIB_DESTROYED_EVENT, LIB_INITIALIZED_EVENT } from '../constants'
import { dispatchDestroyEvent, dispatchFocusEvent, dispatchInitEvent } from '../lib/events'

describe('events dispatch functions', () => {
  it('should dispatch the init event on call', () => {
    const mockCallback = jest.fn()

    window.addEventListener(LIB_INITIALIZED_EVENT, mockCallback)

    dispatchInitEvent()

    expect(mockCallback).toHaveBeenCalled()
  })

  it('should dispatch the destroy event on call', () => {
    const mockCallback = jest.fn()

    window.addEventListener(LIB_DESTROYED_EVENT, mockCallback)

    dispatchDestroyEvent()

    expect(mockCallback).toHaveBeenCalled()
  })

  it('should dispatch the focus event on call', () => {
    document.body.innerHTML = `<a href="#">link</a>`

    const mockCallback = jest.fn()

    window.addEventListener(DID_FOCUS_EVENT, mockCallback)

    dispatchFocusEvent(screen.getByText('link'))

    expect(mockCallback).toHaveBeenCalled()
  })
})
