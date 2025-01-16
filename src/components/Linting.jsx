import React from 'react'; // Import React
import { editor, languages } from 'monaco-editor';
import { ESLint } from 'eslint';

const Linting = ({ editorRef }) => {
  React.useEffect(() => {
    const eslint = new ESLint();

    const validateCode = async () => {
      const model = editorRef.current.getModel();
      const code = model.getValue();
      const results = await eslint.lintText(code);
      const markers = results[0].messages.map((message) => ({
        severity: message.severity === 2 ? languages.MarkerSeverity.Error : languages.MarkerSeverity.Warning,
        message: message.message,
        startLineNumber: message.line,
        startColumn: message.column,
        endLineNumber: message.endLine || message.line,
        endColumn: message.endColumn || message.column,
      }));
      editor.setModelMarkers(model, 'eslint', markers);
    };

    const disposable = editorRef.current.onDidChangeModelContent(validateCode);
    return () => disposable.dispose();
  }, [editorRef]);

  return null; 
};

export default Linting;