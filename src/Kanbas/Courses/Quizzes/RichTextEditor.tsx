import React, { useEffect, useState } from "react";
// @ts-ignore
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz, updateDraftQuiz } from "./reducer";
import { useParams } from "react-router";

export default function RichTextEditor({ question, onSave }: any) {
  // Helper function to create editor state from HTML
  const createEditorStateFromHTML = (html: any) => {
    const blocksFromHTML = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  // Initialize editor state with question content
  const [editorState, setEditorState] = useState(() => {
    return question
      ? createEditorStateFromHTML(question.question || "")
      : EditorState.createEmpty();
  });

  const [title, setTitle] = useState(question?.questionTitle || "");
  const [type, setType] = useState(question?.questionType || "Multiple Choice");
  const [points, setPoints] = useState(question?.points || 0);

  const handleEditorChange = (state: any) => {
    setEditorState(state);
  };
  const handleTitleChange = (e: any) => setTitle(e.target.value);
  const handleTypeChange = (e: any) => setType(e.target.value);
  const handlePointsChange = (e: any) => setPoints(Number(e.target.value));

  useEffect(() => {
    if (onSave) {
      const textContent = editorState.getCurrentContent().getPlainText();
      onSave({
        questionTitle: title,
        questionType: type,
        points: points,
        question: textContent,
      });
    }
  }, [onSave, editorState, title, type, points]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          maxWidth: "600px",
          border: "1px solid #ccc",
          marginTop: "5px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
            placeholder="Enter title"
          />
        </div>
        <div style={{ marginRight: "20px" }}>
          <label>Question Type: </label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="form-select"
          >
            <option>Multiple Choice</option>
            <option>True/False</option>
            <option>Fill in Multiple Blanks</option>
          </select>
        </div>
        <div style={{ marginRight: "20px" }}>
          <label>Points: </label>
          <input
            type="number"
            value={points}
            onChange={handlePointsChange}
            className="form-control"
          />
        </div>
      </div>
      <br />

      <div className="form-group">
        <label>Enter your question:</label>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={handleEditorChange}
          wrapperStyle={{ padding: "5px" }}
          editorStyle={{
            minHeight: "200px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
          toolbarStyle={{ backgroundColor: "white", border: "1px solid #ccc" }}
        />
      </div>
      <br />
    </div>
  );
}
