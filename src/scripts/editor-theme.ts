import { EditorView } from '@codemirror/view'

const editorTheme = EditorView.theme({
  '&': {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: '15px'
  },
  '.cm-content': {
    fontFamily: '\'Monaspace Krypton\', monospace'
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    color: '#333',
    border: 'none',
    fontFamily: '\'Monaspace Krypton\', monospace'
  },
  '.ͼi': {
    color: '#FF7E2B'
  },
  '.cm-line': {
    color: '#3782F2'
  },
  '.ͼd, .ͼb': {
    color: '#27C7B9'
  },
  '.ͼc': {
    color: '#A3D65A'
  },
  '.ͼj': {
    color: '#FFDD40'
  },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: '#131313'
  },
  '.cm-activeLineGutter, .cm-activeLine': {
    backgroundColor: '#191919'
  }
}, { dark: true })

export default editorTheme
