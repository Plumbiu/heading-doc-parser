import { bench } from 'vitest'
import parse from '../src'


bench('basic', () => {
  const code = `
/**
 * foo hello world
 * @description
 *  Button demo1 description
 *  hello
 * @order - 1
 */

import React from 'react'
import { Button } from 'my-lib'

const Demo1 = () => {
  return <Button>demo1</Button>
}

export default Demo1
  `
  parse(code)
})