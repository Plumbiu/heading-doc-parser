type Data<T extends string> = Record<T, string>

interface Result<T extends string> {
  description: string
  data: Data<T>
}

export default function parse<T extends string>(code: string): Result<T> {
  code = code.trim()
  const START_COMMENT_STR = '/**'

  if (!code.startsWith(START_COMMENT_STR)) {
    throw new Error('code must starts with /**')
  }
  const SPLIT_START_KEY = /\*\s*\@/
  const tokens = code
    .slice(START_COMMENT_STR.length, code.indexOf('*/'))
    .split(SPLIT_START_KEY)
  const description = tokens[0].slice(tokens[0].indexOf('*') + 1).trim()
  const NEXT_LINE_REPLACE_REGX = /\n\s*\*\s*/g
  const TOKEN_SPLIT_REGX = /\s+-\s+/

  const data: Record<string, string> = {}

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i]
    if (!token.trim()) {
      continue
    }
    if (token.includes(' - ')) {
      const [name, value] = token.split(TOKEN_SPLIT_REGX)
      if (name) {
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
