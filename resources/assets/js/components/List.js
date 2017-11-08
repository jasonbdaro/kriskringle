import React from 'react'
import {
  // Editor,
  EditorState, 
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  Entity 
} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createLinkifyPlugin from 'draft-js-linkify-plugin'

const linkifyPlugin = createLinkifyPlugin()

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(props.content)))
    }
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={editorState => this.setState({editorState})} 
        plugins={[linkifyPlugin]}
        ref="editor"
        readOnly={true}
      />
    )
  }
}


export default List