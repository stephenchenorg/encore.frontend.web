import GraphemeSplitter from 'grapheme-splitter'

export function extractPostTitleFromContent(originalContent: string) {
  const allBreakCharacters = ['。', '，', '？', '！']
  const dontBreakCharacters = ['。」']
  const mustRemoveCharacters = ['。', '，']

  let title = ''
  let content = ''

  const sections = originalContent.replaceAll('\r', '').split('\n\n')
  const firstSection = sections[0]

  if (allBreakCharacters.some(symbol => firstSection.includes(symbol)) &&
      !dontBreakCharacters.some(symbol => firstSection.includes(symbol))
  ) {
    // 如果有標點符號，就把標點符號前面的當作標題
    title = firstSection.match(new RegExp(`.+?[${allBreakCharacters.join('')}]`))?.[0] ?? ''
    content = originalContent
      .replaceAll('\r', '')
      .replace('\n', ' ')
      .replace(title, '')
      .replace(/\n+$/, '')

    // 如果標題最後一個字是句點或逗點，就把它拿掉
    if (mustRemoveCharacters.some(symbol => title.endsWith(symbol))) {
      title = title.slice(0, -1)
    }
  } else {
    // 如果沒有標點符號，就把第一段當作標題
    title = firstSection
    if (sections.length > 1) {
      content = originalContent
        .replaceAll('\r', '')
        .replace(`${firstSection}\n\n`, '')
        .replace(/\n+$/, '')
    }
  }

  return { title, content }
}

export function contentExcerpt(content: string) {
  const descriptionBreakLength = 35

  const splitter = new GraphemeSplitter()

  // Emoji 的文字長度會被計算成 2，所以要用 grapheme-splitter 套件來計算正確的長度
  if (splitter.countGraphemes(content) > descriptionBreakLength) {
    return `${
      splitter.splitGraphemes(content)
        .slice(0, descriptionBreakLength)
        .join('')
    }...`
  }

  return content
}
