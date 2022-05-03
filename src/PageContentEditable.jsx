import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState, useCallback, useLayoutEffect } from "react";
import "./PageContentEditable.css";

const PageIndicator = ({ number }) => {
  return (
    <div className="page-indicator">
      <span className="page-indicator-last">page {number - 1}</span>
      <hr />
      <span className="page-indicator-current">page {number}</span>
    </div>
  );
};

export default function LexicalContentEditable({
  ariaActiveDescendantID,
  ariaAutoComplete,
  ariaControls,
  ariaDescribedBy,
  ariaExpanded,
  ariaLabel,
  ariaLabelledBy,
  ariaMultiline,
  ariaOwneeID,
  ariaRequired,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  className,
  id,
  role = "textbox",
  spellCheck = true,
  style,
  tabIndex,
  testid,
}) {
  const [editor] = useLexicalComposerContext();
  const [height, setHeight] = useState(0);

  const editorRef = useCallback(
    (rootElement) => {
      editor.setRootElement(rootElement);
      editor.registerUpdateListener(() => {
        const innerHeight = rootElement.scrollHeight;
        setHeight(Math.ceil(innerHeight / (96 * 11)) * 11);
      });
    },
    [editor]
  );

  const pageNumber = height / 11;

  const [isReadOnly, setReadOnly] = useState(true);
  useLayoutEffect(() => {
    setReadOnly(editor.isReadOnly());
    return editor.registerReadOnlyListener((currentIsReadOnly) => {
      setReadOnly(currentIsReadOnly);
    });
  }, [editor]);

  return (
    <>
      <div className="editor-outer" style={{ height: `${height}in` }}>
        {pageNumber > 0 &&
          [...Array(pageNumber - 1).keys()].map((number) => (
            <PageIndicator number={number + 2} />
          ))}
      </div>
      <div
        ref={editorRef}
        aria-activedescendant={isReadOnly ? null : ariaActiveDescendantID}
        aria-autocomplete={isReadOnly ? null : ariaAutoComplete}
        aria-controls={isReadOnly ? null : ariaControls}
        aria-describedby={ariaDescribedBy}
        aria-expanded={
          isReadOnly ? null : role === "combobox" ? !!ariaExpanded : null
        }
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-multiline={ariaMultiline}
        aria-owns={isReadOnly ? null : ariaOwneeID}
        aria-required={ariaRequired}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        className={className}
        contentEditable={!isReadOnly}
        data-testid={testid}
        id={id}
        role={isReadOnly ? null : role}
        spellCheck={spellCheck}
        style={style}
        tabIndex={tabIndex}
      />
    </>
  );
}
