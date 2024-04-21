# heading-doc-parser

A simple parser for doc generation.

# Install

```bash
npm install heading-doc-parser
```

# Usage

## simple usage

```js
import parseDoc from 'heading-doc-parser'

const code = `
/**
 * description 
 * @title - 1
 * @desc
 *  hello
 *  world
 */
export function Demo() {
  return <button>demo</button>
}
`
console.log(parseDoc(code))
/*
  {
    description: "description",
    data: {
      title: '1',
      desc: 'hello\nworld',
    }
  }  
*/
```

## Type Support

```ts
import parseDoc from 'heading-doc-parser'

const code = `
/**
 * description 
 * @title - 1
 * @desc
 *  hello
 *  world
 */
export function Demo() {
  return <button>demo</button>
}
`

type Key = 'title' | 'desc'
console.log(parseDoc<Key>(code))
/*
  {
    description: "description",
    data: {
      title: '1',
      desc: 'hello\nworld',
    }
  }  
*/
```
