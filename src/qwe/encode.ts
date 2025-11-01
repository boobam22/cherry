const k9 = 'abc|def|ghi|jkl|mno|pqrs|tuv|wxyz'
const k26 = 'qwertyuiopasdfghjklzxcvbnm'

const k9ToDict = k9.split('|').reduce<Record<string, number>>((res, letters, idx) => {
  for (const ch of letters) {
    res[ch] = idx + 2
  }
  return res
}, {})
const k26ToDict = k26.split('').reduce<Record<string, string>>((res, ch, idx) => {
  res[ch] = k26.at(idx - 25)
  return res
}, {})

function strToNum(str: string) {
  return str
    .split('')
    .map((ch) => k9ToDict[ch])
    .join('')
}

export default function encode(text: string) {
  const encoded = text
    .split('')
    .reverse()
    .map((ch) => k26ToDict[ch])
    .join('')

  const num = strToNum(text)
  const output1 = `${text}${num.repeat(4)}`.slice(0, 14)

  const num2 = strToNum(encoded)
  const output2 = `${encoded.repeat(2).slice(0, 6)}+${num2.repeat(2).slice(0, 6)}`

  return { output1, output2 }
}
