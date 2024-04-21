import { expect, test } from 'vitest'
import parse from '../src'

test('simple', () => {
  let code = `
/**
 * foo 
 */
  `
  expect(parse(code)).toEqual({
    description: 'foo',
    data: {},
  })

  code = `
/**
 *foo 
 */
  `
  expect(parse(code)).toEqual({
    description: 'foo',
    data: {},
  })
})

test('have @{params}', () => {
  let code = `
  /**
   * foo 
   * @title - 1
   * @desc
   *  hello world
   */
  `
  expect(parse(code)).toEqual({
    description: 'foo',
    data: {
      title: '1',
      desc: 'hello world',
    },
  })

  code = `
  /**
   * foo 
   * @title - 1
   * @desc
   *  hello world
   *  test
   */
  `
  expect(parse(code)).toEqual({
    description: 'foo',
    data: {
      title: '1',
      desc: 'hello world\ntest',
    },
  })

  code = `
  /** 
 * foo 
   * @title - 1
* @desc
   *hello world
*test
   */
  `
  expect(parse(code)).toEqual({
    description: 'foo',
    data: {
      title: '1',
      desc: 'hello world\ntest',
    },
  })
})

test('minin *, @ and \n', () => {
  let code = `
  /**
   * foo @
   * @title - 1*
   * @desc\n
   *  hello world\n
   */
  `
  expect(parse(code)).toEqual({
    description: 'foo @',
    data: {
      title: '1*',
      desc: 'hello world',
    },
  })

  code = `
  /**
   * foo \n
   * @title - 1
   * @@desc
   *  \nhello world
   *  test
   */
  `
  expect(parse(code)).toEqual({
    description: 'foo',
    data: {
      title: '1',
      '@desc': 'hello world\ntest',
    },
  })

  code = `
  /** 
 * foo 
   * @title - 1
* @desc
   *hello world
*test
   */
  `
  expect(parse(code)).toEqual({
    description: 'foo',
    data: {
      title: '1',
      desc: 'hello world\ntest',
    },
  })
})
