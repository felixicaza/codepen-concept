function previewContent(html: string, css: string, js: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background: #141414;
          transition: background 150ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: background;
          border-radius: 16px;
        }

        body::-webkit-scrollbar-corner {
          background: transparent;
        }

        body::-webkit-scrollbar-thumb {
          background: #33a9dc;
          border-radius: 16px;
        }

        @media (any-hover: hover) {
          body::-webkit-scrollbar-thumb:hover {
            background: color-mix(in srgb, #33a9dc, #141414 45%);
          }
        }

        @supports not selector(::-webkit-scrollbar) {
          body {
            scrollbar-color: #33a9dc #141414;
            scrollbar-width: thin;
            scrollbar-gutter: stable;
          }
        }
        ${css}
      </style>
    </head>
    <body>
      ${html}
      <script type="module">${js}<\\/script>
    </body>
    </html>
  `
}

export default previewContent
