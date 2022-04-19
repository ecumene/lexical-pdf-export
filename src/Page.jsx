import { $getRoot } from "lexical";
import RichTextPlugin from "@lexical/react/LexicalRichTextPlugin";
import ContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import AutoFocusPlugin from "@lexical/react/LexicalAutoFocusPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import LinkPlugin from "@lexical/react/LexicalLinkPlugin";
import ListPlugin from "@lexical/react/LexicalListPlugin";
import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();

    console.log(root);
  });
}

export default function Editor() {
  return (
    <div className="editor-inner">
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<Placeholder />}
      />
      <HistoryPlugin />
      <TreeViewPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      <AutoLinkPlugin />
      <ListMaxIndentLevelPlugin maxDepth={7} />
      <LexicalOnChangePlugin onChange={onChange} />
      <LexicalMarkdownShortcutPlugin />
    </div>
  );
}
