import {
  listenFocusEvent,
  removeFocusEvent,
  listenKeyboardEvents,
  removeKeyboardEvents,
} from '../lib/event-listeners'

let listenersList: Array<string> = []

beforeAll(() => {
  const originalAddEventListener = window.addEventListener
  const origialRemoveEventListener = window.removeEventListener

  window.addEventListener = function (...args: [any, any]) {
    const [eventName] = args

    listenersList.push(eventName)

    // @ts-ignore
    originalAddEventListener(...args)
  }

  window.removeEventListener = function (...args: [any, any]) {
    const [eventName] = args

    listenersList = listenersList.filter(name => eventName !== name)

    // @ts-ignore
    origialRemoveEventListener(...args)
  }
})

describe('event listeners', () => {
  it('should attach the focusin event', () => {
    listenFocusEvent()

    expect(listenersList.includes('focusin')).toBeTruthy()
  })

  it('should remove the focusin event', () => {
    removeFocusEvent()

    expect(listenersList.includes('focusin')).toBeFalsy()
  })

  it('should attach the keydown event', () => {
    listenKeyboardEvents()

    expect(listenersList.includes('keydown')).toBeTruthy()
  })

  it('should remove the keydown event', () => {
    removeKeyboardEvents()

    expect(listenersList.includes('keydown')).toBeFalsy()
  })
})
