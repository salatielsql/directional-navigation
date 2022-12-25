import { getGridFocusPositions, isGridAttrValid } from '../lib/grid'

describe('grid functions', () => {
  it('should result in a valid grid attr', () => {
    expect(isGridAttrValid('9')).toBeTruthy()
  })

  it('should get false passing null as grid attr', () => {
    expect(isGridAttrValid(null)).toBeFalsy()
  })

  it('should get false passing -1 as grid attr', () => {
    expect(isGridAttrValid('-1')).toBeFalsy()
  })

  it('should get false passing 3.14 as grid attr', () => {
    expect(isGridAttrValid('3.14')).toBeFalsy()
  })

  it('should match snapshot passing index: 0, ', () => {
    const result = getGridFocusPositions({
      index: 0,
      columns: 5,
      rows: 5,
    })

    expect(result).toMatchSnapshot()
  })

  it('should match snapshot passing index: 3, ', () => {
    const result = getGridFocusPositions({
      index: 3,
      columns: 5,
      rows: 5,
    })

    expect(result).toMatchSnapshot()
  })

  it('should match snapshot passing index: 21, ', () => {
    const result = getGridFocusPositions({
      index: 21,
      columns: 5,
      rows: 5,
    })

    expect(result).toMatchSnapshot()
  })

  it('should match snapshot passing index: 24, ', () => {
    const result = getGridFocusPositions({
      index: 24,
      columns: 5,
      rows: 5,
    })

    expect(result).toMatchSnapshot()
  })

  it('should match snapshot passing index: 13, ', () => {
    const result = getGridFocusPositions({
      index: 13,
      columns: 5,
      rows: 5,
    })

    expect(result).toMatchSnapshot()
  })
})
