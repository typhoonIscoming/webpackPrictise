
export default () => {
    const editorElement = document.createElement('div')
    editorElement.contentEditable = true
    editorElement.className = 'editor'
    console.log('updated module更新了')
    return editorElement
}