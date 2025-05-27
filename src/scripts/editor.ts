import { basicSetup } from 'codemirror'
import { StateEffect } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { html as langHTML } from '@codemirror/lang-html'
import { css as langCSS } from '@codemirror/lang-css'
import { javascript as langJS } from '@codemirror/lang-javascript'

import theme from '@scripts/editor-theme'
import previewContent from '@scripts/preview-content'

import html from '@data/html'
import css from '@data/css'
import javascript from '@data/javascript'

const editorButtons = document.querySelector('.editor-tools')
const buttons = document.querySelectorAll('.editor-tools button')
const editorElement = document.querySelector('.editor')
const preview = document.querySelector('#preview') as HTMLIFrameElement
const toast = document.querySelector('.toast')

const htmlCode = html
const cssCode = css
const jsCode = javascript

let currentTab = 'html'
let editor: EditorView | null = null

const extensions = {
  html: langHTML(),
  css: langCSS(),
  js: langJS()
}

const docs = {
  html: htmlCode,
  css: cssCode,
  js: jsCode
}

const editorState = { ...docs }

function getExtension(tab: string) {
  return extensions[tab as keyof typeof extensions]
}

function getDoc(tab: string) {
  return editorState[tab as keyof typeof editorState]
}

function setDoc(tab: string, value: string) {
  editorState[tab as keyof typeof editorState] = value
}

function debounce<T extends any[]>(fn: (...args: T) => void, delay: number | undefined) {
  let timer: ReturnType<typeof setTimeout> | undefined

  function showToast() {
    toast?.classList.add('show')
    setTimeout(() => {
      toast?.classList.remove('show')
    }, 1300)
  }

  return function (...args: T) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      setTimeout(showToast, 1000)
    }, delay)
  }
}

function renderPreview() {
  if (!preview) return

  const doc = previewContent(editorState.html, editorState.css, editorState.js)
  preview.srcdoc = doc
  preview.onload = () => {
    if (preview?.contentWindow) {
      (preview.contentWindow as any).eval(editorState.js)
    }
  }
}

const debouncedRender = debounce(renderPreview, 350)

if (editorElement) {
  editor = new EditorView({
    doc: html,
    parent: editorElement,
    extensions: [
      EditorView.lineWrapping,
      basicSetup,
      langHTML(),
      theme,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          setDoc(currentTab, update.state.doc.toString())
          debouncedRender()
        }
      })
    ]
  })

  renderPreview()

  editorButtons?.addEventListener('click', (event) => {
    const { target } = event

    const btn = (target as Element).closest('button[data-tab]')
    const tab = btn?.getAttribute('data-tab')

    if (!tab || tab === currentTab) return

    setDoc(currentTab, editor?.state?.doc?.toString() ?? '')
    currentTab = tab

    editor?.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: getDoc(tab) }
    })

    editor?.dispatch({
      effects: StateEffect.reconfigure.of([
        EditorView.lineWrapping,
        basicSetup,
        getExtension(tab) ?? langHTML(),
        theme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setDoc(currentTab, update.state.doc.toString())
            debouncedRender()
          }
        })
      ])
    })

    buttons.forEach((button) => {
      if (button.getAttribute('data-tab') === tab) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    })
  })
}
