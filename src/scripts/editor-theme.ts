import type { Extension } from '@codemirror/state'

import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'

const sunburstTango = '#FF7E2B'
const skydiveBloom = '#3782F2'
const tropicMint = '#27C7B9'
const limeZest = '#A3D65A'
const solarHoney = '#FFDD40'
const midnightAsh = '#333333'
const cloudDrift = '#AAAAAA'
const crystalBay = '#56B6C2'
const pureSnow = '#FFFFFF'
const ghostBlush = '#FF000055'
const selection = '#131313'
const activeLine = '#191919'

const customTheme = EditorView.theme({
  '&': {
    color: pureSnow,
    backgroundColor: 'transparent',
    fontSize: '15px'
  },
  '.cm-content': {
    fontFamily: '"Monaspace Krypton", monospace'
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    color: midnightAsh,
    border: 'none',
    fontFamily: '"Monaspace Krypton", monospace'
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: selection
  },
  '.cm-activeLineGutter, .cm-activeLine': {
    backgroundColor: activeLine
  }
}, { dark: true })

const customHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: crystalBay },
  { tag: [t.bool], color: solarHoney },
  { tag: t.string, color: limeZest },
  { tag: t.comment, color: midnightAsh, fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.labelName], color: tropicMint },
  { tag: [t.literal, t.atom], color: limeZest },
  { tag: t.typeName, color: sunburstTango },
  { tag: t.className, color: solarHoney },
  { tag: t.tagName, color: sunburstTango },
  { tag: t.number, color: tropicMint },
  { tag: t.attributeName, color: limeZest },
  { tag: t.propertyName, color: skydiveBloom },
  { tag: [t.operator, t.operatorKeyword], color: skydiveBloom },
  { tag: t.punctuation, color: cloudDrift },
  { tag: [t.regexp, t.special(t.string)], color: crystalBay },
  { tag: t.meta, color: cloudDrift },
  { tag: t.invalid, color: pureSnow, backgroundColor: ghostBlush }
])

const theme: Extension = [
  customTheme,
  syntaxHighlighting(customHighlightStyle)
]

export default theme
