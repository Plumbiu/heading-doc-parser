const NEXT_LINE_REPLACE_REGX = /\n\s*\*\s*/g
const START_COMMENT_STR = '/**'
const SPLIT_START_KEY = /\*\s*\@/


type Data<T extends string> = Record<T, string>
interface Result<T extends string> {
  description: string
  data: Data<T>
}

export default function parse<T extends string>(code: string): Result<T> {
  code = code.trim()

  if (!code.startsWith(START_COMMENT_STR)) {
    throw new Error('code must starts with /**')
  }
  const tokens = code
    .slice(START_COMMENT_STR.length, code.indexOf('*/'))
    .split(SPLIT_START_KEY)
  const description = tokens[0].slice(tokens[0].indexOf('*') + 1).trim()
  const data: Record<string, string> = {}

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (!token.trim()) {
      continue
    }
    const split_index = token.indexOf(' - ')
    if (split_index !== -1) {
      const name = token.slice(0, split_index)
      if (name) {
        const value = token.slice(split_index + 2)
        data[name] = value.trim()
      }
    } else {
      const endLineIndex = token.indexOf('\n')
      if (endLineIndex === -1) {
        data[token] = ''
      } else {
        data[token.slice(0, endLineIndex)] = token
          .slice(endLineIndex)
          .replace(NEXT_LINE_REPLACE_REGX, '\n')
          .trim()
      }
    }
  }
  return {
    description,
    data,
  } as Result<T>
}
