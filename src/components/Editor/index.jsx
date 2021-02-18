import { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "./index.scss";
import "draft-js/dist/Draft.css";

const defaultInlineStyle = [
  {
    label: "B",
    options: { style: { fontWeight: "bold" } },
    style: "BOLD"
  },
  {
    label: "I",
    options: { style: { fontStyle: "italic", fontWeight: "bold" } },
    style: "ITALIC"
  },
  {
    label: "U",
    options: { style: { textDecoration: "underline", fontWeight: "bold" } },
    style: "UNDERLINE"
  },
  {
    label: "T",
    options: { style: { textDecoration: "line-through", fontWeight: "bold" } },
    style: "LINETHROUGH"
  },
  {
    label: "O",
    options: { style: { textDecoration: "overline", fontWeight: "bold" } },
    style: "OVERLINE"
  }
];
const customStyle = {
  LINETHROUGH: { textDecoration: "line-through" },
  OVERLINE: { textDecoration: "overline" }
};

const DraftEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onChange = (value) => {
    setEditorState(value);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  // toolbar
  const onToggle = (e, style) => {
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <section className="draft-editor">
      <div className="top-button-group">
        {defaultInlineStyle.map((type, typeIndex) => (
          <span
            className={
              editorState.getCurrentInlineStyle().has(type.style)
                ? "active"
                : ""
            }
            key={typeIndex}
            onMouseDown={(e) => onToggle(e, type.style)}
            {...type.options}
          >
            {type.label}
          </span>
        ))}
      </div>
      <hr />
      <Editor
        placeholder="我在这里呀"
        editorState={editorState}
        onChange={onChange}
        customStyleMap={customStyle}
        // handleKeyCommand={handleKeyCommand}
      />
    </section>
  );
};

export default DraftEditor;
