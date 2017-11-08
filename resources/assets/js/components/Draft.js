import React from 'react'
import {
  // Editor,
  EditorState, 
  convertToRaw,
  convertFromRaw
} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'

const linkifyPlugin = createLinkifyPlugin()

class Draft extends React.Component {
  constructor(props) {
    super(props)

    const content = props.content
    let editorState;
    if (content) {
      editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
      editorState = EditorState.createEmpty()
    }
    this.state = {editorState}
  }

  onChange(editorState) {
    const contentState = editorState.getCurrentContent()
    this.saveContent(contentState)
    this.setState({editorState})    
  }

  saveContent(content) {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)))
  }

  handleFocus() {
    this.refs.editor.focus()
  }

  render() {
    return (
      <div 
        style={{
          border: '1px solid #ddd', 
          borderRadius: '4px',
          padding: 12,
          cursor: 'text',
          minHeight: '80px'
        }}
        onClick={this.handleFocus.bind(this)}
      >
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange.bind(this)}
          plugins={[linkifyPlugin]}
          ref="editor"
        />
      </div>
    )
  }
}

export default Draft